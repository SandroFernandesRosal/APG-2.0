'use client'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useState, MouseEvent } from 'react'

interface RemoveUserAdmProps {
  id: string
}

export default function RemoveUserAdm({ id }: RemoveUserAdmProps) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await api.delete(`/register/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        Cookies.remove('tokennn')
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
    <button onClick={handleSubmit} disabled={isDeleting} className="button">
      {isDeleting ? 'Removendo...' : 'Remover perfil'}
    </button>
  )
}
