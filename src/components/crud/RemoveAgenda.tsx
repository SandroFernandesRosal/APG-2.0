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
      className="button !mb-0"
    >
      {isDeleting ? 'Removendo...' : 'Remover'}
    </button>
  )
}
