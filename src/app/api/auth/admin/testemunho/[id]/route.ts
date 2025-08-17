import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'

const bodySchema = z.object({
  isPublic: z.boolean(),
})

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const admin = await authMiddleware(req)
  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  // Buscar dados completos do usuário para auditoria
  const userData = await prisma.user.findUnique({
    where: { id: admin.sub },
    select: { name: true },
  })

  const { id } = await params
  const body = await req.json()
  const { isPublic } = bodySchema.parse(body)

  // Busca o testemunho para checar permissão
  const testemunho = await prisma.testemunho.findUnique({ where: { id } })
  if (!testemunho) {
    return NextResponse.json(
      { error: 'Testemunho não encontrado' },
      { status: 404 },
    )
  }

  if (
    admin.role === 'ADMIN' &&
    testemunho.ministryRole !== admin.ministryRole &&
    testemunho.ministryRole !== null
  ) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const updated = await prisma.testemunho.update({
    where: { id },
    data: { isPublic },
  })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logUpdate({
      entityType: 'Testemunho',
      entityId: id,
      userId: admin.sub,
      userName: userData?.name || 'Administrador',
      userRole: admin.role,
      oldData: testemunho,
      newData: updated,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const admin = await authMiddleware(req)
  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  // Buscar dados completos do usuário para auditoria
  const userData = await prisma.user.findUnique({
    where: { id: admin.sub },
    select: { name: true },
  })

  const { id } = await params

  // Busca o testemunho para checar permissão
  const testemunho = await prisma.testemunho.findUnique({ where: { id } })
  if (!testemunho) {
    return NextResponse.json(
      { error: 'Testemunho não encontrado' },
      { status: 404 },
    )
  }

  if (
    admin.role === 'ADMIN' &&
    testemunho.ministryRole !== admin.ministryRole &&
    testemunho.ministryRole !== null
  ) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    await prisma.testemunho.delete({
      where: { id },
    })

    // Auditoria - não interfere na resposta
    try {
      await AuditLogger.logDelete({
        entityType: 'Testemunho',
        entityId: id,
        userId: admin.sub,
        userName: userData?.name || 'Administrador',
        userRole: admin.role,
        oldData: testemunho,
      })
    } catch (error) {
      console.error('Erro ao registrar auditoria:', error)
      // Não quebra a API se a auditoria falhar
    }

    return NextResponse.json({ message: 'Testemunho deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar testemunho:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar testemunho' },
      { status: 500 },
    )
  }
}
