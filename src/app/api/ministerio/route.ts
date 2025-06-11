import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const offsetParam = searchParams.get('offset')
  const offset = offsetParam ? parseInt(offsetParam, 10) : 0
  const itemsPerPage = 12

  const ministerios = await prisma.ministerio.findMany({
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: itemsPerPage,
  })

  return NextResponse.json(ministerios)
}

export async function POST(req: NextRequest) {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { name, title, local, isPublic, coverUrl, role } = body

  if (!role) {
    return NextResponse.json({ error: 'Role é obrigatório' }, { status: 400 })
  }

  if (user.role === 'ADMIN' && user.ministryRole !== role) {
    return NextResponse.json(
      { error: 'ADMIN só pode postar na sua igreja' },
      { status: 403 },
    )
  }

  const ministerio = await prisma.ministerio.create({
    data: {
      name,
      title,
      local,
      isPublic: Boolean(isPublic),
      coverUrl,
      userId: user.sub,
      role,
    },
  })

  return NextResponse.json(ministerio)
}
