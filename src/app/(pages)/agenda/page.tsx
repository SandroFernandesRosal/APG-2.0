'use client'
import SelectLocal from '@/components/SelectLocal'
import Eventos from '@/components/eventos'

import { useState } from 'react'
import { useToken } from '@/hooks/useToken'

import AddAgenda from '@/components/crud/AddAgenda'
import AgendaHeader from '@/components/agenda-header'

export default function AgendaPage() {
  const [openAgenda, setOpenAgenda] = useState(false)
  const token = useToken()
  return (
    <main className="mb-8  mt-20 flex flex-col items-center justify-center  gap-4   md:mt-[145px]   md:items-start    lg:mt-[160px] ">
      <div className=" w-full  flex-col items-center  md:min-w-[35%] flex">
        <AgendaHeader />

        {token?.role === 'ADMIN' && (
          <>
            {openAgenda === false && (
              <button
                className="rounded-md mb-2 border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                onClick={() => setOpenAgenda(true)}
              >
                Adicionar evento
              </button>
            )}

            {openAgenda && (
              <div className="md:min-w-[35%]">
                <AddAgenda
                  openAgenda={openAgenda}
                  setOpenAgenda={setOpenAgenda}
                />
              </div>
            )}
          </>
        )}

        <SelectLocal onChange={(newLocal) => console.log(newLocal)} />
      </div>
      <Eventos />
    </main>
  )
}
