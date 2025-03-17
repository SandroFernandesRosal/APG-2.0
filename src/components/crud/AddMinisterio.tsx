'use client'
import Cookies from 'js-cookie'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { api } from '@/lib/api'
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

    let coverUrl = ''

    if (!fileToUpload) {
      alert('Você precisa adicionar uma imagem.')
      return
    }

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.append('file', fileToUpload)

      try {
        const uploadResponse = await api.post('/upload', uploadFormData)
        coverUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.error('Error uploading file:', error)
        return
      }
    }

    try {
      const res = await api.post(
        `/ministerio/${local}`,
        {
          name,
          title,
          local: `${igreja}`,
          coverUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const lider = res.data

      if (res.status === 200 && lider) {
        setOpenMinisterio(false)
        router.push('/')
        window.location.href = '/'
        return lider
      }
      console.log(lider)
      return null
    } catch (error) {
      console.error('Error during API request:', error)
    }
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
      className="fixed left-0 top-0 z-20 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar lider{' '}
        {openMinisterio === true && (
          <AiFillCloseCircle
            onClick={() => setOpenMinisterio(false)}
            className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        )}
      </h1>

      <label
        htmlFor="coverUrl"
        className="mb-3 flex cursor-pointer items-center gap-2  font-bold"
      >
        <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
        Anexar foto (até 5mb)
      </label>
      {preview && (
        <Image
          src={preview}
          alt="Imagem do lider"
          width={150}
          height={150}
          className="flex  h-[150px] w-[150px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
        />
      )}

      <input
        className="input"
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
        placeholder="Digite a url do perfil"
        onChange={onFileSelected}
      />

      <button type="submit" className="button !mb-0">
        Enviar
      </button>
    </form>
  )
}
