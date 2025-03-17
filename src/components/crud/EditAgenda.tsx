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
          className="cursor-pointer text-2xl font-bold text-primary hover:text-primary/50 dark:text-secundary dark:hover:text-secundary/50"
        />
      </h1>
      <input
        className="input"
        type="text"
        name="day"
        required={true}
        placeholder="Digite o dia"
        defaultValue={dia}
        onChange={(e) => setDay(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="name"
        required={true}
        placeholder="Digite nome do evento"
        defaultValue={title}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input "
        type="text"
        name="hour"
        required={true}
        placeholder="Digite o horário"
        defaultValue={hora}
        onChange={(e) => setHour(e.target.value)}
      />

      <button type="submit" className="button !mb-0">
        Enviar
      </button>
    </form>
  )
}
