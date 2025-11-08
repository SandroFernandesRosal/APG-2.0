'use client'
import { useToken } from '@/hooks/useToken'
import { useState } from 'react'
import { Agenda } from '@/data/types/agenda'
import RemoveAgenda from './crud/RemoveAgenda'
import EditAgenda from './crud/EditAgenda'
import { Clock, MapPin, Calendar } from 'lucide-react'
import { useIgrejaName } from '@/hooks/useIgrejaName'

export default function ItemAgenda({ id, day, name, hour, igrejaId }: Agenda) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()
  const igrejaName = useIgrejaName(igrejaId)

  const podeGerenciar =
    token &&
    (token.role === 'SUPERADMIN' ||
      (token.role === 'ADMIN' && token.igrejaId === igrejaId))

  const dataBR = new Date(day).toLocaleDateString('pt-BR')
  const [dia, mes, ano] = dataBR.split('/')
  const diaNumero = dia
  const mesNome = new Date(day).toLocaleDateString('pt-BR', { month: 'short' })

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex min-h-[400px] overflow-hidden group relative flex-col w-[47%] max-w-[300px] border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 dark:hover:border-secundary/30">
      {/* Header com data destacada */}
      <div className="relative h-40 bg-gradient-to-br from-primary via-primary/95 to-primary/90 dark:from-secundary dark:via-secundary/95 dark:to-secundary/90 overflow-hidden">
        {/* Padrão decorativo sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
        </div>
        
        {/* Padrão de grid de calendário */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-white"></div>
          <div className="absolute top-2/4 left-0 right-0 h-px bg-white"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-white"></div>
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white"></div>
          <div className="absolute top-0 bottom-0 left-2/4 w-px bg-white"></div>
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white"></div>
        </div>
        
        {/* Linha decorativa no topo */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        {/* Ícone de calendário decorativo */}
        <div className="absolute top-3 right-3 opacity-20">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        
        {/* Conteúdo da data */}
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-extrabold text-white leading-none drop-shadow-lg">
              {diaNumero}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white/95 uppercase tracking-wider leading-tight">
                {mesNome}
              </span>
              <span className="text-xs text-white/80 font-medium mt-0.5">
                {ano}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-900/50">
        {/* Título do evento */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-primary dark:group-hover:text-secundary transition-colors">
            {name}
          </h3>
        </div>

        {/* Informações do evento */}
        <div className="space-y-3 mt-auto">
          {/* Horário */}
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 transition-colors">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-sm">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-gray-700 dark:text-gray-200">
              {hour}
            </span>
          </div>

          {/* Localização */}
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-green-100 dark:bg-green-950/30 border border-green-100 dark:border-green-900/30 transition-colors">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 flex items-center justify-center shadow-sm">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-gray-700 dark:text-gray-200 truncate flex-1">
              {igrejaName || (igrejaId ? 'Carregando...' : 'Não informado')}
            </span>
          </div>
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
