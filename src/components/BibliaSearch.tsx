'use client'

import { useState } from 'react'

interface Book {
  abbrev: string
  name: string
  chapters: number
}

interface BibliaSearchProps {
  books: Book[]
  onSearch: (book: string, chapter: number, verse?: number) => void
  selectedBook?: string // Adicionar prop para o livro selecionado
}

export function BibliaSearch({
  books,
  onSearch,
  selectedBook: currentSelectedBook,
}: BibliaSearchProps) {
  const [searchType, setSearchType] = useState<'chapter' | 'verse'>('chapter')
  const [selectedBook, setSelectedBook] = useState('')
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [selectedVerse, setSelectedVerse] = useState(1)
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = () => {
    if (searchType === 'chapter') {
      onSearch(selectedBook, selectedChapter)
    } else {
      onSearch(selectedBook, selectedChapter, selectedVerse)
    }
    setShowSearch(false)
  }

  const selectedBookData = books.find((b) => b.abbrev === selectedBook)
  const chapters = selectedBookData
    ? Array.from({ length: selectedBookData.chapters }, (_, i) => i + 1)
    : []

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Busca Rápida
        </h3>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {showSearch ? 'Ocultar' : 'Buscar'}
        </button>
      </div>

      {showSearch && (
        <div className="space-y-4">
          {/* Tipo de Busca */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Busca
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="chapter"
                  checked={searchType === 'chapter'}
                  onChange={(e) =>
                    setSearchType(e.target.value as 'chapter' | 'verse')
                  }
                  className="mr-2"
                />
                Capítulo
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="verse"
                  checked={searchType === 'verse'}
                  onChange={(e) =>
                    setSearchType(e.target.value as 'chapter' | 'verse')
                  }
                  className="mr-2"
                />
                Versículo Específico
              </label>
            </div>
          </div>

          {/* Seleção de Livro */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Livro
            </label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
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
              onChange={(e) => setSelectedChapter(Number(e.target.value))}
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

          {/* Seleção de Versículo (apenas se tipo for 'verse') */}
          {searchType === 'verse' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Versículo
              </label>
              <input
                type="number"
                min="1"
                value={selectedVerse}
                onChange={(e) => setSelectedVerse(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Número do versículo"
              />
            </div>
          )}

          {/* Botão de Busca */}
          <button
            onClick={handleSearch}
            disabled={!selectedBook}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {searchType === 'chapter' ? 'Ir para Capítulo' : 'Buscar Versículo'}
          </button>
        </div>
      )}

      {/* Busca Rápida por Livros Populares */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Livros Populares
        </h4>
        <div className="flex flex-wrap gap-2">
          {['gn', 'sl', 'mt', 'jo', 'rm', '1co', 'gl', 'ef', 'fp', 'ap'].map(
            (abbrev) => {
              const book = books.find((b) => b.abbrev === abbrev)
              const isSelected = currentSelectedBook === abbrev
              return book ? (
                <button
                  key={abbrev}
                  onClick={() => onSearch(abbrev, 1)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    isSelected
                      ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {book.name}
                </button>
              ) : null
            },
          )}
        </div>
      </div>
    </div>
  )
}
