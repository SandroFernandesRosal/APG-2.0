'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState, MouseEvent } from 'react'

interface RemoveSobreLiderProps {
  id: string
}

export default function RemoveSobreLider({ id }: RemoveSobreLiderProps) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/sobrelider/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
      } else {
        console.error('Erro ao remover líder:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover líder:', error)
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
