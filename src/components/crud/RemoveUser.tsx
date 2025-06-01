'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useShowModal } from '@/store/useStore'
import ShowModal from '../showModal'

interface RemoveUser {
  id: string
}

export default function RemoveUser({ id }: RemoveUser) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)
  const { showModal, setShowModal } = useShowModal()

  async function handleDelete() {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/auth/register/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        Cookies.remove('tokennn')
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover usuário:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao remover usuário:', error)
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
        {isDeleting ? 'Removendo...' : 'Remover perfil'}
      </button>

      {showModal && (
        <>
          <ShowModal
            showModal={showModal}
            setShowModal={setShowModal}
            handleDelete={handleDelete}
            id={id}
          />
        </>
      )}
    </>
  )
}
