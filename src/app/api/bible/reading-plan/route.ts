import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

// GET - Buscar plano de leitura do usuário
export async function GET(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    const readingPlan = await prisma.bibleReadingPlan.findUnique({
      where: { userId },
    })

    if (!readingPlan) {
      return NextResponse.json(null)
    }

    return NextResponse.json(readingPlan)
  } catch (error) {
    console.error('Erro ao buscar plano de leitura:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// POST - Criar novo plano de leitura
export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    const body = await request.json()
    const { totalDays } = body

    if (!totalDays || totalDays < 1) {
      return NextResponse.json(
        { error: 'Número de dias é obrigatório e deve ser maior que 0' },
        { status: 400 },
      )
    }

    // Calcular capítulos por dia
    const TOTAL_BIBLE_CHAPTERS = 1189
    const chaptersPerDay = Math.ceil(TOTAL_BIBLE_CHAPTERS / totalDays)

    // Calcular datas
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + totalDays)

    // Verificar se já existe um plano e deletar
    const existingPlan = await prisma.bibleReadingPlan.findUnique({
      where: { userId },
    })

    if (existingPlan) {
      await prisma.bibleReadingPlan.delete({
        where: { id: existingPlan.id },
      })
    }

    // Criar novo plano
    const readingPlan = await prisma.bibleReadingPlan.create({
      data: {
        userId,
        totalDays,
        chaptersPerDay,
        startDate,
        endDate,
      },
    })

    return NextResponse.json(readingPlan, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar plano de leitura:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// DELETE - Deletar plano de leitura
export async function DELETE(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID do plano é obrigatório' },
        { status: 400 },
      )
    }

    // Verificar se o plano pertence ao usuário
    const readingPlan = await prisma.bibleReadingPlan.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!readingPlan) {
      return NextResponse.json(
        { error: 'Plano não encontrado' },
        { status: 404 },
      )
    }

    await prisma.bibleReadingPlan.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Plano deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar plano de leitura:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
