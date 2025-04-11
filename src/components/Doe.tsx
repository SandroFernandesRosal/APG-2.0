'use client'
import { useToken } from '@/hooks/useToken'
import ItemDoe from './item-doe'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Doacao } from '@/data/types/doacao'
import AddDoacao from './crud/AddDoacao'
import SkeletonDoe from './skeleton/SkeletonDoe'

export default function Doe() {
  const [data, setData] = useState<Doacao[]>([])
  const [loading, setLoading] = useState(true)
  const [openDoacao, setOpenDoacao] = useState(false)
  const token = useToken()

  useEffect(() => {
    api
      .get('/doacao')
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="mb-4 flex w-[100vw] flex-col items-center">
      {token && (
        <>
          {openDoacao === false && (
            <div className="button" onClick={() => setOpenDoacao(true)}>
              Adicionar igreja
            </div>
          )}

          {openDoacao && (
            <div className="md:min-w-[35%]">
              <AddDoacao
                openDoacao={openDoacao}
                setOpenDoacao={setOpenDoacao}
              />
            </div>
          )}
        </>
      )}

      <div className="relative -top-[30px] mb-5 flex w-full flex-wrap justify-center gap-x-5 p-1 px-2 pt-10 md:gap-x-5">
        {!loading ? (
          data.length < 1 ? (
            <p>Nenhuma igreja cadastrada.</p>
          ) : (
            data.map((item) => (
              <ItemDoe
                key={item.id}
                id={item.id}
                local={item.local}
                banco={item.banco}
                conta={item.conta}
                agencia={item.agencia}
                nomebanco={item.nomebanco}
                pix={item.pix}
                nomepix={item.nomepix}
                isAdmin={item.isAdmin}
                updatedAt={item.updatedAt}
                createdAt={item.createdAt}
              />
            ))
          )
        ) : (
          <SkeletonDoe />
        )}
      </div>
    </div>
  )
}
