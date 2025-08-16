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
  console.log('EditNew - Props recebidas:', {
    id,
    img,
    videoUrl,
    titulo,
    destacar,
    role,
  })
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
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-2xl w-full max-w-2xl my-4">
        {/* Header */}
        <div className="flex items-center justify-between w-full p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Editar Notícia
          </h1>
          <button
            type="button"
            onClick={() => setOpenEdit(null)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <AiFillCloseCircle className="text-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
          </button>
        </div>

        {/* Área de upload única no topo - SEMPRE VISÍVEL */}
        <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 min-h-[120px] flex-shrink-0">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">
              {img || videoUrl
                ? 'Para alterar a mídia atual:'
                : 'Para adicionar uma mídia:'}
            </p>
            <label
              htmlFor="mediaFile"
              className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-700"
            >
              <div className="flex flex-col items-center justify-center">
                <FaCameraRetro className="w-6 h-6 mb-1 text-blue-500 dark:text-blue-400" />
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  <span className="font-semibold">
                    {img || videoUrl
                      ? 'Clique para substituir'
                      : 'Clique para anexar'}
                  </span>{' '}
                  {img || videoUrl ? 'a mídia atual' : 'uma imagem ou vídeo'}
                </p>
                <p className="text-xs text-blue-500 dark:text-blue-500">
                  MP4, MOV, JPG, PNG (até 50MB)
                </p>
              </div>
              <input
                className="hidden"
                type="file"
                name="mediaFile"
                id="mediaFile"
                accept="image/*,video/*"
                onChange={onMediaSelected}
              />
            </label>
          </div>
        </div>

        {/* Content */}
        <div className="w-full p-4 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Media Preview */}
          <div className="space-y-3">
            {/* Preview do novo arquivo selecionado */}
            {mediaPreview && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview do novo arquivo:
                </p>
                {mediaPreview.type === 'image' ? (
                  <div className="flex justify-center">
                    <Image
                      src={mediaPreview.url}
                      width={300}
                      height={150}
                      alt={titulo}
                      className="rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <video
                      src={mediaPreview.url}
                      controls
                      className="w-full max-w-[300px] rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Mostrar arquivo atual se não houver preview */}
            {!mediaPreview && img && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Imagem atual:
                </p>
                <div className="flex justify-center">
                  <Image
                    src={img}
                    alt={titulo}
                    width={300}
                    height={150}
                    className="rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>
            )}

            {/* Mostrar vídeo atual se não houver preview */}
            {!mediaPreview && videoUrl && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vídeo atual:
                </p>
                <div className="flex justify-center">
                  <video
                    src={videoUrl}
                    controls
                    className="w-full max-w-[300px] rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Título
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="title"
                id="title"
                defaultValue={titulo}
                placeholder="Digite o título da notícia"
                onChange={(e) => setTitle(e.target.value.toLowerCase())}
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Conteúdo
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                name="content"
                id="content"
                rows={4}
                defaultValue={conteudo}
                placeholder="Digite o conteúdo da notícia"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="destaque"
                name="destaque"
                checked={destaque}
                onChange={(e) => setDestaque(e.target.checked)}
                className="w-4 h-4 text-primary dark:text-secundary bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-secundary"
              />
              <label
                htmlFor="destaque"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Marcar como destaque
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end w-full p-4 border-t border-gray-200 dark:border-gray-700 space-x-3 bg-white dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setOpenEdit(null)}
            className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isEditing}
            className="px-6 py-2 text-sm font-medium text-white bg-primary dark:bg-secundary rounded-lg hover:bg-primary/90 dark:hover:bg-secundary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isEditing ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Editando...</span>
              </>
            ) : (
              <span>Salvar Alterações</span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
