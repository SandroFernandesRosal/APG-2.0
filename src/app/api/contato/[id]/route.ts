import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)

  const contato = await prisma.contato.findUniqueOrThrow({
    where: { id },
  })

  return NextResponse.json(contato)
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

  const bodySchema = z.object({
    local: z.string(),
    whatsapp: z.string(),
    instagram: z.string(),
    facebook: z.string(),
    isPublic: z.coerce.boolean().default(false),
  })

  const { local, whatsapp, instagram, facebook, isPublic } =
    bodySchema.parse(body)

  const contato = await prisma.contato.update({
    where: { id },
    data: {
      local,
      whatsapp,
      instagram,
      facebook,
      isPublic,
    },
  })

  return NextResponse.json(contato)
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

  await prisma.contato.delete({ where: { id } })

  return NextResponse.json({ message: 'Deletado com sucesso' })
}
