'use client'
import { useToken } from '@/hooks/useToken'
import { useState } from 'react'
import Image from 'next/image'
import { Ministerio } from '@/data/types/ministerio'
import RemoveMinisterio from './crud/RemoveMinisterio'
import EditMinisterio from './crud/EditMinisterio'
import { useIgrejaName } from '@/hooks/useIgrejaName'

export default function ItemMinisterio({
  id,
  cargo,
  name,
  igrejaId,
  avatarUrl,
}: Ministerio) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()
  const igrejaName = useIgrejaName(igrejaId || null)

  const podeGerenciar =
    token &&
    (token.role === 'SUPERADMIN' ||
      (token.role === 'ADMIN' && token.igrejaId === igrejaId))

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-[400px] w-[47%] max-w-[300px] overflow-hidden group relative items-center justify-center border-[1px] border-zinc-300 dark:border-zinc-800">
      <div className="h-3/5 relative  flex items-center justify-center">
        <Image
          src={avatarUrl || '/img/Placeholder.png'}
          width={160}
          height={160}
          alt={name || 'Líder'}
          quality={100}
          className="relative z-10 h-40 w-40 object-cover object-center rounded-full border-4 border-primary mx-auto mt-6 p-1 dark:border-secundary group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="border-b-[1px] border-zinc-300 dark:border-zinc-800 w-[70%] mx-auto"></div>
      <div className="p-4 flex flex-col flex-grow text-center items-center justify-around ">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {name}
        </h3>
        <p className="text-base text-primary dark:text-secundary font-semibold">
          {cargo && Array.isArray(cargo) && cargo.length > 0
            ? cargo.map((c) => c.replace(/_/g, ' ')).join(', ')
            : 'Sem Cargo'}
        </p>
        <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {igrejaName || 'Carregando...'}
        </span>
      </div>
      {podeGerenciar && (
        <div className="absolute top-2 left-2 flex gap-2 z-10">
          <button
            onClick={() => setOpenEdit(id)}
            className="p-2 rounded-full bg-white/80 dark:bg-slate-700/80 hover:bg-white text-blue-600 shadow-md transition"
            title="Editar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              // Usar o sistema de modal global
              const event = new CustomEvent('showRemoveModal', {
                detail: { id },
              })
              window.dispatchEvent(event)
            }}
            className="p-2 rounded-full bg-white/80 dark:bg-slate-700/80 hover:bg-white text-red-600 shadow-md transition"
            title="Remover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      {openEdit === id && (
        <EditMinisterio
          nome={name}
          titulo={cargo ?? []}
          img={avatarUrl ?? '/img/Placeholder.png'}
          lugar={igrejaName || ''}
          id={id}
          setOpenEdit={setOpenEdit}
          igrejaId={igrejaId}
        />
      )}
      <RemoveMinisterio id={id} />
    </div>
  )
}
