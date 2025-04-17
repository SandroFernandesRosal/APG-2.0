'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState, MouseEvent } from 'react'

interface RemoveEnderecoProps {
  id: string
}

export default function RemoveEndereco({ id }: RemoveEnderecoProps) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/endereco/${id}`, {
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
        console.error('Erro ao remover endereço:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover endereço:', error)
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
