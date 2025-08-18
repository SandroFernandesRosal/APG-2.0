'use client'

import { useState } from 'react'

interface Book {
  abbrev: string
  name: string
  chapters: number
}

interface BibliaNavigationProps {
  books: Book[]
  selectedBook: string
  selectedChapter: number
  onBookChange: (book: string) => void
  onChapterChange: (chapter: number) => void
}

export function BibliaNavigation({
  books,
  selectedBook,
  selectedChapter,
  onBookChange,
  onChapterChange,
}: BibliaNavigationProps) {
  const [showBookDropdown, setShowBookDropdown] = useState(false)

  const currentBookIndex = books.findIndex((b) => b.abbrev === selectedBook)
  const currentBook = books[currentBookIndex]

  const goToPreviousChapter = () => {
    if (selectedChapter > 1) {
      onChapterChange(selectedChapter - 1)
    } else if (currentBookIndex > 0) {
      const previousBook = books[currentBookIndex - 1]
      onBookChange(previousBook.abbrev)
      onChapterChange(previousBook.chapters)
    }
  }

  const goToNextChapter = () => {
    if (currentBook && selectedChapter < currentBook.chapters) {
      onChapterChange(selectedChapter + 1)
    } else if (currentBookIndex < books.length - 1) {
      const nextBook = books[currentBookIndex + 1]
      onBookChange(nextBook.abbrev)
      onChapterChange(1)
    }
  }

  const canGoPrevious = selectedChapter > 1 || currentBookIndex > 0
  const canGoNext = currentBook
    ? selectedChapter < currentBook.chapters ||
      currentBookIndex < books.length - 1
    : false

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Navegação Anterior/Próximo */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousChapter}
            disabled={!canGoPrevious}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Anterior
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-400">
            {currentBook
              ? `${currentBook.name} ${selectedChapter}`
              : 'Selecione um livro'}
          </span>

          <button
            onClick={goToNextChapter}
            disabled={!canGoNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Próximo →
          </button>
        </div>

        {/* Navegação Rápida */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowBookDropdown(!showBookDropdown)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Navegação Rápida
            </button>

            {showBookDropdown && (
              <div className="absolute top-full left-0 mt-1 w-64 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Buscar livro..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white"
                    autoFocus
                  />
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {books.map((book) => (
                    <button
                      key={book.abbrev}
                      onClick={() => {
                        onBookChange(book.abbrev)
                        setShowBookDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                    >
                      {book.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Indicador de Progresso */}
      {currentBook && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>
              Capítulo {selectedChapter} de {currentBook.chapters}
            </span>
            <span>
              {Math.round((selectedChapter / currentBook.chapters) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(selectedChapter / currentBook.chapters) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}
