'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { useState, MouseEvent } from 'react'
import { api } from '@/lib/api'

interface RemoveAgendaProps {
  id: string
}

export default function RemoveAgenda({ id }: RemoveAgendaProps) {
  const { local } = useLocal()
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await api.delete(`/agenda/${local}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover da agenda:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover da agenda:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={isDeleting}
      className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white px-2 text-primary dark:text-secundary dark:hover:text-white dark:border-secundary/50 md:px-3 md:text-lg md:font-bold z-20"
    >
      {isDeleting ? 'Removendo...' : 'Remover'}
    </button>
  )
}
