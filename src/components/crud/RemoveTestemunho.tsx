'use client'

import { useState } from 'react'
import { useShowModal, useDataTestemunho } from '@/store/useStore'
import ShowModal from '../showModal'
import Cookies from 'js-cookie'
import { Testemunho } from '@/data/types/testemunho'
import { useRouter } from 'next/navigation'

interface RemoveTestemunhoProps {
  id: string
}

export default function RemoveTestemunho({ id }: RemoveTestemunhoProps) {
  const { showModal, setShowModal } = useShowModal() as {
    showModal: string | null
    setShowModal: React.Dispatch<React.SetStateAction<string | null>>
  }

  const { setDataTestemunho } = useDataTestemunho() as {
    setDataTestemunho: React.Dispatch<React.SetStateAction<Testemunho[]>>
  }

  const token = Cookies.get('tokenigreja')
  const tokenAdm = Cookies.get('tokennn')

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
          Authorization: `Bearer ${token || tokenAdm}`,
        },
      })

      if (response.ok) {
        setDataTestemunho((prev: Testemunho[]) => {
          return prev.filter((t) => t.id !== id)
        })
        setShowModal(null)
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
