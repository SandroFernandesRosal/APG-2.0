'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useShowModal } from '@/store/useStore'
import { useState, useEffect } from 'react'
import ShowModal from '../showModal'
import { toast } from 'react-toastify'

interface RemoveMinisterioProps {
  id: string
}

export default function RemoveMinisterio({ id }: RemoveMinisterioProps) {
  const { showModal, setShowModal } = useShowModal()
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const handleShowRemoveModal = (event: CustomEvent) => {
      if (event.detail.id === id) {
        setShowModal(id)
      }
    }

    window.addEventListener(
      'showRemoveModal',
      handleShowRemoveModal as EventListener,
    )

    return () => {
      window.removeEventListener(
        'showRemoveModal',
        handleShowRemoveModal as EventListener,
      )
    }
  }, [id, setShowModal])

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
        toast.success('Ministério removido com sucesso!')
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover ministério:', response.statusText)
        toast.error('Erro ao remover ministério. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao remover ministério:', error)
      toast.error('Erro ao remover ministério. Tente novamente.')
    } finally {
      setIsDeleting(false)
      setShowModal(null)
    }
  }

  return (
    <ShowModal
      showModal={showModal}
      setShowModal={setShowModal}
      handleDelete={handleDelete}
      id={id}
    />
  )
}
