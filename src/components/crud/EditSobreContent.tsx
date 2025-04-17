'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface EditSobreContentProps {
  setOpenEdit: (open: string | null) => void
  id: string
  img: string
  titulo: string
  conteudo: string
}

export default function EditSobreContent({
  setOpenEdit,
  id,
  img,
  titulo,
  conteudo,
}: EditSobreContentProps) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

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

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const uploadData = await uploadResponse.json()
        coverUrl = uploadData.fileUrl
      } catch (error) {
        console.error('Erro ao enviar imagem:', error)
        return
      }
    } else {
      coverUrl = img
    }

    try {
      const response = await fetch(`/api/sobre/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title || titulo,
          content: content || conteudo,
          coverUrl,
        }),
      })

      if (response.ok) {
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
        return response.json()
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
      className="fixed left-0 top-0  z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bglight dark:bg-bgdark"
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
        className="mb-3 flex cursor-pointer flex-col items-center gap-2  font-bold"
      >
        <p className="flex items-center gap-3">
          <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
          Anexar nova imagem (até 5mb)
        </p>

        {preview ? (
          <Image
            src={preview}
            width={200}
            height={100}
            alt={titulo}
            className="aspect-video"
          />
        ) : (
          <Image
            src={img}
            alt={titulo}
            width={500}
            height={250}
            className="aspect-video w-[70%] md:w-[50%]"
          />
        )}
      </label>

      <input
        className="input mt-4"
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

      <button type="submit" className="button !mb-0">
        Enviar
      </button>
    </form>
  )
}
