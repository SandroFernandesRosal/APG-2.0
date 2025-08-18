'use client'

import { useState, useEffect } from 'react'
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'react-toastify'
import { ConfirmModal } from './ConfirmModal'

interface BibleFavorite {
  id: string
  bookName: string
  chapter: number
  verse?: number
  createdAt: string
}

interface FavoriteWithText extends BibleFavorite {
  text?: string
}

interface Verse {
  number: number
  text: string
}

export function BibliaFavorites() {
  const [favorites, setFavorites] = useState<FavoriteWithText[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5) // 5 favoritos por página

  // Calcular dados de paginação
  const totalPages = Math.ceil(favorites.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentFavorites = favorites.slice(startIndex, endIndex)

  // Resetar para primeira página quando favoritos mudam ou itemsPerPage muda
  useEffect(() => {
    setCurrentPage(1)
  }, [favorites.length, itemsPerPage])

  // Funções de navegação
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const goToPreviousPage = () => {
    goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    goToPage(currentPage + 1)
  }

  // Carregar favoritos da API
  const loadFavorites = async () => {
    try {
      const response = await fetch('/api/bible/favorites')
      if (response.ok) {
        const data = await response.json()

        // Buscar o texto de cada versículo favoritado
        const favoritesWithText = await Promise.all(
          data.map(async (favorite: BibleFavorite) => {
            try {
              const verseResponse = await fetch(
                `/api/bible?livro=${encodeURIComponent(
                  favorite.bookName,
                )}&capitulo=${favorite.chapter}`,
              )

              if (verseResponse.ok) {
                const verses: Verse[] = await verseResponse.json()
                const verse = verses.find(
                  (v: Verse) => v.number === favorite.verse,
                )
                return {
                  ...favorite,
                  text: verse?.text || 'Texto não encontrado',
                }
              }
              return favorite
            } catch (error) {
              console.error('Erro ao buscar texto do versículo:', error)
              return favorite
            }
          }),
        )

        setFavorites(favoritesWithText)
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error)
      toast.error('Erro ao carregar favoritos')
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  // Recarregar favoritos a cada 60 segundos para manter sincronizado
  useEffect(() => {
    const interval = setInterval(() => {
      loadFavorites()
    }, 60000)

    return () => clearInterval(interval)
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

  // Escutar eventos de reset de favoritos para atualizar versículos
  useEffect(() => {
    const handleFavoritesReset = () => {
      loadFavorites()
      // Disparar evento para atualizar versículos
      window.dispatchEvent(new CustomEvent('favoritesUpdated'))
    }

    window.addEventListener('favoritesReset', handleFavoritesReset)

    return () => {
      window.removeEventListener('favoritesReset', handleFavoritesReset)
    }
  }, [])

  const removeFromFavorites = async (id: string) => {
    try {
      const response = await fetch(`/api/bible/favorites?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await loadFavorites() // Recarregar lista

        // Disparar evento customizado para notificar outros componentes
        window.dispatchEvent(new CustomEvent('favoritesUpdated'))

        toast.success('Favorito removido com sucesso!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao remover favorito')
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error)
      toast.error('Erro ao remover favorito')
    }
  }

  const handleResetFavorites = async () => {
    try {
      const response = await fetch('/api/bible/reset-favorites', {
        method: 'POST',
      })

      if (response.ok) {
        const result = await response.json()
        toast.success(
          `Favoritos resetados com sucesso! ${result.removed.favorites} favoritos removidos.`,
        )

        // Recarregar favoritos
        await loadFavorites()

        // Disparar evento para notificar outros componentes
        window.dispatchEvent(new CustomEvent('favoritesUpdated'))

        // Disparar evento específico de reset para atualizar versículos
        window.dispatchEvent(new CustomEvent('favoritesReset'))
      } else {
        const error = await response.json()
        toast.error('Erro ao resetar favoritos: ' + error.error)
      }
    } catch (error) {
      console.error('Erro ao resetar favoritos:', error)
      toast.error('Erro ao resetar favoritos')
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              Favoritos
            </h3>
            {showFavorites && favorites.length > 0 && (
              <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                {startIndex + 1}-{Math.min(endIndex, favorites.length)} de{' '}
                {favorites.length}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Star className="w-4 h-4" />
              {showFavorites ? 'Ocultar' : `Ver (${favorites.length})`}
            </button>

            {/* Botão de Reset de Favoritos */}
            {favorites.length > 0 && (
              <button
                onClick={() => setShowResetModal(true)}
                className="px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                title="Resetar todos os favoritos"
              >
                🗑️ Reset Favoritos
              </button>
            )}
          </div>
        </div>

        {showFavorites && (
          <div className="space-y-4">
            {currentFavorites.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                  Nenhum versículo favorito ainda
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                  Selecione um versículo e clique em &ldquo;Favoritar&rdquo;
                  para adicionar
                </p>
              </div>
            ) : (
              currentFavorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="group relative p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl border-l-4 border-yellow-500 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 px-2 py-1 rounded-md shadow-sm">
                        {favorite.bookName} {favorite.chapter}
                        {favorite.verse && `:${favorite.verse}`}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromFavorites(favorite.id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 flex items-center gap-1 shadow-sm hover:shadow-md"
                      title="Remover dos favoritos"
                    >
                      <Star className="w-3 h-3" />
                      <span>Desfavoritar</span>
                    </button>
                  </div>

                  {/* Texto do versículo */}
                  {favorite.text && (
                    <div className="text-sm text-gray-800 dark:text-gray-200 mb-3 leading-relaxed italic">
                      &ldquo;{favorite.text}&rdquo;
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Adicionado em{' '}
                      {new Date(favorite.createdAt).toLocaleDateString(
                        'pt-BR',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        },
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      Favorito
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Controles de Paginação */}
            {favorites.length > 0 && (
              <div className="flex flex-col items-center gap-3 mt-6">
                {/* Informação e controles */}
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>
                    Página {currentPage} de {totalPages} • {favorites.length}{' '}
                    favoritos no total
                  </span>

                  {/* Seletor de itens por página */}
                  <div className="flex items-center gap-2">
                    <span>Mostrar:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value={3}>3 por página</option>
                      <option value={5}>5 por página</option>
                      <option value={10}>10 por página</option>
                      <option value={15}>15 por página</option>
                    </select>
                  </div>
                </div>

                {/* Controles de navegação */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Anterior
                    </button>

                    {/* Botões de páginas */}
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNumber
                          if (totalPages <= 5) {
                            pageNumber = i + 1
                          } else if (currentPage <= 3) {
                            pageNumber = i + 1
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i
                          } else {
                            pageNumber = currentPage - 2 + i
                          }

                          return (
                            <button
                              key={pageNumber}
                              onClick={() => goToPage(pageNumber)}
                              className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                                currentPage === pageNumber
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          )
                        },
                      )}
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      Próxima
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleResetFavorites}
        title="Resetar Favoritos"
        message={`⚠️ ATENÇÃO: Esta ação irá remover TODOS os seus favoritos!

• Todos os versículos favoritados serão removidos
• Esta ação NÃO pode ser desfeita

Tem certeza que deseja continuar?`}
        confirmText="Resetar Favoritos"
        cancelText="Cancelar"
        type="danger"
      />
    </>
  )
}
