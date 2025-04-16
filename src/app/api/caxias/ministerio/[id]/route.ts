import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

const paramsSchema = z.object({ id: z.string().uuid() })

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)

  const ministerio = await prisma.ministerioCaxias.findUnique({
    where: { id },
  })

  return NextResponse.json(ministerio)
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
  const { name, title, local, isPublic, coverUrl } = body

  const updated = await prisma.ministerioCaxias.update({
    where: { id },
    data: {
      name,
      title,
      local,
      isPublic: Boolean(isPublic),
      coverUrl,
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

  await prisma.ministerioCaxias.delete({ where: { id } })

  return NextResponse.json({ message: 'Deletado com sucesso' })
}
