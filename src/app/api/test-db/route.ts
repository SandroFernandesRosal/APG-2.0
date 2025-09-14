import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('Testando conexão com banco de dados...')

    // Testar conexão simples
    await prisma.$connect()
    console.log('Conexão com banco estabelecida')

    // Testar query simples
    const count = await prisma.new.count()
    console.log('Total de notícias no banco:', count)

    // Testar se a tabela New tem a estrutura correta
    let sampleNews = null
    try {
      sampleNews = await prisma.new.findFirst({
        select: {
          id: true,
          title: true,
          coverUrl: true,
          videoUrl: true,
          content: true,
          igrejaId: true,
        },
      })
      console.log('Estrutura da tabela New:', sampleNews)
    } catch (error) {
      console.error('Erro ao consultar estrutura da tabela:', error)
    }

    return NextResponse.json({
      success: true,
      message: 'Conexão com banco funcionando',
      newsCount: count,
      sampleNews,
    })
  } catch (error) {
    console.error('Erro ao conectar com banco:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao conectar com banco',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
