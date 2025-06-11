// AddMinisterio.tsx

'use client'

import Cookies from 'js-cookie'
import { useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import Image from 'next/image'
import { useToken } from '@/hooks/useToken'

interface AddMinisterioProps {
  openMinisterio: boolean
  setOpenMinisterio: (open: boolean) => void
}

export default function AddMinisterio({
  setOpenMinisterio,
}: AddMinisterioProps) {
  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const formRef = useRef<HTMLFormElement | null>(null)

  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { local } = useLocal()
  const router = useRouter()
  const cookieToken = Cookies.get('tokennn')

  const decodedToken = useToken()

  const [role, setRole] = useState<string>(
    decodedToken?.role === 'ADMIN' ? (decodedToken.ministryRole ?? '') : local,
  )

  useEffect(() => {
    if (decodedToken?.role === 'ADMIN') {
      setRole(decodedToken.ministryRole ?? '')
    }
  }, [decodedToken])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    const form = formRef.current
    const fileInput = form?.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const fileToUpload = fileInput?.files?.[0]

    if (!fileToUpload) {
      alert('Você precisa adicionar uma imagem.')
      setIsSubmitting(false)
      return
    }

    let coverUrl = ''

    const uploadFormData = new FormData()
    uploadFormData.append('file', fileToUpload)

    try {
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const uploadResult = await uploadRes.json()
      coverUrl = uploadResult.fileUrl
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`/api/ministerio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookieToken}`,
        },

        body: JSON.stringify({
          name,
          title,
          local: role,
          role,
          coverUrl,
        }),
      })

      if (response.ok) {
        setOpenMinisterio(false)
        router.push('/')
        window.location.href = '/'
      } else {
        const errorData = await response.json()
        console.error('Erro ao cadastrar líder:', errorData)
      }
    } catch (error) {
      console.error('Erro durante requisição:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) return

    const previewUrl = URL.createObjectURL(files[0])
    setPreview(previewUrl)
  }

  return (
    <form
      ref={formRef}
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bgdark/50 dark:bg-bglight/30"
      onSubmit={handleSubmit}
    >
      <div className="relative flex flex-col items-center justify-center rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%] max-w-md">
        <button
          type="button"
          aria-label="Fechar modal"
          onClick={() => setOpenMinisterio(false)}
          className="absolute top-4 right-4 text-primary dark:text-secundary hover:text-primary/70 dark:hover:text-secundary/70"
        >
          <AiFillCloseCircle className="text-3xl" />
        </button>
        <h1 className="mb-2 text-center text-lg font-bold text-primary dark:text-secundary">
          Adicionar líder
        </h1>

        <label
          htmlFor="coverUrl"
          className="mb-3 flex cursor-pointer items-center gap-2 font-bold"
        >
          <FaCameraRetro className="text-xl text-primary dark:text-secundary" />
          Anexar foto (até 5mb)
        </label>

        {preview && (
          <Image
            src={preview}
            alt="Imagem do líder"
            width={150}
            height={150}
            className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-2 border-primary p-1 dark:border-secundary"
          />
        )}

        <input
          className="input mt-4"
          type="text"
          name="name"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          type="text"
          name="title"
          placeholder="Cargo de liderança"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="invisible h-0 w-0"
          type="file"
          name="coverUrl"
          id="coverUrl"
          placeholder="Escolha uma imagem"
          onChange={onFileSelected}
        />

        <label
          htmlFor="igreja"
          className={`font-bold mb-1 ${decodedToken?.role === 'ADMIN' ? 'hidden' : ''}`}
        >
          Selecione a igreja
        </label>

        <select
          id="igreja"
          name="igreja"
          className="input mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          disabled={decodedToken?.role === 'ADMIN'}
        >
          <option value="">Selecione...</option>
          <option value="VILADAPENHA">Vila da Penha</option>
          <option value="MARIAHELENA">Maria Helena</option>
          <option value="TOMAZINHO">Tomazinho</option>
        </select>

        <button
          type="submit"
          className="button !mb-0 flex items-center gap-2 justify-center disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Adicionando líder...
            </>
          ) : (
            'Enviar'
          )}
        </button>
      </div>
    </form>
  )
}
