'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { New } from '@/data/types/new'
import { useToken } from '@/hooks/useToken'
import RemoveNew from './crud/RemoveNew'
import EditNew from './crud/EditNew'
import { useState } from 'react'
import { getIgrejaLabel } from '@/lib/getIgrejaLabel'
import { FaCameraRetro } from 'react-icons/fa'
import { useShowModal } from '@/store/useStore'

export default function ItemNew({
  id,
  page,
  coverUrl,
  videoUrl,
  title,
  content,
  createdAt,
  destaque,
  url,
  role,
}: New) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const { showModal, setShowModal } = useShowModal()
  const token = useToken()

  const podeGerenciar =
    token &&
    (token.role === 'SUPERADMIN' ||
      (token.role === 'ADMIN' && token.ministryRole === role))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('pt-BR', { month: 'long' })
    const year = date.getFullYear()
    return `${day} de ${month} de ${year}`
  }

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-[400px] overflow-hidden group relative w-[47%] max-w-[300px] border-[1px] border-zinc-300 dark:border-zinc-800">
      <div className="h-48 relative overflow-hidden">
        <Link
          href={`/noticias/${page.toLowerCase()}/${url}`}
          className="block h-full w-full"
          tabIndex={-1}
        >
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : videoUrl ? (
            <div className="w-full h-full relative">
              <video
                src={videoUrl}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                muted
                preload="metadata"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secundary/20 flex items-center justify-center">
              <FaCameraRetro className="text-4xl text-primary/50 dark:text-secundary/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span className="absolute top-2 right-2 bg-primary/80 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
            {getIgrejaLabel(role)}
          </span>
        </Link>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow line-clamp-3">
          {content}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDate(createdAt)}</span>
            <Link
              href={`/noticias/${page.toLowerCase()}/${url}`}
              className="font-semibold text-primary dark:text-secundary hover:underline"
            >
              Ler mais
            </Link>
          </div>
        </div>
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
            onClick={() => setShowModal(id)}
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
        <EditNew
          id={id}
          titulo={title}
          conteudo={content}
          img={coverUrl}
          videoUrl={videoUrl}
          setOpenEdit={setOpenEdit}
          destacar={destaque}
          role={role}
        />
      )}
      {showModal === id && <RemoveNew id={id} />}
    </div>
  )
}
