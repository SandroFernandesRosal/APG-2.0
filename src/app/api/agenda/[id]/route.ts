import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const paramsSchema = z.object({ id: z.string().uuid() })

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)

  const agenda = await prisma.agenda.findUniqueOrThrow({ where: { id } })
  return NextResponse.json(agenda)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)
  const body = await req.json()
  const { name, day, hour, isPublic, destaque } = body

  // Busca agenda para checar permissão
  const agenda = await prisma.agenda.findUnique({ where: { id } })
  if (!agenda) {
    return NextResponse.json(
      { error: 'Agenda não encontrada' },
      { status: 404 },
    )
  }

  if (user.role === 'ADMIN' && agenda.role !== user.ministryRole) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

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
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)

  // Busca agenda para checar permissão
  const agenda = await prisma.agenda.findUnique({ where: { id } })
  if (!agenda) {
    return NextResponse.json(
      { error: 'Agenda não encontrada' },
      { status: 404 },
    )
  }

  if (user.role === 'ADMIN' && agenda.role !== user.ministryRole) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  await prisma.agenda.delete({ where: { id } })

  return NextResponse.json({ message: 'Deletado com sucesso' })
}
