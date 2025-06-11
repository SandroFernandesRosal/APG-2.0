'use client'

import Cookies from 'js-cookie'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import { useToken } from '@/hooks/useToken'

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

  const decodedToken = useToken()
  const cookieToken = Cookies.get('tokennn')

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
      const bodyPayload: {
        name: string
        content: string
        coverUrl: string
        avatarUrl: string
        ministryRole?: string
      } = {
        name,
        content,
        coverUrl,
        avatarUrl,
      }

      // --- CORREÇÃO AQUI ---
      // A lógica agora envia o ministryRole se o membro logado tiver um.
      if (decodedToken?.ministryRole) {
        bodyPayload.ministryRole = decodedToken.ministryRole
      }

      const response = await fetch('/api/testemunhos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookieToken}`,
        },
        body: JSON.stringify(bodyPayload),
      })

      if (response.ok) {
        setOpen(false)
        window.location.href = '/testemunhos'
      } else {
        const errorData = await response.json()
        console.error('Erro ao criar testemunho:', errorData)
        alert(
          `Erro: ${errorData.error || 'Não foi possível enviar o testemunho.'}`,
        )
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
      <div className="relative flex flex-col items-center justify-center rounded-lg bg-bglight py-6 dark:bg-bgdark w-[90%]  max-w-3xl">
        <button type="button" onClick={() => setOpen(false)}>
          <AiFillCloseCircle className=" absolute right-2 top-2 text-3xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50" />
        </button>
        {avatarUrl && (
          <Image
            width={120}
            height={120}
            src={avatarUrl}
            alt={name}
            className="p-[2px] mr-1 h-[120px] w-[120px] rounded-full border-[1px] border-primary dark:border-secundary"
          />
        )}

        <div className="flex w-[90%] flex-col gap-2 rounded-2xl border-[1px] border-zinc-300 bg-bglightsecundary dark:border-zinc-800 dark:bg-bgdarksecundary md:w-[70%] lg:min-w-[700px] mt-4">
          <div className="flex items-center justify-between">
            <p className="pl-3 text-lg font-bold">{name}</p>
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
      </div>
    </form>
  )
}
