'use client'
import Cookies from 'js-cookie'

import { useRouter } from 'next/navigation'

import { useState, MouseEvent } from 'react'
import { api } from '@/lib/api'

interface RemoveContatoProps {
  id: string
}

export default function RemoveContatos({ id }: RemoveContatoProps) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await api.delete(`/contato/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover contato:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover contato:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={isDeleting}
      className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
    >
      {isDeleting ? 'Removendo...' : 'Remover'}
    </button>
  )
}
