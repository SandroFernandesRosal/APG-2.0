'use client'

import { useEffect, useState } from 'react'
import { useDataMinisterio, useLocal, useSearch } from '@/store/useStore'
import ItemMinisterio from './item-ministerio'
import SkeletonNew from './skeleton/SkeletonNew'
import { Ministerioo } from '@/data/types/ministerio'

export default function Ministerio() {
  const { dataMinisterio, setDataMinisterio } = useDataMinisterio()
  const { search } = useSearch()
  const { local } = useLocal()
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const itemsPerPage = 12

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/ministerio?offset=${offset}`)
        if (!response.ok) throw new Error('Erro ao buscar usuários')
        const data = await response.json()
        setDataMinisterio(Array.isArray(data) ? data : [])
        setLoading(false)
        setHasMore(data.length === itemsPerPage)
      } catch (err) {
        console.log(err)
        setDataMinisterio([])
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [setDataMinisterio, local, offset])

  const loadMore = async () => {
    const newOffset = offset + itemsPerPage
    try {
      const response = await fetch(`/api/ministerio?offset=${newOffset}`)
      if (!response.ok) throw new Error('Erro ao carregar mais usuários')
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setDataMinisterio((prevData: Ministerioo[]) => [...prevData, ...data])
        setOffset(newOffset)
      }
      setHasMore(data.length === itemsPerPage)
    } catch (err) {
      console.log(err)
    }
  }

  // Filtro por igreja/local
  const filteredUsuarios = Array.isArray(dataMinisterio)
    ? dataMinisterio.filter(
        (item: Ministerioo) =>
          !local || item.ministryRole === local.toUpperCase(),
      )
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

      <div className="flex justify-center gap-5 flex-wrap w-full">
        {!loading
          ? filteredUsuarios.map((user: Ministerioo) => (
              <ItemMinisterio
                id={user.id}
                key={user.id}
                name={user.name}
                avatarUrl={user.avatarUrl ?? ''}
                cargo={user.cargo}
                ministryRole={user.ministryRole}
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
        <p className="mt-4 text-gray-500">
          Não há mais usuários para carregar.
        </p>
      )}
    </div>
  )
}
