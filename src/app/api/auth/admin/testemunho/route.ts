import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth' // use o middleware de admin aqui

export async function GET(req: NextRequest): Promise<NextResponse> {
  const admin = await authMiddleware(req)
  if (!admin) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const testemunhos = await prisma.testemunho.findMany({
    where: { isPublic: false },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(testemunhos)
}
