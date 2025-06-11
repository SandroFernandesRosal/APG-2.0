import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const where: Record<string, unknown> = { isPublic: false }

  if (user.role === 'ADMIN' && user.ministryRole) {
    where.OR = [{ ministryRole: user.ministryRole }, { ministryRole: null }]
  }

  const testemunhos = await prisma.testemunho.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(testemunhos)
}
