'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useShowModal } from '@/store/useStore'
import { useState } from 'react'
import ShowModal from '../showModal'

interface RemoveMinisterioProps {
  id: string
}

export default function RemoveMinisterio({ id }: RemoveMinisterioProps) {
  const { showModal, setShowModal } = useShowModal()
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/ministerio/${id}`, {
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
        console.error('Erro ao remover um líder:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover um líder:', error)
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
