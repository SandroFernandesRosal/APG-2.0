'use client'

import { Ministerio } from '@/data/types/ministerio'
import { useEffect, useState } from 'react'
import { useDataMinisterio, useLocal, useSearch } from '@/store/useStore'

import ItemMinisterio from './item-ministerio'
import SkeletonNew from './skeleton/SkeletonNew'

export default function Ministerioo() {
  const { dataMinisterio, setDataMinisterio } = useDataMinisterio()
  const { search } = useSearch()
  const { local } = useLocal()
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const itemsPerPage = 12

  useEffect(() => {
    const fetchMinisterio = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/${local}/ministerio?offset=${offset}`,
        )
        if (!response.ok) throw new Error('Erro ao buscar dados do ministério')
        const data = await response.json()
        console.log('Dados iniciais:', data)

        setDataMinisterio(Array.isArray(data) ? data : [])
        setLoading(false)

        setHasMore(data.length === itemsPerPage)
      } catch (err) {
        console.log(err)
        setDataMinisterio([])
        setLoading(false)
      }
    }

    fetchMinisterio()
  }, [setDataMinisterio, local, offset])

  const loadMore = async () => {
    const newOffset = offset + itemsPerPage

    try {
      const response = await fetch(`/ministerio/${local}?offset=${newOffset}`)
      if (!response.ok) throw new Error('Erro ao carregar mais dados')
      const data = await response.json()
      console.log('Novos dados carregados:', data)

      if (Array.isArray(data) && data.length > 0) {
        setDataMinisterio((prevData: Ministerio[]) => [...prevData, ...data])
        setOffset(newOffset)
      }

      setHasMore(data.length === itemsPerPage)
    } catch (err) {
      console.log(err)
    }
  }

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

      <div className="flex justify-center gap-5 flex-wrap w-full">
        {!loading
          ? Array.isArray(dataMinisterio) &&
            dataMinisterio.map((product: Ministerio) => (
              <ItemMinisterio
                id={product.id}
                key={product.id}
                title={product.title}
                name={product.name}
                local={product.local}
                coverUrl={product.coverUrl}
                createdAt={product.createdAt}
                updatedAt={product.updatedAt}
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <SkeletonNew key={index} />
            ))}
      </div>

      {hasMore && (
        <button onClick={loadMore} className="button">
          Carregar mais
        </button>
      )}

      {!hasMore && dataMinisterio.length > 0 && (
        <p className="mt-4 text-gray-500">Não há mais líder para carregar.</p>
      )}
    </div>
  )
}
