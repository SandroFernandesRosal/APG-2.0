'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { api } from '@/lib/api'
import Image from 'next/image'

interface AddNewProps {
  openNew: boolean
  setOpenNew: (open: boolean) => void
}

export default function AddNew({ openNew, setOpenNew }: AddNewProps) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [destaque, setDestaque] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const { local } = useLocal()
  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const form = formRef.current
    const fileInput = form?.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const fileToUpload = fileInput?.files?.[0]

    let coverUrl = ''

    if (!fileToUpload) {
      alert('Você precisa adicionar uma imagem.')
      return
    }

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
        return
      }
    }

    try {
      const response = await api.post(
        `/news/${local}`,
        {
          title,
          content,
          coverUrl,
          page: local,
          destaque,
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
        setOpenNew(false)
        router.push('/')
        window.location.href = '/'
        return newss
      }

      console.log(newss)
    } catch (error) {
      console.error('Erro ao criar notícia:', error)
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
      className="fixed left-0 top-0 z-30 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar Notícia{' '}
        {openNew === true && (
          <AiFillCloseCircle
            onClick={() => setOpenNew(false)}
            className="cursor-pointer text-2xl font-bold text-black dark:text-white"
          />
        )}
      </h1>

      <label
        htmlFor="coverUrl"
        className="mb-3 flex cursor-pointer items-center gap-2 font-bold"
      >
        <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
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
        className="mb-4 mt-2 w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] border-zinc-300 bg-bglightsecundary p-1 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="title"
        required
        placeholder="Título da notícia"
        onChange={(e) => setTitle(e.target.value.toLowerCase())}
      />

      <textarea
        className="mb-1 w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] border-zinc-300 bg-bglightsecundary p-1 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark"
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
        placeholder="Digite a url da notícia"
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
        className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white p-2 px-6 text-primary dark:text-secundary dark:hover:text-white dark:border-secundary/50 md:px-3 md:text-lg md:font-bold"
      >
        Enviar
      </button>
    </form>
  )
}
