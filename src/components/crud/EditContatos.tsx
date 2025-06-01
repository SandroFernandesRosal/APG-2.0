'use client'
import Cookies from 'js-cookie'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

interface EditContatoProps {
  setOpenEdit: (open: string | null) => void
  id: string
  localInitial: string
  whatsappInitial: string
  facebookInitial: string
  instagramInitial: string
}

export default function EditContatos({
  setOpenEdit,
  id,
  localInitial,
  whatsappInitial,
  facebookInitial,
  instagramInitial,
}: EditContatoProps) {
  const [local, setLocal] = useState<string>(localInitial)
  const [whatsapp, setWhatsapp] = useState<string>(whatsappInitial)
  const [facebook, setFacebook] = useState<string>(facebookInitial)
  const [instagram, setInstagram] = useState<string>(instagramInitial)
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)

    try {
      const response = await fetch(`/api/contato/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          local: local || localInitial,
          whatsapp: whatsapp || whatsappInitial,
          facebook: facebook || facebookInitial,
          instagram: instagram || instagramInitial,
        }),
      })

      const contato = await response.json()

      if (response.ok && contato) {
        setOpenEdit(null)
        router.push('/')
        window.location.href = '/'
        return contato
      }

      console.log(contato)
    } catch (error) {
      console.error('Erro ao editar contato:', error)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bgdark/50 dark:bg-bglight/30 dark:text-white"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center  rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%]  max-w-md">
        <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
          Editar contato{' '}
          <AiFillCloseCircle
            onClick={() => setOpenEdit(null)}
            className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        </h1>
        <input
          className="input mt-2"
          type="text"
          name="local"
          required
          placeholder="Digite o local"
          defaultValue={localInitial}
          onChange={(e) => setLocal(e.target.value)}
        />

        <input
          className="input"
          type="text"
          name="whatsapp"
          required
          placeholder="Digite o número"
          defaultValue={whatsappInitial}
          onChange={(e) => setWhatsapp(e.target.value)}
        />

        <input
          className="input"
          type="text"
          name="instagram"
          required
          placeholder="Digite o Instagram"
          defaultValue={instagramInitial}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <input
          className="input"
          type="text"
          name="facebook"
          required
          placeholder="Digite o Facebook"
          defaultValue={facebookInitial}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <button
          type="submit"
          className="button !mb-0 flex items-center gap-2 justify-center"
        >
          {isEditing ? (
            <>
              <FaSpinner className="animate-spin" />
              Editando contato...
            </>
          ) : (
            'Editar'
          )}
        </button>
      </div>
    </form>
  )
}
