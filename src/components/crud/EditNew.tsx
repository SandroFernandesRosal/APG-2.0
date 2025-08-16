'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import Image from 'next/image'

interface EditNewProps {
  setOpenEdit: (open: string | null) => void
  id: string
  img?: string
  videoUrl?: string
  titulo: string
  conteudo: string
  destacar: boolean
  role?: string
}

export default function EditNew({
  setOpenEdit,
  id,
  img,
  videoUrl,
  titulo,
  conteudo,
  destacar,
  role,
}: EditNewProps) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [destaque, setDestaque] = useState<boolean>(destacar)
  const [mediaPreview, setMediaPreview] = useState<{
    url: string
    type: 'image' | 'video'
  } | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<HTMLFormElement | null>(null)

  const { local } = useLocal()
  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)

    const form = formRef.current
    const mediaInput = form?.querySelector(
      'input[name="mediaFile"]',
    ) as HTMLInputElement

    const mediaFile = mediaInput?.files?.[0]

    let coverUrl = img || ''
    let newVideoUrl = videoUrl || ''

    // Se um novo arquivo foi selecionado, fazer upload
    if (mediaFile) {
      const mediaFormData = new FormData()
      mediaFormData.append('file', mediaFile)

      try {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: mediaFormData,
        })

        if (!uploadResponse.ok) throw new Error('Erro ao enviar arquivo')

        const uploadData = await uploadResponse.json()

        // Determinar se é imagem ou vídeo baseado no tipo MIME
        if (mediaFile.type.startsWith('image/')) {
          coverUrl = uploadData.fileUrl
          newVideoUrl = '' // Limpar vídeo se for imagem
        } else if (mediaFile.type.startsWith('video/')) {
          newVideoUrl = uploadData.fileUrl
          coverUrl = '' // Limpar imagem se for vídeo
        }
      } catch (error) {
        console.error('Erro ao enviar arquivo:', error)
        setIsEditing(false)
        return
      }
    }

    // Verificar se pelo menos um dos dois (imagem ou vídeo) está presente
    if (!coverUrl && !newVideoUrl) {
      alert('Você precisa ter pelo menos uma imagem ou um vídeo.')
      setIsEditing(false)
      return
    }

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title || titulo,
          content: content || conteudo,
          coverUrl: coverUrl || undefined,
          videoUrl: newVideoUrl || undefined,
          page: local,
          destaque,
          role,
        }),
      })

      if (response.ok) {
        router.push('/')
        window.location.href = '/'
        return await response.json()
      }

      console.error('Erro ao editar notícia:', response.statusText)
    } catch (error) {
      console.error('Erro ao editar notícia:', error)
    } finally {
      setIsEditing(false)
    }

    return null
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
      <div className="flex flex-col items-center justify-center rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%] max-w-md">
        <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
          Editar Notícia{' '}
          <AiFillCloseCircle
            onClick={() => setOpenEdit(null)}
            className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        </h1>

        <label
          htmlFor="mediaFile"
          className="mb-3 flex cursor-pointer flex-col items-center gap-2 font-bold"
        >
          <p className="flex items-center gap-3 text-black dark:text-white">
            <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
            Anexar nova imagem ou vídeo (até 50mb)
          </p>

          {/* Preview do novo arquivo selecionado */}
          {mediaPreview &&
            (mediaPreview.type === 'image' ? (
              <Image
                src={mediaPreview.url}
                width={200}
                height={100}
                alt={titulo}
                className="aspect-video p-1 border-[1px] border-primary dark:border-secundary"
              />
            ) : (
              <video
                src={mediaPreview.url}
                controls
                className="aspect-video w-[200px] p-1 border-[1px] border-primary dark:border-secundary"
              />
            ))}

          {/* Mostrar arquivo atual se não houver preview */}
          {!mediaPreview && (
            <>
              {img && (
                <Image
                  src={img}
                  alt={titulo}
                  width={500}
                  height={250}
                  className="aspect-video w-[70%] md:w-[50%] p-1 border-[1px] border-primary dark:border-secundary"
                />
              )}
              {videoUrl && !img && (
                <video
                  src={videoUrl}
                  controls
                  className="aspect-video w-[200px] p-1 border-[1px] border-primary dark:border-secundary"
                />
              )}
            </>
          )}
        </label>

        <input
          className="input mt-4"
          type="text"
          name="title"
          id="title"
          defaultValue={titulo}
          placeholder="Você precisa digitar um título"
          onChange={(e) => setTitle(e.target.value.toLowerCase())}
        />

        <textarea
          className="input"
          name="content"
          id="content"
          defaultValue={conteudo}
          placeholder="Você precisa digitar um conteúdo"
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

        <button
          type="submit"
          className="button !mb-0 flex items-center gap-2 justify-center"
        >
          {isEditing ? (
            <>
              <FaSpinner className="animate-spin" />
              Editando notícia...
            </>
          ) : (
            'Editar'
          )}
        </button>
      </div>
    </form>
  )
}
