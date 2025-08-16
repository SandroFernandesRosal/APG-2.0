'use client'
import Image from 'next/image'
import { Suspense, useState } from 'react'
import AddSobreContent from './crud/AddSobreContent'
import { useToken } from '@/hooks/useToken'
import EditSobreContent from './crud/EditSobreContent'
import RemoveSobreContent from './crud/RemoveSobreContent'
import { Sobre } from '@/data/types/sobre'

import { FaCameraRetro, FaPlus } from 'react-icons/fa'

interface ContentQuemSomosProps {
  dataSobre: Sobre[]
}

export default function ContentQuemSomos({ dataSobre }: ContentQuemSomosProps) {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      {token?.role === 'SUPERADMIN' && (
        <>
          {open === false && (
            <button
              className="flex items-center gap-2 px-6 py-3 bg-primary dark:bg-gray-600 text-white font-semibold rounded-lg hover:bg-primary/90 dark:hover:bg-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-6"
              onClick={() => setOpen(true)}
            >
              <FaPlus className="text-sm" />
              Adicionar história
            </button>
          )}

          {open && (
            <div className="md:min-w-[35%]">
              <AddSobreContent setOpen={setOpen} />
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
          {item.coverUrl ? (
            <Image
              src={item.coverUrl}
              height={800}
              width={800}
              alt={`imagem de ${item.title}`}
              className="m-2 w-[90%] max-w-[800px] rounded-xl border-[1px] border-zinc-300 dark:border-zinc-800 p-2"
            />
          ) : (
            <div className="m-2 w-[90%] max-w-[800px] h-[400px] bg-gradient-to-br from-primary/20 to-secundary/20 flex items-center justify-center rounded-xl border-[1px] border-zinc-300 dark:border-zinc-800 p-2">
              <FaCameraRetro className="text-6xl text-primary/50 dark:text-secundary/50" />
            </div>
          )}
          {token?.role === 'ADMIN' && (
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
