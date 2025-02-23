'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'

interface EditAgendaProps {
  setOpenEdit: (open: string | null) => void
  id: string
  title: string
  hora: string
  dia: string
}

export default function EditAgenda({
  setOpenEdit,
  id,
  title,
  hora,
  dia,
}: EditAgendaProps) {
  const [day, setDay] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [hour, setHour] = useState<string>('')

  const { local } = useLocal()
  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.put(
        `/agenda/${local}/${id}`,
        {
          day: day || dia,
          name: name || title,
          hour: hour || hora,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const agenda = response.data

      if (response.status === 200 && agenda) {
        setOpenEdit(null)
        router.push('/')
        window.location.href = '/'
        return agenda
      }

      console.log(agenda)
    } catch (error) {
      console.error('Erro ao editar evento:', error)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-30 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg md:mt-5"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Editar evento{' '}
        <AiFillCloseCircle
          onClick={() => setOpenEdit(null)}
          className="cursor-pointer text-2xl font-bold text-black dark:text-white"
        />
      </h1>
      <input
        className="border-zinc-300 bg-bglightsecundary mb-4  mt-2 w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] p-1 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="day"
        required={true}
        placeholder="Digite o dia"
        defaultValue={dia}
        onChange={(e) => setDay(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] border-zinc-300 bg-bglightsecundary p-1 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="name"
        required={true}
        placeholder="Digite nome do evento"
        defaultValue={title}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border-zinc-300 bg-bglightsecundary  mb-4 w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] p-1 text-center font-bold placeholder-textlight outline-none  focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="hour"
        required={true}
        placeholder="Digite o horário"
        defaultValue={hora}
        onChange={(e) => setHour(e.target.value)}
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
