'use client'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useToken } from '@/hooks/useToken'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'

interface EditUserProps {
  id: string
  nome: string
  email: string
  img?: string
}

export default function EditUser({ id, nome, email, img }: EditUserProps) {
  const [name, setName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const PlaceHolder =
    'https://drive.google.com/uc?export=view&id=1hYXAUQfIieWGK0P9VCW8bpCgnamvnB1C'

  const [preview, setPreview] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const router = useRouter()
  const token = useToken()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)

    const form = formRef.current
    const fileInput = form?.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const fileToUpload = fileInput?.files?.[0]

    let avatarUrl = ''

    if (fileToUpload) {
      const formData = new FormData()
      formData.append('file', fileToUpload)

      try {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
        const uploadData = await uploadResponse.json()
        avatarUrl = uploadData.fileUrl
      } catch (error) {
        console.error('Erro ao carregar foto:', error)
      }
    } else {
      avatarUrl = img || PlaceHolder
    }

    try {
      const response = await fetch(`/api/auth/admin/register/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name || nome,
          login: login || email,
          avatarUrl: avatarUrl || PlaceHolder,
          password,
        }),
      })

      if (response.ok) {
        const response = await fetch('/api/auth/admin/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        Cookies.remove('token')
        router.push('/login')
        window.location.href = '/login'
        return response
      }

      console.log(response)
      return null
    } catch (error) {
      console.error('Erro ao editar', error)
    }
  }

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewUrl = URL.createObjectURL(files[0])

    setPreview(previewUrl)
  }

  return (
    <>
      {token ? (
        <div className="mt-[80px] flex w-full justify-center md:mt-[140px]">
          <div className="my-10 flex min-h-screen w-[100vw] flex-col items-center ">
            <h1 className="mt-2 text-lg font-bold text-primary dark:text-secundary">
              Editar perfil
            </h1>
            <p className="mb-5 text-xl">Faça alterações nos campos abaixo</p>
            <form
              ref={formRef}
              className="flex w-[75%] max-w-[500px] flex-col items-center gap-3 rounded-xl border-[1px] border-zinc-400 bg-bglight p-3 dark:border-zinc-700 dark:bg-bgdark md:mb-5"
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
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={150}
                    height={150}
                    className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
                  />
                ) : (
                  <Image
                    src={
                      img ||
                      'https://drive.google.com/uc?export=view&id=1hYXAUQfIieWGK0P9VCW8bpCgnamvnB1C'
                    }
                    alt="Avatar"
                    width={150}
                    height={150}
                    className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
                  />
                )}
              </label>

              <input
                className="input mt-4"
                type="text"
                name="name"
                defaultValue={nome}
                required
                placeholder="Seu nome"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="input"
                type="text"
                name="login"
                value={email}
                readOnly
                required
                placeholder="Seu email"
                onChange={(e) => setLogin(e.target.value)}
              />

              <input
                className="input"
                type="password"
                name="password"
                required
                placeholder="Crie uma senha"
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                className="invisible h-0 w-0"
                type="file"
                name="avatarUrl"
                id="avatarUrl"
                onChange={onFileSelected}
              />

              <button
                type="submit"
                className="button !mb-0 flex items-center gap-2 justify-center"
              >
                {isEditing ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Editando admin...
                  </>
                ) : (
                  'Editar'
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <main className="mb-2 mt-4 flex min-h-screen flex-col items-center gap-5 pt-24 md:mt-0 md:pt-[165px]">
          <div className="mb-4 flex min-h-screen w-[100vw] flex-col flex-wrap items-center gap-1 rounded-[35px] bg-bglightsecundary px-1 pb-4 shadow-light dark:bg-bgdarksecundary dark:shadow-dark md:w-[90vw] md:rounded-xl">
            <div className="flex flex-col items-center md:min-w-[35%]">
              <h1 className="m-0 text-lg font-bold text-primary dark:text-secundary">
                Você não está logado
              </h1>
              <p className="mb-4 text-xl">Faça login ou registre-se</p>
            </div>

            <div className="flex gap-3">
              <Link href={'/login/igreja'} className="button !mb-0">
                login
              </Link>

              <Link href={'/register'} className="button !mb-0">
                Registre-se
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  )
}
