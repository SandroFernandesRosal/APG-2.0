import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)

  const doacao = await prisma.doacao.findUniqueOrThrow({
    where: { id },
  })

  return NextResponse.json(doacao)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)
  const body = await req.json()

  const bodySchema = z.object({
    local: z.string(),
    banco: z.string(),
    conta: z.string(),
    agencia: z.string(),
    nomebanco: z.string(),
    pix: z.string(),
    nomepix: z.string(),
    isPublic: z.coerce.boolean().default(false),
  })

  const { local, banco, conta, agencia, nomebanco, pix, nomepix, isPublic } =
    bodySchema.parse(body)

  // Buscar dados antigos para auditoria
  const oldDoacao = await prisma.doacao.findUnique({ where: { id } })

  const doacao = await prisma.doacao.update({
    where: { id },
    data: {
      local,
      banco,
      conta,
      agencia,
      nomebanco,
      pix,
      nomepix,
      isPublic,
    },
  })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logUpdate({
      entityType: 'Doacao',
      entityId: id,
      userId: user.sub,
      userName: user.name || 'Usuário',
      userRole: user.role,
      oldData: oldDoacao,
      newData: doacao,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json(doacao)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)

  // Buscar dados antigos para auditoria
  const oldDoacao = await prisma.doacao.findUnique({ where: { id } })

  await prisma.doacao.delete({ where: { id } })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logDelete({
      entityType: 'Doacao',
      entityId: id,
      userId: user.sub,
      userName: user.name || 'Usuário',
      userRole: user.role,
      oldData: oldDoacao,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json({ message: 'Deletado com sucesso' })
}
