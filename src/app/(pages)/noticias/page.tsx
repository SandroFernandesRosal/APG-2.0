'use client'
import SelectLocal from '@/components/SelectLocal'
import News from '@/components/news'

import { useToken } from '@/hooks/useToken'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import NoticiasHeader from '@/components/noticias-header'

export default function Noticias() {
  const token = useToken()
  const router = useRouter()

  const podeAdicionar = token?.role === 'ADMIN' || token?.role === 'SUPERADMIN'

  const handleAddNews = () => {
    router.push('/usuarios')
  }

  return (
    <main className="mb-8  mt-20 flex flex-col items-center justify-center  gap-4  md:mt-[145px]   md:items-start   lg:mt-[160px] ">
      <div className=" w-full  flex-col items-center  md:min-w-[35%] flex">
        <NoticiasHeader />

        {podeAdicionar && (
          <button
            className="flex items-center gap-2 px-6 py-3 bg-primary dark:bg-gray-600 text-white font-semibold rounded-lg hover:bg-primary/90 dark:hover:bg-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
            onClick={handleAddNews}
          >
            <FaPlus className="text-sm" />
            Adicionar Notícia
          </button>
        )}

        <SelectLocal onChange={(newLocal) => console.log(newLocal)} />
      </div>
      <News />
    </main>
  )
}
