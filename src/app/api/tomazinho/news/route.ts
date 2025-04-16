import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const itemsPerPage = 12

  const news = await prisma.newTomazinho.findMany({
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: itemsPerPage,
  })

  return NextResponse.json(news)
}

export async function POST(req: NextRequest) {
  const user = await authMiddleware(req)
  if (!user)
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const body = await req.json()

  const schema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    title: z.string(),
    isPublic: z.coerce.boolean().default(false),
    destaque: z.coerce.boolean().default(false),
    page: z.string(),
  })

  const data = schema.parse(body)

  const created = await prisma.newTomazinho.create({
    data: {
      ...data,
      userId: user.sub,
    },
  })

  return NextResponse.json(created)
}
