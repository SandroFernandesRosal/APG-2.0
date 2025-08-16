'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { FaSpinner } from 'react-icons/fa'
import { useToken } from '@/hooks/useToken'

interface Testemunho {
  id: string
  name: string
  content: string
  avatarUrl: string
  coverUrl: string
  createdAt: string
  updatedAt?: string
  ministryRole?: string
}

export default function AdminTestemunhosPage() {
  const [testemunhos, setTestemunhos] = useState<Testemunho[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const [approvingId, setApprovingId] = useState<string | null>(null)

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

      router.refresh()
    } catch (error) {
      console.error('Erro ao aprovar testemunho:', error)
      alert('Falha ao aprovar o testemunho.')
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
      alert('Erro ao deletar o testemunho.')
      setShowModal(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-24 pb-10 md:pt-52 min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-2xl" />
      </div>
    )
  }

  return (
    <div className="pt-24 pb-10 md:pt-52 min-h-screen flex flex-col items-center gap-5 w-full">
      <h1 className="text-2xl font-bold mb-4">Testemunhos Pendentes</h1>

      {testemunhos.length === 0 ? (
        <p className="text-gray-500">Nenhum testemunho pendente.</p>
      ) : (
        <ul className="flex flex-col gap-4 w-full items-center">
          {testemunhos.map((t) => (
            <li
              key={t.id}
              className="flex flex-col border[1px] rounded-lg p-4 bg-bglightsecundary dark:bg-bgdarksecundary w-[90%] md:w-[80%] lg:w-[70%] border-zinc-300 dark:border-zinc-800 border-[1px]"
            >
              <div className="flex items-center gap-4 relative mb-5">
                {t.avatarUrl && (
                  <Image
                    width={80}
                    height={80}
                    src={t.avatarUrl}
                    alt={t.name}
                    className="p-[2px] mr-1 rounded-full border-[1px] border-primary dark:border-secundary"
                  />
                )}
                <div>
                  <p className="text-lg font-bold">
                    {t.name}
                    <span className="text-sm font-normal text-zinc-600">
                      {t.ministryRole
                        ? ` - APG ${
                            t.ministryRole === 'VILADAPENHA'
                              ? 'Vila da Penha'
                              : t.ministryRole === 'TOMAZINHO'
                                ? 'Tomazinho'
                                : 'Vila Maria Helena'
                          }`
                        : ' - Membro sem igreja'}
                    </span>
                  </p>
                  <div className="text-xs flex flex-col">
                    <span>Postado: {formatDate(t.createdAt)}</span>
                    {t.updatedAt && t.createdAt !== t.updatedAt && (
                      <span>Última atualização: {formatDate(t.updatedAt)}</span>
                    )}
                  </div>
                </div>
              </div>

              <p className="mb-4 whitespace-pre-wrap">{t.content}</p>

              {t.coverUrl && (
                <div className="relative w-full max-w-md h-64 mb-4 flex self-center ">
                  <Image
                    src={t.coverUrl}
                    alt="Foto testemunho"
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
              )}

              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleAprovar(t.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={approvingId === t.id}
                >
                  {approvingId === t.id ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Aprovando...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Aprovar
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setSelectedId(t.id)
                    setShowModal(true)
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  title="Excluir testemunho"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && selectedId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-bglightsecundary dark:bg-bgdarksecundary rounded-xl p-6 max-w-md w-full border-zinc-300 dark:border-zinc-700 border-[1px]">
            <h2 className="text-lg font-semibold mb-4">Excluir testemunho</h2>
            <p className="mb-6">
              Tem certeza que deseja excluir este testemunho?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(selectedId)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
