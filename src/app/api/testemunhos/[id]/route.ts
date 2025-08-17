import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  name: z.string(),
  coverUrl: z.string(),
  avatarUrl: z.string(),
  content: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)

  const testemunho = await prisma.testemunho.findUniqueOrThrow({
    where: { id },
  })

  return NextResponse.json(testemunho)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)
  const body = await req.json()
  const { name, coverUrl, avatarUrl, content, isPublic } =
    bodySchema.parse(body)

  const testemunho = await prisma.testemunho.findUniqueOrThrow({
    where: { id },
  })

  const isOwner = user.sub === testemunho.userId

  if (user.role === 'SUPERADMIN' || user.role === 'ADMIN' || isOwner) {
    const updated = await prisma.testemunho.update({
      where: { id },
      data: {
        name,
        coverUrl,
        avatarUrl,
        content,
        isPublic,
      },
    })

    // Auditoria - não interfere na resposta
    try {
      await AuditLogger.logUpdate({
        entityType: 'Testemunho',
        entityId: id,
        userId: user.sub,
        userName: user.name || 'Usuário',
        userRole: user.role,
        oldData: testemunho,
        newData: updated,
      })
    } catch (error) {
      console.error('Erro ao registrar auditoria:', error)
      // Não quebra a API se a auditoria falhar
    }

    return NextResponse.json(updated)
  }

  return NextResponse.json(
    { error: 'Você não tem permissão para editar este testemunho.' },
    { status: 403 },
  )
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)

  const testemunho = await prisma.testemunho.findUniqueOrThrow({
    where: { id },
  })

  const isOwner = user.sub === testemunho.userId

  if (user.role === 'SUPERADMIN' || user.role === 'ADMIN' || isOwner) {
    await prisma.testemunho.delete({ where: { id } })

    // Auditoria - não interfere na resposta
    try {
      await AuditLogger.logDelete({
        entityType: 'Testemunho',
        entityId: id,
        userId: user.sub,
        userName: user.name || 'Usuário',
        userRole: user.role,
        oldData: testemunho,
      })
    } catch (error) {
      console.error('Erro ao registrar auditoria:', error)
      // Não quebra a API se a auditoria falhar
    }

    return NextResponse.json({ message: 'Testemunho deletado com sucesso.' })
  }

  return NextResponse.json(
    { error: 'Você não tem permissão para deletar este testemunho.' },
    { status: 403 },
  )
}
