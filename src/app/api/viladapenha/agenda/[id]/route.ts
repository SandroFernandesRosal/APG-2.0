import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const paramsSchema = z.object({ id: z.string().uuid() })

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await context.params)

  const agenda = await prisma.agenda.findUniqueOrThrow({ where: { id } })
  return NextResponse.json(agenda)
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await context.params)
  const body = await req.json()
  const { name, day, hour, isPublic, destaque } = body

  await prisma.agenda.findUniqueOrThrow({ where: { id } })

  const updated = await prisma.agenda.update({
    where: { id },
    data: {
      name,
      day,
      hour,
      isPublic: Boolean(isPublic),
      destaque: Boolean(destaque),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await context.params)

  await prisma.agenda.findUniqueOrThrow({ where: { id } })
  await prisma.agenda.delete({ where: { id } })

  return NextResponse.json({ message: 'Deletado com sucesso' })
}
