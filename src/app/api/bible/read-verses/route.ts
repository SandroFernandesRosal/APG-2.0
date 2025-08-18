import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

// GET - Listar versículos lidos pelo usuário
export async function GET(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    console.log('🔍 Buscando versículos lidos para usuário:', userId)

    const readVerses = await prisma.bibleReadVerse.findMany({
      where: { userId },
      orderBy: { readAt: 'desc' },
    })

    console.log('📖 Retornando versículos lidos reais:', readVerses.length)
    console.log('📖 Primeiros 3 versículos:', readVerses.slice(0, 3))
    return NextResponse.json(readVerses)
  } catch (error) {
    console.error('Erro ao buscar versículos lidos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// POST - Marcar versículo como lido
export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    const body = await request.json()
    const { bookName, chapter, verse } = body

    if (!bookName || !chapter || !verse) {
      return NextResponse.json(
        { error: 'Nome do livro, capítulo e versículo são obrigatórios' },
        { status: 400 },
      )
    }

    // Verificar se já foi marcado como lido
    const existing = await prisma.bibleReadVerse.findFirst({
      where: {
        userId,
        bookName,
        chapter,
        verse,
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Este versículo já foi marcado como lido' },
        { status: 409 },
      )
    }

    // Marcar como lido
    const readVerse = await prisma.bibleReadVerse.create({
      data: {
        userId,
        bookName,
        chapter,
        verse,
      },
    })

    // Verificar se deve marcar o capítulo automaticamente
    // Contar quantos versículos estão marcados como lidos neste capítulo
    const totalReadVerses = await prisma.bibleReadVerse.count({
      where: {
        userId,
        bookName,
        chapter,
      },
    })

    console.log(
      `📊 Total de versículos lidos no capítulo ${bookName} ${chapter}: ${totalReadVerses}`,
    )

    // Verificar se o capítulo já está marcado como lido
    const existingChapter = await prisma.bibleReadChapter.findFirst({
      where: {
        userId,
        bookName,
        chapter,
      },
    })

    // Se não está marcado, verificar se todos os versículos foram lidos
    if (!existingChapter) {
      // Buscar o total de versículos neste capítulo da API da Bíblia
      try {
        const bibleResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/bible?livro=${encodeURIComponent(bookName)}&capitulo=${chapter}`,
        )

        if (bibleResponse.ok) {
          const verses = await bibleResponse.json()
          const totalVersesInChapter = verses.length

          console.log(
            `📖 Total de versículos no capítulo ${bookName} ${chapter}: ${totalVersesInChapter}`,
          )

          // Se todos os versículos foram lidos, marcar o capítulo
          if (totalReadVerses >= totalVersesInChapter) {
            await prisma.bibleReadChapter.create({
              data: {
                userId,
                bookName,
                chapter,
              },
            })
            console.log(
              `✅ Capítulo ${bookName} ${chapter} marcado automaticamente`,
            )
          }
        }
      } catch (error) {
        console.error('Erro ao verificar total de versículos:', error)
      }
    }

    return NextResponse.json(readVerse, { status: 201 })
  } catch (error) {
    console.error('Erro ao marcar versículo como lido:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// DELETE - Desmarcar versículo como lido
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
    const verse = searchParams.get('verse')

    if (!bookName || !chapter || !verse) {
      return NextResponse.json(
        { error: 'Nome do livro, capítulo e versículo são obrigatórios' },
        { status: 400 },
      )
    }

    // Verificar se o versículo foi marcado pelo usuário
    const readVerse = await prisma.bibleReadVerse.findFirst({
      where: {
        userId,
        bookName,
        chapter: parseInt(chapter),
        verse: parseInt(verse),
      },
    })

    if (!readVerse) {
      return NextResponse.json(
        { error: 'Versículo não encontrado' },
        { status: 404 },
      )
    }

    // Remover o versículo
    await prisma.bibleReadVerse.delete({
      where: { id: readVerse.id },
    })

    // Verificar se deve remover o capítulo automaticamente
    // Quando qualquer versículo é desmarcado, remover o capítulo
    console.log(
      `📊 Versículo desmarcado no capítulo ${bookName} ${chapter} - removendo capítulo automaticamente`,
    )

    const readChapter = await prisma.bibleReadChapter.findFirst({
      where: {
        userId,
        bookName,
        chapter: parseInt(chapter),
      },
    })

    if (readChapter) {
      console.log(`🗑️ Removendo capítulo: ${readChapter.id}`)
      await prisma.bibleReadChapter.delete({
        where: { id: readChapter.id },
      })
      console.log(`✅ Capítulo ${bookName} ${chapter} removido automaticamente`)
    } else {
      console.log(
        `❌ Capítulo ${bookName} ${chapter} não encontrado para remover`,
      )
    }

    return NextResponse.json({ message: 'Versículo desmarcado com sucesso' })
  } catch (error) {
    console.error('Erro ao desmarcar versículo:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
