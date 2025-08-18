'use client'
import Cookies from 'js-cookie'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import Image from 'next/image'

interface AddSobreLiderProps {
  setOpen: (open: boolean) => void
}

export default function AddSobreLider({ setOpen }: AddSobreLiderProps) {
  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    const form = formRef.current
    const fileInput = form?.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const fileToUpload = fileInput?.files?.[0]

    if (!fileToUpload) {
      toast.error('Você precisa adicionar uma imagem.')
      setIsSubmitting(false)
      return
    }

    let coverUrl = ''

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', fileToUpload)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const data = await uploadResponse.json()
      coverUrl = data.fileUrl
    } catch (error) {
      console.error('Erro ao carregar arquivo:', error)
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/sobrelider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, title, coverUrl }),
      })

      if (res.ok) {
        const lider = await res.json()
        setOpen(false)
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
        return lider
      }

      console.log('Erro ao criar líder:', res.statusText)
    } catch (error) {
      console.error('Erro durante a requisição à API:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (files?.length) {
      const previewUrl = URL.createObjectURL(files[0])
      setPreview(previewUrl)
    }
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
            Adicionar Líder
          </h1>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <AiFillCloseCircle className="text-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
          </button>
        </div>

        {/* Área de upload única no topo - SEMPRE VISÍVEL */}
        <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 min-h-[120px] flex-shrink-0">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">
              Para adicionar uma foto:
            </p>
            <label
              htmlFor="coverUrl"
              className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-700"
            >
              <div className="flex flex-col items-center justify-center">
                <FaCameraRetro className="w-6 h-6 mb-1 text-blue-500 dark:text-blue-400" />
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  <span className="font-semibold">Clique para anexar</span> uma
                  foto
                </p>
                <p className="text-xs text-blue-500 dark:text-blue-500">
                  JPG, PNG (até 5MB)
                </p>
              </div>
              <input
                className="hidden"
                type="file"
                name="coverUrl"
                id="coverUrl"
                accept="image/*"
                onChange={onFileSelected}
                required
              />
            </label>
          </div>
        </div>

        {/* Content */}
        <div className="w-full p-4 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Media Preview */}
          {preview && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preview da foto selecionada:
              </p>
              <div className="flex justify-center">
                <Image
                  src={preview}
                  width={150}
                  height={150}
                  alt={`Imagem de ${name}`}
                  className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
                />
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nome
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="name"
                id="name"
                placeholder="Digite o nome do líder"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Cargo de Liderança
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="title"
                id="title"
                placeholder="Digite o cargo de liderança"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end w-full p-4 border-t border-gray-200 dark:border-gray-700 space-x-3 bg-white dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-primary dark:bg-secundary rounded-lg hover:bg-primary/90 dark:hover:bg-secundary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Adicionando...</span>
              </>
            ) : (
              <span>Adicionar Líder</span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
