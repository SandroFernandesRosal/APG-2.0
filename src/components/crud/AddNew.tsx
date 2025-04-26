'use client'

import Cookies from 'js-cookie'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import Image from 'next/image'

interface AddNewProps {
  openNew: boolean
  setOpenNew: (open: boolean) => void
}

export default function AddNew({ openNew, setOpenNew }: AddNewProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [destaque, setDestaque] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  const { local } = useLocal()
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
    const formData = new FormData()
    formData.append('file', fileToUpload)

    try {
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const uploadResult = await uploadResponse.json()
      coverUrl = uploadResult.fileUrl
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`/api/${local}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          coverUrl,
          page: local,
          destaque,
        }),
      })

      if (response.ok) {
        setOpenNew(false)
        router.push('/')
        window.location.href = '/'
      } else {
        const data = await response.json()
        console.error('Erro ao postar notícia:', data)
      }
    } catch (error) {
      console.error('Erro ao enviar notícia:', error)
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
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bglight dark:bg-bgdark"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar Notícia
        {openNew && (
          <AiFillCloseCircle
            onClick={() => setOpenNew(false)}
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
          width={200}
          height={200}
          alt="Imagem"
          className="aspect-video w-[200px]"
        />
      )}

      <input
        className="input mt-4"
        type="text"
        name="title"
        required
        placeholder="Título da notícia"
        onChange={(e) => setTitle(e.target.value.toLowerCase())}
      />

      <textarea
        className="input"
        name="content"
        required
        placeholder="Conteúdo da notícia"
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="invisible h-0 w-0"
        type="file"
        name="coverUrl"
        id="coverUrl"
        required
        onChange={onFileSelected}
      />

      <div className="my-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="destaque"
          name="destaque"
          checked={destaque}
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
        className="button !mb-0 flex items-center gap-2 justify-center disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="animate-spin" />
            Adicionando notícia...
          </>
        ) : (
          'Enviar'
        )}
      </button>
    </form>
  )
}
