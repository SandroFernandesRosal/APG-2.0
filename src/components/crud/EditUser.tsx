'use client'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { useToken } from '@/hooks/useToken'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'

interface EditUserProps {
  id: string
  nome: string
  email: string
  img?: string
  igrejaId?: string | null
  role: 'ADMIN' | 'MEMBRO' | 'SUPERADMIN'
}

export default function EditUser({ id, nome, email, img }: EditUserProps) {
  const [name, setName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const PlaceHolder =
    'https://drive.google.com/uc?export=view&id=1hYXAUQfIieWGK0P9VCW8bpCgnamvnB1C'

  const [preview, setPreview] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const token = useToken()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)
    setError('')

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
      const response = await fetch(`/api/auth/register/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name || nome,
          login: login || email,
          avatarUrl: avatarUrl || PlaceHolder,
          password: password || null,
        }),
      })

      if (response.ok) {
        toast.success('Perfil atualizado! Por favor, faça login novamente.')
        const logoutResponse = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        Cookies.remove('token')
        window.location.href = '/login'
        return logoutResponse
      } else {
        const errorData = await response.json()

        setError(errorData.error || 'Ocorreu um erro desconhecido.')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsEditing(false)
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
          <div className="my-10 flex min-h-screen w-[100vw] flex-col items-center">
            <div className="flex flex-col items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-2xl w-full max-w-2xl my-4">
              {/* Header */}
              <div className="flex items-center justify-between w-full p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Editar Perfil
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Faça alterações nos campos abaixo
                </p>
              </div>

              {/* Área de upload única no topo - SEMPRE VISÍVEL */}
              <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 min-h-[120px] flex-shrink-0">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">
                    Para alterar a foto de perfil (opcional):
                  </p>
                  <label
                    htmlFor="avatarUrl"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-700"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <FaCameraRetro className="w-6 h-6 mb-1 text-blue-500 dark:text-blue-400" />
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        <span className="font-semibold">
                          Clique para anexar
                        </span>{' '}
                        uma foto
                      </p>
                      <p className="text-xs text-blue-500 dark:text-blue-500">
                        JPG, PNG (opcional)
                      </p>
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      name="avatarUrl"
                      id="avatarUrl"
                      accept="image/*"
                      onChange={onFileSelected}
                    />
                  </label>
                </div>
              </div>

              {/* Content */}
              <div className="w-full p-4 space-y-4 overflow-y-auto max-h-[60vh]">
                {/* Media Preview */}
                {(preview || img) && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Foto atual:
                    </p>
                    <div className="flex justify-center">
                      <Image
                        src={preview || img || PlaceHolder}
                        alt="Avatar"
                        width={120}
                        height={120}
                        className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
                      />
                    </div>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Nome
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={nome}
                      placeholder="Seu nome"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="login"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                      type="text"
                      name="login"
                      id="login"
                      value={email}
                      readOnly
                      placeholder="Seu email"
                      onChange={(e) => setLogin(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Nova Senha
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Crie uma nova senha"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-sm font-medium text-red-700 dark:text-red-300">
                        {error}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end w-full p-4 border-t border-gray-200 dark:border-gray-700 space-x-3 bg-white dark:bg-gray-800">
                <Link
                  href="/perfil"
                  className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </Link>
                <button
                  type="button"
                  disabled={isEditing}
                  onClick={handleSubmit}
                  className="px-6 py-2 text-sm font-medium text-white bg-primary dark:bg-secundary rounded-lg hover:bg-primary/90 dark:hover:bg-secundary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isEditing ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Editando...</span>
                    </>
                  ) : (
                    <span>Salvar Alterações</span>
                  )}
                </button>
              </div>
            </div>
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
