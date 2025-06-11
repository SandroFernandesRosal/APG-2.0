import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { randomUUID } from 'crypto'
import { slugify } from '@/lib/slug'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)

  const news = await prisma.new.findUniqueOrThrow({ where: { id } })
  return NextResponse.json(news)
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
  const news = await prisma.new.findUnique({ where: { id } })
  if (!news) {
    return NextResponse.json(
      { error: 'Notícia não encontrada' },
      { status: 404 },
    )
  }

  // ADMIN só pode editar notícia da sua igreja
  if (user.role === 'ADMIN' && news.role !== user.ministryRole) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }

  const body = await req.json()
  const schema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    title: z.string(),
    isPublic: z.coerce.boolean().default(false),
    destaque: z.coerce.boolean().default(false),
    page: z.string(),
    role: z.enum(['VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA']),
  })

  const data = schema.parse(body)

  const uuid = randomUUID()
  const slug = `${slugify(data.title)}-${uuid.slice(-5)}`

  const updated = await prisma.new.update({
    where: { id },
    data: {
      ...data,
      userId: user.sub,
      url: slug,
    },
  })

  return NextResponse.json(updated)
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
  const news = await prisma.new.findUnique({ where: { id } })
  if (!news) {
    return NextResponse.json(
      { error: 'Notícia não encontrada' },
      { status: 404 },
    )
  }

  if (user.role === 'ADMIN' && news.role !== user.ministryRole) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }

  await prisma.new.delete({ where: { id } })

  return NextResponse.json({ message: 'Deletado com sucesso' })
}
