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
import { FaPlus } from 'react-icons/fa'

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
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [open, setOpen] = useState(false)
  const [qtdAguardandoAprovacao, setQtdAguardandoAprovacao] = useState(0)

  const tokenIgreja = useTokenIgreja()
  const token = useToken()

  const itemsPerPage = 12

  useEffect(() => {
    setLoading(true)
    fetch(`/api/testemunhos?offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        const publicData = (Array.isArray(data) ? data : []).filter(
          (item) => item.isPublic,
        )
        setDataTestemunho(publicData)
        setLoading(false)
        setHasMore(publicData.length === itemsPerPage)
      })
      .catch((err) => {
        console.log(err)
        setDataTestemunho([])
        setLoading(false)
      })

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
  }, [setDataTestemunho, offset, tokenIgreja, userIgreja?.id])

  const loadMore = () => {
    const newOffset = offset + itemsPerPage

    fetch(`/api/testemunhos?offset=${newOffset}`)
      .then((response) => response.json())
      .then((data) => {
        const publicData = (Array.isArray(data) ? data : []).filter(
          (item) => item.isPublic,
        )

        if (publicData.length > 0) {
          setDataTestemunho((prevData: Testemunho[]) => [
            ...prevData,
            ...publicData,
          ])
          setOffset(newOffset)
        }

        setHasMore(publicData.length === itemsPerPage)
      })
      .catch((err) => console.log(err))
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
          (token?.role === 'ADMIN' && (
            <>
              {qtdAguardandoAprovacao > 0 && (
                <div className="my-4 mx-5 rounded border border-primary dark:border-secundary bg-bglightsecundary dark:bg-bgdarksecundary p-4">
                  Você tem {qtdAguardandoAprovacao} testemunho
                  {qtdAguardandoAprovacao > 1 ? 's' : ''} aguardando aprovação
                  de um administrador.
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
          ))}

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
            <p>Nenhum testemunho ainda.</p>
          )
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonTestemunhos key={index} />
          ))
        )}

        {hasMore && (
          <button
            onClick={loadMore}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Carregar mais
          </button>
        )}

        {!hasMore && dataTestemunho.length > 0 && (
          <p>Não há mais testemunhos para carregar.</p>
        )}
      </section>
    </div>
  )
}
