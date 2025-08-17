import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'

const bodySchema = z.object({
  content: z.string(),
  coverUrl: z.string(),
  title: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)
  const memory = await prisma.sobre.findUniqueOrThrow({
    where: { id },
  })
  return NextResponse.json(memory)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user || user.role !== 'SUPERADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  // Buscar dados completos do usuário para auditoria
  const userData = await prisma.user.findUnique({
    where: { id: user.sub },
    select: { name: true },
  })

  const { id } = paramsSchema.parse(await params)
  const body = await req.json()
  const { content, coverUrl, isPublic, title } = bodySchema.parse(body)

  // Buscar dados antigos para auditoria
  const oldMemory = await prisma.sobre.findUnique({ where: { id } })

  const memory = await prisma.sobre.update({
    where: { id },
    data: {
      content,
      coverUrl,
      title,
      isPublic,
    },
  })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logUpdate({
      entityType: 'Sobre',
      entityId: id,
      userId: user.sub,
      userName: userData?.name || 'Usuário',
      userRole: user.role,
      oldData: oldMemory,
      newData: memory,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json(memory)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user || user.role !== 'SUPERADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  // Buscar dados completos do usuário para auditoria
  const userData = await prisma.user.findUnique({
    where: { id: user.sub },
    select: { name: true },
  })

  const { id } = paramsSchema.parse(await params)

  // Buscar dados antigos para auditoria
  const oldMemory = await prisma.sobre.findUnique({ where: { id } })

  await prisma.sobre.delete({ where: { id } })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logDelete({
      entityType: 'Sobre',
      entityId: id,
      userId: user.sub,
      userName: userData?.name || 'Usuário',
      userRole: user.role,
      oldData: oldMemory,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json({ message: 'Removido com sucesso.' })
}
