import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const bodySchema = z.object({
  local: z.string(),
  banco: z.string(),
  conta: z.string(),
  agencia: z.string(),
  nomebanco: z.string(),
  pix: z.string(),
  nomepix: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

export async function GET(): Promise<NextResponse> {
  const doacoes = await prisma.doacao.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(doacoes)
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { local, banco, conta, agencia, nomebanco, pix, nomepix, isPublic } =
    bodySchema.parse(body)

  const doacao = await prisma.doacao.create({
    data: {
      local,
      banco,
      conta,
      agencia,
      nomebanco,
      pix,
      nomepix,
      isPublic,
      userId: user.sub,
    },
  })

  return NextResponse.json(doacao)
}
