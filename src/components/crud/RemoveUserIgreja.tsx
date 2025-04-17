'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState, MouseEvent } from 'react'

interface RemoveUserIgrejaProps {
  id: string
}

export default function RemoveUserIgreja({ id }: RemoveUserIgrejaProps) {
  const router = useRouter()
  const token = Cookies.get('tokenigreja')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/auth/register/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
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
      className="button !mb-0"
    >
      {isDeleting ? 'Removendo...' : 'Remover perfil'}
    </button>
  )
}
