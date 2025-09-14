'use client'
import { useToken } from '@/hooks/useToken'
import ItemDoe from './item-doe'
import { useState } from 'react'
import { useIgrejas } from '@/hooks/useIgrejas'
import AddDoacao from './crud/AddDoacao'
import SkeletonDoe from './skeleton/SkeletonDoe'

export default function Doe() {
  const { igrejas, loading } = useIgrejas({ showInactive: false })
  const [openDoacao, setOpenDoacao] = useState(false)
  const token = useToken()

  const podeAdicionar = token?.role === 'ADMIN' || token?.role === 'SUPERADMIN'

  return (
    <div className="mb-4 flex w-[100vw] flex-col items-center">
      {podeAdicionar && (
        <>
          {!openDoacao && (
            <div
              className="button cursor-pointer"
              onClick={() => setOpenDoacao(true)}
            >
              Configurar Doações
            </div>
          )}

          {openDoacao && (
            <div className="md:min-w-[35%]">
              <AddDoacao setOpenDoacao={setOpenDoacao} />
            </div>
          )}
        </>
      )}

      <div className="relative -top-[30px] mb-5 flex w-full flex-wrap justify-center gap-x-5 p-1 px-2 pt-10 md:gap-x-5 gap-4">
        {!loading ? (
          igrejas.length < 1 ? (
            <p>Nenhuma igreja cadastrada.</p>
          ) : (
            igrejas.map((igreja) => (
              <ItemDoe
                key={igreja.id}
                id={igreja.id}
                local={igreja.nome}
                banco={igreja.banco || ''}
                conta={igreja.conta || ''}
                agencia={igreja.agencia || ''}
                nomebanco={igreja.nomebanco || ''}
                pix={igreja.pix || ''}
                nomepix={igreja.nomepix || ''}
                isAdmin={false}
                updatedAt={igreja.updatedAt}
                createdAt={igreja.createdAt}
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
