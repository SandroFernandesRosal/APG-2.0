'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import ShowModal from '../showModal'
import { useShowModal } from '@/store/useStore'
import { FaTrash } from 'react-icons/fa'

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
      {showModal === id && (
        <ShowModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleDelete={handleDelete}
          id={id}
        />
      )}
    </>
  )
}
