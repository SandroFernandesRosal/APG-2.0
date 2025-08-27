'use client'

import { useState, useEffect } from 'react'
import { Heart, Star, ChevronLeft, ChevronRight, LogIn } from 'lucide-react'
import { toast } from 'react-toastify'
import { ConfirmModal } from './ConfirmModal'
import { useToken } from '@/hooks/useToken'

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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/login/me', {
          credentials: 'include',
        })
        setIsAuthenticated(response.ok)
      } catch {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Carregar favoritos da API
  const loadFavorites = async () => {
    if (!isAuthenticated) return

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
    if (isAuthenticated) {
      loadFavorites()
    }
  }, [isAuthenticated])

  // Recarregar favoritos a cada 60 segundos para manter sincronizado
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      loadFavorites()
    }, 60000)

    return () => clearInterval(interval)
  }, [isAuthenticated])

  // Escutar eventos de atualização de favoritos
  useEffect(() => {
    if (!isAuthenticated) return

    const handleFavoritesUpdated = () => {
      loadFavorites()
    }

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated)

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated)
    }
  }, [isAuthenticated])

  // Escutar eventos de reset de favoritos para atualizar versículos
  useEffect(() => {
    if (!isAuthenticated) return

    const handleFavoritesReset = () => {
      loadFavorites()
      // Disparar evento para atualizar versículos
      window.dispatchEvent(new CustomEvent('favoritesUpdated'))
    }

    window.addEventListener('favoritesReset', handleFavoritesReset)

    return () => {
      window.removeEventListener('favoritesReset', handleFavoritesReset)
    }
  }, [isAuthenticated])

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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Favoritos
          </h3>
          <div className="flex gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Ver ({favorites.length})
                </button>
                {favorites.length > 0 && (
                  <button
                    onClick={() => setShowResetModal(true)}
                    className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                    title="Limpar todos os favoritos"
                  >
                    🗑️ Limpar
                  </button>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <LogIn className="w-4 h-4" />
                <span>Faça login para salvar favoritos</span>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Carregando...</p>
          </div>
        ) : !isAuthenticated ? (
          <div className="text-center py-8">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Favoritos da Bíblia
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Faça login para salvar seus versículos favoritos e acessá-los facilmente.
            </p>
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Fazer Login
            </a>
          </div>
        ) : showFavorites ? (
          <div className="space-y-4">
            {favorites.length === 0 ? (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nenhum favorito ainda
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Marque versículos como favoritos enquanto lê a Bíblia para vê-los aqui.
                </p>
              </div>
            ) : (
              <>
                {/* Controles de paginação */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Mostrar:
                    </span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      por página
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Lista de favoritos */}
                <div className="space-y-3">
                  {currentFavorites.map((favorite) => (
                    <div
                      key={favorite.id}
                      className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium text-gray-800 dark:text-white">
                              {favorite.bookName} {favorite.chapter}
                              {favorite.verse && `:${favorite.verse}`}
                            </span>
                          </div>
                          {favorite.text && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                              "{favorite.text}"
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Adicionado em{' '}
                            {new Date(favorite.createdAt).toLocaleDateString(
                              'pt-BR',
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 dark:text-gray-400">
              Você tem {favorites.length} favorito{favorites.length !== 1 ? 's' : ''} salvo{favorites.length !== 1 ? 's' : ''}.
            </p>
          </div>
        )}
      </div>

      {/* Modal de confirmação para limpar favoritos */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleResetFavorites}
        title="Limpar Favoritos"
        message="Tem certeza que deseja remover todos os seus favoritos? Esta ação não pode ser desfeita."
        confirmText="Limpar Todos"
        cancelText="Cancelar"
      />
    </>
  )
}
