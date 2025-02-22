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
    <main className="mb-8  mt-24 flex flex-col items-center justify-center  gap-4 rounded-[35px] bg-transparent md:mx-4 md:mt-[145px]   md:items-start  md:p-2 md:px-2  lg:mx-[5%]  lg:mt-[160px] lg:bg-bglightsecundary lg:shadow-light  lg:dark:bg-bgdarksecundary lg:dark:shadow-dark">
      <div className=" w-full  flex-col items-center  md:min-w-[35%] flex">
        <h1 className="m-0 text-lg font-bold text-primary dark:text-secundary flex ">
          Notícias
        </h1>
        <p className=" px-2 text-center text-xl flex mb-4">
          Fique por dentro das notícias
        </p>

        <SelectLocal onChange={(newLocal) => console.log(newLocal)} />
        {token && (
          <>
            {openNew === false && (
              <div
                className="mb-4 flex cursor-pointer rounded-lg border-[1px] border-zinc-300 bg-bglight p-2 placeholder-black outline-none  hover:bg-gradient-to-r hover:from-blue-900 hover:to-slate-900 hover:text-white focus:ring-0 dark:border-zinc-800 dark:bg-bgdark dark:placeholder-white "
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
        <Search />
      </div>
      <News />
    </main>
  )
}
