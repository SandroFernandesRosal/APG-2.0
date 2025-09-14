import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import ItemNew from '@/components/item-new'
import Link from 'next/link'
import { FaArrowLeft, FaNewspaper } from 'react-icons/fa'

interface NewsPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params

  const igreja = await prisma.igreja.findUnique({
    where: { slug },
  })

  if (!igreja) {
    return {
      title: 'Igreja não encontrada',
    }
  }

  return {
    title: `Notícias - ${igreja.nome}`,
    description: `Últimas notícias da ${igreja.nome}`,
  }
}

async function getNewsByIgreja(slug: string) {
  const igreja = await prisma.igreja.findUnique({
    where: { slug },
  })

  if (!igreja) {
    return null
  }

  const news = await prisma.new.findMany({
    where: {
      igrejaId: igreja.id,
      isPublic: true,
    },
    orderBy: { createdAt: 'desc' },
    include: {
      igreja: true,
    },
  })

  return { igreja, news }
}

export default async function NewsByIgrejaPage({ params }: NewsPageProps) {
  const { slug } = await params
  const result = await getNewsByIgreja(slug)

  if (!result) {
    notFound()
  }

  const { igreja, news } = result

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/noticias"
              className="flex items-center gap-2 text-primary dark:text-secundary hover:opacity-80 transition-opacity"
            >
              <FaArrowLeft className="w-4 h-4" />
              Voltar para notícias
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <FaNewspaper className="w-8 h-8 text-primary dark:text-secundary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Notícias - {igreja.nome}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Últimas notícias da {igreja.nome}
              </p>
            </div>
          </div>

          {news.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-blue-700 dark:text-blue-300">
                <span className="font-semibold">{news.length}</span> notícias
                encontradas
              </p>
            </div>
          )}
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaNewspaper className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nenhuma notícia encontrada
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ainda não há notícias publicadas para a {igreja.nome}.
              </p>
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 bg-primary dark:bg-secundary hover:bg-primary/90 dark:hover:bg-secundary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                Ver todas as notícias
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <ItemNew
                key={item.id}
                id={item.id}
                coverUrl={item.coverUrl || undefined}
                videoUrl={item.videoUrl || undefined}
                title={item.title}
                content={item.content}
                createdAt={item.createdAt.toISOString()}
                page={item.page}
                destaque={item.destaque}
                updatedAt={item.updatedAt.toISOString()}
                url={item.url}
                igrejaId={item.igrejaId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Gerar páginas estáticas para igrejas existentes
export async function generateStaticParams() {
  const igrejas = await prisma.igreja.findMany({
    where: { ativa: true },
    select: { slug: true },
  })

  return igrejas.map((igreja) => ({
    slug: igreja.slug,
  }))
}
