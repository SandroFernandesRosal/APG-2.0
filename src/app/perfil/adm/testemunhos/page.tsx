'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'

interface Testemunho {
  id: string
  name: string
  content: string
  avatarUrl: string
  coverUrl: string
  createdAt: string
}

export default function AdminTestemunhosPage() {
  const [testemunhos, setTestemunhos] = useState<Testemunho[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function checkAuthAndFetch() {
      try {
        const resAuth = await fetch('/api/auth/admin/login/me', {
          credentials: 'include',
        })

        if (!resAuth.ok) {
          router.push('/login/adm')
          return
        }

        const res = await fetch('/api/auth/admin/testemunho', {
          credentials: 'include',
        })

        if (!res.ok) {
          const errText = await res.text()
          console.error('Erro ao buscar testemunhos:', errText)
          return
        }

        const data = await res.json()
        setTestemunhos(data)
      } catch (error) {
        console.error('Erro ao verificar login ou buscar testemunhos:', error)
        router.push('/login/adm')
      }
    }

    checkAuthAndFetch()
  }, [router])

  async function handleAprovar(id: string) {
    await fetch(`/api/auth/admin/testemunho/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ isPublic: true }),
    })

    setTestemunhos((prev) => prev.filter((t) => t.id !== id))
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/auth/admin/testemunho/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (res.ok) {
      setTestemunhos((prev) => prev.filter((t) => t.id !== id))
      setShowModal(false)
      setSelectedId(null)
    } else {
      const errText = await res.text()
      console.error('Erro ao deletar:', errText)
      alert('Erro ao deletar o testemunho.')
    }
  }

  return (
    <div className="pt-24 pb-10 md:pt-52 min-h-screen flex flex-col items-center gap-5 justify-center w-full">
      <h1 className="text-2xl font-bold mb-4">Testemunhos Pendentes</h1>

      {testemunhos.length === 0 ? (
        <p className="text-gray-500">Nenhum testemunho pendente.</p>
      ) : (
        <ul className="flex flex-col gap-4 w-full items-center">
          {testemunhos.map((t) => (
            <li
              key={t.id}
              className="border[1px] rounded-lg p-4  bg-bglightsecundary dark:bg-bgdarksecundary w-[90%] md:w-[80%] lg:w-[70%] border-zinc-300 dark:border-zinc-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={t.avatarUrl}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <strong>{t.name}</strong>
              </div>

              <p className="mb-2">{t.content}</p>

              {t.coverUrl && (
                <div className="relative w-full max-w-md h-64 mb-2">
                  <Image
                    src={t.coverUrl}
                    alt="Foto testemunho"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              )}

              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleAprovar(t.id)}
                  className="button  !mb-0"
                >
                  Aprovar
                </button>

                <button
                  onClick={() => {
                    setSelectedId(t.id)
                    setShowModal(true)
                  }}
                  className=" button !mb-0 !flex items-center gap-2 !text-red-500 !border-red-500 hover:!bg-red-500 hover:!text-white"
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
                className="px-4 py-2 rounded border"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(selectedId)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
