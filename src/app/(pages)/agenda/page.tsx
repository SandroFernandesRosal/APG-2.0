'use client'
import SelectLocal from '@/components/SelectLocal'
import Eventos from '@/components/eventos'

import { useState } from 'react'
import { useToken } from '@/hooks/useToken'
import { FaPlus } from 'react-icons/fa'

import AddAgenda from '@/components/crud/AddAgenda'
import AgendaHeader from '@/components/agenda-header'
import { useLocal } from '@/store/useStore'

export default function AgendaPage() {
  const [openAgenda, setOpenAgenda] = useState(false)
  const { setLocal } = useLocal()
  const token = useToken()

  const podeAdicionar =
    token && (token.role === 'SUPERADMIN' || token.role === 'ADMIN')

  return (
    <main className="mb-8  mt-20 flex flex-col items-center justify-center  gap-4   md:mt-[145px]   md:items-start    lg:mt-[160px] ">
      <div className=" w-full  flex-col items-center  md:min-w-[35%] flex">
        <AgendaHeader />

        {podeAdicionar && (
          <>
            {!openAgenda && (
              <button
                className="flex items-center gap-2 px-6 py-3 bg-primary dark:bg-gray-600 text-white font-semibold rounded-lg hover:bg-primary/90 dark:hover:bg-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
                onClick={() => setOpenAgenda(true)}
              >
                <FaPlus className="text-sm" />
                Adicionar evento
              </button>
            )}

            {openAgenda && (
              <div className="md:min-w-[35%]">
                <AddAgenda setOpenAgenda={setOpenAgenda} />
              </div>
            )}
          </>
        )}

        <SelectLocal onChange={setLocal} />
      </div>
      <Eventos />
    </main>
  )
}
