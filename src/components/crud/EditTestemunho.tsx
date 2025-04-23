'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro } from 'react-icons/fa'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AiFillCloseCircle } from 'react-icons/ai'
import { UserIgreja } from '@/data/types/userigreja'

interface EditTestemunhoProps {
  setOpenEdit: (value: string | null) => void
  id: string
  img?: string
  conteudo: string
  name: string
  avatarUrl?: string
  userIgreja: UserIgreja
}

export default function EditTestemunho({
  setOpenEdit,
  id,
  img,
  conteudo,
  name,
  avatarUrl,
}: EditTestemunhoProps) {
  const [content, setContent] = useState(conteudo)
  const [preview, setPreview] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const router = useRouter()
  const token = Cookies.get('tokenigreja')
  const tokenAdm = Cookies.get('tokennn')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = formRef.current
    if (!form) return

    const fileInput = form.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const fileToUpload = fileInput?.files?.[0]

    let coverUrl = img || ''

    if (fileToUpload) {
      const formData = new FormData()
      formData.append('file', fileToUpload)

      try {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const uploadData = await uploadResponse.json()
        coverUrl = uploadData.fileUrl
      } catch (error) {
        console.error('Erro ao carregar arquivo:', error)
      }
    }

    try {
      const response = await fetch(`/api/testemunhos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || tokenAdm}`,
        },
        body: JSON.stringify({
          name,
          avatarUrl,
          content,
          coverUrl,
          isPublic: false,
        }),
      })

      const newss = await response.json()

      if (response.ok && newss) {
        setOpenEdit(null)
        router.push('/testemunhos')
        window.location.href = '/testemunhos'
        return newss
      }

      console.log(newss)
      return null
    } catch (error) {
      console.error('Erro ao editar testemunho:', error)
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
      className="fixed left-0 top-0 flex min-h-screen w-[100vw] flex-col items-start gap-3 bg-black/50 px-6 py-4 pt-[165px] text-black backdrop-blur-lg dark:text-white md:flex-row md:items-start md:justify-center z-30"
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

      <div className="flex w-full flex-col gap-2 rounded-2xl border-[1px] border-zinc-300 bg-bglight dark:border-zinc-800 dark:bg-bgdark md:w-[70%] lg:min-w-[700px]">
        <div className="flex items-center justify-between mt-4">
          <p className="pl-3 text-lg font-bold">{name}</p>
          <button onClick={() => setOpenEdit(null)} className="pr-1">
            <AiFillCloseCircle className="text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50" />
          </button>
        </div>

        <textarea
          className="mx-1 flex w-full flex-col gap-2 border-none bg-bglight outline-none ring-0 focus:ring-0 dark:bg-bgdark"
          name="content"
          defaultValue={conteudo}
          required
          placeholder="Escreva seu testemunho"
          onChange={(e) => setContent(e.target.value)}
        />

        {preview ? (
          <div className="mb-4 flex w-full items-center justify-center">
            <Image
              src={preview}
              width={200}
              height={200}
              alt="Preview"
              className="aspect-video w-[200px]"
            />
          </div>
        ) : (
          <>
            {img && (
              <label
                htmlFor="coverUrl"
                className="flex cursor-pointer items-center justify-center gap-2 font-bold"
              >
                <Image
                  src={img}
                  height={200}
                  width={200}
                  alt="imagem"
                  className="aspect-video w-[200px]"
                />
              </label>
            )}
          </>
        )}

        <div className="mx-2 mb-2 flex w-full flex-wrap justify-center gap-4">
          <label
            htmlFor="coverUrl"
            className="flex w-full cursor-pointer items-center justify-center gap-2 text-center font-bold"
          >
            <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
            Anexar foto {img && 'nova '}(Opcional)
          </label>
          <button type="submit" className="button !mb-0">
            Editar
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
