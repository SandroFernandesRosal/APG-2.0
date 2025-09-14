'use client'
import { useIgrejas } from '@/hooks/useIgrejas'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

export default function Locais() {
  const { igrejas, loading } = useIgrejas({ showInactive: false })

  return (
    <section className="mb-5 flex w-full flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Conheça Nossas Igrejas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cada uma de nossas igrejas tem sua própria identidade e comunidade.
            Clique em uma igreja para conhecer mais sobre ela.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : igrejas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {igrejas.map((igreja) => (
              <Link
                key={igreja.id}
                href={`/igrejas/${igreja.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-2">
                      {igreja.tipo || 'Filial'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {igreja.nome}
                  </h3>

                  {igreja.descricao && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {igreja.descricao}
                    </p>
                  )}

                  {igreja.endereco && (
                    <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{igreja.endereco}</span>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-800 dark:group-hover:text-blue-300">
                      Ver detalhes →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhuma igreja cadastrada
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              As igrejas aparecerão aqui quando forem cadastradas.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
