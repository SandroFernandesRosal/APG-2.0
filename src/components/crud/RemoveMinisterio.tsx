'use client'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { useState, MouseEvent } from 'react'

interface RemoveMinisterioProps {
  id: string
}

export default function RemoveMinisterio({ id }: RemoveMinisterioProps) {
  const { local } = useLocal()
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await api.delete(`/ministerio/${local}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover um líder:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover um líder:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button onClick={handleSubmit} disabled={isDeleting} className="button">
      {isDeleting ? 'Removendo...' : 'Remover'}
    </button>
  )
}
