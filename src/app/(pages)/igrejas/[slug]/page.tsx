'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { FaMapMarkerAlt, FaChurch } from 'react-icons/fa'
import {
  Landmark,
  KeyRound,
  Copy,
  Calendar,
  Users,
  Newspaper,
  Clock,
  Phone,
  MessageCircle,
  Facebook,
  Youtube,
  Instagram,
} from 'lucide-react'
import Link from 'next/link'
import { useIgrejas } from '@/hooks/useIgrejas'
import Image from 'next/image'

interface Igreja {
  id: string
  nome: string
  slug: string
  ativa: boolean
  endereco?: string
  descricao?: string
  tipo?: string
  banco?: string
  conta?: string
  agencia?: string
  nomebanco?: string
  pix?: string
  nomepix?: string
  telefone?: string
  whatsapp?: string
  facebook?: string
  youtube?: string
  instagram?: string
  createdAt: string
  updatedAt: string
}

interface New {
  id: string
  title: string
  content: string
  coverUrl?: string
  videoUrl?: string
  createdAt: string
  url: string
  destaque: boolean
  igrejaId: string | null
}

interface Agenda {
  id: string
  name: string
  day: string
  hour: string
  igrejaId: string | null
}

interface Ministerio {
  id: string
  nome: string
  titulo: string[]
  img?: string
  igrejaId: string | null
}

export default function IgrejaPage() {
  const params = useParams()
  const { igrejas } = useIgrejas({ showInactive: false })
  const [igreja, setIgreja] = useState<Igreja | null>(null)
  const [noticias, setNoticias] = useState<New[]>([])
  const [eventos, setEventos] = useState<Agenda[]>([])
  const [ministerios, setMinisterios] = useState<Ministerio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (params.slug && igrejas.length > 0) {
        const igrejaEncontrada = igrejas.find((i) => i.slug === params.slug)
        if (igrejaEncontrada) {
          setIgreja(igrejaEncontrada)

          // Buscar notícias da igreja
          try {
            const noticiasRes = await fetch('/api/news')
            if (noticiasRes.ok) {
              const todasNoticias = await noticiasRes.json()
              const noticiasIgreja = todasNoticias.filter(
                (n: New) => n.igrejaId === igrejaEncontrada.id,
              )
              setNoticias(noticiasIgreja.slice(0, 3))
            }
          } catch (error) {
            console.error('Erro ao buscar notícias:', error)
          }

          // Buscar eventos da igreja
          try {
            const eventosRes = await fetch('/api/agenda')
            if (eventosRes.ok) {
              const todosEventos = await eventosRes.json()
              const eventosIgreja = todosEventos.filter(
                (e: Agenda) => e.igrejaId === igrejaEncontrada.id,
              )
              setEventos(eventosIgreja.slice(0, 3))
            }
          } catch (error) {
            console.error('Erro ao buscar eventos:', error)
          }

          // Buscar ministérios da igreja
          try {
            const ministeriosRes = await fetch('/api/ministerio')
            if (ministeriosRes.ok) {
              const todosMinisterios = await ministeriosRes.json()
              const ministeriosIgreja = todosMinisterios.filter(
                (m: Ministerio) => m.igrejaId === igrejaEncontrada.id,
              )
              setMinisterios(ministeriosIgreja.slice(0, 3))
            }
          } catch (error) {
            console.error('Erro ao buscar ministérios:', error)
          }
        } else {
          setError('Igreja não encontrada')
        }
        setLoading(false)
      }
    }

    fetchData()
  }, [params.slug, igrejas])

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => {
        setCopiedId(null)
      }, 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !igreja) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <FaChurch className="text-6xl text-gray-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              404
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Igreja não encontrada
            </p>
            <Link href="/igrejas" className="text-primary hover:underline">
              Voltar para igrejas
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="mb-8 mt-28 flex flex-col items-center justify-center gap-4  md:items-start ">
      <div className="w-full max-w-7xl  mx-auto px-4">
        <div className="space-y-8">
          {/* Informações da Igreja */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {/* Header da Igreja */}
            <div className="flex items-center gap-4 mb-8">
              <FaChurch className="text-4xl text-primary" />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {igreja.nome}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  {igreja.tipo && (
                    <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                      {igreja.tipo}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      igreja.ativa
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {igreja.ativa ? 'Igreja Ativa' : 'Igreja Inativa'}
                  </span>
                </div>
              </div>
            </div>
            {igreja.descricao && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {igreja.descricao}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Localização */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  Localização
                </h3>
                <p className="text-gray-600 dark:text-gray-400 pl-8">
                  {igreja.endereco || 'Não informado'}
                </p>
              </div>

              {/* Dados Bancários */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <Landmark className="text-primary" />
                  Dados Bancários
                </h3>
                <div className="space-y-2 pl-8">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Banco:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {igreja.banco || 'Não informado'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Conta:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {igreja.conta || 'Não informado'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Agência:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {igreja.agencia || 'Não informado'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Titular:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {igreja.nomebanco || 'Não informado'}
                    </span>
                  </div>
                </div>
              </div>

              {/* PIX */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <KeyRound className="text-primary" />
                  Chave PIX
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg pl-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {igreja.pix || 'Não informado'}
                      </p>
                      {igreja.nomepix && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {igreja.nomepix}
                        </p>
                      )}
                    </div>
                    {igreja.pix && (
                      <button
                        onClick={() => handleCopy(igreja.pix!, igreja.id)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                        title="Copiar PIX"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {copiedId === igreja.id && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ PIX copiado!
                    </p>
                  )}
                </div>
              </div>

              {/* Contato */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <Phone className="text-primary" />
                  Contato
                </h3>
                <div className="space-y-3 pl-8">
                  {igreja.telefone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Telefone:
                      </span>
                      <a
                        href={`tel:${igreja.telefone}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {igreja.telefone}
                      </a>
                    </div>
                  )}
                  {igreja.whatsapp && (
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        WhatsApp:
                      </span>
                      <a
                        href={`https://wa.me/${igreja.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-green-500 hover:underline"
                      >
                        {igreja.whatsapp}
                      </a>
                    </div>
                  )}
                  {igreja.facebook && (
                    <div className="flex items-center gap-3">
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Facebook:
                      </span>
                      <a
                        href={igreja.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Ver página
                      </a>
                    </div>
                  )}
                  {igreja.youtube && (
                    <div className="flex items-center gap-3">
                      <Youtube className="w-5 h-5 text-red-600" />
                      <span className="text-gray-600 dark:text-gray-400">
                        YouTube:
                      </span>
                      <a
                        href={igreja.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-red-600 hover:underline"
                      >
                        Ver canal
                      </a>
                    </div>
                  )}
                  {igreja.instagram && (
                    <div className="flex items-center gap-3">
                      <Instagram className="w-5 h-5 text-pink-600" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Instagram:
                      </span>
                      <a
                        href={igreja.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-pink-600 hover:underline"
                      >
                        @igreja
                      </a>
                    </div>
                  )}
                  {!igreja.telefone &&
                    !igreja.whatsapp &&
                    !igreja.facebook &&
                    !igreja.youtube &&
                    !igreja.instagram && (
                      <p className="text-gray-500 dark:text-gray-400">
                        Nenhuma informação de contato disponível.
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Links de Acesso Rápido */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="text-primary" />
              Acesso Rápido
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href={`/noticias/${igreja.slug}`}
                className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Newspaper className="w-6 h-6" />
                <span className="font-medium">Ver Notícias</span>
              </Link>
              <Link
                href="/agenda"
                className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Calendar className="w-6 h-6" />
                <span className="font-medium">Ver Eventos</span>
              </Link>
              <Link
                href="/ministerio"
                className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Users className="w-6 h-6" />
                <span className="font-medium">Ministérios</span>
              </Link>
            </div>

            {/* Conteúdo da Igreja */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Notícias */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <Newspaper className="text-primary" />
                      Últimas Notícias
                    </h2>
                    <Link
                      href={`/noticias/${igreja.slug}`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Ver todas
                    </Link>
                  </div>
                  {noticias.length > 0 ? (
                    <div className="space-y-4">
                      {noticias.map((noticia) => (
                        <div
                          key={noticia.id}
                          className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {noticia.coverUrl ? (
                            <div className="flex-shrink-0">
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src={noticia.coverUrl}
                                  alt={noticia.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <Newspaper className="w-8 h-8 text-gray-400" />
                              </div>
                            </div>
                          )}
                          <div className="flex-grow">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                              {noticia.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                              {noticia.content.replace(/<[^>]*>/g, '')}
                            </p>
                            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                              <span>
                                {new Date(noticia.createdAt).toLocaleDateString(
                                  'pt-BR',
                                )}
                              </span>
                              <Link
                                href={`/noticias/${igreja.slug}/${noticia.url}`}
                                className="text-primary hover:underline font-medium"
                              >
                                Ler mais
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      Nenhuma notícia encontrada.
                    </p>
                  )}
                </div>

                {/* Eventos */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <Calendar className="text-primary" />
                      Próximos Eventos
                    </h2>
                    <Link
                      href="/agenda"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Ver todos
                    </Link>
                  </div>
                  {eventos.length > 0 ? (
                    <div className="space-y-4">
                      {eventos.map((evento) => (
                        <div
                          key={evento.id}
                          className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-primary text-white rounded-lg flex flex-col items-center justify-center">
                              <span className="text-sm font-bold">
                                {new Date(evento.day).getDate()}
                              </span>
                              <span className="text-xs">
                                {new Date(evento.day).toLocaleDateString(
                                  'pt-BR',
                                  {
                                    month: 'short',
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                              {evento.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{evento.hour}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(evento.day).toLocaleDateString(
                                    'pt-BR',
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      Nenhum evento encontrado.
                    </p>
                  )}
                </div>

                {/* Ministérios */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <Users className="text-primary" />
                      Ministérios
                    </h2>
                    <Link
                      href="/ministerio"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Ver todos
                    </Link>
                  </div>
                  {ministerios.length > 0 ? (
                    <div className="space-y-4">
                      {ministerios.map((ministerio) => (
                        <div
                          key={ministerio.id}
                          className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {ministerio.img ? (
                            <div className="flex-shrink-0">
                              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                <Image
                                  src={ministerio.img}
                                  alt={ministerio.nome}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <Users className="w-8 h-8 text-gray-400" />
                              </div>
                            </div>
                          )}
                          <div className="flex-grow">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                              {ministerio.nome}
                            </h3>
                            <div className="flex flex-wrap gap-1">
                              {ministerio.titulo.map((titulo, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                                >
                                  {titulo}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      Nenhum ministério encontrado.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
