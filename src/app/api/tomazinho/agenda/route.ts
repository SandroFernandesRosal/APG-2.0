import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const itemsPerPage = 12

  const agenda = await prisma.agendaTomazinho.findMany({
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: itemsPerPage,
  })

  return NextResponse.json(agenda)
}

export async function POST(req: NextRequest) {
  const user = await authMiddleware(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { name, day, hour, isPublic, destaque } = body

  const agenda = await prisma.agendaTomazinho.create({
    data: {
      name,
      day,
      hour,
      isPublic: Boolean(isPublic),
      destaque: Boolean(destaque),
      userId: user.sub,
    },
  })

  return NextResponse.json(agenda)
}
