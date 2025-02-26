'use client'
import { useToken } from '@/hooks/useToken'
import { useState } from 'react'

import { Agenda } from '@/data/types/agenda'
import RemoveAgenda from './crud/RemoveAgenda'
import EditAgenda from './crud/EditAgenda'
export default function ItemAgenda({ id, day, name, hour }: Agenda) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)

  const token = useToken()
  return (
    <div
      className="justify-between flex flex-col h-[300px] md:h-[400px] w-[47%] max-w-[200px] rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
      key={id}
    >
      <div className="border-b-[3px] border-primary dark:border-secundary flex text-xl font-bold justify-center w-full  py-2">
        {day}
      </div>
      <ul className="relative   mt-10  flex place-self-center w-[80%] overflow-visible border-l border-zinc-300 dark:border-zinc-800">
        <li className="mb-5 ml-6">
          <span className="absolute  -left-1 flex h-2 w-2 items-center justify-center rounded-full bg-primary ring-8 ring-primary/20 dark:bg-secundary "></span>
          <h3 className=" flex items-center  font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>

          <p className="font-normal text-gray-500 dark:text-gray-400">{hour}</p>
        </li>
      </ul>
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
            <EditAgenda
              id={id}
              title={name}
              hora={hour}
              dia={day}
              setOpenEdit={setOpenEdit}
            />
          )}
          <RemoveAgenda id={id} />
        </div>
      )}
    </div>
  )
}
