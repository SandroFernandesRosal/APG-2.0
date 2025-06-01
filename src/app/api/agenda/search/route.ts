import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json(
      { error: 'Parâmetro de busca "q" é obrigatório' },
      { status: 400 },
    )
  }

  const agenda = await prisma.agenda.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(agenda)
}
