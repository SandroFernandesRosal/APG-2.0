'use client'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { useState, useRef, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useToken } from '@/hooks/useToken'

export default function RegisterIgreja() {
  const [name, setName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [ministryRole, setMinistryRole] = useState<string>('')

  const [error, setError] = useState<string | boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const PlaceHolder =
    'https://drive.google.com/uc?export=view&id=1hYXAUQfIieWGK0P9VCW8bpCgnamvnB1C'

  const [preview, setPreview] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const token = useToken()
  const router = useRouter()

  const isSuperAdmin = token?.role === 'SUPERADMIN'
  const role = isSuperAdmin ? 'ADMIN' : 'MEMBRO'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(false)

    if (isSuperAdmin && !ministryRole) {
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

      if (ministryRole) {
        payload.ministryRole = ministryRole
      }

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
    <div className="mt-[80px] flex w-full justify-center md:mt-[140px]">
      <div className="my-10 flex min-h-screen w-[100vw] flex-col items-center md:rounded-xl">
        <h1 className="mt-2 text-lg font-bold text-primary dark:text-secundary">
          {isSuperAdmin ? 'Criar Novo Admin' : 'Registre-se'}
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
              <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
              Anexar foto de perfil (opcional)
            </p>
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={150}
                height={150}
                className="h-[150px] w-[150px] rounded-full border-2 border-primary dark:border-secundary mb-4 p-1 object-cover"
              />
            ) : (
              <div className="h-[150px] w-[150px] rounded-full border-2 border-dashed border-zinc-400 mb-4 flex items-center justify-center text-zinc-500 text-sm p-2 text-center">
                Pré-visualização da imagem
              </div>
            )}
          </label>

          <input
            className="input"
            type="text"
            name="name"
            required
            placeholder={isSuperAdmin ? 'Nome do novo utilizador' : 'Seu nome'}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input"
            type="text"
            name="login"
            required
            placeholder={
              isSuperAdmin ? 'Email do novo utilizador' : 'Seu email'
            }
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

          <label
            htmlFor="ministryRole"
            className="font-bold text-sm self-start ml-[13%] mt-2"
          >
            Igreja {isSuperAdmin ? '(Obrigatório)' : '(Opcional)'}
          </label>
          <select
            id="ministryRole"
            name="ministryRole"
            className="input"
            value={ministryRole}
            onChange={(e) => setMinistryRole(e.target.value)}
            required={isSuperAdmin}
          >
            <option value="">
              {isSuperAdmin
                ? 'Selecione uma igreja...'
                : 'Nenhuma / Não sou membro'}
            </option>
            <option value="VILADAPENHA">Vila da Penha</option>
            <option value="TOMAZINHO">Tomazinho</option>
            <option value="MARIAHELENA">Maria Helena</option>
          </select>

          {error && (
            <p className="font-bold text-red-500 text-center">{error}</p>
          )}

          <input
            className="invisible h-0 w-0"
            type="file"
            name="avatarUrl"
            id="avatarUrl"
            onChange={onFileSelected}
          />

          <button
            type="submit"
            className="button flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                Cadastrando...
              </>
            ) : isSuperAdmin ? (
              'Criar Admin'
            ) : (
              'Cadastrar'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
