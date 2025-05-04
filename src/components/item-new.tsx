'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { New } from '@/data/types/new'
import { useToken } from '@/hooks/useToken'
import RemoveNew from './crud/RemoveNew'
import EditNew from './crud/EditNew'
import { useState } from 'react'

export default function ItemNew({
  id,
  page,
  coverUrl,
  title,
  content,
  createdAt,
  destaque,
  url,
}: New) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)

  const token = useToken()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' })
    return `${day} ${month}`
  }
  return (
    <div
      className={`justify-between relative flex flex-col h-[400px] w-[47%] max-w-[300px] border-[1px] border-zinc-300 dark:border-zinc-800   group ${token && 'mb-20 md:mb-24'} `}
      key={id}
    >
      <div className="h-[50%] relative overflow-hidden">
        <Link
          aria-hidden="true"
          tabIndex={-1}
          href={`/noticias/${page}/${url}`}
          className="group h-full rounded-md overflow-hidden relative"
        >
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
            style={{
              backgroundImage: `url(${coverUrl})`,
            }}
          />
          <Image
            src={coverUrl}
            width={200}
            height={500}
            alt={title}
            className="relative z-10 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-1 justify-around   h-[50%] w-full z-10 mx-2">
        <Link
          aria-hidden="true"
          tabIndex={-1}
          href={`/noticias/${page}/${url}`}
          className="text-primary z-30"
        >
          <h1 className="text-center  text-xl  font-semibold text-primary dark:text-secundary">
            {title}
          </h1>
        </Link>
        <div className="flex  text-lg">
          {content.slice(0, 50).concat('...')}
        </div>

        <span className=" text-sm  flex flex-wrap   items-center ">
          {formatDate(createdAt)}
        </span>
        <Link
          aria-hidden="true"
          tabIndex={-1}
          href={`/noticias/${page}/${url}`}
          className="button  !mb-0 flex items-center justify-center self-center"
        >
          Ler notícia
        </Link>
      </div>
      {token && (
        <div className="flex w-full items-start justify-around text-white py-3 ">
          {openEdit !== id ? (
            <button
              aria-hidden="true"
              tabIndex={-1}
              className="button !mb-0"
              onClick={() => {
                setOpenEdit(id)
              }}
            >
              Editar
            </button>
          ) : (
            <EditNew
              id={id}
              titulo={title}
              conteudo={content}
              img={coverUrl}
              setOpenEdit={setOpenEdit}
              destacar={destaque}
            />
          )}
          <RemoveNew id={id} />
        </div>
      )}
    </div>
  )
}
