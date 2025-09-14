import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { MapPin, Clock, Calendar } from 'lucide-react'
import Link from 'next/link'

interface IgrejaPageProps {
  params: Promise<{ slug: string }>
}

async function getIgreja(slug: string) {
  const igreja = await prisma.igreja.findUnique({
    where: { slug, ativa: true },
    include: {
      news: {
        where: { isPublic: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: {
          id: true,
          title: true,
          content: true,
          coverUrl: true,
          createdAt: true,
          url: true,
        },
      },
      ministerios: {
        where: { isPublic: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: {
          id: true,
          name: true,
          title: true,
          coverUrl: true,
          createdAt: true,
        },
      },
      agendas: {
        where: { isPublic: true },
        orderBy: { day: 'asc' },
        take: 5,
        select: {
          id: true,
          name: true,
          day: true,
          hour: true,
          destaque: true,
        },
      },
    },
  })

  return igreja
}

export default async function IgrejaPage({ params }: IgrejaPageProps) {
  const { slug } = await params
  const igreja = await getIgreja(slug)

  if (!igreja) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Header da Igreja */}
      <section className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                  {igreja.tipo || 'Filial'}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {igreja.nome}
              </h1>
              {igreja.descricao && (
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {igreja.descricao}
                </p>
              )}
              {igreja.endereco && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>{igreja.endereco}</span>
                </div>
              )}
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Venha nos visitar
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Estamos ansiosos para recebê-lo em nossa comunidade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo da Igreja */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notícias */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Últimas Notícias
              </h2>
              <Link
                href={`/noticias/${slug}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Ver todas
              </Link>
            </div>

            {igreja.news.length > 0 ? (
              <div className="space-y-6">
                {igreja.news.map((news) => (
                  <article
                    key={news.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                  >
                    <div className="flex gap-4">
                      {news.coverUrl && (
                        <img
                          src={news.coverUrl}
                          alt={news.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                          {news.content
                            .replace(/<[^>]*>/g, '')
                            .substring(0, 150)}
                          ...
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(news.createdAt).toLocaleDateString(
                              'pt-BR',
                            )}
                          </span>
                          <Link
                            href={`/noticias/${slug}/${news.url}`}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                          >
                            Ler mais
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhuma notícia publicada ainda.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Ministérios */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Ministérios
              </h3>
              {igreja.ministerios.length > 0 ? (
                <div className="space-y-4">
                  {igreja.ministerios.map((ministerio) => (
                    <div
                      key={ministerio.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
                    >
                      <div className="flex gap-3">
                        {ministerio.coverUrl && (
                          <img
                            src={ministerio.coverUrl}
                            alt={ministerio.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {ministerio.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {ministerio.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Nenhum ministério cadastrado.
                  </p>
                </div>
              )}
            </div>

            {/* Agenda */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Próximos Eventos
              </h3>
              {igreja.agendas.length > 0 ? (
                <div className="space-y-3">
                  {igreja.agendas.map((agenda) => (
                    <div
                      key={agenda.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {agenda.name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Clock className="w-4 h-4" />
                            <span>
                              {agenda.day} às {agenda.hour}
                            </span>
                          </div>
                        </div>
                        {agenda.destaque && (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium rounded">
                            Destaque
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Nenhum evento agendado.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
