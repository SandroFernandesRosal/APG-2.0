'use client'

import { useState } from 'react'
import { useShowModal } from '@/store/useStore'
import ShowModal from '../showModal'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface RemoveTestemunhoProps {
  id: string
}

export default function RemoveTestemunho({ id }: RemoveTestemunhoProps) {
  const { showModal, setShowModal } = useShowModal() as {
    showModal: string | null
    setShowModal: React.Dispatch<React.SetStateAction<string | null>>
  }

  const token = Cookies.get('tokennn')

  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/testemunhos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast.success('Testemunho removido com sucesso!')
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover testemunho:', response.statusText)
        toast.error('Erro ao remover testemunho. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao remover testemunho:', error)
      toast.error('Erro ao remover testemunho. Tente novamente.')
    } finally {
      setIsDeleting(false)
      setShowModal(null)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(id)}
        disabled={isDeleting}
        className="button !mb-0"
      >
        {isDeleting ? 'Removendo...' : 'Remover'}
      </button>

      <ShowModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
        id={id}
      />
    </>
  )
}
