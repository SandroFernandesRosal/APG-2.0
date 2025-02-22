'use client'
import Cookies from 'js-cookie'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'

export default function EditAgenda({
  setOpenEdit,
  id,
  title,
  hora,
  dia,
  destacar,
}) {
  const [day, setDay] = useState('')
  const [name, setName] = useState('')
  const [hour, setHour] = useState('')
  const [destaque, setDestaque] = useState(destacar)
  const { local } = useLocal()
  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await api.put(
        `/agenda/${local}/${id}`,
        {
          day: day || dia,
          name: name || title,
          hour: hour || hora,
          destaque,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log(response.data)
      const agenda = response.data

      if (response.status === 200 && agenda) {
        setOpenEdit(false)
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
          onClick={() => setOpenEdit(false)}
          className="cursor-pointer text-2xl font-bold text-black dark:text-white"
        />
      </h1>
      <input
        className="border-zinc-400bg-bglightsecundary mb-4  mt-2 w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="day"
        required={true}
        placeholder="Digite o dia"
        defaultValue={dia}
        onChange={(e) => setDay(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="name"
        required={true}
        placeholder="Digite nome do evento"
        defaultValue={title}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border-zinc-400bg-bglightsecundary  mb-4 w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] p-2 text-center font-bold placeholder-textlight outline-none  focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="hour"
        required={true}
        placeholder="Digite o horário"
        defaultValue={hora}
        onChange={(e) => setHour(e.target.value)}
      />

      <div className="mb-4 flex items-center gap-2  p-2">
        <input
          type="checkbox"
          id="destaque"
          name="destaque"
          checked={destaque}
          defaultValue={destacar}
          onChange={(e) => setDestaque(e.target.checked)}
          className="cursor-pointer rounded-lg border-none bg-gray-300 focus:ring-primary dark:border-gray-500 dark:bg-gray-600"
        />
        <label
          htmlFor="destaque"
          className="font-bold text-black dark:text-white"
        >
          Marcar como destaque
        </label>
      </div>

      <button
        type="submit"
        className="z-20  m-1 mr-2 flex cursor-pointer items-center justify-center  rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r from-slate-950 to-blue-900  px-6  font-bold text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700"
      >
        Enviar
      </button>
    </form>
  )
}
