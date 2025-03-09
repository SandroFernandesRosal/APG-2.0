'use client'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface RemoveTestemunhoProps {
  id: string
}

export default function RemoveTestemunho({ id }: RemoveTestemunhoProps) {
  const router = useRouter()
  const token = Cookies.get('tokenigreja')
  const tokenAdm = Cookies.get('tokennn')

  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await api.delete(`/testemunhos/${id}`, {
        headers: {
          Authorization: `Bearer ${token || tokenAdm}`,
        },
      })

      if (response.status === 200) {
        router.push('/testemunhos')
        window.location.href = '/testemunhos'
      } else {
        console.error('Erro ao remover testemunho:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover testemunho:', error)
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
