'use client'
import Image from 'next/image'
import { Suspense, useState } from 'react'
import AddSobreContent from './crud/AddSobreContent'
import { useToken } from '@/hooks/useToken'
import EditSobreContent from './crud/EditSobreContent'
import RemoveSobreContent from './crud/RemoveSobreContent'
import { Sobre } from '@/data/types/sobre'

interface ContentQuemSomosProps {
  dataSobre: Sobre[]
}

export default function ContentQuemSomos({ dataSobre }: ContentQuemSomosProps) {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      {token && (
        <>
          {open === false && (
            <button className="button" onClick={() => setOpen(true)}>
              Adicionar história
            </button>
          )}

          {open && (
            <div className="md:min-w-[35%]">
              <AddSobreContent open={open} setOpen={setOpen} />
            </div>
          )}
        </>
      )}
      {dataSobre.map((item) => (
        <div
          key={item.id}
          className="my-4 flex w-[100vw] flex-col items-center gap-2"
        >
          <h1 className="text-lg font-bold text-primary dark:text-secundary">
            {item.title}
          </h1>
          <p className="w-[90%] max-w-[800px]">{item.content}</p>
          <Image
            src={item.coverUrl}
            height={800}
            width={800}
            alt={`imagem de ${item.title}`}
            className="m-2 w-[90%] max-w-[800px] rounded-xl border-[1px] border-zinc-300 dark:border-zinc-800 p-2"
          />
          {token && (
            <div className="mb-2 flex w-full justify-center gap-2 text-white">
              {openEdit !== item.id ? (
                <button
                  className="button !mb-0"
                  onClick={() => setOpenEdit(item.id)}
                >
                  Editar
                </button>
              ) : (
                <EditSobreContent
                  conteudo={item.content}
                  titulo={item.title}
                  img={item.coverUrl}
                  id={item.id}
                  setOpenEdit={setOpenEdit}
                />
              )}

              <RemoveSobreContent id={item.id} />
            </div>
          )}
        </div>
      ))}
    </Suspense>
  )
}
