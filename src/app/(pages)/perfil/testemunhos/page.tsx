'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { format } from 'date-fns'
import {
  FaSpinner,
  FaCheck,
  FaTrash,
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaChurch,
} from 'react-icons/fa'
import { useToken } from '@/hooks/useToken'

interface Testemunho {
  id: string
  name: string
  content: string
  avatarUrl: string
  coverUrl: string
  createdAt: string
  updatedAt?: string
  igrejaId?: string | null
}

export default function AdminTestemunhosPage() {
  const [testemunhos, setTestemunhos] = useState<Testemunho[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [approvingId, setApprovingId] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const router = useRouter()
  const token = useToken()

  function formatDate(dateString: string): string {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return ''
      return format(date, 'dd/MM/yyyy HH:mm')
    } catch {
      return ''
    }
  }

  // Removido: função hardcoded - agora usa useIgrejaName

  useEffect(() => {
    if (token) {
      const temPermissao = token.role === 'ADMIN' || token.role === 'SUPERADMIN'
      if (!temPermissao) {
        router.push('/login')
        return
      }

      fetch('/api/auth/admin/testemunho', {
        credentials: 'include',
      })
        .then((res) => {
          if (!res.ok) throw new Error('Falha ao buscar testemunhos')
          return res.json()
        })
        .then((data) => {
          setTestemunhos(data)
        })
        .catch((error) => {
          console.error('Erro ao buscar testemunhos:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      const timeout = setTimeout(() => {
        if (!token) {
          setLoading(false)
          router.push('/login')
        }
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [token, router])

  async function handleAprovar(id: string) {
    setApprovingId(id)
    try {
      await fetch(`/api/auth/admin/testemunho/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isPublic: true }),
      })
      setTestemunhos((prev) => prev.filter((t) => t.id !== id))
      toast.success('Testemunho aprovado com sucesso!')
      router.refresh()
    } catch (error) {
      console.error('Erro ao aprovar testemunho:', error)
      toast.error('Falha ao aprovar o testemunho.')
    } finally {
      setApprovingId(null)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/testemunhos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (res.ok) {
        setTestemunhos((prev) => prev.filter((t) => t.id !== id))
        setShowModal(false)
        setSelectedId(null)
        router.refresh()
      } else {
        throw new Error('Falha ao deletar')
      }
    } catch (error) {
      console.error('Erro ao deletar:', error)
      toast.error('Erro ao deletar o testemunho.')
      setShowModal(false)
    }
  }

  const handleImageError = (imageUrl: string) => {
    setImageErrors((prev) => new Set(prev).add(imageUrl))
  }

  const isImageError = (imageUrl: string) => {
    return imageErrors.has(imageUrl)
  }

  if (loading) {
    return (
      <div className="pt-24 pb-10 md:pt-52 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <FaSpinner className="animate-spin text-4xl text-primary dark:text-secundary" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary dark:border-t-secundary animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Carregando testemunhos...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-10 md:pt-[110px] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-4 items-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secundary rounded-full mb-4 shadow-lg">
              <FaUser className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Testemunhos Pendentes
            </h1>
          </div>

          <div className="mt-4 inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {testemunhos.length} testemunho
              {testemunhos.length !== 1 ? 's' : ''} pendente
              {testemunhos.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {testemunhos.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <FaCheck className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum testemunho pendente
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Todos os testemunhos foram revisados e aprovados!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {testemunhos.map((t, index) => (
              <div
                key={t.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header do Card */}
                <div className="bg-white dark:bg-slate-800 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      {t.avatarUrl && !isImageError(t.avatarUrl) ? (
                        <Image
                          width={64}
                          height={64}
                          src={t.avatarUrl}
                          alt={t.name}
                          className="rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-lg"
                          onError={() => handleImageError(t.avatarUrl)}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-600">
                          <FaUser className="text-2xl text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                        <FaChurch className="text-xs text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <FaChurch className="text-sm" />
                        <span className="text-sm font-medium">
                          {t.igrejaId ? 'Igreja ID: ' + t.igrejaId : 'Membro sem igreja'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  {/* Informações de Data */}
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <FaCalendarAlt className="text-primary dark:text-secundary" />
                      <span>Postado: {formatDate(t.createdAt)}</span>
                    </div>
                    {t.updatedAt && t.createdAt !== t.updatedAt && (
                      <div className="flex items-center space-x-1">
                        <FaClock className="text-primary dark:text-secundary" />
                        <span>Atualizado: {formatDate(t.updatedAt)}</span>
                      </div>
                    )}
                  </div>

                  {/* Texto do Testemunho */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {t.content}
                    </p>
                  </div>

                  {/* Imagem do Testemunho */}
                  {t.coverUrl && (
                    <div className="mb-6">
                      <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-700">
                        {!isImageError(t.coverUrl) ? (
                          <Image
                            src={t.coverUrl}
                            alt="Foto do testemunho"
                            width={800}
                            height={600}
                            className="w-full h-auto max-h-96 object-contain"
                            sizes="(max-width: 768px) 100vw, 800px"
                            onError={() => handleImageError(t.coverUrl)}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-48 bg-gray-200 dark:bg-gray-600">
                            <div className="text-center">
                              <svg
                                className="w-12 h-12 mx-auto text-gray-400 mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                              </svg>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Imagem não disponível
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Botões de Ação */}
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleAprovar(t.id)}
                      disabled={approvingId === t.id}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {approvingId === t.id ? (
                        <>
                          <FaSpinner className="animate-spin text-sm" />
                          <span>Aprovando...</span>
                        </>
                      ) : (
                        <>
                          <FaCheck className="text-sm" />
                          <span>Aprovar</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedId(t.id)
                        setShowModal(true)
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <FaTrash className="text-sm" />
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Confirmação */}
      {showModal && selectedId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                <FaTrash className="text-2xl text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Excluir Testemunho
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tem certeza que deseja excluir este testemunho? Esta ação não
                pode ser desfeita.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300"
              >
                <FaTimes />
                <span>Cancelar</span>
              </button>
              <button
                onClick={() => handleDelete(selectedId)}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaTrash />
                <span>Confirmar Exclusão</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
