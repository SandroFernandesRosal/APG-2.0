import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const bodySchema = z.object({
  name: z.string(),
  coverUrl: z.string(),
  avatarUrl: z.string(),
  content: z.string(),
  isPublic: z.coerce.boolean().default(false),
  ministryRole: z.enum(['VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA']).optional(),
})

const bodySchemaUser = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  avatarUrl: z.string(),
  ministryRole: z.enum(['VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA']).optional(),
})

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const offsetQuery = searchParams.get('offset')
  const offset = offsetQuery ? parseInt(offsetQuery, 10) : 0
  const itemsPerPage = 12

  const testemunhos = await prisma.testemunho.findMany({
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: itemsPerPage,
  })

  return NextResponse.json(testemunhos)
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const member = await authMiddleware(req)
  if (!member || (member.role !== 'ADMIN' && member.role !== 'MEMBRO')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { name, coverUrl, avatarUrl, content, isPublic, ministryRole } =
    bodySchema.parse(body)

  if (
    member.role === 'ADMIN' &&
    ministryRole !== member.ministryRole &&
    ministryRole !== null
  ) {
    return NextResponse.json(
      { error: 'ADMIN só pode criar testemunho para sua igreja ou sem igreja' },
      { status: 403 },
    )
  }

  const testemunho = await prisma.testemunho.create({
    data: {
      name,
      coverUrl,
      avatarUrl,
      content,
      isPublic,
      userId: member.sub,
      ministryRole: ministryRole ?? null,
    },
  })

  return NextResponse.json(testemunho)
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const user = await authMiddleware(req)
  if (
    !user ||
    (user.role !== 'ADMIN' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'MEMBRO')
  ) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { userId, name, avatarUrl, ministryRole } = bodySchemaUser.parse(body)

  if (user.role === 'ADMIN' || user.role === 'SUPERADMIN') {
    const testemunhos = await prisma.testemunho.findMany({
      where: { userId },
    })

    if (user.role === 'ADMIN') {
      const naoPermitido = testemunhos.some(
        (t) => t.ministryRole !== user.ministryRole && t.ministryRole !== null,
      )
      if (naoPermitido) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
      }
    }
  } else if (user.role === 'MEMBRO' && user.sub !== userId) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }

  try {
    await prisma.testemunho.updateMany({
      where: { userId },
      data: { name, avatarUrl, ministryRole },
    })

    return NextResponse.json({ message: 'Postagens atualizadas com sucesso' })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao atualizar postagens' },
      { status: 500 },
    )
  }
}
