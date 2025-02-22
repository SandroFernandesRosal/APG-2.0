'use client'
import Cookies from 'js-cookie'

import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { api } from '@/lib/api'

export default function RemoveEndereco({ id }) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await api.delete(`/endereco/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover endereço:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover endereço:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={isDeleting}
      className="m-[5px] rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r  from-slate-950 to-blue-900  px-1 text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700  md:px-3  md:text-lg md:font-bold"
    >
      {isDeleting ? 'Removendo...' : 'Remover'}
    </button>
  )
}
