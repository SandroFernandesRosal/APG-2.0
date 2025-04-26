'use client'

import Cookies from 'js-cookie'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface AddTestemunhoProps {
  setOpen: (value: boolean) => void
  userIgreja: {
    name: string
    avatarUrl: string
  }
}

export default function AddTestemunho({
  setOpen,
  userIgreja,
}: AddTestemunhoProps) {
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  const { name, avatarUrl } = userIgreja
  const router = useRouter()
  const token = Cookies.get('tokenigreja')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    const form = formRef.current
    const fileInput = form?.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const fileToUpload = fileInput?.files?.[0]

    let coverUrl = ''
    if (fileToUpload) {
      const formData = new FormData()
      formData.append('file', fileToUpload)

      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const uploadResult = await uploadRes.json()
        coverUrl = uploadResult.fileUrl
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error)
        setIsSubmitting(false)
        return
      }
    }

    try {
      const response = await fetch('/api/testemunhos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          content,
          coverUrl,
          avatarUrl,
        }),
      })

      if (response.ok) {
        setOpen(false)
        router.push('/testemunhos')
        window.location.href = '/testemunhos'
      } else {
        const errorData = await response.json()
        console.error('Erro ao criar testemunho:', errorData)
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
      className="z-20 flex w-[100vw] flex-col items-start gap-3 px-6 py-4 md:flex-row md:justify-center"
      onSubmit={handleSubmit}
    >
      {avatarUrl && (
        <Image
          width={120}
          height={120}
          src={avatarUrl}
          alt={name}
          className="p-[2px] mr-1 h-[120px] w-[120px] rounded-full border-[1px] border-primary dark:border-secundary"
        />
      )}

      <div className="flex w-full flex-col gap-2 rounded-2xl bg-bglightsecundary shadow-light dark:bg-bgdarksecundary md:w-[70%] lg:min-w-[700px] border-[1px] border-zinc-300 dark:border-zinc-800 mt-4">
        <div className="flex items-center justify-between">
          <p className="pl-3 text-lg font-bold">{name}</p>
          <button onClick={() => setOpen(false)} className="pr-1">
            <AiFillCloseCircle className="text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50" />
          </button>
        </div>

        <textarea
          className="mx-1 flex w-full flex-col gap-2 border-none bg-bglightsecundary outline-none ring-0 focus:ring-0 dark:bg-bgdarksecundary"
          name="content"
          required
          placeholder="Escreva seu testemunho"
          onChange={(e) => setContent(e.target.value)}
        />

        {preview && (
          <div className="mb-4 flex w-full items-center justify-center">
            <Image
              src={preview}
              width={200}
              height={200}
              alt="imagem perfil"
              className="aspect-video w-[200px]"
            />
          </div>
        )}

        <div className="mx-2 mb-2 flex w-full justify-center gap-4">
          <label
            htmlFor="coverUrl"
            className="flex cursor-pointer items-center gap-2 font-bold"
          >
            <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
            Anexar foto (Opcional)
          </label>

          <button
            type="submit"
            className="button !mb-0 flex items-center gap-2 justify-center disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                Enviando testemunho...
              </>
            ) : (
              'Enviar'
            )}
          </button>
        </div>
      </div>

      <input
        className="invisible h-0 w-0"
        type="file"
        name="coverUrl"
        id="coverUrl"
        placeholder="Digite a url da notícia"
        onChange={onFileSelected}
      />
    </form>
  )
}
