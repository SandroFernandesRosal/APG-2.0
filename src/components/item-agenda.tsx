'use client'
import { useToken } from '@/hooks/useToken'
import { useState } from 'react'
import { Agenda } from '@/data/types/agenda'
import RemoveAgenda from './crud/RemoveAgenda'
import EditAgenda from './crud/EditAgenda'
import { getIgrejaLabelFromId } from '@/lib/getIgrejaLabel'
import { Clock, MapPin } from 'lucide-react'

export default function ItemAgenda({ id, day, name, hour, igrejaId }: Agenda) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()

  const podeGerenciar =
    token &&
    (token.role === 'SUPERADMIN' ||
      (token.role === 'ADMIN' && token.igrejaId === igrejaId))

  const dataBR = new Date(day).toLocaleDateString('pt-BR')

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex min-h-[400px] overflow-hidden group relative flex-col w-[47%] max-w-[300px] border-[1px] border-zinc-300 dark:border-zinc-800">
      <div className="flex flex-col flex-1 text-center border-r border-gray-200 dark:border-gray-700 w-full bg-bglightsecundary dark:bg-bgdarksecundary h-40">
        <div className="bg-primary text-white text-sm font-semibold py-1"></div>
        <div className="flex-grow flex items-center justify-center">
          <span className="text-xl font-bold text-gray-700 dark:text-gray-200">
            {dataBR}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col w-full h-full flex-1 justify-around">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {name}
        </h3>
        <div className="mt-2 space-y-1 text-gray-500 dark:text-gray-400 text-xl">
          <p className="flex items-center gap-2">
            <Clock size={24} />
            <span>{hour}</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={24} />
            <span>{getIgrejaLabelFromId(igrejaId || '')}</span>
          </p>
        </div>
      </div>

      {podeGerenciar && (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
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
        <EditAgenda
          setOpenEdit={setOpenEdit}
          id={id}
          title={name}
          hora={hour}
          dia={day}
          igrejaId={igrejaId || null}
        />
      )}
      <RemoveAgenda id={id} />
    </div>
  )
}
