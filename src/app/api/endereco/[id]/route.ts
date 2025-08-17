import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  local: z.string(),
  rua: z.string(),
  cep: z.string(),
  numero: z.string(),
  cidade: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)

  const endereco = await prisma.endereco.findUniqueOrThrow({
    where: { id },
  })

  return NextResponse.json(endereco)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  // Buscar dados completos do usuário para auditoria
  const userData = await prisma.user.findUnique({
    where: { id: user.sub },
    select: { name: true },
  })

  const { id } = paramsSchema.parse(await params)
  const body = await req.json()
  const { local, rua, isPublic, cep, numero, cidade } = bodySchema.parse(body)

  // Buscar dados antigos para auditoria
  const oldEndereco = await prisma.endereco.findUnique({ where: { id } })

  const endereco = await prisma.endereco.update({
    where: { id },
    data: {
      local,
      rua,
      cep,
      numero,
      cidade,
      isPublic,
    },
  })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logUpdate({
      entityType: 'Endereco',
      entityId: id,
      userId: user.sub,
      userName: userData?.name || 'Usuário',
      userRole: user.role,
      oldData: oldEndereco,
      newData: endereco,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json(endereco)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  // Buscar dados completos do usuário para auditoria
  const userData = await prisma.user.findUnique({
    where: { id: user.sub },
    select: { name: true },
  })

  const { id } = paramsSchema.parse(await params)

  // Buscar dados antigos para auditoria
  const oldEndereco = await prisma.endereco.findUnique({ where: { id } })

  await prisma.endereco.delete({
    where: { id },
  })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logDelete({
      entityType: 'Endereco',
      entityId: id,
      userId: user.sub,
      userName: userData?.name || 'Usuário',
      userRole: user.role,
      oldData: oldEndereco,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json({ message: 'Endereço deletado com sucesso.' })
}
