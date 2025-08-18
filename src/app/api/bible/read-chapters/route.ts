import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

// GET - Listar capítulos lidos pelo usuário
export async function GET(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    console.log('🔍 Buscando capítulos lidos para usuário:', userId)

    const readChapters = await prisma.bibleReadChapter.findMany({
      where: { userId },
      orderBy: { readAt: 'desc' },
    })

    console.log('📖 Retornando capítulos lidos reais:', readChapters.length)
    console.log('📖 Primeiros 3 capítulos:', readChapters.slice(0, 3))
    return NextResponse.json(readChapters)
  } catch (error) {
    console.error('Erro ao buscar capítulos lidos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// POST - Marcar capítulo como lido
export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    const body = await request.json()
    const { bookName, chapter } = body

    if (!bookName || !chapter) {
      return NextResponse.json(
        { error: 'Nome do livro e capítulo são obrigatórios' },
        { status: 400 },
      )
    }

    // Verificar se já foi marcado como lido
    const existing = await prisma.bibleReadChapter.findFirst({
      where: {
        userId,
        bookName,
        chapter,
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Este capítulo já foi marcado como lido' },
        { status: 409 },
      )
    }

    // Marcar como lido
    const readChapter = await prisma.bibleReadChapter.create({
      data: {
        userId,
        bookName,
        chapter,
      },
    })

    return NextResponse.json(readChapter, { status: 201 })
  } catch (error) {
    console.error('Erro ao marcar capítulo como lido:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// DELETE - Desmarcar capítulo como lido
export async function DELETE(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    const { searchParams } = new URL(request.url)
    const bookName = searchParams.get('bookName')
    const chapter = searchParams.get('chapter')

    if (!bookName || !chapter) {
      return NextResponse.json(
        { error: 'Nome do livro e capítulo são obrigatórios' },
        { status: 400 },
      )
    }

    // Verificar se o capítulo foi marcado pelo usuário
    const readChapter = await prisma.bibleReadChapter.findFirst({
      where: {
        userId,
        bookName,
        chapter: parseInt(chapter),
      },
    })

    if (!readChapter) {
      return NextResponse.json(
        { error: 'Capítulo não encontrado' },
        { status: 404 },
      )
    }

    await prisma.bibleReadChapter.delete({
      where: { id: readChapter.id },
    })

    return NextResponse.json({ message: 'Capítulo desmarcado com sucesso' })
  } catch (error) {
    console.error('Erro ao desmarcar capítulo:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
