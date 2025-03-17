'use client'
import { useToken } from '@/hooks/useToken'
import { useState } from 'react'
import Image from 'next/image'

import { Agenda } from '@/data/types/agenda'
import RemoveAgenda from './crud/RemoveAgenda'
import EditAgenda from './crud/EditAgenda'
export default function ItemAgenda({ id, day, name, hour }: Agenda) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)

  const token = useToken()
  return (
    <div
      className="flex flex-col  justify-center relative content-center  h-[400px]  w-[47%] max-w-[300px] rounded-md border-[1px] border-zinc-400 dark:border-zinc-700"
      key={id}
    >
      <Image
        src={'/img/agenda.png'}
        width={500}
        height={500}
        alt="imagem de evento"
        className="absolute top-0 inset-0 h-full w-full "
      />
      <div>
        <div className=" bg-primary   text-white dark:border-secundary flex text-xl  justify-center w-[80%] place-self-center  rounded-md z-50">
          {day}
        </div>
        <ul className="relative   mt-5  flex place-self-center w-[80%] overflow-visible border-l border-zinc-400 dark:border-zinc-700 border-[1px] ">
          <li className="  w-full">
            <span className="absolute  left-2 top-5 flex h-2 w-2 items-center justify-center rounded-full bg-primary ring-8 ring-primary/20 dark:bg-secundary "></span>
            <h3 className=" flex items-center  font-semibold text-gray-900 dark:text-white border-b-[1px] border-zinc-400 dark:border-zinc-700 place-content-center">
              {name}
            </h3>

            <p className="font-normal text-gray-500 dark:text-gray-400 place-content-center flex">
              {hour}
            </p>
          </li>
        </ul>
        {token && (
          <div className="mt-2 flex w-full flex-1 items-end justify-around text-white ">
            {openEdit !== id ? (
              <button
                className="button !mb-0"
                onClick={() => {
                  setOpenEdit(id)
                }}
              >
                Editar
              </button>
            ) : (
              <EditAgenda
                setOpenEdit={setOpenEdit}
                id={id}
                title={name}
                hora={hour}
                dia={day}
              />
            )}
            <RemoveAgenda id={id} />
          </div>
        )}
      </div>
    </div>
  )
}
