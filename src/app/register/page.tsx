'use client'
import { FaCameraRetro } from 'react-icons/fa'
import { useState, useRef, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { api } from '@/lib/api'

interface ApiError {
  response?: {
    status: number
    data: {
      error?: string
    }
  }
  message?: string
}

export default function RegisterIgreja() {
  const [name, setName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | boolean>(false)
  const PlaceHolder =
    'https://drive.google.com/uc?export=view&id=1hYXAUQfIieWGK0P9VCW8bpCgnamvnB1C'

  const [preview, setPreview] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formRef.current) return

    const form = formRef.current
    const fileInput = form.querySelector<HTMLInputElement>('input[type="file"]')
    const fileToUpload = fileInput?.files?.[0] || null

    let avatarUrl = ''

    if (fileToUpload) {
      const formData = new FormData()
      formData.append('file', fileToUpload)

      try {
        const uploadResponse = await api.post<{ fileUrl: string }>(
          '/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        avatarUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.error('Erro ao carregar foto:', error)
        setError('Falha ao carregar a foto do perfil. Tente novamente.')
        return
      }
    }

    try {
      const response = await api.post<{ error?: string }>(
        `/register/igreja`,
        {
          name,
          login,
          avatarUrl: avatarUrl || PlaceHolder,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const user = response.data

      if (response.status === 200 && !user.error) {
        router.push('/login/igreja')
        window.location.href = '/login/igreja'
        return user
      } else if (user.error) {
        setError(user.error)
      } else {
        setError('Erro ao registrar. Tente novamente mais tarde.')
      }
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof error.response === 'object' &&
        error.response !== null &&
        'status' in error.response &&
        'data' in error.response &&
        typeof error.response.data === 'object' &&
        error.response.data !== null &&
        'error' in error.response.data
      ) {
        setError(
          (error as ApiError).response?.data?.error || 'Erro desconhecido',
        )
      } else {
        setError('Erro ao registrar. Tente novamente mais tarde.')
      }
    }
  }

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (files && files[0]) {
      const previewUrl = URL.createObjectURL(files[0])
      setPreview(previewUrl)
    }
  }

  return (
    <div className="mt-[80px] flex w-full justify-center md:mt-[140px]">
      <div className="my-10 flex min-h-screen w-[100vw] flex-col items-center rounded-[35px] bg-bglightsecundary shadow-light dark:bg-bgdarksecundary dark:shadow-dark md:w-[90vw] md:rounded-xl">
        <h1 className="mt-2 text-lg font-bold text-primary dark:text-secundary">
          Fazer login
        </h1>
        <p className="mb-5 text-xl">Use suas credenciais</p>
        <form
          ref={formRef}
          className="flex w-[75%] max-w-[500px] flex-col items-center gap-3 rounded-xl bg-bglight p-3 shadow-light dark:bg-bgdark dark:shadow-dark md:mb-5"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="avatarUrl"
            className="flex cursor-pointer flex-col items-center gap-2 font-bold"
          >
            <p className="flex gap-2">
              <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
              Anexar foto de perfil (opcional)
            </p>
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={150}
                height={150}
                className="h-[150px] w-[150px] rounded-full border-2 border-primary"
              />
            )}
          </label>

          <input
            className="mt-2 w-[200px] cursor-pointer rounded-lg border-none bg-bglightsecundary p-2 text-center font-bold placeholder-textlight shadow-light outline-none focus:ring-0 dark:bg-bgdarksecundary dark:placeholder-textdark dark:shadow-dark"
            type="text"
            name="name"
            required
            placeholder="Seu nome"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="mt-2 w-[200px] cursor-pointer rounded-lg border-none bg-bglightsecundary p-2 text-center font-bold placeholder-textlight shadow-light outline-none focus:ring-0 dark:bg-bgdarksecundary dark:placeholder-textdark dark:shadow-dark"
            type="text"
            name="login"
            required
            placeholder="seu email"
            onChange={(e) => setLogin(e.target.value.toLowerCase())}
          />

          <input
            className="mt-2 w-[200px] cursor-pointer rounded-lg border-none bg-bglightsecundary p-2 text-center font-bold placeholder-textlight shadow-light outline-none focus:ring-0 dark:bg-bgdarksecundary dark:placeholder-textdark dark:shadow-dark"
            type="password"
            name="password"
            required
            placeholder="Crie uma senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="font-bold text-red-500">{error}</p>}

          <input
            className="invisible h-0 w-0"
            type="file"
            name="avatarUrl"
            id="avatarUrl"
            placeholder="Digite a url da notícia"
            onChange={onFileSelected}
          />

          <button
            type="submit"
            className="z-20 my-3 flex w-[100px] cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-slate-950 to-blue-900 font-bold text-white shadow-light hover:from-blue-900 hover:to-slate-900 dark:shadow-dark"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
