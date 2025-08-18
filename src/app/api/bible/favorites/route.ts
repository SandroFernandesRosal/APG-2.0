import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

// GET - Listar favoritos do usuário
export async function GET(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    console.log('🔍 Buscando favoritos para usuário:', userId)

    const favorites = await prisma.bibleFavorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    console.log('⭐ Retornando favoritos reais:', favorites.length)
    console.log('⭐ Primeiros 3 favoritos:', favorites.slice(0, 3))
    return NextResponse.json(favorites)
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// POST - Adicionar favorito
export async function POST(request: NextRequest) {
  try {
    console.log('Iniciando POST /api/bible/favorites')

    const user = await authMiddleware(request)
    console.log('User from auth:', user)

    if (!user) {
      console.log('Usuário não autorizado')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    console.log('Body recebido:', body)

    const { bookName, chapter, verse } = body

    if (!bookName || !chapter) {
      return NextResponse.json(
        { error: 'Nome do livro e capítulo são obrigatórios' },
        { status: 400 },
      )
    }

    // Usar user.sub como userId (que é o ID do usuário no JWT)
    const userId = user.sub
    console.log('UserId:', userId)

    // Verificar se já existe
    const existing = await prisma.bibleFavorite.findFirst({
      where: {
        userId,
        bookName,
        chapter,
        verse: verse || null,
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Este favorito já existe' },
        { status: 409 },
      )
    }

    const favorite = await prisma.bibleFavorite.create({
      data: {
        userId,
        bookName,
        chapter,
        verse: verse || null,
      },
    })

    console.log('Favorito criado:', favorite)
    return NextResponse.json(favorite, { status: 201 })
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// DELETE - Remover favorito
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
        { error: 'ID do favorito é obrigatório' },
        { status: 400 },
      )
    }

    // Verificar se o favorito pertence ao usuário
    const favorite = await prisma.bibleFavorite.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!favorite) {
      return NextResponse.json(
        { error: 'Favorito não encontrado' },
        { status: 404 },
      )
    }

    await prisma.bibleFavorite.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Favorito removido com sucesso' })
  } catch (error) {
    console.error('Erro ao remover favorito:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
