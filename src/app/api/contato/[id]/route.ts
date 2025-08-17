import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

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
    whatsapp: z.string(),
    instagram: z.string(),
    facebook: z.string(),
    isPublic: z.coerce.boolean().default(false),
  })

  const { local, whatsapp, instagram, facebook, isPublic } =
    bodySchema.parse(body)

  // Buscar dados antigos para auditoria
  const oldContato = await prisma.contato.findUnique({ where: { id } })

  const contato = await prisma.contato.update({
    where: { id },
    data: {
      local,
      whatsapp,
      instagram,
      facebook,
      isPublic,
    },
  })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logUpdate({
      entityType: 'Contato',
      entityId: id,
      userId: user.sub,
      userName: user.name || 'Usuário',
      userRole: user.role,
      oldData: oldContato,
      newData: contato,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json(contato)
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
  const oldContato = await prisma.contato.findUnique({ where: { id } })

  await prisma.contato.delete({ where: { id } })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logDelete({
      entityType: 'Contato',
      entityId: id,
      userId: user.sub,
      userName: user.name || 'Usuário',
      userRole: user.role,
      oldData: oldContato,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json({ message: 'Deletado com sucesso' })
}
