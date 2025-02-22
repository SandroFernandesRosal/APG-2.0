import { New } from '@/data/types/new'

import { useEffect, useState } from 'react'
import { useData, useLocal, useSearch, useDataSearch } from '@/store/useStore'
import { api } from '@/lib/api'

import ResultLength from './ResultLength'
import ItemNew from './item-new'

export default function News() {
  const { data, setData } = useData()
  const { search } = useSearch()
  const { dataSearch, setDataSearch } = useDataSearch()
  const { local } = useLocal()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/news/${local}/search?search=${search}`)
      .then((response) => {
        setDataSearch(response.data)
      })
      .catch((err) => console.log(err))
  }, [local, setDataSearch, search])

  useEffect(() => {
    setLoading(true)
    api
      .get(`/news/${local}`)
      .then((response) => {
        setData(response.data.newsTotal)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [setData, local])

  return (
    <div className="flex flex-col items-center self-center mb-4">
      {search && (
        <h1 className="mb-4  hidden gap-2 self-start text-xl font-bold lg:flex ">
          <span className="ml-5 flex  border-b-2 border-secundary">
            Resultado
          </span>{' '}
          <p>da busca:</p>
        </h1>
      )}

      {search ? <ResultLength dataSearch={dataSearch} /> : null}

      <div className="flex justify-center gap-5 flex-wrap">
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
                destaque={false}
                page={product.page}
                updatedAt={product.updatedAt}
              />
            ))
          : !loading &&
            data.map((product: New) => {
              return (
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
              )
            })}
      </div>
    </div>
  )
}
