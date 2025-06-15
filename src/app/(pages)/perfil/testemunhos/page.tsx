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
                  className="button !mb-0 flex items-center gap-2 justify-center"
                  disabled={approvingId === t.id}
                >
                  {approvingId === t.id ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Aprovando...
                    </>
                  ) : (
                    'Aprovar'
                  )}
                </button>

                <button
                  onClick={() => {
                    setSelectedId(t.id)
                    setShowModal(true)
                  }}
                  className="button !mb-0 !flex items-center gap-2 !text-red-500 !border-red-500 hover:!bg-red-500 hover:!text-white"
                  title="Excluir testemunho"
                >
                  Deletar
                  <Trash2 size={20} />
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
                className="button !mb-0"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(selectedId)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-bold"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
