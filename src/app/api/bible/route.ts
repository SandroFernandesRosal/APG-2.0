import { NextResponse } from 'next/server'

// Cache simples em memória (em produção, use Redis ou similar)
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutos (aumentado de 5 para 10)
const RATE_LIMIT_WINDOW = 1000 // 1 segundo
const MAX_REQUESTS_PER_WINDOW = 50 // máximo 50 requisições por segundo (aumentado de 10 para 50)

// Rate limiting simples
const requestCounts = new Map<string, { count: number; resetTime: number }>()

// Mapeamento de livros em português para inglês
const LIVRO_MAPA: Record<string, string> = {
  Gênesis: 'genesis',
  Êxodo: 'exodus',
  Levítico: 'leviticus',
  Números: 'numbers',
  Deuteronômio: 'deuteronomy',
  Josué: 'joshua',
  Juízes: 'judges',
  Rute: 'ruth',
  '1 Samuel': '1 samuel',
  '2 Samuel': '2 samuel',
  '1 Reis': '1 kings',
  '2 Reis': '2 kings',
  '1 Crônicas': '1 chronicles',
  '2 Crônicas': '2 chronicles',
  Esdras: 'ezra',
  Neemias: 'nehemiah',
  Ester: 'esther',
  Jó: 'job',
  Salmos: 'psalms',
  Provérbios: 'proverbs',
  Eclesiastes: 'ecclesiastes',
  Cânticos: 'song of solomon',
  Isaías: 'isaiah',
  Jeremias: 'jeremiah',
  Lamentações: 'lamentations',
  Ezequiel: 'ezekiel',
  Daniel: 'daniel',
  Oséias: 'hosea',
  Joel: 'joel',
  Amós: 'amos',
  Obadias: 'obadiah',
  Jonas: 'jonah',
  Miquéias: 'micah',
  Naum: 'nahum',
  Habacuque: 'habakkuk',
  Sofonias: 'zephaniah',
  Ageu: 'haggai',
  Zacarias: 'zechariah',
  Malaquias: 'malachi',
  Mateus: 'matthew',
  Marcos: 'mark',
  Lucas: 'luke',
  João: 'john',
  Atos: 'acts',
  Romanos: 'romans',
  '1 Coríntios': '1 corinthians',
  '2 Coríntios': '2 corinthians',
  Gálatas: 'galatians',
  Efésios: 'ephesians',
  Filipenses: 'philippians',
  Colossenses: 'colossians',
  '1 Tessalonicenses': '1 thessalonians',
  '2 Tessalonicenses': '2 thessalonians',
  '1 Timóteo': '1 timothy',
  '2 Timóteo': '2 timothy',
  Tito: 'titus',
  Filemom: 'philemon',
  Hebreus: 'hebrews',
  Tiago: 'james',
  '1 Pedro': '1 peter',
  '2 Pedro': '2 peter',
  '1 João': '1 john',
  '2 João': '2 john',
  '3 João': '3 john',
  Judas: 'jude',
  Apocalipse: 'revelation',
}

interface BibleVerse {
  verse: number
  text: string
}

interface BibleApiResponse {
  verses: BibleVerse[]
}

function checkRateLimit(clientId: string): boolean {
  const now = Date.now()
  const clientData = requestCounts.get(clientId)

  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(clientId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return true
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }

  clientData.count++
  return true
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const livro = searchParams.get('livro')
    const capitulo = searchParams.get('capitulo')

    if (!livro || !capitulo) {
      return NextResponse.json(
        { erro: "Parâmetros 'livro' e 'capitulo' obrigatórios." },
        { status: 400 },
      )
    }

    // Verificar cache PRIMEIRO (antes do rate limiting)
    const cacheKey = `${livro}-${capitulo}`
    const cachedData = cache.get(cacheKey)
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data)
    }

    // Rate limiting mais permissivo (usando uma chave global para desenvolvimento)
    const clientId = 'development' // Em produção, use IP real
    if (!checkRateLimit(clientId)) {
      console.log('Rate limit atingido, mas retornando cache se disponível')
      // Em vez de retornar erro 429, tentar usar cache
      if (cachedData) {
        return NextResponse.json(cachedData.data)
      }
      return NextResponse.json(
        { erro: 'Muitas requisições. Tente novamente em alguns segundos.' },
        { status: 429 },
      )
    }

    const livroIngles = LIVRO_MAPA[livro]
    if (!livroIngles) {
      return NextResponse.json(
        { erro: `Livro '${livro}' não reconhecido.` },
        { status: 404 },
      )
    }

    // Buscar da bible-api.com (funciona garantidamente)
    const url = `https://bible-api.com/${livroIngles}+${capitulo}`
    const response = await fetch(url)

    if (!response.ok) {
      return NextResponse.json(
        { erro: 'Erro ao buscar versículos.' },
        { status: response.status },
      )
    }

    const data = (await response.json()) as BibleApiResponse

    // Traduzir automaticamente para português
    const verses = await Promise.all(
      data.verses.map(async (verse: BibleVerse) => {
        try {
          // Traduzir usando Google Translate API (gratuita)
          const translateResponse = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(verse.text)}`,
          )

          if (translateResponse.ok) {
            const translateData = await translateResponse.json()
            const translatedText = translateData[0][0][0]
            return {
              number: verse.verse,
              text: translatedText,
            }
          } else {
            // Se falhar a tradução, retorna o texto original
            return {
              number: verse.verse,
              text: verse.text,
            }
          }
        } catch {
          // Se falhar a tradução, retorna o texto original
          return {
            number: verse.verse,
            text: verse.text,
          }
        }
      }),
    )

    // Salvar no cache
    cache.set(cacheKey, { data: verses, timestamp: Date.now() })

    return NextResponse.json(verses)
  } catch (e: unknown) {
    console.error(
      'Erro ao consultar API externa:',
      e instanceof Error ? e.message : e,
    )
    return NextResponse.json(
      { erro: 'Erro ao consultar API externa.' },
      { status: 500 },
    )
  }
}
