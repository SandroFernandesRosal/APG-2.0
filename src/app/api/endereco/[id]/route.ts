import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  local: z.string(),
  rua: z.string(),
  cep: z.string(),
  numero: z.string(),
  cidade: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = paramsSchema.parse(await params)

  const endereco = await prisma.endereco.findUniqueOrThrow({
    where: { id },
  })

  return NextResponse.json(endereco)
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
  const { local, rua, isPublic, cep, numero, cidade } = bodySchema.parse(body)

  const endereco = await prisma.endereco.update({
    where: { id },
    data: {
      local,
      rua,
      cep,
      numero,
      cidade,
      isPublic,
    },
  })

  return NextResponse.json(endereco)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await authMiddleware(req)
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)

  await prisma.endereco.delete({
    where: { id },
  })

  return NextResponse.json({ message: 'Endereço deletado com sucesso.' })
}
