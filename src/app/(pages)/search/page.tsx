import { redirect } from 'next/navigation'
import { New } from '@/data/types/new'
import { Metadata } from 'next'
import ItemNew from '@/components/item-new'
import Link from 'next/link'
import { FaSearch, FaArrowLeft } from 'react-icons/fa'

interface Igreja {
  id: string
  nome: string
  slug: string
}

interface SearchProps {
  searchParams: Promise<{ q: string }>
}

export const metadata: Metadata = {
  title: 'Buscando notícias',
}

async function searchAllNews(query: string): Promise<New[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/news/search?q=${query}`,
    { cache: 'no-store' },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

async function getAllIgrejas(): Promise<Igreja[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/igrejas`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch igrejas')
  }

  return response.json()
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = await searchParams

  if (!query) {
    redirect('/')
  }

  const normalizedQuery = query.toLowerCase()
  const allNews = await searchAllNews(normalizedQuery).catch(() => [])
  const igrejas = await getAllIgrejas().catch(() => [])

  // Agrupa notícias por igreja dinamicamente
  const newsByIgreja = igrejas
    .map((igreja) => ({
      igreja,
      news: allNews.filter((item) => item.igrejaId === igreja.id),
    }))
    .filter((group) => group.news.length > 0)

  const totalResults = newsByIgreja.reduce(
    (total, group) => total + group.news.length,
    0,
  )

  return (
    <div className="min-h-screen">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 pt-[150px] md:pt-[180px] pb-10">
        {/* Header da Busca */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaSearch className="w-6 h-6 text-primary dark:text-secundary" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Resultados da Busca
            </h1>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Resultado para:{' '}
              <span className="font-semibold text-primary dark:text-secundary bg-primary/10 dark:bg-secundary/10 px-3 py-1 rounded-full">
                {query}
              </span>
            </p>
            {totalResults > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {totalResults}{' '}
                {totalResults === 1
                  ? 'resultado encontrado'
                  : 'resultados encontrados'}
              </p>
            )}
          </div>
        </div>

        {/* Conteúdo dos Resultados */}
        <div className="space-y-8">
          {newsByIgreja.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Nenhum resultado encontrado
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Não encontramos notícias para &ldquo;{query}&rdquo;. Tente
                  usar outras palavras-chave.
                </p>
                <Link
                  href={'/'}
                  className="inline-flex items-center gap-2 bg-primary dark:bg-secundary hover:bg-primary/90 dark:hover:bg-secundary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  Voltar para a página inicial
                </Link>
              </div>
            </div>
          )}

          {newsByIgreja.map((group, index) => {
            const colors = [
              'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
              'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
              'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
              'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
              'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
            ]
            const colorClass = colors[index % colors.length]

            return (
              <div
                key={group.igreja.id}
                className="bg-white/10 dark:bg-black/10 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Notícias de {group.igreja.nome}
                  </h2>
                  <span
                    className={`${colorClass} px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {group.news.length}{' '}
                    {group.news.length === 1 ? 'notícia' : 'notícias'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.news.map((item: New) => {
                    const normalizedTitle = item.title.toLowerCase()
                    if (normalizedTitle.includes(normalizedQuery)) {
                      return (
                        <ItemNew
                          id={item.id}
                          coverUrl={item.coverUrl}
                          videoUrl={item.videoUrl}
                          title={item.title}
                          content={item.content}
                          createdAt={item.createdAt}
                          page={item.page}
                          destaque={item.destaque}
                          key={item.id}
                          updatedAt={item.updatedAt}
                          url={item.url}
                          igrejaId={item.igrejaId}
                        />
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
