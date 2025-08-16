'use client'

import { format } from 'date-fns'
import { useData, useLocal } from '@/store/useStore'
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <article className="mb-5 	flex w-full flex-col items-center">
        <div className="flex w-full items-center justify-around">
          {podeGerenciar && (
            <div className="mt-2 flex gap-3">
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
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    onClick={() => setOpenEdit(selectedItem.id)}
                  >
                    <FaEdit className="text-sm" />
                    Editar
                  </button>
                  <RemoveNew id={selectedItem.id} />
                </>
              )}
            </div>
          )}
        </div>
        <h1 className="w-[90vw] max-w-[500px] 	text-center text-2xl font-bold">
          {selectedItem && selectedItem.title ? (
            <>{selectedItem.title}</>
          ) : (
            <>Carregando...</>
          )}
        </h1>
        {selectedItem ? (
          <>
            {selectedItem.coverUrl && (
              <Image
                src={selectedItem.coverUrl}
                alt={selectedItem.title}
                width={500}
                height={300}
                className="my-4 rounded-lg shadow-lg"
              />
            )}
            {selectedItem.videoUrl && (
              <video
                src={selectedItem.videoUrl}
                controls
                className="my-4 rounded-lg shadow-lg max-w-full"
                width={500}
                height={300}
              />
            )}
            <div className="w-[90vw] max-w-[800px] text-center">
              <p className="text-lg leading-relaxed mb-4">
                {selectedItem.content}
              </p>
              <div className="text-sm text-gray-500 mt-4">
                <p>Publicado em: {formatDate(selectedItem.createdAt)}</p>
                {updated && (
                  <p className="text-blue-600 font-semibold">
                    ✓ Atualizado recentemente
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p>Notícia não encontrada.</p>
          </div>
        )}
      </article>
    </main>
  )
}
