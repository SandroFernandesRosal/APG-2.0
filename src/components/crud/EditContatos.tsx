'use client'
import Cookies from 'js-cookie'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'

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

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.put(
        `/contato/${id}`,
        {
          local: local || localInitial,
          whatsapp: whatsapp || whatsappInitial,
          facebook: facebook || facebookInitial,
          instagram: instagram || instagramInitial,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const contato = response.data

      if (response.status === 200 && contato) {
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
      className="fixed left-0 top-0 z-50 flex min-h-screenw-[100vw] flex-col items-center justify-center bg-bglight dark:bg-bgdark dark:text-white "
      onSubmit={handleSubmit}
    >
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
        required={true}
        placeholder="Digite o local"
        defaultValue={localInitial}
        onChange={(e) => setLocal(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="whatsapp"
        required={true}
        placeholder="Digite o número"
        defaultValue={whatsappInitial}
        onChange={(e) => setWhatsapp(e.target.value)}
      />

      <input
        className="input "
        type="text"
        name="instagran"
        required={true}
        placeholder="Digite o instagran"
        defaultValue={instagramInitial}
        onChange={(e) => setInstagram(e.target.value)}
      />

      <input
        className="input "
        type="text"
        name="facebook"
        required={true}
        placeholder="Digite o facebook"
        defaultValue={facebookInitial}
        onChange={(e) => setFacebook(e.target.value)}
      />

      <button type="submit" className="button !mb-0">
        Enviar
      </button>
    </form>
  )
}
