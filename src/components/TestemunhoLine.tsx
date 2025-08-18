'use client'
import { useEffect, useState } from 'react'
import { useDataTestemunho } from '@/store/useStore'
import { Testemunho } from '@/data/types/testemunho'
import ItemTestemunho from './item-testemunho'
import SkeletonTestemunhos from './skeleton/SkeletonTestemunhos'
import { User } from '@/data/types/user'

import Link from 'next/link'
import { useTokenIgreja } from '@/hooks/useTokenIgreja'
import { useToken } from '@/hooks/useToken'
import AddTestemunho from '@/components/crud/AddTestemunho'
import {
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaChevronDown,
  FaUser,
} from 'react-icons/fa'

export interface testemunhoProps {
  id: string
  name: string
  content: string
  avatarUrl: string
  coverUrl: string
  createdAt: string
  isPublic: boolean
  userId: string
}

export default function TestemunhoLine({ userIgreja }: { userIgreja: User }) {
  const { dataTestemunho, setDataTestemunho } = useDataTestemunho() as {
    dataTestemunho: Testemunho[]
    setDataTestemunho: React.Dispatch<React.SetStateAction<Testemunho[]>>
  }

  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [open, setOpen] = useState(false)
  const [qtdAguardandoAprovacao, setQtdAguardandoAprovacao] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const tokenIgreja = useTokenIgreja()
  const token = useToken()

  const fetchTestemunhos = async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage
    setLoading(page === 1)
    setLoadingMore(page > 1)

    try {
      const response = await fetch(
        `/api/testemunhos?offset=${offset}&limit=${perPage}`,
      )
      const data = await response.json()

      const publicData = (Array.isArray(data) ? data : []).filter(
        (item) => item.isPublic,
      )

      if (page === 1) {
        setDataTestemunho(publicData)
      } else {
        setDataTestemunho((prevData: Testemunho[]) => [
          ...prevData,
          ...publicData,
        ])
      }

      // Calcular total de páginas (assumindo que temos o total de itens)
      const totalPublicItems = publicData.length + (page - 1) * perPage
      setTotalItems(totalPublicItems)
      setTotalPages(Math.ceil(totalPublicItems / perPage))

      setCurrentPage(page)
    } catch (err) {
      console.log(err)
      if (page === 1) {
        setDataTestemunho([])
      }
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchTestemunhos(1, itemsPerPage)

    if (tokenIgreja) {
      fetch('/api/testemunhos')
        .then((res) => res.json())
        .then((allTestemunhos) => {
          const pendentes = allTestemunhos.filter(
            (t: testemunhoProps) => !t.isPublic && t.userId === userIgreja.id,
          )
          setQtdAguardandoAprovacao(pendentes.length)
        })
    }
  }, [itemsPerPage, tokenIgreja, userIgreja?.id])

  const loadMore = () => {
    if (!loadingMore && currentPage < totalPages) {
      fetchTestemunhos(currentPage + 1, itemsPerPage)
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchTestemunhos(page, itemsPerPage)
    }
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Botão anterior
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>,
    )

    // Primeira página
    if (startPage > 1) {
      buttons.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
        >
          1
        </button>,
      )
      if (startPage > 2) {
        buttons.push(
          <span
            key="ellipsis1"
            className="flex items-center justify-center w-10 h-10 text-gray-500"
          >
            ...
          </span>,
        )
      }
    }

    // Páginas visíveis
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${
            i === currentPage
              ? 'border-primary dark:border-secundary bg-primary dark:bg-secundary text-white'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {i}
        </button>,
      )
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span
            key="ellipsis2"
            className="flex items-center justify-center w-10 h-10 text-gray-500"
          >
            ...
          </span>,
        )
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
        >
          {totalPages}
        </button>,
      )
    }

    // Botão próximo
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>,
    )

    return buttons
  }

  return (
    <div className="flex flex-col items-center self-center mb-4 w-full">
      <section className="mb-8 flex w-full flex-col items-center pb-4 md:rounded-xl">
        {!token && (
          <p className="w-full text-center text-base text-gray-600 dark:text-gray-300">
            <span>Faça </span>
            <Link
              href="/login"
              className="mx-1 font-semibold text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
            >
              login
            </Link>
            <span> ou </span>
            <Link
              href="/register"
              className="mx-1 font-semibold text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
            >
              Registre-se
            </Link>
            <span> e envie seu testemunho.</span>
          </p>
        )}

        {token?.role === 'MEMBRO' ||
        token?.role === 'ADMIN' ||
        token?.role === 'SUPERADMIN' ? (
          <>
            {qtdAguardandoAprovacao > 0 && (
              <div className="my-4 mx-5 rounded border border-primary dark:border-secundary bg-bglightsecundary dark:bg-bgdarksecundary p-4">
                Você tem {qtdAguardandoAprovacao} testemunho
                {qtdAguardandoAprovacao > 1 ? 's' : ''} aguardando aprovação de
                um administrador.
              </div>
            )}

            {open === false && (
              <button
                className="flex items-center gap-2 px-6 py-3 bg-primary dark:bg-gray-600 text-white font-semibold rounded-lg hover:bg-primary/90 dark:hover:bg-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
                onClick={() => setOpen(true)}
              >
                <FaPlus className="text-sm" />
                Adicionar testemunho
              </button>
            )}

            {open && (
              <div className="md:min-w-[35%]">
                <AddTestemunho
                  userIgreja={{
                    ...userIgreja,
                    avatarUrl: userIgreja.avatarUrl || '',
                  }}
                  setOpen={setOpen}
                />
              </div>
            )}
          </>
        ) : null}

        {!loading ? (
          Array.isArray(dataTestemunho) && dataTestemunho.length > 0 ? (
            <>
              <div className="w-full">
                {dataTestemunho.map((item: Testemunho) => (
                  <ItemTestemunho
                    key={item.id}
                    item={item}
                    userIgreja={userIgreja}
                  />
                ))}
              </div>

              {/* Controles de Paginação Elaborados */}
              <div className="w-full max-w-6xl mx-auto px-4 mt-8">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Header da Paginação */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Mostrando
                          </span>
                          <span className="px-2 py-1 bg-primary dark:bg-secundary text-white text-sm font-bold rounded-md">
                            {dataTestemunho.length}
                          </span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            de
                          </span>
                          <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-md">
                            {totalItems}
                          </span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            testemunhos
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Por página:
                          </span>
                          <select
                            value={itemsPerPage}
                            onChange={(e) =>
                              handleItemsPerPageChange(Number(e.target.value))
                            }
                            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secundary font-medium"
                          >
                            <option value={10}>10 itens</option>
                            <option value={20}>20 itens</option>
                            <option value={40}>40 itens</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Página {currentPage} de {totalPages}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Controles de Navegação */}
                  <div className="px-6 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Botões de Navegação Rápida */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaChevronLeft className="w-3 h-3" />
                          <span className="hidden sm:inline">Primeira</span>
                        </button>

                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaChevronLeft className="w-3 h-3" />
                          <span className="hidden sm:inline">Anterior</span>
                        </button>
                      </div>

                      {/* Números de Página */}
                      <div className="flex items-center gap-1">
                        {renderPaginationButtons()}
                      </div>

                      {/* Botões de Navegação Rápida */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="hidden sm:inline">Próxima</span>
                          <FaChevronRight className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="hidden sm:inline">Última</span>
                          <FaChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Botão Carregar Mais */}
                  {currentPage < totalPages && (
                    <div className="px-6 pb-6">
                      <div className="flex justify-center">
                        <button
                          onClick={loadMore}
                          disabled={loadingMore}
                          className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-primary to-primary/90 dark:from-secundary dark:to-secundary/90 text-white font-semibold rounded-xl hover:from-primary/90 hover:to-primary/80 dark:hover:from-secundary/90 dark:hover:to-secundary/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {loadingMore ? (
                            <>
                              <FaSpinner className="animate-spin text-sm" />
                              <span>Carregando mais testemunhos...</span>
                            </>
                          ) : (
                            <>
                              <FaChevronDown className="text-sm" />
                              <span>Carregar mais testemunhos</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                <FaUser className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nenhum testemunho ainda
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Seja o primeiro a compartilhar seu testemunho!
              </p>
            </div>
          )
        ) : (
          <div className="w-full">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonTestemunhos key={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
