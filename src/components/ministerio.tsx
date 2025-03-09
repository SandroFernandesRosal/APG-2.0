import { Ministerio } from '@/data/types/ministerio'
import { useEffect, useState } from 'react'
import { useDataMinisterio, useLocal, useSearch } from '@/store/useStore'
import { api } from '@/lib/api'

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
    setLoading(true)
    api
      .get(`/ministerio/${local}?offset=${offset}`)
      .then((response) => {
        console.log('Dados iniciais:', response.data)

        setDataMinisterio(Array.isArray(response.data) ? response.data : [])
        setLoading(false)

        setHasMore(response.data.length === itemsPerPage)
      })
      .catch((err) => {
        console.log(err)
        setDataMinisterio([])
        setLoading(false)
      })
  }, [setDataMinisterio, local, offset])

  const loadMore = () => {
    const newOffset = offset + itemsPerPage

    api
      .get(`/ministerio/${local}?offset=${newOffset}`)
      .then((response) => {
        console.log('Novos dados carregados:', response.data)

        if (Array.isArray(response.data) && response.data.length > 0) {
          setDataMinisterio((prevData: Ministerio[]) => [
            ...prevData,
            ...response.data,
          ])
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
