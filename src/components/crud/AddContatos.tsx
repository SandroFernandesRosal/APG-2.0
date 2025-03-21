'use client'
import Cookies from 'js-cookie'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'

interface AddContatoProps {
  openContato: boolean
  setOpenContato: (open: boolean) => void
}

export default function AddContatos({
  openContato,
  setOpenContato,
}: AddContatoProps) {
  const [local, setLocal] = useState<string>('')
  const [whatsapp, setWhatsapp] = useState<string>('')
  const [facebook, setFacebook] = useState<string>('')
  const [instagram, setInstagram] = useState<string>('')

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post(
        '/contato',
        {
          local,
          whatsapp,
          facebook,
          instagram,
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
        setOpenContato(false)
        router.push('/')
        window.location.href = '/'
        return contato
      }

      console.log(contato)
    } catch (error) {
      console.error('Erro ao criar contato:', error)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bglight dark:bg-bgdark"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar endereço{' '}
        {openContato === true && (
          <AiFillCloseCircle
            onClick={() => setOpenContato(false)}
            className="cursor-pointer text-2xl font-bold text-black dark:text-white"
          />
        )}
      </h1>
      <input
        className="input mt-4"
        type="text"
        name="local"
        required={true}
        placeholder="Digite o local"
        onChange={(e) => setLocal(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="whatsapp"
        required={true}
        placeholder="Digite o número whatsapp"
        onChange={(e) => setWhatsapp(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="instagran"
        required={true}
        placeholder="Digite o instagran"
        onChange={(e) => setInstagram(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="facebook"
        required={true}
        placeholder="Digite o facebook"
        onChange={(e) => setFacebook(e.target.value)}
      />
      <button type="submit" className="button !mb-0">
        Enviar
      </button>
    </form>
  )
}
