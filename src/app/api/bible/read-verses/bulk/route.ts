import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

// POST - Marcar todos os versículos de um capítulo como lidos
export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    const body = await request.json()
    const { bookName, chapter, verses } = body

    if (!bookName || !chapter || !verses || !Array.isArray(verses)) {
      return NextResponse.json(
        {
          error:
            'Nome do livro, capítulo e array de versículos são obrigatórios',
        },
        { status: 400 },
      )
    }

    // Verificar quais versículos já estão marcados como lidos
    const existingReadVerses = await prisma.bibleReadVerse.findMany({
      where: {
        userId,
        bookName,
        chapter,
        verse: { in: verses },
      },
    })

    const existingVerseNumbers = existingReadVerses.map((read) => read.verse)

    // Marcar como lidos apenas versículos que não estão marcados
    const versesToAdd = verses.filter(
      (verse) => !existingVerseNumbers.includes(verse),
    )

    if (versesToAdd.length > 0) {
      await prisma.bibleReadVerse.createMany({
        data: versesToAdd.map((verse) => ({
          userId,
          bookName,
          chapter,
          verse,
        })),
      })
    }

    // Verificar se deve marcar o capítulo automaticamente
    const totalReadVerses = await prisma.bibleReadVerse.count({
      where: {
        userId,
        bookName,
        chapter,
      },
    })

    const existingChapter = await prisma.bibleReadChapter.findFirst({
      where: {
        userId,
        bookName,
        chapter,
      },
    })

    // Se não está marcado, verificar se todos os versículos foram lidos
    if (!existingChapter) {
      try {
        const bibleResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/bible?livro=${encodeURIComponent(bookName)}&capitulo=${chapter}`,
        )

        if (bibleResponse.ok) {
          const allVerses = await bibleResponse.json()
          const totalVersesInChapter = allVerses.length

          // Se todos os versículos foram lidos, marcar o capítulo
          if (totalReadVerses >= totalVersesInChapter) {
            await prisma.bibleReadChapter.create({
              data: {
                userId,
                bookName,
                chapter,
              },
            })
          }
        }
      } catch (error) {
        console.error('Erro ao verificar total de versículos:', error)
      }
    }

    return NextResponse.json(
      {
        message: `${versesToAdd.length} versículos marcados como lidos`,
        added: versesToAdd.length,
        alreadyRead: existingVerseNumbers.length,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao marcar versículos como lidos em massa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// DELETE - Desmarcar todos os versículos de um capítulo como lidos
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

    // Remover todos os versículos lidos do capítulo
    const result = await prisma.bibleReadVerse.deleteMany({
      where: {
        userId,
        bookName,
        chapter: parseInt(chapter),
      },
    })

    // Remover o capítulo também (já que não há versículos lidos)
    await prisma.bibleReadChapter.deleteMany({
      where: {
        userId,
        bookName,
        chapter: parseInt(chapter),
      },
    })

    return NextResponse.json({
      message: `${result.count} versículos desmarcados como lidos`,
      removed: result.count,
    })
  } catch (error) {
    console.error('Erro ao desmarcar versículos como lidos em massa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
