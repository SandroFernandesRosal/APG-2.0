import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

import { authMiddlewareMember } from '@/lib/auth-member'

const bodySchema = z.object({
  name: z.string(),
  coverUrl: z.string(),
  avatarUrl: z.string(),
  content: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

const bodySchemaUser = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  avatarUrl: z.string(),
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
  const member = await authMiddlewareMember(req)
  if (!member) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { name, coverUrl, avatarUrl, content, isPublic } =
    bodySchema.parse(body)

  const testemunho = await prisma.testemunho.create({
    data: {
      name,
      coverUrl,
      avatarUrl,
      content,
      isPublic,
      userId: member.sub,
    },
  })

  return NextResponse.json(testemunho)
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const user = await authMiddlewareMember(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { userId, name, avatarUrl } = bodySchemaUser.parse(body)

  try {
    await prisma.testemunho.updateMany({
      where: { userId },
      data: { name, avatarUrl },
    })

    return NextResponse.json({ message: 'Postagens atualizadas com sucesso' })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao atualizar postagens' },
      { status: 500 },
    )
  }
}
