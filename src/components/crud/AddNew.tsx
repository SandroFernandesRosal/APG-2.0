'use client'

import Cookies from 'js-cookie'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import Image from 'next/image'
import { useToken } from '@/hooks/useToken'
interface AddNewProps {
  openNew: boolean
  setOpenNew: (open: boolean) => void
}

export default function AddNew({ setOpenNew }: AddNewProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [destaque, setDestaque] = useState(false)
  const [mediaPreview, setMediaPreview] = useState<{
    url: string
    type: 'image' | 'video'
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  const { local } = useLocal()
  const token = useToken()

  const [role, setRole] = useState<string>(
    token?.role === 'ADMIN' ? (token.ministryRole ?? '') : local,
  )

  const router = useRouter()
  const cookieToken = Cookies.get('tokennn')

  useEffect(() => {
    if (token?.role === 'ADMIN') {
      setRole(token.ministryRole ?? '')
    }
  }, [token])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    const form = formRef.current
    const mediaInput = form?.querySelector(
      'input[name="mediaFile"]',
    ) as HTMLInputElement

    const mediaFile = mediaInput?.files?.[0]

    if (!mediaFile) {
      alert('Você precisa adicionar uma imagem ou um vídeo.')
      setIsSubmitting(false)
      return
    }

    if (!title.trim()) {
      alert('Você precisa adicionar um título.')
      setIsSubmitting(false)
      return
    }

    if (!content.trim()) {
      alert('Você precisa adicionar um conteúdo.')
      setIsSubmitting(false)
      return
    }

    let coverUrl: string | null = null
    let videoUrl: string | null = null

    // Upload do arquivo de mídia
    const mediaFormData = new FormData()
    mediaFormData.append('file', mediaFile)

    try {
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: mediaFormData,
      })

      const uploadResult = await uploadResponse.json()

      // Determinar se é imagem ou vídeo baseado no tipo MIME
      if (mediaFile.type.startsWith('image/')) {
        coverUrl = uploadResult.fileUrl
      } else if (mediaFile.type.startsWith('video/')) {
        videoUrl = uploadResult.fileUrl
      }
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookieToken}`,
        },
        body: JSON.stringify({
          title,
          content,
          coverUrl: coverUrl || undefined,
          videoUrl: videoUrl || undefined,
          page: local,
          role,
          destaque,
        }),
      })

      if (response.ok) {
        setOpenNew(false)
        router.push('/')
        window.location.href = '/'
      } else {
        const data = await response.json()
        console.error('Erro ao postar notícia:', data)
      }
    } catch (error) {
      console.error('Erro ao enviar notícia:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files || !files[0]) return

    const file = files[0]
    const previewUrl = URL.createObjectURL(file)

    // Determinar o tipo baseado no MIME type
    const type = file.type.startsWith('image/') ? 'image' : 'video'

    setMediaPreview({ url: previewUrl, type })
  }

  return (
    <form
      ref={formRef}
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bgdark/50 dark:bg-bglight/30"
      onSubmit={handleSubmit}
    >
      <div className="relative flex flex-col items-center justify-center rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%] max-w-md">
        <button
          type="button"
          aria-label="Fechar modal"
          onClick={() => setOpenNew(false)}
          className="absolute top-4 right-4 text-primary dark:text-secundary hover:text-primary/70 dark:hover:text-secundary/70"
        >
          <AiFillCloseCircle className="text-3xl" />
        </button>

        <h1 className="mb-2 text-center text-lg font-bold text-primary dark:text-secundary">
          Adicionar Notícia
        </h1>

        <label
          htmlFor="mediaFile"
          className="mb-3 flex cursor-pointer items-center gap-2 font-bold"
        >
          <FaCameraRetro className="text-xl text-primary dark:text-secundary" />
          Anexar imagem ou vídeo (até 50mb)
        </label>

        {mediaPreview &&
          (mediaPreview.type === 'image' ? (
            <Image
              src={mediaPreview.url}
              width={200}
              height={200}
              alt="Preview da mídia"
              className="aspect-video w-[200px]"
            />
          ) : (
            <video
              src={mediaPreview.url}
              controls
              className="aspect-video w-[200px]"
            />
          ))}

        <input
          className="input mt-4"
          type="text"
          name="title"
          required
          placeholder="Título da notícia"
          onChange={(e) => setTitle(e.target.value.toLowerCase())}
        />

        <textarea
          className="input"
          name="content"
          required
          placeholder="Conteúdo da notícia"
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="invisible h-0 w-0"
          type="file"
          name="mediaFile"
          id="mediaFile"
          accept="image/*,video/*"
          onChange={onMediaSelected}
        />

        <label
          htmlFor="role"
          className={`font-bold mb-1 ${token?.role === 'ADMIN' ? 'hidden' : ''}`}
        >
          Selecione a igreja
        </label>
        <select
          id="role"
          name="role"
          className="input mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          disabled={token?.role === 'ADMIN'}
        >
          <option value="">Selecione...</option>
          <option value="VILADAPENHA">Vila da Penha</option>
          <option value="MARIAHELENA">Maria Helena</option>
          <option value="TOMAZINHO">Tomazinho</option>
        </select>

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
          className="button !mb-0 flex items-center gap-2 justify-center disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Adicionando notícia...
            </>
          ) : (
            'Enviar'
          )}
        </button>
      </div>
    </form>
  )
}
