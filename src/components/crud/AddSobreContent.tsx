'use client'

import Cookies from 'js-cookie'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface AddSobreContentProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function AddSobreContent({
  open,
  setOpen,
}: AddSobreContentProps) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false) // Estado para controlar o spinner
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

    let coverUrl = ''

    if (!fileToUpload) {
      alert('Você precisa adicionar uma imagem.')
      setIsSubmitting(false)
      return
    }

    if (fileToUpload) {
      const formData = new FormData()
      formData.append('file', fileToUpload)

      try {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const uploadData = await uploadResponse.json()
        coverUrl = uploadData.fileUrl
      } catch (error) {
        console.error('Erro ao carregar arquivo:', error)
        setIsSubmitting(false)
        return
      }
    }

    try {
      const response = await fetch('/api/sobre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          coverUrl,
        }),
      })

      const newss = await response.json()

      if (response.status === 200 && newss) {
        setOpen(false)
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
        setIsSubmitting(false)
        return newss
      }

      console.log(newss)
      setIsSubmitting(false)
    } catch (error) {
      console.error('Erro ao criar história:', error)
      setIsSubmitting(false)
    }

    return null
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
    <form
      ref={formRef}
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bgdark/50 dark:bg-bglight/30"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center  rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%]  max-w-md">
        <h1 className="mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
          Adicionar história{' '}
          {open === true && (
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
          Anexar foto (até 50mb)
        </label>

        {preview && (
          <Image
            width={200}
            height={200}
            src={preview}
            alt={`imagem de ${title}`}
            className="aspect-video w-[200px]"
          />
        )}

        <input
          className="input mt-4"
          type="text"
          name="title"
          required
          placeholder="Escreva um título"
          onChange={(e) => setTitle(e.target.value.toLowerCase())}
        />

        <textarea
          className="input"
          name="content"
          required
          placeholder="Escreva a história"
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="invisible h-0 w-0"
          type="file"
          name="coverUrl"
          id="coverUrl"
          required
          placeholder="Escolha uma imagem"
          onChange={onFileSelected}
        />

        <button
          type="submit"
          className="button !mb-0 flex items-center gap-2 justify-center disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin text-lg" />
              Adicionando história...
            </>
          ) : (
            'Enviar'
          )}
        </button>
      </div>
    </form>
  )
}
