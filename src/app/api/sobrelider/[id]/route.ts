import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const bodySchema = z.object({
  name: z.string(),
  coverUrl: z.string(),
  title: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)
  const memory = await prisma.sobreLider.findUniqueOrThrow({
    where: { id },
  })
  return NextResponse.json(memory)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)
  const body = await req.json()
  const { name, coverUrl, isPublic, title } = bodySchema.parse(body)

  const memory = await prisma.sobreLider.update({
    where: { id },
    data: {
      name,
      coverUrl,
      title,
      isPublic,
    },
  })

  return NextResponse.json(memory)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)

  await prisma.sobreLider.delete({ where: { id } })

  return NextResponse.json({ message: 'Removido com sucesso.' })
}
