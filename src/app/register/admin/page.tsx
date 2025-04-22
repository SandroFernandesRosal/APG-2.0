'use client'
import { FaCameraRetro } from 'react-icons/fa'
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RegisterAdmin() {
  const [name, setName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | boolean>(false)
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  const PlaceHolder =
    'https://drive.google.com/uc?export=view&id=1hYXAUQfIieWGK0P9VCW8bpCgnamvnB1C'
  const [preview, setPreview] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const router = useRouter()

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch('/api/auth/admin/login/me')
        if (res.status === 200) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      } catch {
        setIsAuthorized(false)
      }
    }

    checkAdmin()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!formRef.current) return

    const fileInput =
      formRef.current.querySelector<HTMLInputElement>('input[type="file"]')
    const fileToUpload = fileInput?.files?.[0] || null

    let avatarUrl = ''

    if (fileToUpload) {
      const formData = new FormData()
      formData.append('file', fileToUpload)

      try {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await uploadResponse.json()
        avatarUrl = data.fileUrl
      } catch (error) {
        console.error('Erro ao carregar foto:', error)
        setError('Falha ao carregar a foto do perfil. Tente novamente.')
        return
      }
    }

    try {
      const response = await fetch('/api/auth/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          login,
          avatarUrl: avatarUrl || PlaceHolder,
          password,
        }),
      })

      const user = await response.json()

      if (response.status === 200 && !user.error) {
        router.push('/login/adm')
        return user
      } else if (user.error) {
        setError(user.error)
      } else {
        setError('Erro ao registrar. Tente novamente mais tarde.')
      }
    } catch {
      setError('Erro ao registrar. Tente novamente mais tarde.')
    }
  }

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (files && files[0]) {
      const previewUrl = URL.createObjectURL(files[0])
      setPreview(previewUrl)
    }
  }

  if (isAuthorized === null) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <p className="text-center text-xl">Verificando permissão...</p>
      </div>
    )
  }

  if (isAuthorized === false) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <p className="text-xl font-bold text-red-600 text-center">
          Você não tem permissão.
          <br />
          Apenas administradores podem acessar este conteúdo.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-[80px] flex w-full justify-center md:mt-[140px]">
      <div className="my-10 flex min-h-screen w-[100vw] flex-col items-center md:rounded-xl">
        <h1 className="mt-2 text-lg font-bold text-primary dark:text-secundary">
          Registrar Administrador
        </h1>
        <p className="mb-5 text-xl">preencha os campos abaixo</p>
        <form
          ref={formRef}
          className="flex w-[75%] max-w-[500px] flex-col items-center gap-3 p-3 md:mb-5 border-[1px] border-zinc-400 dark:border-zinc-700 rounded-md py-5"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="avatarUrl"
            className="flex cursor-pointer flex-col items-center gap-2 font-bold"
          >
            <p className="flex gap-2 my-4">
              <FaCameraRetro className="text-xl text-primary dark:text-secundary" />
              Anexar foto de perfil (opcional)
            </p>
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={150}
                height={150}
                className="h-[150px] w-[150px] rounded-full border-2 border-primary dark:border-secundary mb-4 p-1"
              />
            )}
          </label>

          <input
            className="input"
            type="text"
            name="name"
            required
            placeholder="Seu nome"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input"
            type="text"
            name="login"
            required
            placeholder="seu email"
            onChange={(e) => setLogin(e.target.value.toLowerCase())}
          />

          <input
            className="input"
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
            onChange={onFileSelected}
          />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
