'use client'
import Image from 'next/image'
import { Suspense, useState } from 'react'
import AddSobreContent from './crud/AddSobreContent'
import { useToken } from '@/hooks/useToken'
import EditSobreContent from './crud/EditSobreContent'
import RemoveSobreContent from './crud/RemoveSobreContent'

export default function ContentQuemSomos({ dataSobre }) {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(null)
  const token = useToken()
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      {token && (
        <>
          {open === false && (
            <div
              className="mb-4 flex cursor-pointer rounded-lg border-[1px] border-zinc-400 bg-bglight p-2 placeholder-black outline-none  hover:bg-gradient-to-r hover:from-blue-900 hover:to-slate-900 hover:text-white focus:ring-0 dark:border-zinc-700 dark:bg-bgdark dark:placeholder-white "
              onClick={() => setOpen(true)}
            >
              Adicionar história
            </div>
          )}

          {open && (
            <div className="md:min-w-[35%]">
              {' '}
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
            alt=""
            className="m-2 w-[90%] max-w-[800px] rounded-2xl shadow-light dark:shadow-dark"
          />
          {token && (
            <div className="mb-2 flex w-full justify-center gap-2 text-white">
              {openEdit === null && (
                <button
                  className="m-2  rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r  from-slate-950 to-blue-900  px-3  font-bold text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700 md:px-3 md:text-lg"
                  onClick={() => setOpenEdit(item.id)}
                >
                  Editar
                </button>
              )}

              {openEdit === item.id && (
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
