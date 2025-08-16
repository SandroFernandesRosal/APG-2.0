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
  try {
    console.log('Iniciando PUT /api/news/[id]')

    const user = await authMiddleware(req)
    console.log('Usuário autenticado:', user ? 'sim' : 'não')

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
      console.log('Usuário não autorizado:', user?.role)
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = paramsSchema.parse(await params)
    console.log('ID da notícia:', id)

    const news = await prisma.new.findUnique({ where: { id } })
    if (!news) {
      console.log('Notícia não encontrada')
      return NextResponse.json(
        { error: 'Notícia não encontrada' },
        { status: 404 },
      )
    }

    // ADMIN só pode editar notícia da sua igreja
    if (user.role === 'ADMIN' && news.role !== user.ministryRole) {
      console.log('ADMIN tentando editar notícia de igreja diferente')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    const body = await req.json()
    console.log('Body recebido:', body)

    const schema = z.object({
      content: z.string(),
      coverUrl: z.string().nullable().optional(),
      videoUrl: z.string().nullable().optional(),
      title: z.string(),
      isPublic: z.coerce.boolean().default(false),
      destaque: z.coerce.boolean().default(false),
      page: z.string(),
      role: z.enum(['VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA']),
    })

    const data = schema.parse(body)
    console.log('Dados validados:', data)

    const uuid = randomUUID()
    const slug = `${slugify(data.title)}-${uuid.slice(-5)}`
    console.log('Slug gerado:', slug)

    console.log('Tentando atualizar no banco...')
    const updated = await prisma.new.update({
      where: { id },
      data: {
        ...data,
        userId: user.sub,
        url: slug,
      },
    })
    console.log('Notícia atualizada com sucesso:', updated.id)

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Erro completo na API /api/news/[id]:', error)
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 },
    )
  }
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
