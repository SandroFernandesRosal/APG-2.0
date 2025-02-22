'use client'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

export default function RemoveSobreContent({ id }) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await api.delete(`/sobre/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
      } else {
        console.error('Erro ao remover história:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover história:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={isDeleting}
      className="m-2 rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r  from-slate-950 to-blue-900  px-3 font-bold text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700 "
    >
      {isDeleting ? 'Removendo...' : 'Remover'}
    </button>
  )
}
