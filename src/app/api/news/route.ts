import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { randomUUID } from 'crypto'
import { slugify } from '@/lib/slug'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const itemsPerPage = 12 // ou um valor grande para pegar tudo

  const news = await prisma.new.findMany({
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: itemsPerPage,
  })

  return NextResponse.json(news)
}

export async function POST(req: NextRequest) {
  const user = await authMiddleware(req)
  if (!user || user.role !== 'ADMIN')
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

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

  const created = await prisma.new.create({
    data: {
      ...data,
      userId: user.sub,
      url: slug,
    },
  })

  return NextResponse.json(created)
}
