import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

// POST - Marcar todos os versículos de um capítulo como favoritos
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

    // Verificar quais versículos já estão favoritados
    const existingFavorites = await prisma.bibleFavorite.findMany({
      where: {
        userId,
        bookName,
        chapter,
        verse: { in: verses },
      },
    })

    const existingVerseNumbers = existingFavorites.map((fav) => fav.verse)

    // Criar favoritos apenas para versículos que não estão favoritados
    const versesToAdd = verses.filter(
      (verse) => !existingVerseNumbers.includes(verse),
    )

    if (versesToAdd.length > 0) {
      await prisma.bibleFavorite.createMany({
        data: versesToAdd.map((verse) => ({
          userId,
          bookName,
          chapter,
          verse,
        })),
      })
    }

    return NextResponse.json(
      {
        message: `${versesToAdd.length} versículos adicionados aos favoritos`,
        added: versesToAdd.length,
        alreadyFavorited: existingVerseNumbers.length,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao adicionar favoritos em massa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// DELETE - Remover todos os versículos de um capítulo dos favoritos
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

    // Remover todos os favoritos do capítulo
    const result = await prisma.bibleFavorite.deleteMany({
      where: {
        userId,
        bookName,
        chapter: parseInt(chapter),
      },
    })

    return NextResponse.json({
      message: `${result.count} versículos removidos dos favoritos`,
      removed: result.count,
    })
  } catch (error) {
    console.error('Erro ao remover favoritos em massa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
