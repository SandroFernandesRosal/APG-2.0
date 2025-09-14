'use client'
import { Agenda } from '@/data/types/agenda'
import { useEffect, useState } from 'react'
import { useDataAgenda, useLocal, useSearch } from '@/store/useStore'
import { useIgrejas } from '@/hooks/useIgrejas'

import ItemAgenda from './item-agenda'
import SkeletonNew from './skeleton/SkeletonNew'
import {
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaChevronDown,
} from 'react-icons/fa'

export default function Eventos() {
  const { dataAgenda, setDataAgenda } = useDataAgenda()
  const { search } = useSearch()
  const { local } = useLocal()
  const { igrejas } = useIgrejas()
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const fetchAgenda = async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage
    setLoading(page === 1)
    setLoadingMore(page > 1)

    try {
      const response = await fetch(
        `/api/agenda?offset=${offset}&limit=${perPage}`,
      )
      if (!response.ok) throw new Error('Erro ao buscar eventos')
      const data = await response.json()

      if (page === 1) {
        setDataAgenda(Array.isArray(data) ? data : [])
      } else {
        setDataAgenda((prevData: Agenda[]) => [...prevData, ...data])
      }

      // Calcular total de páginas
      const totalItems = data.length + (page - 1) * perPage
      setTotalItems(totalItems)
      setTotalPages(Math.ceil(totalItems / perPage))

      setCurrentPage(page)
    } catch (err) {
      console.log(err)
      if (page === 1) {
        setDataAgenda([])
      }
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    if (!search) {
      fetchAgenda(1, itemsPerPage)
    }
  }, [setDataAgenda, local, itemsPerPage, search])

  const loadMore = () => {
    if (!loadingMore && currentPage < totalPages && !search) {
      fetchAgenda(currentPage + 1, itemsPerPage)
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !search) {
      fetchAgenda(page, itemsPerPage)
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

  // Encontrar igreja pelo slug
  const currentIgreja = igrejas.find((igreja) => igreja.slug === local)

  const filteredAgenda = Array.isArray(dataAgenda)
    ? dataAgenda.filter((item) => item.igrejaId === currentIgreja?.id)
    : []

  return (
    <div className="flex flex-col items-center self-center mb-4 w-full">
      {search && (
        <h1 className="mb-4 hidden gap-2 self-start text-xl font-bold lg:flex">
          <span className="ml-5 flex border-b-2 border-secundary">
            Resultado
          </span>{' '}
          <p>da busca:</p>
        </h1>
      )}

      <div className="flex justify-center gap-5 flex-wrap w-full px-2">
        {!loading
          ? Array.isArray(dataAgenda) &&
            filteredAgenda.map((product: Agenda) => (
              <ItemAgenda
                key={product.id}
                id={product.id}
                name={product.name}
                day={product.day}
                hour={product.hour}
                createdAt={product.createdAt}
                updatedAt={product.updatedAt}
                igrejaId={product.igrejaId}
              />
            ))
          : Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonNew key={index} />
            ))}
      </div>

      {/* Controles de Paginação Elaborados - Apenas quando não há busca */}
      {!search && filteredAgenda.length > 0 && (
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
                      {filteredAgenda.length}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      de
                    </span>
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-md">
                      {totalItems}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      eventos
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
                        <span>Carregando mais eventos...</span>
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="text-sm" />
                        <span>Carregar mais eventos</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
