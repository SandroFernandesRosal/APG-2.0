'use client'
import Cookies from 'js-cookie'
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
      const response = await fetch(`/api/${local}/ministerio/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
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
    <button
      onClick={handleSubmit}
      disabled={isDeleting}
      className="button !mb-0"
    >
      {isDeleting ? 'Removendo...' : 'Remover'}
    </button>
  )
}
