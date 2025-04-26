'use client'
import Cookies from 'js-cookie'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import Image from 'next/image'

interface AddSobreLiderProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function AddSobreLider({ open, setOpen }: AddSobreLiderProps) {
  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  const router = useRouter()
  const token = Cookies.get('tokennn')

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

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', fileToUpload)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const data = await uploadResponse.json()
      coverUrl = data.fileUrl
    } catch (error) {
      console.error('Erro ao carregar arquivo:', error)
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/sobrelider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, title, coverUrl }),
      })

      if (res.ok) {
        const lider = await res.json()
        setOpen(false)
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
        return lider
      }

      console.log('Erro ao criar líder:', res.statusText)
    } catch (error) {
      console.error('Erro durante a requisição à API:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (files?.length) {
      const previewUrl = URL.createObjectURL(files[0])
      setPreview(previewUrl)
    }
  }

  return (
    <form
      ref={formRef}
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bglight dark:bg-bgdark"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar líder{' '}
        {open && (
          <AiFillCloseCircle
            onClick={() => setOpen(false)}
            className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        )}
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
          width={150}
          height={150}
          alt={`Imagem de ${name}`}
          className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
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
        onChange={onFileSelected}
      />

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
    </form>
  )
}
