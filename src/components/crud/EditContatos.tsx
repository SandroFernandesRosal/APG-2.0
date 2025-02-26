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
      className="fixed left-0 top-0 z-30 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 text-black backdrop-blur-lg dark:text-white md:mt-5"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Editar contato{' '}
        <AiFillCloseCircle
          onClick={() => setOpenEdit(null)}
          className="cursor-pointer text-2xl font-bold text-black dark:text-white"
        />
      </h1>
      <input
        className="mb-4 mt-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-300 bg-bglightsecundary p-1 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="local"
        required={true}
        placeholder="Digite o local"
        defaultValue={localInitial}
        onChange={(e) => setLocal(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-300 bg-bglightsecundary p-1 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="whatsapp"
        required={true}
        placeholder="Digite o número"
        defaultValue={whatsappInitial}
        onChange={(e) => setWhatsapp(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-300 bg-bglightsecundary p-1 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="instagran"
        required={true}
        placeholder="Digite o instagran"
        defaultValue={instagramInitial}
        onChange={(e) => setInstagram(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-300 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="facebook"
        required={true}
        placeholder="Digite o facebook"
        defaultValue={facebookInitial}
        onChange={(e) => setFacebook(e.target.value)}
      />

      <button
        type="submit"
        className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   p-2 px-6 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
      >
        Enviar
      </button>
    </form>
  )
}
