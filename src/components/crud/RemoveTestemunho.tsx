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
    <button
      onClick={handleSubmit}
      disabled={isDeleting}
      className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
    >
      {isDeleting ? 'Removendo...' : 'Remover'}
    </button>
  )
}
