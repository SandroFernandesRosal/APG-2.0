'use client'
import SelectLocal from '@/components/SelectLocal'

import { useState } from 'react'
import { useToken } from '@/hooks/useToken'

import AddMinisterio from '@/components/crud/AddMinisterio'
import Ministerioo from '@/components/ministerio'
import MinisterioHeader from '@/components/ministerio-header'

export default function MinisterioPage() {
  const [openMinisterio, setOpenMinisterio] = useState(false)
  const token = useToken()
  const podeAdicionar = token?.role === 'ADMIN' || token?.role === 'SUPERADMIN'

  return (
    <main className="mb-8  mt-20 flex flex-col items-center justify-center  gap-4 rounded-[35px] bg-transparent  md:mt-[145px]   md:items-start    lg:mt-[160px] ">
      <div className=" w-full  flex-col items-center  md:min-w-[35%] flex">
        <MinisterioHeader />

        {podeAdicionar && (
          <>
            {openMinisterio === false && (
              <button
                className="rounded-md mb-2 border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                onClick={() => setOpenMinisterio(true)}
              >
                Adicionar Líder
              </button>
            )}

            {openMinisterio && (
              <div className="md:min-w-[35%]">
                <AddMinisterio
                  openMinisterio={openMinisterio}
                  setOpenMinisterio={setOpenMinisterio}
                />
              </div>
            )}
          </>
        )}

        <SelectLocal onChange={(newLocal) => console.log(newLocal)} />
      </div>
      <Ministerioo />
    </main>
  )
}
