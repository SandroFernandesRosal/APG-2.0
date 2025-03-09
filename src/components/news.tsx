import { New } from '@/data/types/new'
import { useEffect, useState } from 'react'
import { useData, useLocal, useSearch, useDataSearch } from '@/store/useStore'
import { api } from '@/lib/api'

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
    api
      .get(`/news/${local}/search?search=${search}`)
      .then((response) => {
        setDataSearch(response.data)
      })
      .catch((err) => console.log(err))
  }, [local, setDataSearch, search])

  useEffect(() => {
    api
      .get(`/news/${local}?offset=${offset}`)
      .then((response) => {
        console.log('Dados iniciais:', response.data)

        setData(Array.isArray(response.data) ? response.data : [])
        setLoading(false)

        setHasMore(response.data.length === itemsPerPage)
      })
      .catch((err) => {
        console.log(err)
        setData([])
        setLoading(false)
      })
  }, [setData, local, offset])

  const loadMore = () => {
    const newOffset = offset + itemsPerPage

    api
      .get(`/news/${local}?offset=${newOffset}`)
      .then((response) => {
        console.log('Novos dados carregados:', response.data)

        if (Array.isArray(response.data) && response.data.length > 0) {
          setData((prevData: New[]) => {
            const newData = [...prevData, ...response.data]
            console.log('Nova lista de dados:', newData)
            return newData
          })
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

      {search ? <ResultLength dataSearch={dataSearch} /> : null}

      <div className="flex justify-center gap-5 flex-wrap w-full px-2">
        {search
          ? dataSearch &&
            dataSearch.length > 0 &&
            dataSearch.map((product: New) => (
              <ItemNew
                key={product.id}
                id={product.id}
                coverUrl={product.coverUrl}
                content={product.content}
                title={product.title}
                createdAt={product.createdAt}
                destaque={product.destaque}
                page={product.page}
                updatedAt={product.updatedAt}
              />
            ))
          : loading
            ? Array.isArray(data) &&
              data.map((product: New) => (
                <ItemNew
                  key={product.id}
                  id={product.id}
                  coverUrl={product.coverUrl}
                  content={product.content}
                  title={product.title}
                  createdAt={product.createdAt}
                  destaque={false}
                  page={product.page}
                  updatedAt={product.updatedAt}
                />
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <SkeletonNew key={index} />
              ))}
      </div>

      {!search && hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
        >
          Carregar mais
        </button>
      )}

      {!search && !hasMore && data.length > 0 && (
        <p className="mt-4 text-gray-500">
          Não há mais notícias para carregar.
        </p>
      )}
    </div>
  )
}
