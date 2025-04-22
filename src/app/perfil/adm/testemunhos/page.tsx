'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
  const router = useRouter()

  useEffect(() => {
    async function checkAuthAndFetch() {
      try {
        const resAuth = await fetch('/api/auth/admin/login/me', {
          credentials: 'include',
        })

        console.log('resAuth status:', resAuth.status)

        if (!resAuth.ok) {
          router.push('/login/adm')
          return
        }

        const res = await fetch('/api/auth/admin/testemunho', {
          credentials: 'include',
        })

        console.log('res testemunhos status:', res.status)

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
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ isPublic: true }),
    })

    setTestemunhos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="px-10 pt-24 pb-10 md:pt-52 min-h-screen flex flex-col items-center gap-5 justify-center">
      <h1 className="text-2xl font-bold mb-4">Testemunhos Pendentes</h1>

      {testemunhos.length === 0 ? (
        <p className="text-gray-500">Nenhum testemunho pendente.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {testemunhos.map((t) => (
            <li
              key={t.id}
              className="border rounded-lg p-4 shadow bg-white dark:bg-bgdarksecundary"
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

              <button
                onClick={() => handleAprovar(t.id)}
                className="button !mt-2"
              >
                Aprovar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
