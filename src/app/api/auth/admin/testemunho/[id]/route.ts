import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const bodySchema = z.object({
  isPublic: z.boolean(),
})

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const admin = await authMiddleware(req)
  if (!admin) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const { isPublic } = bodySchema.parse(body)

  const updated = await prisma.testemunho.update({
    where: { id },
    data: { isPublic },
  })

  return NextResponse.json(updated)
}
