import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

// POST - Resetar apenas os versículos e capítulos lidos do usuário
export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request)
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = user.sub
    console.log('🔄 Resetando leitura para usuário:', userId)

    // Deletar todos os versículos lidos
    const versesResult = await prisma.bibleReadVerse.deleteMany({
      where: { userId },
    })

    // Deletar todos os capítulos lidos
    const chaptersResult = await prisma.bibleReadChapter.deleteMany({
      where: { userId },
    })

    console.log('✅ Reset de leitura realizado:', {
      versículosRemovidos: versesResult.count,
      capítulosRemovidos: chaptersResult.count,
    })

    return NextResponse.json({
      message: 'Leitura resetada com sucesso',
      removed: {
        verses: versesResult.count,
        chapters: chaptersResult.count,
      },
    })
  } catch (error) {
    console.error('Erro ao resetar leitura:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
