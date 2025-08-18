'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useShowModal } from '@/store/useStore'
import ShowModal from '../showModal'
import { toast } from 'react-toastify'

interface RemoveSobreLiderProps {
  id: string
}

export default function RemoveSobreLider({ id }: RemoveSobreLiderProps) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)
  const { showModal, setShowModal } = useShowModal()

  async function handleDelete() {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/sobrelider/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast.success('Líder removido com sucesso!')
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover líder:', response.statusText)
        toast.error('Erro ao remover líder. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao remover líder:', error)
      toast.error('Erro ao remover líder. Tente novamente.')
    } finally {
      setIsDeleting(false)
      setShowModal(null)
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
