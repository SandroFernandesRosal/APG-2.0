'use client'
import { useToken } from '@/hooks/useToken'
import { useState } from 'react'
import Image from 'next/image'
import { Ministerio } from '@/data/types/ministerio'

import RemoveMinisterio from './crud/RemoveMinisterio'
import EditMinisterio from './crud/EditMinisterio'

export default function ItemMinisterio({
  id,
  title,
  name,
  local,
  coverUrl,
}: Ministerio) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)

  const token = useToken()
  return (
    <div className="justify-between flex flex-col h-[300px] md:h-[400px] w-[47%] max-w-[200px]  rounded-md border-[1px] border-zinc-300 dark:border-zinc-800">
      <div className="border-b-[3px] border-primary dark:border-secundary h-[50%] py-2 flex justify-center items-center">
        <Image
          src={coverUrl}
          width={130}
          height={130}
          alt={title}
          className="group-hover:scale-105 transition-transform duration-500 p-1 w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full border-[1px] border-primary dark:border-secundary"
        />
      </div>
      <div className="flex flex-col my-2 min-h-[100px] md:min-h-[70px] gap-2 justify-between items-center">
        <h1 className="text-center px-1">{name}</h1>

        <span>{title}</span>
        <span>{local}</span>

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
              <EditMinisterio
                nome={name}
                titulo={title}
                img={coverUrl}
                lugar={local}
                id={id}
                setOpenEdit={setOpenEdit}
              />
            )}
            <RemoveMinisterio id={id} />
          </div>
        )}
      </div>
    </div>
  )
}
