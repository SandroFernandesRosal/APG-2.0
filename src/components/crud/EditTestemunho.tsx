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
    } finally {
      setIsEdit(false)
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
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-2xl w-full max-w-2xl my-4">
        {/* Header */}
        <div className="flex items-center justify-between w-full p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Editar Testemunho
          </h1>
          <button
            type="button"
            onClick={() => setOpenEdit(null)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <AiFillCloseCircle className="text-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
          </button>
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
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {name}
              </h2>
            </div>
          </div>
        </div>

        {/* Área de upload única no topo - SEMPRE VISÍVEL */}
        <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 min-h-[120px] flex-shrink-0">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">
              Foto do testemunho:
            </p>
            
            {/* Preview da imagem atual ou nova */}
            {(preview || img) && (
              <div className="mb-3 flex justify-center">
                <Image
                  src={preview || img!}
                  width={200}
                  height={150}
                  alt="Preview"
                  className="aspect-video w-[200px] rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                />
              </div>
            )}
            
            <label
              htmlFor="coverUrl"
              className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-700"
            >
              <div className="flex flex-col items-center justify-center">
                <FaCameraRetro className="w-6 h-6 mb-1 text-blue-500 dark:text-blue-400" />
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  <span className="font-semibold">Clique para anexar</span> uma foto
                </p>
                <p className="text-xs text-blue-500 dark:text-blue-500">
                  JPG, PNG (até 50MB)
                </p>
              </div>
              <input
                className="hidden"
                type="file"
                name="coverUrl"
                id="coverUrl"
                accept="image/*"
                onChange={onFileSelected}
              />
            </label>
          </div>
        </div>

        {/* Content */}
        <div className="w-full p-4 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Testemunho
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                name="content"
                id="content"
                rows={6}
                placeholder="Escreva seu testemunho"
                onChange={(e) => setContent(e.target.value)}
                defaultValue={conteudo}
                required
              />
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
            disabled={isEdit}
            className="px-6 py-2 text-sm font-medium text-white bg-primary dark:bg-secundary rounded-lg hover:bg-primary/90 dark:hover:bg-secundary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isEdit ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Editando...</span>
              </>
            ) : (
              <span>Editar</span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
