'use client'
import Cookies from 'js-cookie'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { AiFillCloseCircle } from 'react-icons/ai'

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
  const [local, setLocal] = useState(localInitial)
  const [whatsapp, setWhatsapp] = useState(whatsappInitial)
  const [facebook, setFacebook] = useState(facebookInitial)
  const [instagram, setInstagram] = useState(instagramInitial)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await fetch(`/api/contato/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          local,
          whatsapp,
          facebook,
          instagram,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setOpenEdit(null)
        router.push('/')
        window.location.href = '/'
        return data
      }

      console.log(data)
    } catch (error) {
      console.error('Erro ao editar contato:', error)
    }
  }

  return (
    <form
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bglight dark:bg-bgdark dark:text-white"
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
        required
        placeholder="Digite o local"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="whatsapp"
        required
        placeholder="Digite o número"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="instagram"
        required
        placeholder="Digite o Instagram"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="facebook"
        required
        placeholder="Digite o Facebook"
        value={facebook}
        onChange={(e) => setFacebook(e.target.value)}
      />

      <button type="submit" className="button !mb-0">
        Enviar
      </button>
    </form>
  )
}
