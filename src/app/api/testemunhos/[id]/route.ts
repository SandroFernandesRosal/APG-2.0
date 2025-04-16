import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  name: z.string(),
  coverUrl: z.string(),
  avatarUrl: z.string(),
  content: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)
  const testemunho = await prisma.testemunho.findUniqueOrThrow({
    where: { id },
  })
  return NextResponse.json(testemunho)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)
  const body = await req.json()
  const { name, coverUrl, avatarUrl, content, isPublic } =
    bodySchema.parse(body)

  const testemunho = await prisma.testemunho.findUniqueOrThrow({
    where: { id },
  })

  const isAdmin = await prisma.user.findUnique({ where: { id: user.sub } })
  const isCreator = user.sub === testemunho.userId

  if (!isAdmin && !isCreator) {
    return NextResponse.json({ message: 'Sem permissão.' }, { status: 403 })
  }

  const atualizado = await prisma.testemunho.update({
    where: { id },
    data: {
      name,
      coverUrl,
      avatarUrl,
      content,
      isPublic,
    },
  })

  return NextResponse.json(atualizado)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)

  await prisma.testemunho.delete({ where: { id } })

  return NextResponse.json({ message: 'Testemunho deletado com sucesso.' })
}
