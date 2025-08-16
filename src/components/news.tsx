'use client'
import { New } from '@/data/types/new'
import { useEffect, useState } from 'react'
import { useData, useLocal, useSearch, useDataSearch } from '@/store/useStore'

import ResultLength from './ResultLength'
import ItemNew from './item-new'
import SkeletonNew from './skeleton/SkeletonNew'

export default function News() {
  const { data, setData } = useData() || { data: [] }
  const { search } = useSearch()
  const { dataSearch, setDataSearch } = useDataSearch()
  const { local } = useLocal()
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const itemsPerPage = 12

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/news/search?q=${search}`)
        if (!response.ok) throw new Error('Erro ao buscar resultados')
        const data = await response.json()
        setDataSearch(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchSearchResults()
  }, [local, setDataSearch, search])

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/news?offset=${offset}`)
        if (!response.ok) throw new Error('Erro ao buscar notícias')
        const data = await response.json()
        console.log('Dados iniciais:', data)

        setData(Array.isArray(data) ? data : [])
        setLoading(false)

        setHasMore(data.length === itemsPerPage)
      } catch (err) {
        console.log(err)
        setData([])
        setLoading(false)
      }
    }

    fetchNews()
  }, [setData, local, offset])

  const loadMore = async () => {
    const newOffset = offset + itemsPerPage

    try {
      const response = await fetch(`/api/news?offset=${newOffset}`)
      if (!response.ok) throw new Error('Erro ao carregar mais notícias')
      const data = await response.json()
      console.log('Novos dados carregados:', data)

      if (Array.isArray(data) && data.length > 0) {
        setData((prevData: New[]) => [...prevData, ...data])
        setOffset(newOffset)
      }

      setHasMore(data.length === itemsPerPage)
    } catch (err) {
      console.log(err)
    }
  }
  const filteredDataSearch = dataSearch.filter(
    (item: New) => item.role === local.toUpperCase(),
  )

  const filteredData = data.filter(
    (item: New) => item.role === local.toUpperCase(),
  )

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

      {search ? <ResultLength dataSearch={filteredDataSearch} /> : null}

      <div className="flex justify-center gap-5 flex-wrap w-full px-2">
        {search ? (
          filteredDataSearch && filteredDataSearch.length > 0 ? (
            filteredDataSearch.map((product: New) => (
              <ItemNew
                key={product.id}
                id={product.id}
                coverUrl={product.coverUrl}
                videoUrl={product.videoUrl}
                content={product.content}
                title={product.title}
                createdAt={product.createdAt}
                destaque={product.destaque}
                page={product.page}
                updatedAt={product.updatedAt}
                url={product.url}
                role={product.role}
              />
            ))
          ) : (
            !loading && (
              <p className="text-center text-gray-500 mt-4 w-full">
                Nenhuma notícia adicionada.
              </p>
            )
          )
        ) : !loading ? (
          Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((product: New) => (
              <ItemNew
                key={product.id}
                id={product.id}
                coverUrl={product.coverUrl}
                videoUrl={product.videoUrl}
                content={product.content}
                title={product.title}
                createdAt={product.createdAt}
                destaque={false}
                page={product.page}
                updatedAt={product.updatedAt}
                url={product.url}
                role={product.role}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4 w-full">
              Nenhuma notícia adicionada.
            </p>
          )
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonNew key={index} />
          ))
        )}
      </div>

      {!search && hasMore && (
        <button onClick={loadMore} className="button">
          Carregar mais
        </button>
      )}

      {!search && !hasMore && filteredData.length > 0 && (
        <p className="mt-4 text-gray-500">
          Não há mais notícias para carregar.
        </p>
      )}
    </div>
  )
}
