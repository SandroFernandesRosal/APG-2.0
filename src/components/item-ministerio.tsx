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
    <div
      className={`justify-between mb-12 relative  flex flex-col h-[400px] w-[47%] max-w-[300px] border-[1px] border-zinc-300 dark:border-zinc-800   bg-bglight dark:bg-bgdark group ${token && 'mb-10 md:mb-14'}`}
      key={id}
    >
      <div className="h-[60%] relative overflow-hidden">
        <div className="group h-full  overflow-hidden relative ">
          <div
            className="absolute inset-0 bg-cover bg-center  blur-sm scale-110"
            style={{
              backgroundImage: `url(${coverUrl})`,
            }}
          />
          <Image
            src={coverUrl}
            width={500}
            height={500}
            alt={title}
            quality={100}
            className="relative z-10 h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1  h-[40%]  w-full justify-evenly items-center text-xl">
        <div className="text-primary dark:text-secundary z-30">
          <p className="text-center  font-bold ">{name}</p>
        </div>
        <div className="flex px-2  z-30 ">{title}</div>
        <span>{local}</span>
      </div>

      {token && (
        <div className=" mb-1 flex w-full mt-5 flex-1 items-end justify-around text-white">
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
  )
}
