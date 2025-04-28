'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface EditSobreLiderProps {
  setOpenEdit: (open: string | null) => void
  id: string
  nome: string
  titulo: string
  img: string
}

export default function EditSobreLider({
  setOpenEdit,
  id,
  nome,
  titulo,
  img,
}: EditSobreLiderProps) {
  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)

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
      const response = await fetch(`/api/sobrelider/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: title || titulo,
          name: name || nome,
          coverUrl,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        setOpenEdit(null)
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
        return response.json()
      }

      console.error('Erro ao editar um líder:', response.statusText)
    } catch (error) {
      console.error('Erro ao editar um líder:', error)
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
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bglight dark:bg-bgdark text-textlight dark:text-textdark"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Editar Líder{' '}
        <AiFillCloseCircle
          onClick={() => setOpenEdit(null)}
          className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
        />
      </h1>

      <label
        htmlFor="coverUrl"
        className="mb-3 flex cursor-pointer flex-col items-center gap-2 font-bold"
      >
        <p className="flex items-center gap-3">
          <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
          Anexar nova foto (até 5mb)
        </p>
        {preview ? (
          <Image
            width={120}
            height={120}
            src={preview}
            alt={nome}
            className="flex  h-[150px] w-[150px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
          />
        ) : (
          <Image
            width={120}
            height={120}
            src={img}
            alt={nome}
            className="flex  h-[150px] w-[150px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
          />
        )}
      </label>

      <input
        className="input mt-4"
        type="text"
        name="name"
        required
        defaultValue={nome}
        placeholder="Digite um nome"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="title"
        required
        defaultValue={titulo}
        placeholder="Digite um título"
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
        className="button !mb-0 flex items-center gap-2 justify-center"
      >
        {isEditing ? (
          <>
            <FaSpinner className="animate-spin" />
            Editando líder...
          </>
        ) : (
          'Editar'
        )}
      </button>
    </form>
  )
}
