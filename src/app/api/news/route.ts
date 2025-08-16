import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { randomUUID } from 'crypto'
import { slugify } from '@/lib/slug'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const itemsPerPage = 12

  const news = await prisma.new.findMany({
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: itemsPerPage,
  })

  return NextResponse.json(news)
}

export async function POST(req: NextRequest) {
  try {
    console.log('Iniciando POST /api/news')

    const user = await authMiddleware(req)
    console.log('Usuário autenticado:', user ? 'sim' : 'não')

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
      console.log('Usuário não autorizado:', user?.role)
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
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

    if (user.role === 'ADMIN' && user.ministryRole !== data.role) {
      console.log('ADMIN tentando postar em igreja diferente')
      return NextResponse.json(
        { error: 'ADMIN só pode postar na sua igreja' },
        { status: 403 },
      )
    }

    const uuid = randomUUID()
    const slug = `${slugify(data.title)}-${uuid.slice(-5)}`
    console.log('Slug gerado:', slug)

    console.log('Tentando criar no banco...')
    const created = await prisma.new.create({
      data: {
        ...data,
        userId: user.sub,
        url: slug,
      },
    })
    console.log('Notícia criada com sucesso:', created.id)

    return NextResponse.json(created)
  } catch (error) {
    console.error('Erro completo na API /api/news:', error)
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 },
    )
  }
}
