'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { api } from '@/lib/api'
import Image from 'next/image'

interface EditNewProps {
  setOpenEdit: (open: string | null) => void
  id: string
  img: string
  titulo: string
  conteudo: string
  destacar: boolean
}

export default function EditNew({
  setOpenEdit,
  id,
  img,
  titulo,
  conteudo,
  destacar,
}: EditNewProps) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [destaque, setDestaque] = useState<boolean>(destacar)
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

    if (fileToUpload) {
      try {
        const uploadFormData = new FormData()
        uploadFormData.append('file', fileToUpload)

        const uploadResponse = await api.post('/upload', uploadFormData)
        coverUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.error('Erro ao enviar imagem:', error)
        return
      }
    } else {
      coverUrl = img
    }

    try {
      const response = await api.put(
        `/news/${local}/${id}`,
        {
          title: title || titulo,
          content: content || conteudo,
          coverUrl,
          page: local,
          destaque,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.status === 200) {
        router.push('/')
        window.location.href = '/'
        return response.data
      }

      console.error('Erro ao editar notícia:', response.statusText)
    } catch (error) {
      console.error('Erro ao editar notícia:', error)
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
      className="fixed left-0 top-0 z-30 mt-10 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg md:mt-20"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Editar Notícia{' '}
        <AiFillCloseCircle
          onClick={() => setOpenEdit(null)}
          className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
        />
      </h1>

      <label
        htmlFor="coverUrl"
        className="mb-3 flex cursor-pointer flex-col items-center gap-2 font-bold"
      >
        <p className="flex items-center gap-3 text-white">
          <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
          Anexar nova imagem (até 5mb)
        </p>

        {preview ? (
          <Image
            src={preview}
            width={200}
            height={100}
            alt={titulo}
            className="aspect-video p-1 border-[1px] border-primary dark:border-secundary"
          />
        ) : (
          <Image
            src={img}
            alt={titulo}
            width={500}
            height={250}
            className="aspect-video w-[70%] md:w-[50%] p-1 border-[1px] border-primary dark:border-secundary"
          />
        )}
      </label>

      <input
        className="input"
        type="text"
        name="title"
        id="title"
        required
        defaultValue={titulo}
        placeholder="Você precisa digitar um título"
        onChange={(e) => setTitle(e.target.value.toLowerCase())}
      />

      <textarea
        className="input"
        name="content"
        id="content"
        required
        defaultValue={conteudo}
        placeholder="Você precisa digitar um conteúdo"
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="invisible h-0 w-0"
        type="file"
        name="coverUrl"
        id="coverUrl"
        onChange={onFileSelected}
      />

      <div className="mb-4 flex items-center gap-2 p-2">
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

      <button type="submit" className="button !mb-0">
        Enviar
      </button>
    </form>
  )
}
