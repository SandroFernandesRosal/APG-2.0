'use client'

import { format } from 'date-fns'
import { useData, useLocal, useShowModal } from '@/store/useStore'
import { useToken } from '@/hooks/useToken'
import { useEffect, useState, use } from 'react'
import EditNew from '@/components/crud/EditNew'
import RemoveNew from '@/components/crud/RemoveNew'
import Image from 'next/image'
import { FaEdit } from 'react-icons/fa'

interface ParamsProps {
  params: Promise<{ url: string }>
}

export default function NoticiaCaxias({ params }: ParamsProps) {
  const { url } = use(params)

  const { local } = useLocal()
  const { data, setData } = useData()
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [updated, setUpdated] = useState(false)
  const { setShowModal } = useShowModal()

  const token = useToken()

  const selectedItem = data.find(
    (item: { url: string; role: string }) =>
      item.url === url && item.role === local.toUpperCase(),
  )

  const podeGerenciar =
    token &&
    selectedItem &&
    (token.role === 'SUPERADMIN' ||
      (token.role === 'ADMIN' && token.ministryRole === selectedItem.role))

  useEffect(() => {
    fetch(`/api/news`)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      })
      .catch((err) => console.log(err))
  }, [local, setData])

  useEffect(() => {
    if (selectedItem && selectedItem.updatedAt) {
      const updatedAtLocal = localStorage.getItem(`updated_${url}`)
      if (!updatedAtLocal || updatedAtLocal !== selectedItem.updatedAt) {
        setUpdated(true)
        localStorage.setItem(`updated_${url}`, selectedItem.updatedAt)
      }
    }
  }, [selectedItem, url])

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const formattedDate = format(date, 'dd/MM/yyyy HH:mm')
    return formattedDate
  }

  return (
    <main className="min-h-screen bg-bglight dark:bg-bgdark pt-24 md:pt-[165px]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Header da notícia */}
          <div className="relative">
            {/* Botões de administração */}
            {podeGerenciar && (
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                {openEdit === selectedItem.id ? (
                  <EditNew
                    img={selectedItem.coverUrl}
                    videoUrl={selectedItem.videoUrl}
                    titulo={selectedItem.title}
                    conteudo={selectedItem.content}
                    id={selectedItem.id}
                    destacar={selectedItem.destaque}
                    setOpenEdit={setOpenEdit}
                    role={selectedItem.role}
                  />
                ) : (
                  <>
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-primary dark:bg-secundary hover:bg-primary/90 dark:hover:bg-secundary/90 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                      onClick={() => setOpenEdit(selectedItem.id)}
                      title="Editar"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                      onClick={() => setShowModal(selectedItem.id)}
                      title="Remover"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Conteúdo da notícia */}
          <div className="p-6 md:p-8">
            {/* Layout responsivo: imagem/vídeo e conteúdo lado a lado em telas grandes */}
            <div className="lg:flex lg:gap-8 lg:items-start">
              {/* Coluna da imagem/vídeo */}
              <div className="lg:w-1/2 lg:flex-shrink-0">
                {selectedItem?.coverUrl && (
                  <div className="mb-6 lg:mb-0">
                    <div className="w-full h-64 md:h-96 relative overflow-hidden rounded-xl">
                      <Image
                        src={selectedItem.coverUrl}
                        alt={selectedItem.title}
                        fill
                        priority
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}
                {selectedItem?.videoUrl && (
                  <div className="mb-6 lg:mb-0">
                    <video
                      src={selectedItem.videoUrl}
                      controls
                      className="w-full rounded-xl shadow-lg"
                    />
                  </div>
                )}
              </div>

              {/* Coluna do conteúdo */}
              <div className="lg:w-1/2 lg:flex-1">
                {/* Título */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {selectedItem && selectedItem.title ? (
                    selectedItem.title
                  ) : (
                    <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 rounded"></div>
                  )}
                </h1>

                {/* Metadados */}
                {selectedItem && selectedItem.createdAt && (
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        Postado em: {formatDate(selectedItem.createdAt)}
                      </span>
                    </div>
                    {updated && (
                      <div className="flex items-center gap-2 text-sm text-primary dark:text-secundary font-semibold">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        <span>✓ Atualizado recentemente</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Conteúdo */}
                <div className="prose prose-lg max-w-none">
                  {selectedItem ? (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {selectedItem.content}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 rounded"></div>
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 rounded w-3/4"></div>
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 rounded w-1/2"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Modal de confirmação de remoção */}
        {selectedItem && <RemoveNew id={selectedItem.id} />}
      </div>
    </main>
  )
}
