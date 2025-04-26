'use client'
import { useShowModal } from '@/store/useStore'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ShowModal from '../showModal'

interface RemoveDoacaoProps {
  id: string
}

export default function RemoveDoacao({ id }: RemoveDoacaoProps) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)
  const { showModal, setShowModal } = useShowModal()

  async function handleDelete() {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/doacao/${id}`, {
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
        console.error('Erro ao remover doação:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover doação:', error)
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
