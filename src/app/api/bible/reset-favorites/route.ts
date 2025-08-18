import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

// POST - Resetar apenas os favoritos do usuário
export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    console.log('🔄 Resetando favoritos para usuário:', userId)

    // Deletar todos os favoritos
    const favoritesResult = await prisma.bibleFavorite.deleteMany({
      where: { userId },
    })

    console.log('✅ Reset de favoritos realizado:', {
      favoritosRemovidos: favoritesResult.count,
    })

    return NextResponse.json({
      message: 'Favoritos resetados com sucesso',
      removed: {
        favorites: favoritesResult.count,
      },
    })
  } catch (error) {
    console.error('Erro ao resetar favoritos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
