'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

interface EditAgendaProps {
  setOpenEdit: (open: string | null) => void
  id: string
  title: string
  hora: string
  dia: string
  role?: string
}

export default function EditAgenda({
  setOpenEdit,
  id,
  title,
  hora,
  dia,
  role,
}: EditAgendaProps) {
  const [day, setDay] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [hour, setHour] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)

    try {
      const response = await fetch(`/api/agenda/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          day: day || dia,
          name: name || title,
          hour: hour || hora,
          role,
        }),
      })

      const agenda = await response.json()

      if (response.ok && agenda) {
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
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bgdark/50 dark:bg-bglight/30"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center  rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%]  max-w-md">
        <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
          Editar evento{' '}
          <AiFillCloseCircle
            onClick={() => setOpenEdit(null)}
            className="cursor-pointer text-2xl font-bold text-primary hover:text-primary/50 dark:text-secundary dark:hover:text-secundary/50"
          />
        </h1>
        <input
          className="input mt-2"
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

        <button
          type="submit"
          className="button !mb-0 flex items-center gap-2 justify-center"
        >
          {isEditing ? (
            <>
              <FaSpinner className="animate-spin" />
              Editando evento...
            </>
          ) : (
            'Editar'
          )}
        </button>
      </div>
    </form>
  )
}
