'use client'
import Image from 'next/image'
import { useData, useLocal } from '@/store/useStore'
import { useEffect, useState, use } from 'react'
import RemoveNew from '@/components/crud/RemoveNew'
import EditNew from '@/components/crud/EditNew'
import { useToken } from '@/hooks/useToken'
import { format } from 'date-fns'

interface ParamsProps {
  params: Promise<{ id: string }>
}

export default function NoticiaVilaDaPenha({ params }: ParamsProps) {
  const { id } = use(params)

  const { local } = useLocal()
  const { data, setData } = useData()
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [updated, setUpdated] = useState(false)

  const token = useToken()

  const selectedItem = data.find((item: { id: string }) => item.id === id)

  useEffect(() => {
    fetch(`/api/${local}/news`)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      })
      .catch((err) => console.log(err))
  }, [local, setData])

  useEffect(() => {
    if (selectedItem && selectedItem.updatedAt) {
      const updatedAtLocal = localStorage.getItem(`updated_${id}`)
      if (!updatedAtLocal || updatedAtLocal !== selectedItem.updatedAt) {
        setUpdated(true)
        localStorage.setItem(`updated_${id}`, selectedItem.updatedAt)
      }
    }
  }, [selectedItem, id])

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const formattedDate = format(date, 'dd/MM/yyyy HH:mm')
    return formattedDate
  }

  return (
    <main className="flex min-h-screen flex-col  items-center gap-5 pt-24 md:pt-[165px]">
      <article className="mb-5  flex w-full flex-col items-center">
        <div className="flex w-full items-center justify-around">
          {token && selectedItem && (
            <div className="flex gap-3 p-2">
              {openEdit !== selectedItem.id ? (
                <button
                  className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                  onClick={() => setOpenEdit(selectedItem.id)}
                >
                  Editar
                </button>
              ) : (
                <EditNew
                  img={selectedItem.coverUrl}
                  titulo={selectedItem.title}
                  conteudo={selectedItem.content}
                  id={id}
                  destacar={selectedItem.destaque}
                  setOpenEdit={setOpenEdit}
                />
              )}

              <RemoveNew id={id} />
            </div>
          )}
        </div>
        <h1 className="w-[90vw] max-w-[500px]  text-center text-2xl font-bold">
          {selectedItem && selectedItem.title ? (
            <>{selectedItem.title}</>
          ) : (
            <>Carregando...</>
          )}
        </h1>
        {selectedItem ? (
          <>
            <Image
              src={selectedItem.coverUrl}
              alt={selectedItem.title}
              width={500}
              height={500}
              priority
              className="w-[100vw] max-w-[500px] pt-2"
            />

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
