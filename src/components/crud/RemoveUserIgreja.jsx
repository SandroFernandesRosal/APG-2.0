'use client'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RemoveUserIgreja({ id }) {
  const router = useRouter()
  const token = Cookies.get('tokenigreja')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await api.delete(`/register/igreja/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        Cookies.remove('tokenigreja')
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover usuário:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover usuário:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={isDeleting}
      className="m-2 rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r from-slate-950 to-blue-900  p-1 px-3 text-lg  font-bold   text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700"
    >
      {isDeleting ? 'Removendo...' : 'Remover perfil'}
    </button>
  )
}
