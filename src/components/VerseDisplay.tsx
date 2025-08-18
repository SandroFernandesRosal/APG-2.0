'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Circle } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Verse {
  number: number
  text: string
}

interface BibleFavorite {
  id: string
  bookName: string
  chapter: number
  verse?: number
  createdAt: string
}

interface ReadVerse {
  id: string
  userId: string
  bookName: string
  chapter: number
  verse: number
  readAt: string
}

interface VerseDisplayProps {
  verses: Verse[]
  bookName: string
  chapter: number
}

export function VerseDisplay({ verses, bookName, chapter }: VerseDisplayProps) {
  const [fontSize, setFontSize] = useState(16)
  const [showVerseNumbers, setShowVerseNumbers] = useState(true)
  const [favorites, setFavorites] = useState<BibleFavorite[]>([])
  const [readVerses, setReadVerses] = useState<ReadVerse[]>([])
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    {},
  )

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24))
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12))

  // Carregar favoritos da API
  const loadFavorites = async () => {
    try {
      const response = await fetch('/api/bible/favorites')
      if (response.ok) {
        const data = await response.json()
        setFavorites(data)
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error)
      toast.error('Erro ao carregar favoritos')
    }
  }

  // Carregar versículos lidos da API
  const loadReadVerses = async () => {
    try {
      const response = await fetch('/api/bible/read-verses')
      if (response.ok) {
        const data = await response.json()
        console.log('📖 Versículos lidos carregados:', data)
        setReadVerses(data)
      } else {
        console.error('❌ Erro ao carregar versículos lidos:', response.status)
        toast.error('Erro ao carregar versículos lidos')
      }
    } catch (error) {
      console.error('❌ Erro ao carregar versículos lidos:', error)
      toast.error('Erro ao carregar versículos lidos')
    }
  }

  useEffect(() => {
    loadFavorites()
    loadReadVerses()
  }, [])

  // Escutar eventos de atualização de favoritos
  useEffect(() => {
    const handleFavoritesUpdated = () => {
      loadFavorites()
    }

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated)

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated)
    }
  }, [])

  // Escutar eventos de reset de favoritos
  useEffect(() => {
    const handleFavoritesReset = () => {
      loadFavorites()
    }

    window.addEventListener('favoritesReset', handleFavoritesReset)

    return () => {
      window.removeEventListener('favoritesReset', handleFavoritesReset)
    }
  }, [])

  // Escutar eventos de reset de leitura
  useEffect(() => {
    const handleReadingReset = () => {
      loadReadVerses()
    }

    window.addEventListener('readingReset', handleReadingReset)

    return () => {
      window.removeEventListener('readingReset', handleReadingReset)
    }
  }, [])

  const addToFavorites = async (verseNumber: number) => {
    setLoadingStates((prev) => ({ ...prev, [verseNumber]: true }))
    try {
      const response = await fetch('/api/bible/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookName,
          chapter,
          verse: verseNumber,
        }),
      })

      if (response.ok) {
        await loadFavorites() // Recarregar lista

        // Disparar evento customizado para notificar outros componentes
        window.dispatchEvent(new CustomEvent('favoritesUpdated'))

        toast.success('Versículo adicionado aos favoritos!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao adicionar favorito')
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error)
      toast.error('Erro ao adicionar favorito')
    } finally {
      setLoadingStates((prev) => ({ ...prev, [verseNumber]: false }))
    }
  }

  const removeFromFavorites = async (verseNumber: number) => {
    const favorite = favorites.find(
      (fav) =>
        fav.bookName === bookName &&
        fav.chapter === chapter &&
        fav.verse === verseNumber,
    )

    if (!favorite) return

    try {
      const response = await fetch(`/api/bible/favorites?id=${favorite.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await loadFavorites() // Recarregar lista

        // Disparar evento customizado para notificar outros componentes
        window.dispatchEvent(new CustomEvent('favoritesUpdated'))

        toast.success('Versículo removido dos favoritos!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao remover favorito')
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error)
      toast.error('Erro ao remover favorito')
    }
  }

  const isVerseFavorite = (verseNumber: number) => {
    return favorites.some(
      (fav) =>
        fav.bookName === bookName &&
        fav.chapter === chapter &&
        fav.verse === verseNumber,
    )
  }

  // Verificar se um versículo específico foi lido
  const isVerseRead = (verseNumber: number) => {
    return readVerses.some(
      (read) =>
        read.bookName === bookName &&
        read.chapter === chapter &&
        read.verse === verseNumber,
    )
  }

  // Marcar/desmarcar versículo como lido
  const toggleVerseRead = async (verseNumber: number) => {
    console.log('🔄 Toggle versículo:', verseNumber, 'do capítulo:', chapter)
    const isRead = isVerseRead(verseNumber)

    try {
      if (isRead) {
        // Desmarcar como lido
        const response = await fetch(
          `/api/bible/read-verses?bookName=${encodeURIComponent(
            bookName,
          )}&chapter=${chapter}&verse=${verseNumber}`,
          { method: 'DELETE' },
        )

        if (response.ok) {
          await loadReadVerses()

          // Disparar evento customizado para notificar outros componentes
          window.dispatchEvent(new CustomEvent('versesUpdated'))

          toast.success('Versículo desmarcado como lido!')
        } else {
          const error = await response.json()
          toast.error(error.error || 'Erro ao desmarcar versículo')
        }
      } else {
        // Marcar como lido
        const response = await fetch('/api/bible/read-verses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookName,
            chapter,
            verse: verseNumber,
          }),
        })

        if (response.ok) {
          await loadReadVerses()

          // Disparar evento customizado para notificar outros componentes
          window.dispatchEvent(new CustomEvent('versesUpdated'))

          toast.success('Versículo marcado como lido!')
        } else {
          const error = await response.json()
          toast.error(error.error || 'Erro ao marcar versículo como lido')
        }
      }
    } catch (error) {
      console.error('Erro ao alterar status de leitura do versículo:', error)
      toast.error('Erro ao alterar status de leitura do versículo')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg  p-6">
      {/* Controles de Leitura */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseFontSize}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              title="Diminuir fonte"
            >
              A-
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[40px] text-center">
              {fontSize}px
            </span>
            <button
              onClick={increaseFontSize}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              title="Aumentar fonte"
            >
              A+
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={showVerseNumbers}
                onChange={(e) => setShowVerseNumbers(e.target.checked)}
                className="mr-2"
              />
              Números dos versículos
            </label>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {verses.length} versículo{verses.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Título do Capítulo */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-600 pb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {bookName} - Capítulo {chapter}
        </h2>

        <div className="flex gap-2">
          {/* Botão Favoritar Capítulo */}
          <button
            onClick={async () => {
              const allVersesFavorited = verses.every((verse) =>
                isVerseFavorite(verse.number),
              )

              try {
                if (allVersesFavorited) {
                  // Se todos estão favoritados, remover todos de uma vez
                  const response = await fetch(
                    `/api/bible/favorites/bulk?bookName=${encodeURIComponent(bookName)}&chapter=${chapter}`,
                    { method: 'DELETE' },
                  )

                  if (response.ok) {
                    await loadFavorites()
                    window.dispatchEvent(new CustomEvent('favoritesUpdated'))
                    toast.success(
                      'Todos os versículos removidos dos favoritos!',
                    )
                  } else {
                    const error = await response.json()
                    toast.error(error.error || 'Erro ao remover favoritos')
                  }
                } else {
                  // Se não estão todos favoritados, favoritar todos de uma vez
                  const response = await fetch('/api/bible/favorites/bulk', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      bookName,
                      chapter,
                      verses: verses.map((verse) => verse.number),
                    }),
                  })

                  if (response.ok) {
                    await loadFavorites()
                    window.dispatchEvent(new CustomEvent('favoritesUpdated'))
                    toast.success(
                      'Todos os versículos adicionados aos favoritos!',
                    )
                  } else {
                    const error = await response.json()
                    toast.error(error.error || 'Erro ao adicionar favoritos')
                  }
                }
              } catch (error) {
                console.error('Erro ao alterar favoritos em massa:', error)
                toast.error('Erro ao alterar favoritos')
              }
            }}
            className={`px-3 py-2 text-sm rounded-md transition-all duration-200 flex items-center gap-2 ${
              verses.every((verse) => isVerseFavorite(verse.number))
                ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
            }`}
            title={
              verses.every((verse) => isVerseFavorite(verse.number))
                ? 'Remover todos os versículos dos favoritos'
                : 'Favoritar todos os versículos'
            }
          >
            {verses.every((verse) => isVerseFavorite(verse.number)) ? '★' : '☆'}
            <span className="hidden sm:inline">
              {verses.every((verse) => isVerseFavorite(verse.number))
                ? 'Desfavoritar'
                : 'Favoritar'}{' '}
              Capítulo
            </span>
          </button>

          {/* Botão Marcar como Lido */}
          <button
            onClick={async () => {
              const allVersesRead = verses.every((verse) =>
                isVerseRead(verse.number),
              )

              try {
                if (allVersesRead) {
                  // Se todos estão lidos, desmarcar todos de uma vez
                  const response = await fetch(
                    `/api/bible/read-verses/bulk?bookName=${encodeURIComponent(bookName)}&chapter=${chapter}`,
                    { method: 'DELETE' },
                  )

                  if (response.ok) {
                    await loadReadVerses()
                    window.dispatchEvent(new CustomEvent('versesUpdated'))
                    toast.success('Todos os versículos desmarcados como lidos!')
                  } else {
                    const error = await response.json()
                    toast.error(error.error || 'Erro ao desmarcar versículos')
                  }
                } else {
                  // Se não estão todos lidos, marcar todos de uma vez
                  const response = await fetch('/api/bible/read-verses/bulk', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      bookName,
                      chapter,
                      verses: verses.map((verse) => verse.number),
                    }),
                  })

                  if (response.ok) {
                    await loadReadVerses()
                    window.dispatchEvent(new CustomEvent('versesUpdated'))
                    toast.success('Todos os versículos marcados como lidos!')
                  } else {
                    const error = await response.json()
                    toast.error(
                      error.error || 'Erro ao marcar versículos como lidos',
                    )
                  }
                }
              } catch (error) {
                console.error(
                  'Erro ao alterar status de leitura em massa:',
                  error,
                )
                toast.error('Erro ao alterar status de leitura')
              }
            }}
            className={`px-3 py-2 text-sm rounded-md transition-all duration-200 flex items-center gap-2 ${
              verses.every((verse) => isVerseRead(verse.number))
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-sm'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
            }`}
            title={
              verses.every((verse) => isVerseRead(verse.number))
                ? 'Desmarcar todos os versículos como lidos'
                : 'Marcar todos os versículos como lidos'
            }
          >
            {verses.every((verse) => isVerseRead(verse.number)) ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {verses.every((verse) => isVerseRead(verse.number))
                ? 'Desmarcar'
                : 'Marcar'}{' '}
              como Lido
            </span>
          </button>
        </div>
      </div>

      {/* Versículos */}
      <div
        className="space-y-4 leading-relaxed"
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        {verses.map((verse) => (
          <div
            key={verse.number}
            id={`verse-${verse.number}`}
            className={`flex gap-4 p-4 rounded-lg transition-colors ${
              isVerseFavorite(verse.number)
                ? 'bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500'
                : isVerseRead(verse.number)
                  ? 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {showVerseNumbers && (
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 min-w-[40px] flex-shrink-0">
                {verse.number}
              </span>
            )}
            <div className="flex-1 flex justify-between items-start gap-4">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed flex-1">
                {verse.text}
              </p>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() =>
                    isVerseFavorite(verse.number)
                      ? removeFromFavorites(verse.number)
                      : addToFavorites(verse.number)
                  }
                  disabled={loadingStates[verse.number]}
                  className={`px-2 py-1 text-xs rounded transition-all duration-200 ${
                    isVerseFavorite(verse.number)
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={
                    isVerseFavorite(verse.number)
                      ? 'Remover dos favoritos'
                      : 'Adicionar aos favoritos'
                  }
                >
                  {loadingStates[verse.number]
                    ? '...'
                    : isVerseFavorite(verse.number)
                      ? '★'
                      : '☆'}
                </button>
                <button
                  onClick={() => toggleVerseRead(verse.number)}
                  className={`px-2 py-1 text-xs rounded transition-all duration-200 ${
                    isVerseRead(verse.number)
                      ? 'bg-green-500 text-white hover:bg-green-600 shadow-sm'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                  }`}
                  title={
                    isVerseRead(verse.number)
                      ? 'Versículo já lido'
                      : 'Marcar como lido'
                  }
                >
                  {isVerseRead(verse.number) ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Circle className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Informações do Capítulo */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Bíblia Sagrada - Nova Versão Internacional (NVI)</p>
          <p className="mt-1">
            {bookName} {chapter}:1-{verses.length}
          </p>
        </div>
      </div>
    </div>
  )
}
