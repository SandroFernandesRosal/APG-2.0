'use client'

import { useState, useEffect } from 'react'
import { BookOpen } from 'lucide-react'
import { BibliaNavigation } from '@/components/BibliaNavigation'
import { VerseDisplay } from '@/components/VerseDisplay'
import { BibliaSearch } from '@/components/BibliaSearch'
import { BibliaFavorites } from '@/components/BibliaFavorites'
import { BibliaReadingPlan } from '@/components/BibliaReadingPlan'

interface Book {
  abbrev: string
  name: string
  chapters: number
}

interface Verse {
  number: number
  text: string
}

// Lista fixa de livros da Bíblia em português
const PORTUGUESE_BIBLE_BOOKS: Book[] = [
  { abbrev: 'gn', name: 'Gênesis', chapters: 50 },
  { abbrev: 'ex', name: 'Êxodo', chapters: 40 },
  { abbrev: 'lv', name: 'Levítico', chapters: 27 },
  { abbrev: 'nm', name: 'Números', chapters: 36 },
  { abbrev: 'dt', name: 'Deuteronômio', chapters: 34 },
  { abbrev: 'js', name: 'Josué', chapters: 24 },
  { abbrev: 'jz', name: 'Juízes', chapters: 21 },
  { abbrev: 'rt', name: 'Rute', chapters: 4 },
  { abbrev: '1sm', name: '1 Samuel', chapters: 31 },
  { abbrev: '2sm', name: '2 Samuel', chapters: 24 },
  { abbrev: '1rs', name: '1 Reis', chapters: 22 },
  { abbrev: '2rs', name: '2 Reis', chapters: 25 },
  { abbrev: '1cr', name: '1 Crônicas', chapters: 29 },
  { abbrev: '2cr', name: '2 Crônicas', chapters: 36 },
  { abbrev: 'ed', name: 'Esdras', chapters: 10 },
  { abbrev: 'ne', name: 'Neemias', chapters: 13 },
  { abbrev: 'et', name: 'Ester', chapters: 10 },
  { abbrev: 'jó', name: 'Jó', chapters: 42 },
  { abbrev: 'sl', name: 'Salmos', chapters: 150 },
  { abbrev: 'pv', name: 'Provérbios', chapters: 31 },
  { abbrev: 'ec', name: 'Eclesiastes', chapters: 12 },
  { abbrev: 'ct', name: 'Cânticos', chapters: 8 },
  { abbrev: 'is', name: 'Isaías', chapters: 66 },
  { abbrev: 'jr', name: 'Jeremias', chapters: 52 },
  { abbrev: 'lm', name: 'Lamentações', chapters: 5 },
  { abbrev: 'ez', name: 'Ezequiel', chapters: 48 },
  { abbrev: 'dn', name: 'Daniel', chapters: 12 },
  { abbrev: 'os', name: 'Oséias', chapters: 14 },
  { abbrev: 'jl', name: 'Joel', chapters: 3 },
  { abbrev: 'am', name: 'Amós', chapters: 9 },
  { abbrev: 'ob', name: 'Obadias', chapters: 1 },
  { abbrev: 'jn', name: 'Jonas', chapters: 4 },
  { abbrev: 'mq', name: 'Miquéias', chapters: 7 },
  { abbrev: 'na', name: 'Naum', chapters: 3 },
  { abbrev: 'hc', name: 'Habacuque', chapters: 3 },
  { abbrev: 'sf', name: 'Sofonias', chapters: 3 },
  { abbrev: 'ag', name: 'Ageu', chapters: 2 },
  { abbrev: 'zc', name: 'Zacarias', chapters: 14 },
  { abbrev: 'ml', name: 'Malaquias', chapters: 4 },
  { abbrev: 'mt', name: 'Mateus', chapters: 28 },
  { abbrev: 'mc', name: 'Marcos', chapters: 16 },
  { abbrev: 'lc', name: 'Lucas', chapters: 24 },
  { abbrev: 'jo', name: 'João', chapters: 21 },
  { abbrev: 'at', name: 'Atos', chapters: 28 },
  { abbrev: 'rm', name: 'Romanos', chapters: 16 },
  { abbrev: '1co', name: '1 Coríntios', chapters: 16 },
  { abbrev: '2co', name: '2 Coríntios', chapters: 13 },
  { abbrev: 'gl', name: 'Gálatas', chapters: 6 },
  { abbrev: 'ef', name: 'Efésios', chapters: 6 },
  { abbrev: 'fp', name: 'Filipenses', chapters: 4 },
  { abbrev: 'cl', name: 'Colossenses', chapters: 4 },
  { abbrev: '1ts', name: '1 Tessalonicenses', chapters: 5 },
  { abbrev: '2ts', name: '2 Tessalonicenses', chapters: 3 },
  { abbrev: '1tm', name: '1 Timóteo', chapters: 6 },
  { abbrev: '2tm', name: '2 Timóteo', chapters: 4 },
  { abbrev: 'tt', name: 'Tito', chapters: 3 },
  { abbrev: 'fm', name: 'Filemom', chapters: 1 },
  { abbrev: 'hb', name: 'Hebreus', chapters: 13 },
  { abbrev: 'tg', name: 'Tiago', chapters: 5 },
  { abbrev: '1pe', name: '1 Pedro', chapters: 5 },
  { abbrev: '2pe', name: '2 Pedro', chapters: 3 },
  { abbrev: '1jo', name: '1 João', chapters: 5 },
  { abbrev: '2jo', name: '2 João', chapters: 1 },
  { abbrev: '3jo', name: '3 João', chapters: 1 },
  { abbrev: 'jd', name: 'Judas', chapters: 1 },
  { abbrev: 'ap', name: 'Apocalipse', chapters: 22 },
]

export default function BibliaPage() {
  const [books] = useState<Book[]>(PORTUGUESE_BIBLE_BOOKS)
  const [selectedBook, setSelectedBook] = useState<string>('gn') // Começar com Gênesis
  const [selectedChapter, setSelectedChapter] = useState<number>(1) // Começar com capítulo 1
  const [chapters, setChapters] = useState<number[]>(
    Array.from({ length: 50 }, (_, i) => i + 1),
  ) // Capítulos de Gênesis
  const [verses, setVerses] = useState<Verse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  // Atualizar capítulos quando um livro for selecionado
  useEffect(() => {
    if (selectedBook) {
      const book = books.find((b) => b.abbrev === selectedBook)
      if (book) {
        const chapterArray = Array.from(
          { length: book.chapters },
          (_, i) => i + 1,
        )
        setChapters(chapterArray)
        setSelectedChapter(1)
      }
    }
  }, [selectedBook, books])

  // Carregar versículos quando livro e capítulo forem selecionados
  useEffect(() => {
    if (selectedBook && selectedChapter) {
      fetchVerses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBook, selectedChapter])

  const fetchVerses = async () => {
    try {
      setLoading(true)
      setError('')

      // Buscar o nome do livro em português
      const bookName = books.find((b) => b.abbrev === selectedBook)?.name
      if (!bookName) {
        throw new Error('Livro não encontrado')
      }

      console.log(`Buscando: ${bookName} ${selectedChapter}`)

      // Buscar versículos usando nossa API route (como no repositório Biblia-Digital)
      const response = await fetch(
        `/api/bible?livro=${encodeURIComponent(bookName)}&capitulo=${selectedChapter}`,
      )

      if (!response.ok) {
        throw new Error('Erro ao carregar os versículos')
      }

      const verses = await response.json()
      console.log('Verses Response:', verses)

      setVerses(verses)
    } catch (err) {
      console.error('Erro na API de versículos:', err)
      setError('Erro ao carregar os versículos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleBookChange = (bookAbbrev: string) => {
    setSelectedBook(bookAbbrev)
  }

  const handleChapterChange = (chapter: number) => {
    setSelectedChapter(chapter)
  }

  const handleSearch = (book: string, chapter: number, verse?: number) => {
    setSelectedBook(book)
    setSelectedChapter(chapter)
    // Se um versículo específico foi solicitado, podemos implementar scroll para ele
    if (verse) {
      // Implementar scroll para versículo específico
      setTimeout(() => {
        const verseElement = document.getElementById(`verse-${verse}`)
        if (verseElement) {
          verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          verseElement.classList.add('bg-yellow-100', 'dark:bg-yellow-900')
          setTimeout(() => {
            verseElement.classList.remove('bg-yellow-100', 'dark:bg-yellow-900')
          }, 3000)
        }
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 mt-[110px]">
        <div className="max-w-6xl mx-auto">
          {/* Título da Página */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Minha Bíblia Digital
            </h1>
          </div>

          {/* 1. Favoritos da Bíblia */}
          <BibliaFavorites />

          {/* 2. Plano de Leitura */}
          <BibliaReadingPlan />

          {/* 3. Filtros - Seleção de Livro e Capítulo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Seleção de Livro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Livro
              </label>
              <select
                value={selectedBook}
                onChange={(e) => handleBookChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Selecione um livro</option>
                {books.map((book) => (
                  <option key={book.abbrev} value={book.abbrev}>
                    {book.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Seleção de Capítulo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Capítulo
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => handleChapterChange(Number(e.target.value))}
                disabled={!selectedBook}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                {chapters.map((chapter) => (
                  <option key={chapter} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Busca Rápida */}
          <BibliaSearch
            books={books}
            onSearch={handleSearch}
            selectedBook={selectedBook}
          />

          {/* 5. Navegação da Bíblia */}
          {selectedBook && (
            <BibliaNavigation
              books={books}
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              onBookChange={handleBookChange}
              onChapterChange={handleChapterChange}
            />
          )}

          {/* 6. Conteúdo da Bíblia */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Carregando...
                </p>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {!loading && !error && selectedBook && verses.length > 0 && (
              <VerseDisplay
                verses={verses}
                bookName={
                  books.find((b) => b.abbrev === selectedBook)?.name || ''
                }
                chapter={selectedChapter}
              />
            )}

            {!loading && !error && !selectedBook && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Selecione um livro e capítulo para começar a leitura
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
