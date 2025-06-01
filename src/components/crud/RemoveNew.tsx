'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useShowModal } from '../../store/useStore'
import { useState } from 'react'
import ShowModal from '../showModal'

interface RemoveNewProps {
  id: string
}

export default function RemoveNew({ id }: RemoveNewProps) {
  const { showModal, setShowModal } = useShowModal()
  const router = useRouter()
  const token = Cookies.get('tokennn')

  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/news/${id}`, {
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
        console.error('Erro ao remover notícia:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover notícia:', error)
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
        aria-hidden="true"
        tabIndex={-1}
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
