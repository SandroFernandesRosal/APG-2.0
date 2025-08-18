'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useShowModal } from '../../store/useStore'
import { useState, useEffect } from 'react'
import ShowModal from '../showModal'
import { toast } from 'react-toastify'

interface RemoveAgendaProps {
  id: string
}

export default function RemoveAgenda({ id }: RemoveAgendaProps) {
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
      const response = await fetch(`/api/agenda/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast.success('Evento removido com sucesso!')
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover evento:', response.statusText)
        toast.error('Erro ao remover evento. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao remover evento:', error)
      toast.error('Erro ao remover evento. Tente novamente.')
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
