'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useShowModal } from '@/store/useStore'
import ShowModal from '../showModal'

interface RemoveTestemunhoProps {
  id: string
}

export default function RemoveTestemunho({ id }: RemoveTestemunhoProps) {
  const router = useRouter()
  const token = Cookies.get('tokenigreja')
  const tokenAdm = Cookies.get('tokennn')

  const [isDeleting, setIsDeleting] = useState(false)
  const { showModal, setShowModal } = useShowModal()

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
      {' '}
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
