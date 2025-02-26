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
  destaque,
}: New) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)

  const token = useToken()
  return (
    <div
      className="justify-between flex flex-col h-[300px] md:h-[400px] w-[47%] max-w-[200px] rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
      key={id}
    >
      <div className="border-b-[3px] border-primary dark:border-secundary h-[50%] pb-2">
        <Link href={`/noticias/${page}/${id}`} className="group h-full">
          <Image
            src={coverUrl}
            width={500}
            height={500}
            alt={title}
            className="group-hover:scale-105 transition-transform duration-500 p-2 h-full rounded-t-md"
          />
        </Link>
      </div>
      <div className="flex flex-col my-2 min-h-[100px] md:min-h-[70px] gap-2 justify-between">
        <Link href={`/${page}/${id}`}>
          <p className="text-center px-1">{title}</p>
        </Link>
        <div className="flex flex-wrap justify-evenly px-2 gap-2">
          {content}
        </div>
      </div>
      {token && (
        <div className=" mb-1 flex w-full flex-1 items-end justify-around text-white">
          {openEdit !== id ? (
            <button
              className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
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
