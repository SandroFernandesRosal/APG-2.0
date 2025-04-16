import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const bodySchema = z.object({
  local: z.string(),
  rua: z.string(),
  cep: z.string(),
  numero: z.string(),
  cidade: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

export async function GET(): Promise<NextResponse> {
  const enderecos = await prisma.endereco.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(enderecos)
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const user = await authMiddleware(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { local, rua, cep, numero, cidade, isPublic } = bodySchema.parse(body)

  const endereco = await prisma.endereco.create({
    data: {
      local,
      rua,
      cep,
      numero,
      cidade,
      isPublic,
      userId: user.sub,
    },
  })

  return NextResponse.json(endereco)
}
