import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'
import { z } from 'zod'

const bodySchema = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  avatarUrl: z.string(),
})

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const user = await authMiddleware(req)
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { userId, name, avatarUrl } = bodySchema.parse(body)

  try {
    await prisma.testemunho.updateMany({
      where: { userId },
      data: { name, avatarUrl },
    })

    return NextResponse.json({ message: 'Postagens atualizadas com sucesso' })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao atualizar postagens' },
      { status: 500 },
    )
  }
}
