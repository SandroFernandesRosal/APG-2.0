'use client'
import { useEffect, useState } from 'react'
import { useDataTestemunho } from '@/store/useStore'
import { Testemunho } from '@/data/types/testemunho'
import ItemTestemunho from './item-testemunho'
import SkeletonTestemunhos from './skeleton/SkeletonTestemunhos'
import { UserIgreja } from '@/data/types/userigreja'

import Link from 'next/link'
import { useTokenIgreja } from '@/hooks/useTokenIgreja'
import { useToken } from '@/hooks/useToken'
import AddTestemunho from '@/components/crud/AddTestemunho'

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
            {qtdAguardandoAprovacao > 0 && (
              <div className="my-4 mx-5 rounded border border-primary dark:border-secundary bg-bglightsecundary dark:bg-bgdarksecundary p-4">
                Você tem {qtdAguardandoAprovacao} testemunho
                {qtdAguardandoAprovacao > 1 ? 's' : ''} aguardando aprovação de
                um administrador.
              </div>
            )}

            {open === false && (
              <button className="button" onClick={() => setOpen(true)}>
                Adicionar testemunho
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
            <p>Nenhum testemunho ainda.</p>
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
          <p>Não há mais testemunhos para carregar.</p>
        )}
      </section>
    </div>
  )
}
