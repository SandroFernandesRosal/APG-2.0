'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { api } from '@/lib/api'
import { UserIgreja } from '@/data/types/userigreja'

interface AddTestemunhoProps {
  setOpen: (value: boolean) => void
  userIgreja: UserIgreja
}

export default function AddTestemunho({
  setOpen,
  userIgreja,
}: AddTestemunhoProps) {
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const router = useRouter()
  const token = Cookies.get('tokenigreja')

  const { name, avatarUrl } = userIgreja

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = formRef.current
    if (!form) return

    const fileInput = form.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const fileToUpload = fileInput?.files?.[0]

    let coverUrl = ''

    if (fileToUpload) {
      const formData = new FormData()
      formData.append('file', fileToUpload)

      try {
        const uploadResponse = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        coverUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.error('Erro ao carregar arquivo:', error)
      }
    }

    try {
      const response = await api.post(
        `/testemunhos`,
        {
          name,
          content,
          coverUrl,
          avatarUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const newss = response.data

      if (response.status === 200 && newss) {
        setOpen(false)
        router.push('/testemunhos')
        window.location.href = '/testemunhos'
        return newss
      }

      console.log(newss)
      return null
    } catch (error) {
      console.error('Erro ao criar testemunho:', error)
    }
  }

  function onFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files || files.length === 0) {
      return
    }

    const previewUrl = URL.createObjectURL(files[0])
    setPreview(previewUrl)
  }
  return (
    <form
      ref={formRef}
      className="z-20 flex w-[100vw] flex-col items-start gap-3  px-6 py-4   md:flex-row md:justify-center"
      onSubmit={handleSubmit}
    >
      {avatarUrl && (
        <Image
          width={120}
          height={120}
          src={avatarUrl}
          alt={name}
          className="p-[2px] mr-1 h-[120px] w-[120px] rounded-full border-[1px] border-primary  dark:border-secundary"
        />
      )}

      <div className="flex w-full flex-col gap-2 rounded-2xl bg-bglightsecundary shadow-light dark:bg-bgdarksecundary  md:w-[70%] lg:min-w-[700px] border-[1px] border-zinc-300 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          {' '}
          <p className="pl-3 text-lg font-bold">{name}</p>
          <button onClick={() => setOpen(false)} className="pr-1">
            <AiFillCloseCircle className="text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50" />
          </button>{' '}
        </div>

        <textarea
          className="mx-1 flex w-full  flex-col gap-2 border-none bg-bglightsecundary  outline-none ring-0 focus:ring-0  dark:bg-bgdarksecundary"
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
              className=" aspect-video w-[200px]"
            />
          </div>
        )}
        <div className="mx-2 mb-2 flex w-full justify-center gap-4">
          <label
            htmlFor="coverUrl"
            className=" flex cursor-pointer items-center gap-2  font-bold"
          >
            <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
            Anexar foto (Opcional)
          </label>
          <button type="submit" className="button !mb-0">
            Enviar
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
