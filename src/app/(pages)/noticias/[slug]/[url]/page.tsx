'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { New } from '@/data/types/new'
import Image from 'next/image'
import { FaCalendarAlt, FaChurch } from 'react-icons/fa'
import { useIgrejas } from '@/hooks/useIgrejas'

export default function NoticiaPage() {
  const params = useParams()
  const { igrejas } = useIgrejas()
  const [noticia, setNoticia] = useState<New | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Função para buscar nome da igreja sem fazer API calls
  const getIgrejaNameById = (igrejaId: string | null) => {
    if (!igrejaId) return 'Igreja não encontrada'
    const igreja = igrejas.find((i) => i.id === igrejaId)
    return igreja ? igreja.nome : 'Igreja não encontrada'
  }

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/news`)
        if (!response.ok) throw new Error('Erro ao buscar notícias')

        const noticias = await response.json()
        const noticiaEncontrada = noticias.find(
          (n: New) => n.url === params.url,
        )

        if (!noticiaEncontrada) {
          setError('Notícia não encontrada')
          return
        }

        setNoticia(noticiaEncontrada)
      } catch (err) {
        console.error('Erro ao buscar notícia:', err)
        setError('Erro ao carregar notícia')
      } finally {
        setLoading(false)
      }
    }

    if (params.url) {
      fetchNoticia()
    }
  }, [params.url])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[120px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando notícia...</p>
        </div>
      </div>
    )
  }

  if (error || !noticia) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[120px]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-4">Notícia não encontrada</p>
          <a href="/noticias" className="text-primary hover:underline">
            Voltar para notícias
          </a>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 mt-[120px]">
      <div className="max-w-4xl mx-auto px-4">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {noticia.coverUrl && (
            <div className="relative h-96 w-full">
              <Image
                src={noticia.coverUrl}
                alt={noticia.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {noticia.videoUrl && !noticia.coverUrl && (
            <div className="relative h-96 w-full">
              <video
                src={noticia.videoUrl}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>
                  {new Date(noticia.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaChurch />
                <span>{getIgrejaNameById(noticia.igrejaId)}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {noticia.title}
            </h1>

            <div
              className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: noticia.content }}
            />
          </div>
        </article>
      </div>
    </main>
  )
}
