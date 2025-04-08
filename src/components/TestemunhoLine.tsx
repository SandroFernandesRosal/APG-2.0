'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useDataTestemunho } from '@/store/useStore'
import { Testemunho } from '@/data/types/testemunho'
import ItemTestemunho from './item-testemunho'
import SkeletonTestemunhos from './skeleton/SkeletonTestemunhos'
import { UserIgreja } from '@/data/types/userigreja'

import Link from 'next/link'
import { useTokenIgreja } from '@/hooks/useTokenIgreja'
import { useToken } from '@/hooks/useToken'
import AddTestemunho from '@/components/crud/AddTestemunho'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function TestemunhoLine({
  userIgreja,
}: {
  userIgreja: UserIgreja
}) {
  const { dataTestemunho, setDataTestemunho } = useDataTestemunho() as {
    dataTestemunho: Testemunho[]
    setDataTestemunho: React.Dispatch<React.SetStateAction<Testemunho[]>>
  }

  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [open, setOpen] = useState(false)

  const tokenIgreja = useTokenIgreja()
  const token = useToken()

  const itemsPerPage = 12

  useEffect(() => {
    setLoading(true)
    api
      .get(`/testemunhos?offset=${offset}`)
      .then((response) => {
        setDataTestemunho(Array.isArray(response.data) ? response.data : [])
        setLoading(false)

        setHasMore(response.data.length === itemsPerPage)
      })
      .catch((err) => {
        console.log(err)
        setDataTestemunho([])
        setLoading(false)
      })
  }, [setDataTestemunho, offset])

  const loadMore = () => {
    const newOffset = offset + itemsPerPage

    api
      .get(`/testemunhos?offset=${newOffset}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setDataTestemunho((prevData: Testemunho[]) => {
            const newData: Testemunho[] = [...prevData, ...response.data]
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
      <section className="mb-8 flex w-full flex-col items-center pb-4 md:rounded-xl">
        {!tokenIgreja ||
          (token && (
            <div className="flex w-full flex-wrap items-end justify-center gap-1">
              Faça
              <Link href={'/login/igreja'} className="button">
                login
              </Link>{' '}
              ou{' '}
              <Link href={'/register'} className="button">
                Registre-se
              </Link>
              e envie seu testemunho.
            </div>
          ))}

        {tokenIgreja && (
          <>
            {open === false && (
              <button className="button" onClick={() => setOpen(true)}>
                Adicionar testemunho
                {open && (
                  <AiFillCloseCircle
                    onClick={() => setOpen(false)}
                    className="cursor-pointer text-2xl font-bold text-black dark:text-white"
                  />
                )}
              </button>
            )}

            {open && (
              <div className="md:min-w-[35%]">
                <AddTestemunho userIgreja={userIgreja} setOpen={setOpen} />
              </div>
            )}
          </>
        )}

        {!loading ? (
          Array.isArray(dataTestemunho) && dataTestemunho.length > 0 ? (
            dataTestemunho.map((item: Testemunho) => (
              <ItemTestemunho
                key={item.id}
                item={item}
                userIgreja={userIgreja}
              />
            ))
          ) : (
            <p className="text-gray-500">Nenhum testemunho ainda.</p>
          )
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonTestemunhos key={index} />
          ))
        )}

        {hasMore && (
          <button onClick={loadMore} className="button">
            Carregar mais
          </button>
        )}

        {!hasMore && dataTestemunho.length > 0 && (
          <p className="mt-4 text-gray-500">
            Não há mais testemunhos para carregar.
          </p>
        )}
      </section>
    </div>
  )
}
