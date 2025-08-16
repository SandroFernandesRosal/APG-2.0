'use client'
import Image from 'next/image'
import { useData, useLocal } from '@/store/useStore'
import { useEffect, useState, use } from 'react'
import RemoveNew from '@/components/crud/RemoveNew'
import EditNew from '@/components/crud/EditNew'
import { useToken } from '@/hooks/useToken'
import { format } from 'date-fns'
import { FaEdit } from 'react-icons/fa'

interface ParamsProps {
  params: Promise<{ url: string }>
}

export default function NoticiaVilaDaPenha({ params }: ParamsProps) {
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
    <main className="flex min-h-screen flex-col 	items-center gap-5 pt-24 md:pt-[165px]">
      <article className="mb-5 	flex w-full flex-col items-center">
        <div className="flex w-full items-center justify-around">
          {podeGerenciar && (
            <div className="flex gap-3 p-2">
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
        <h1 className="w-[90vw] max-w-[500px] text-center text-2xl font-bold">
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
                height={500}
                priority
                className="w-[100vw] max-w-[500px] pt-2"
              />
            )}

            {selectedItem.videoUrl && (
              <video
                src={selectedItem.videoUrl}
                controls
                className="w-[100vw] max-w-[500px] pt-2"
              />
            )}

            {selectedItem && selectedItem.createdAt ? (
              <h1 className="flex w-[100vw] max-w-[500px] justify-between px-2 text-sm">
                <span>Postado em: {formatDate(selectedItem.createdAt)}</span>
                {selectedItem && updated && selectedItem.updatedAt && (
                  <span>
                    Atualizado em: {formatDate(selectedItem.updatedAt)}
                  </span>
                )}
              </h1>
            ) : (
              <h1 className="...">Carregando...</h1>
            )}

            <p className=" w-[90vw] max-w-[500px] py-5 text-justify text-lg">
              {selectedItem.content}
            </p>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </article>
    </main>
  )
}
