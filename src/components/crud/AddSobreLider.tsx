'use client'
import Cookies from 'js-cookie'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaCameraRetro } from 'react-icons/fa'
import Image from 'next/image'

interface AddSobreLiderProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function AddSobreLider({ open, setOpen }: AddSobreLiderProps) {
  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const formRef = useRef<HTMLFormElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

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
        `/sobre/lider`,
        {
          name,
          title,
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
        setOpen(false)
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
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
        {open === true && (
          <AiFillCloseCircle
            onClick={() => setOpen(false)}
            className="cursor-pointer text-2xl font-bold text-black dark:text-white"
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
          width={200}
          height={200}
          alt={`imagem de ${name}`}
          className="flex  h-[150px] w-[150px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
        />
      )}

      <input
        className="mb-4 mt-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-300 bg-bglightsecundary p-1 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="name"
        placeholder="Nome"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="mb-4   w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-300 bg-bglightsecundary p-1 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="title"
        placeholder="Cargo de liderança"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="invisible h-0 w-0"
        type="file"
        name="coverUrl"
        id="coverUrl"
        placeholder="Digite a url do perfil"
        onChange={onFileSelected}
      />

      <button
        type="submit"
        className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white p-2 px-6 text-primary dark:text-secundary dark:hover:text-white dark:border-secundary/50 md:px-3 md:text-lg md:font-bold"
      >
        Enviar
      </button>
    </form>
  )
}
