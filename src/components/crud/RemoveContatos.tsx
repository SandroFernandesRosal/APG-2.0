'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useShowModal } from '@/store/useStore'
import ShowModal from '../showModal'
import { toast } from 'react-toastify'

interface RemoveContatoProps {
  id: string
}

export default function RemoveContatos({ id }: RemoveContatoProps) {
  const router = useRouter()
  const token = Cookies.get('tokennn')
  const [isDeleting, setIsDeleting] = useState(false)
  const { showModal, setShowModal } = useShowModal()

  async function handleDelete() {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/contato/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast.success('Contato removido com sucesso!')
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao remover contato:', response.statusText)
        toast.error('Erro ao remover contato. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao remover contato:', error)
      toast.error('Erro ao remover contato. Tente novamente.')
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
      >
        {isDeleting ? 'Removendo...' : 'Remover'}
      </button>{' '}
      <ShowModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
        id={id}
      />
    </>
  )
}
