'use client'
import { useToken } from '@/hooks/useToken'
import ItemDoe from './item-doe'
import { useEffect, useState } from 'react'
import { Doacao } from '@/data/types/doacao'
import AddDoacao from './crud/AddDoacao'
import SkeletonDoe from './skeleton/SkeletonDoe'

export default function Doe() {
  const [data, setData] = useState<Doacao[]>([])
  const [loading, setLoading] = useState(true)
  const [openDoacao, setOpenDoacao] = useState(false)
  const token = useToken()

  const podeAdicionar = token?.role === 'ADMIN' || token?.role === 'SUPERADMIN'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/doacao')
        if (!response.ok) {
          throw new Error('Erro ao buscar doações')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="mb-4 flex w-[100vw] flex-col items-center">
      {podeAdicionar && (
        <>
          {!openDoacao && (
            <div
              className="button cursor-pointer"
              onClick={() => setOpenDoacao(true)}
            >
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
                isAdmin={item.isAdmin} // A prop 'isAdmin' parece não existir no seu tipo 'Doacao', talvez precise de a remover ou adicionar ao tipo.
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
