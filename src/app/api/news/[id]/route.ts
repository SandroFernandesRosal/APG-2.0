import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  content: z.string(),
  coverUrl: z.string().nullable().optional(),
  videoUrl: z.string().nullable().optional(),
  title: z.string(),
  isPublic: z.coerce.boolean().default(false),
  destaque: z.coerce.boolean().default(false),
  page: z.string(),
  role: z.enum(['VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA']),
})

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)

  const news = await prisma.new.findUniqueOrThrow({
    where: { id },
  })

  return NextResponse.json(news)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  // Buscar dados completos do usuário para auditoria
  const userData = await prisma.user.findUnique({
    where: { id: user.sub },
    select: { name: true },
  })

  const { id } = paramsSchema.parse(await params)
  const body = await req.json()
  const data = bodySchema.parse(body)

  const news = await prisma.new.findUniqueOrThrow({
    where: { id },
  })

  const isOwner = user.sub === news.userId

  if (user.role === 'SUPERADMIN' || isOwner) {
    const updated = await prisma.new.update({
      where: { id },
      data,
    })

    // Auditoria - não interfere na resposta
    try {
      await AuditLogger.logUpdate({
        entityType: 'New',
        entityId: id,
        userId: user.sub,
        userName: userData?.name || 'Usuário',
        userRole: user.role,
        oldData: news,
        newData: updated,
      })
    } catch (error) {
      console.error('Erro ao registrar auditoria:', error)
      // Não quebra a API se a auditoria falhar
    }

    return NextResponse.json(updated)
  }

  return NextResponse.json(
    { error: 'Você não tem permissão para editar esta notícia.' },
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

  // Buscar dados completos do usuário para auditoria
  const userData = await prisma.user.findUnique({
    where: { id: user.sub },
    select: { name: true },
  })

  const { id } = paramsSchema.parse(await params)

  const news = await prisma.new.findUniqueOrThrow({
    where: { id },
  })

  const isOwner = user.sub === news.userId

  if (user.role === 'SUPERADMIN' || isOwner) {
    await prisma.new.delete({ where: { id } })

    // Auditoria - não interfere na resposta
    try {
      await AuditLogger.logDelete({
        entityType: 'New',
        entityId: id,
        userId: user.sub,
        userName: userData?.name || 'Usuário',
        userRole: user.role,
        oldData: news,
      })
    } catch (error) {
      console.error('Erro ao registrar auditoria:', error)
      // Não quebra a API se a auditoria falhar
    }

    return NextResponse.json({ message: 'Notícia deletada com sucesso.' })
  }

  return NextResponse.json(
    { error: 'Você não tem permissão para deletar esta notícia.' },
    { status: 403 },
  )
}
