'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState, MouseEvent } from 'react'

interface RemoveSobreContentProps {
  id: string
}

export default function RemoveSobreContent({ id }: RemoveSobreContentProps) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/sobre/${id}`, {
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
      className="button !mb-0"
    >
      {isDeleting ? 'Removendo...' : 'Remover'}
    </button>
  )
}
