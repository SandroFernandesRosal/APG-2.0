'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
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
  ministryRole?: string
}

export default function EditTestemunho({
  setOpenEdit,
  id,
  img,
  conteudo,
  name,
  avatarUrl,
  ministryRole,
}: EditTestemunhoProps) {
  const [content, setContent] = useState(conteudo)
  const [preview, setPreview] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsEdit(true)
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          avatarUrl,
          content,
          coverUrl,
          isPublic: false,
          ministryRole: ministryRole || null,
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
    <div className="fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-bgdark/50 dark:bg-bglight/30 p-4">
      <div className="w-full max-w-2xl bg-bglight dark:bg-bgdark rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-primary dark:text-secundary">
            Editar Testemunho
          </h1>
          <AiFillCloseCircle
            onClick={() => setOpenEdit(null)}
            className="cursor-pointer text-2xl text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        </div>

        {/* User Info */}
        <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            {avatarUrl && (
              <Image
                width={80}
                height={80}
                src={avatarUrl}
                alt={name}
                className="h-[80px] w-[80px] rounded-full border-2 border-primary dark:border-secundary object-cover"
              />
            )}
            <div>
              <h2 className="text-lg font-semibold text-textlight dark:text-textdark">
                {name}
              </h2>
            </div>
          </div>
        </div>

        {/* Área de upload única no topo */}
        <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-textlight dark:text-textdark">
              <FaCameraRetro className="text-xl text-primary dark:text-secundary" />
              <span className="font-semibold">Foto do testemunho</span>
            </div>
            <div className="relative">
              {preview ? (
                <Image
                  src={preview}
                  width={200}
                  height={200}
                  alt="Preview"
                  className="aspect-video w-[200px] rounded-lg object-cover"
                />
              ) : img ? (
                <Image
                  src={img}
                  height={200}
                  width={200}
                  alt="imagem"
                  className="aspect-video w-[200px] rounded-lg object-cover"
                />
              ) : (
                <div className="w-[200px] h-[150px] bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Nenhuma imagem
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Conteúdo scrollável */}
          <div className="overflow-y-auto max-h-[60vh] p-4">
            <div className="space-y-4">
              {/* Conteúdo do testemunho */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Testemunho
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  name="content"
                  defaultValue={conteudo}
                  required
                  placeholder="Escreva seu testemunho"
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
            <label
              htmlFor="coverUrl"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <FaCameraRetro className="text-primary dark:text-secundary" />
              {img ? 'Nova foto' : 'Anexar foto'}
            </label>
            <button
              type="button"
              onClick={() => setOpenEdit(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="button flex items-center gap-2"
              disabled={isEdit}
            >
              {isEdit ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Editando testemunho...
                </>
              ) : (
                'Editar'
              )}
            </button>
          </div>
        </form>

        <input
          className="hidden"
          type="file"
          name="coverUrl"
          id="coverUrl"
          placeholder="Digite a url da notícia"
          onChange={onFileSelected}
        />
      </div>
    </div>
  )
}
