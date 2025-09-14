'use client'
import SelectLocal from '@/components/SelectLocal'
import News from '@/components/news'
import { useToken } from '@/hooks/useToken'
import { FaPlus, FaChurch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import NoticiasHeader from '@/components/noticias-header'
import { useIgrejas } from '@/hooks/useIgrejas'
import Link from 'next/link'

export default function Noticias() {
  const token = useToken()
  const router = useRouter()
  const { igrejas, loading } = useIgrejas({ showInactive: false })

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

        {/* Links para páginas dinâmicas das igrejas */}
        {!loading && igrejas.length > 0 && (
          <div className="w-full mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaChurch className="w-5 h-5 text-primary dark:text-secundary" />
              Notícias por Igreja
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {igrejas.map((igreja) => (
                <Link
                  key={igreja.id}
                  href={`/noticias/${igreja.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-secundary"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-secundary/10 rounded-full flex items-center justify-center">
                      <FaChurch className="w-5 h-5 text-primary dark:text-secundary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {igreja.nome}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ver notícias específicas
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <News />
    </main>
  )
}
