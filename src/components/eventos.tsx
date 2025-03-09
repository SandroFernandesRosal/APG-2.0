import { Agenda } from '@/data/types/agenda'
import { useEffect, useState } from 'react'
import { useDataAgenda, useLocal, useSearch } from '@/store/useStore'
import { api } from '@/lib/api'

import ItemAgenda from './item-agenda'
import SkeletonNew from './skeleton/SkeletonNew'

export default function Eventos() {
  const { dataAgenda, setDataAgenda } = useDataAgenda()
  const { search } = useSearch()
  const { local } = useLocal()
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const itemsPerPage = 12

  useEffect(() => {
    setLoading(true)
    api
      .get(`/agenda/${local}?offset=${offset}`)
      .then((response) => {
        console.log('Dados iniciais:', response.data)

        setDataAgenda(Array.isArray(response.data) ? response.data : [])
        setLoading(false)

        setHasMore(response.data.length === itemsPerPage)
      })
      .catch((err) => {
        console.log(err)
        setDataAgenda([])
        setLoading(false)
      })
  }, [setDataAgenda, local, offset])

  const loadMore = () => {
    const newOffset = offset + itemsPerPage

    api
      .get(`/agenda/${local}?offset=${newOffset}`)
      .then((response) => {
        console.log('Novos dados carregados:', response.data)

        if (Array.isArray(response.data) && response.data.length > 0) {
          setDataAgenda((prevData: Agenda[]) => [...prevData, ...response.data])
          setOffset(newOffset)
        }

        setHasMore(response.data.length === itemsPerPage)
      })
      .catch((err) => console.log(err))
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
          ? Array.isArray(dataAgenda) &&
            dataAgenda.map((product: Agenda) => (
              <ItemAgenda
                key={product.id}
                id={product.id}
                name={product.name}
                day={product.day}
                hour={product.hour}
                createdAt={product.createdAt}
                updatedAt={product.updatedAt}
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <SkeletonNew key={index} />
            ))}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
        >
          Carregar mais
        </button>
      )}

      {!hasMore && dataAgenda.length > 0 && (
        <p className="mt-4 text-gray-500">Não há mais eventos para carregar.</p>
      )}
    </div>
  )
}
