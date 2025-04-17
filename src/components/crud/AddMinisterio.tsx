'use client'

import Cookies from 'js-cookie'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaCameraRetro } from 'react-icons/fa'
import Image from 'next/image'

interface AddMinisterioProps {
  openMinisterio: boolean
  setOpenMinisterio: (open: boolean) => void
}

export default function AddMinisterio({
  openMinisterio,
  setOpenMinisterio,
}: AddMinisterioProps) {
  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const formRef = useRef<HTMLFormElement | null>(null)
  const [igreja, setIgreja] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)

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

    if (!fileToUpload) {
      alert('Você precisa adicionar uma imagem.')
      return
    }

    let coverUrl = ''

    const uploadFormData = new FormData()
    uploadFormData.append('file', fileToUpload)

    try {
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const uploadResult = await uploadRes.json()
      coverUrl = uploadResult.fileUrl
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      return
    }

    try {
      const response = await fetch(`/api/${local}/ministerio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          title,
          local: igreja,
          coverUrl,
        }),
      })

      if (response.ok) {
        setOpenMinisterio(false)
        router.push('/')
        window.location.href = '/'
      } else {
        const errorData = await response.json()
        console.error('Erro ao cadastrar líder:', errorData)
      }
    } catch (error) {
      console.error('Erro durante requisição:', error)
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
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar líder
        {openMinisterio && (
          <AiFillCloseCircle
            onClick={() => setOpenMinisterio(false)}
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
          alt="Imagem do líder"
          width={150}
          height={150}
          className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-2 border-primary p-1 dark:border-secundary"
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
        className="input"
        type="text"
        name="igreja"
        placeholder="Igreja (local)"
        onChange={(e) => setIgreja(e.target.value)}
      />

      <input
        className="invisible h-0 w-0"
        type="file"
        name="coverUrl"
        id="coverUrl"
        placeholder="Escolha uma imagem"
        onChange={onFileSelected}
      />

      <button type="submit" className="button !mb-0">
        Enviar
      </button>
    </form>
  )
}
