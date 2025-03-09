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
      className="justify-between relative flex flex-col h-[300px] md:h-[400px] w-[47%] max-w-[200px] rounded-md border-[1px] border-zinc-400 dark:border-zinc-700 group"
      key={id}
    >
      <div className="h-[100%] absolute overflow-hidden">
        <Link
          href={`/noticias/${page}/${id}`}
          className="group h-full rounded-md overflow-hidden"
        >
          <Image
            src={coverUrl}
            width={500}
            height={500}
            alt={title}
            className="group-hover:scale-105 transition-transform duration-500 h-full rounded-md object-cover object-center opacity-90"
          />
        </Link>
      </div>

      <div className="hidden group-hover:flex flex-col gap-1 absolute bottom-0 rounded-b-md h-[50%] bg-black/80 w-full ">
        <Link href={`/noticias/${page}/${id}`} className="text-primary z-30">
          <p className="text-center px-1 text-xl text-white font-semibold ">
            {title}
          </p>
        </Link>
        <div className="flex px-2 text-white z-30">{content}</div>
      </div>

      <Link
        href={`/noticias/${page}/${id}`}
        className="rounded-md text-white bg-primary absolute bottom-5 left-5 text-center px-2 md:text-xl border-[1px] border-secundary z-20"
      >
        Ler notícia
      </Link>

      <span className="absolute top-3 right-3 text-sm bg-primary rounded-md p-1 text-white border-[1px] border-secundary z-20 flex flex-wrap w-10   justify-center items-center text-center">
        {formatDate(createdAt)}
      </span>

      {token && (
        <div className="flex w-full absolute top-16 right-0 items-start justify-around text-white py-3 h-[170px]">
          {openEdit !== id ? (
            <button
              className="button"
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
