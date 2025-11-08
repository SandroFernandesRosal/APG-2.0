'use client'
import {
  FaCameraRetro,
  FaSpinner,
  FaUser,
  FaEnvelope,
  FaLock,
} from 'react-icons/fa'
import { useState, useRef, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useToken } from '@/hooks/useToken'
import IgrejaSelect from '@/components/IgrejaSelect'
import { useTheme } from 'next-themes'

export default function RegisterIgreja() {
  const [name, setName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // Removido: sistema antigo de ministryRole
  const [igrejaId, setIgrejaId] = useState<string>('') // Nova estrutura

  const [error, setError] = useState<string | boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const PlaceHolder =
    'https://drive.google.com/uc?export=view&id=1hYXAUQfIieWGK0P9VCW8bpCgnamvnB1C'

  const [preview, setPreview] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const token = useToken()
  const router = useRouter()
  const { theme } = useTheme()

  const isSuperAdmin = token?.role === 'SUPERADMIN'
  const role = isSuperAdmin ? 'ADMIN' : 'MEMBRO'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(false)

    if (isSuperAdmin && !igrejaId) {
      setError('Ao criar um ADMIN, é obrigatório selecionar uma igreja.')
      setIsSubmitting(false)
      return
    }

    if (!formRef.current) {
      setIsSubmitting(false)
      return
    }

    const form = formRef.current
    const fileInput = form.querySelector<HTMLInputElement>('input[type="file"]')
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
        setIsSubmitting(false)
        return
      }
    }

    try {
      const payload: { [key: string]: string } = {
        name,
        login,
        avatarUrl: avatarUrl || PlaceHolder,
        password,
        role,
      }

      if (igrejaId) {
        payload.igrejaId = igrejaId
      }
      // Removido: lógica do sistema antigo

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const user = await response.json()

      if (response.ok && !user.error) {
        toast.success(
          isSuperAdmin
            ? 'Administrador criado com sucesso!'
            : 'Registo concluído com sucesso!',
        )

        router.push(`/${isSuperAdmin ? 'perfil' : 'login'}`)
        return
      }

      if (user.error) {
        setError(user.error)
      } else {
        setError('Erro ao registrar. Tente novamente mais tarde.')
      }
    } catch {
      setError('Erro ao conectar com o servidor. Tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
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
    <div className="flex w-full justify-center items-center min-h-screen pt-28 md:pt-[185px] pb-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 dark:from-secundary dark:to-secundary/80 px-6 py-8 text-center">
            <div className="flex justify-center mb-2">
              {theme === 'dark' ? (
                <Image
                  src="/img/logob.png"
                  height={80}
                  width={80}
                  priority
                  quality={100}
                  alt="logo do site"
                  className="object-contain"
                />
              ) : (
                <Image
                  src="/img/logob.png"
                  height={80}
                  width={80}
                  priority
                  quality={100}
                  alt="logo do site"
                  className="object-contain"
                />
              )}
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              {isSuperAdmin ? 'Criar Novo Admin' : 'Registre-se'}
            </h1>
            <p className="text-white/90 text-sm">Preencha os campos abaixo</p>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            className="flex w-full flex-col gap-5 p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm font-medium text-red-800 dark:text-red-200 text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center gap-3">
              <label
                htmlFor="avatarUrl"
                className="flex cursor-pointer flex-col items-center gap-2"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaCameraRetro className="text-primary dark:text-secundary" />
                  <span>Anexar foto de perfil (opcional)</span>
                </div>
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={150}
                    height={150}
                    className="h-[150px] w-[150px] rounded-full border-4 border-primary/30 dark:border-secundary/30 mb-2 p-1 object-cover shadow-lg"
                  />
                ) : (
                  <div className="h-[150px] w-[150px] rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 mb-2 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs p-4 text-center bg-gray-50 dark:bg-gray-700/50">
                    Pré-visualização da imagem
                  </div>
                )}
              </label>
              <input
                className="hidden"
                type="file"
                name="avatarUrl"
                id="avatarUrl"
                accept="image/*"
                onChange={onFileSelected}
              />
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {isSuperAdmin ? 'Nome do novo utilizador' : 'Seu nome'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  placeholder={
                    isSuperAdmin ? 'Nome do novo utilizador' : 'Seu nome'
                  }
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="login"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {isSuperAdmin ? 'Email do novo utilizador' : 'Seu email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="login"
                  name="login"
                  type="email"
                  required
                  value={login}
                  placeholder={
                    isSuperAdmin ? 'Email do novo utilizador' : 'seu@email.com'
                  }
                  onChange={(e) => setLogin(e.target.value.toLowerCase())}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  placeholder="Crie uma senha"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Igreja Select */}
            <div className="space-y-2">
              <label
                htmlFor="igrejaId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Igreja {isSuperAdmin ? '(Obrigatório)' : '(Opcional)'}
              </label>
              <IgrejaSelect
                value={igrejaId}
                onChange={setIgrejaId}
                placeholder={
                  isSuperAdmin
                    ? 'Selecione uma igreja...'
                    : 'Nenhuma / Não sou membro'
                }
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-primary/90 dark:from-secundary dark:to-secundary/90 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary/90 hover:to-primary dark:hover:from-secundary/90 dark:hover:to-secundary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Cadastrando...</span>
                </>
              ) : (
                <span>{isSuperAdmin ? 'Criar Admin' : 'Cadastrar'}</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
