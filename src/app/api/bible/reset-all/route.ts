import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

// POST - Resetar favoritos e versículos/capítulos lidos (mantém o plano de leitura)
export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    console.log('🔄 Resetando favoritos e leitura para usuário:', userId)

    // Deletar todos os favoritos
    const favoritesResult = await prisma.bibleFavorite.deleteMany({
      where: { userId },
    })

    // Deletar todos os versículos lidos
    const versesResult = await prisma.bibleReadVerse.deleteMany({
      where: { userId },
    })

    // Deletar todos os capítulos lidos
    const chaptersResult = await prisma.bibleReadChapter.deleteMany({
      where: { userId },
    })

    // NÃO deletar o plano de leitura - mantém ele

    console.log('✅ Reset de favoritos e leitura realizado:', {
      favoritosRemovidos: favoritesResult.count,
      versículosRemovidos: versesResult.count,
      capítulosRemovidos: chaptersResult.count,
      planoMantido: true,
    })

    return NextResponse.json({
      message: 'Favoritos e leitura resetados com sucesso (plano mantido)',
      removed: {
        favorites: favoritesResult.count,
        verses: versesResult.count,
        chapters: chaptersResult.count,
        planKept: true,
      },
    })
  } catch (error) {
    console.error('Erro ao resetar dados:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
