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

  const memory = await prisma.newTomazinho.findUniqueOrThrow({ where: { id } })
  return NextResponse.json(memory)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user)
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { id } = paramsSchema.parse(await params)
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

  const uuid = randomUUID()
  const slug = `${slugify(data.title)}-${uuid.slice(-5)}`

  const updated = await prisma.newTomazinho.update({
    where: { id },
    data: {
      ...data,
      userId: user.sub,
      url: slug,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user)
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { id } = paramsSchema.parse(await params)

  await prisma.newTomazinho.delete({ where: { id } })

  return NextResponse.json({ message: 'Deletado com sucesso' })
}
