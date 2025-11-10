'use client'
import { useToken } from '@/hooks/useToken'
import { useState } from 'react'
import Image from 'next/image'
import { Ministerio } from '@/data/types/ministerio'
import RemoveMinisterio from './crud/RemoveMinisterio'
import EditMinisterio from './crud/EditMinisterio'
import { useIgrejaName } from '@/hooks/useIgrejaName'
import { FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa'

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
    <div className="relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/60 dark:border-gray-700/60 transition-all duration-500 flex flex-col overflow-hidden group h-[460px] w-[47%] max-w-[300px]">
      {/* Background decorativo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secundary/5 dark:from-primary/10 dark:to-secundary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Header com padrão igual ao card de eventos */}
      <div className="relative h-40 bg-gradient-to-br from-primary via-primary/95 to-primary/90 dark:from-secundary dark:via-secundary/95 dark:to-secundary/90 overflow-hidden">
        {/* Padrão decorativo sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
        </div>
      </div>

      {/* Avatar em destaque */}
      <div className="relative -mt-20 flex justify-center mb-4 z-10">
        <div className="relative group/avatar">
          {/* Borda com gradiente */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secundary rounded-full p-0.5">
            <div className="w-full h-full bg-white dark:bg-slate-800 rounded-full"></div>
          </div>
          {/* Imagem */}
          <div className="relative">
            <Image
              src={avatarUrl || '/img/Placeholder.png'}
              width={130}
              height={130}
              alt={name || 'Líder'}
              quality={100}
              className="relative w-32 h-32 object-cover rounded-full border-4 border-white dark:border-slate-800 group-hover/avatar:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-5 pb-6 flex flex-col flex-grow text-center relative z-10">
        {/* Nome */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-secundary transition-colors duration-300">
          {name}
        </h3>

        {/* Cargo com badges modernos */}
        <div className="mb-4">
          {cargo && Array.isArray(cargo) && cargo.length > 0 ? (
            <div className="flex flex-wrap gap-2 justify-center">
              {cargo.map((c, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3.5 py-1.5 bg-gradient-to-r from-primary/10 to-secundary/10 dark:from-primary/20 dark:to-secundary/20 text-primary dark:text-secundary font-bold text-xs uppercase tracking-wide rounded-full border border-primary/20 dark:border-secundary/30 shadow-sm backdrop-blur-sm"
                >
                  {c.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Divisor elegante */}
        <div className="flex items-center justify-center my-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <div className="mx-2 w-1.5 h-1.5 rounded-full bg-primary/40 dark:bg-secundary/40"></div>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </div>

        {/* Localização */}
        <div className="mt-auto pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100/80 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50 shadow-sm group-hover:shadow-md transition-shadow duration-300">
            <FaMapMarkerAlt className="w-4 h-4 text-primary dark:text-secundary flex-shrink-0" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {igrejaName || 'Carregando...'}
            </span>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      {podeGerenciar && (
        <div className="absolute top-3 right-3 flex gap-2 z-20">
          <button
            onClick={() => setOpenEdit(id)}
            className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-blue-200/50 dark:border-blue-600/50"
            title="Editar"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              // Usar o sistema de modal global
              const event = new CustomEvent('showRemoveModal', {
                detail: { id },
              })
              window.dispatchEvent(event)
            }}
            className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-600 text-red-600 dark:text-red-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-red-200/50 dark:border-red-600/50"
            title="Remover"
          >
            <FaTrash className="w-4 h-4" />
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
