import { redirect } from 'next/navigation'
import { New } from '@/data/types/new'
import { Metadata } from 'next'
import ItemNew from '@/components/item-new'
import Link from 'next/link'

interface SearchProps {
  searchParams: Promise<{ q: string }>
}

export const metadata: Metadata = {
  title: 'Buscando produtos',
}

async function searchVp(query: string): Promise<New[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${baseUrl}/viladapenha/news/search?q=${query}`)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

async function searchVmh(query: string): Promise<New[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${baseUrl}/caxias/news/search?q=${query}`)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

async function searchTomazinho(query: string): Promise<New[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${baseUrl}/tomazinho/news/search?q=${query}`)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = await searchParams

  if (!query) {
    redirect('/')
  }

  const normalizedQuery = query.toLowerCase()

  const [newsVp, newsVmh, newsTomazinho] = await Promise.all([
    searchVp(normalizedQuery).catch(() => []),
    searchVmh(normalizedQuery).catch(() => []),
    searchTomazinho(normalizedQuery).catch(() => []),
  ])

  return (
    <div className="flex flex-col gap-16 pt-[150px] md:pt-[180px] px-8 min-h-screen pb-10">
      <p className="text-sm text-center">
        Resultado Para: <span className="font-semibold">{query}</span>
      </p>

      {newsVp.length === 0 &&
        newsVmh.length === 0 &&
        newsTomazinho.length === 0 && (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-center text-lg">Nenhum resultado encontrado</p>
            <Link href={'/'} className="button">
              Voltar para a página inicial
            </Link>
          </div>
        )}

      {newsVp.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Notícias de Vila da Penha</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {newsVp.map((item: New) => {
              const normalizedTitle = item.title.toLowerCase()
              if (normalizedTitle.includes(normalizedQuery)) {
                return (
                  <ItemNew
                    id={item.id}
                    coverUrl={item.coverUrl}
                    title={item.title}
                    content={item.content}
                    createdAt={item.createdAt}
                    page={item.page}
                    destaque={item.destaque}
                    key={item.id}
                    updatedAt={item.updatedAt}
                  />
                )
              }
              return null
            })}
          </div>
        </div>
      )}

      {newsVmh.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">
            Notícias de Vila Maria Helena
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            {newsVmh.map((item: New) => {
              const normalizedTitle = item.title.toLowerCase()
              if (normalizedTitle.includes(normalizedQuery)) {
                return (
                  <ItemNew
                    id={item.id}
                    coverUrl={item.coverUrl}
                    title={item.title}
                    content={item.content}
                    createdAt={item.createdAt}
                    page={item.page}
                    destaque={item.destaque}
                    key={item.id}
                    updatedAt={item.updatedAt}
                  />
                )
              }
              return null
            })}
          </div>
        </div>
      )}

      {newsTomazinho.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Notícias de Tomazinho</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {newsTomazinho.map((item: New) => {
              const normalizedTitle = item.title.toLowerCase()
              if (normalizedTitle.includes(normalizedQuery)) {
                return (
                  <ItemNew
                    id={item.id}
                    coverUrl={item.coverUrl}
                    title={item.title}
                    content={item.content}
                    createdAt={item.createdAt}
                    page={item.page}
                    destaque={item.destaque}
                    key={item.id}
                    updatedAt={item.updatedAt}
                  />
                )
              }
              return null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
