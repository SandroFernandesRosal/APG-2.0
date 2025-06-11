import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const itemsPerPage = 12

  const agenda = await prisma.agenda.findMany({
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: itemsPerPage,
  })

  return NextResponse.json(agenda)
}

export async function POST(req: NextRequest) {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { name, day, hour, isPublic, destaque, role } = body

  if (!role) {
    return NextResponse.json({ error: 'Role é obrigatório' }, { status: 400 })
  }

  // ADMIN só pode postar na própria igreja
  if (user.role === 'ADMIN' && user.ministryRole !== role) {
    return NextResponse.json(
      { error: 'ADMIN só pode postar na sua igreja' },
      { status: 403 },
    )
  }

  const agenda = await prisma.agenda.create({
    data: {
      name,
      day,
      hour,
      isPublic: Boolean(isPublic),
      destaque: Boolean(destaque),
      userId: user.sub,
      role,
    },
  })

  return NextResponse.json(agenda)
}
