'use client'
import SelectLocal from '@/components/SelectLocal'
import News from '@/components/news'
import Search from '@/components/Search'

import { useState } from 'react'
import { useToken } from '@/hooks/useToken'
import AddNew from '@/components/crud/AddNew'

export default function Noticias() {
  const [openNew, setOpenNew] = useState(false)
  const token = useToken()
  return (
    <main className="mb-8  mt-24 flex flex-col items-center justify-center  gap-4  md:mx-4 md:mt-[145px]   md:items-start  md:p-2 md:px-2  lg:mx-[5%]  lg:mt-[160px] ">
      <div className=" w-full  flex-col items-center  md:min-w-[35%] flex">
        <h1 className="m-0 text-lg font-bold text-primary dark:text-secundary flex ">
          Notícias
        </h1>
        <p className=" px-2 text-center text-xl flex mb-4">
          Fique por dentro das notícias
        </p>

        {token && (
          <>
            {openNew === false && (
              <div
                className="rounded-md mb-2 border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                onClick={() => setOpenNew(true)}
              >
                Adicionar Notícia
              </div>
            )}

            {openNew && (
              <div className="md:min-w-[35%]">
                {' '}
                <AddNew openNew={openNew} setOpenNew={setOpenNew} />
              </div>
            )}
          </>
        )}

        <SelectLocal onChange={(newLocal) => console.log(newLocal)} />

        <Search />
      </div>
      <News />
    </main>
  )
}
