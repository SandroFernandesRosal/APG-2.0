'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-toastify'

interface EditSobreLiderProps {
  setOpenEdit: (open: string | null) => void
  id: string
  nome: string
  titulo: string
  img: string
}

export default function EditSobreLider({
  setOpenEdit,
  id,
  nome,
  titulo,
  img,
}: EditSobreLiderProps) {
  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)

    const form = formRef.current
    const fileInput = form?.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const fileToUpload = fileInput?.files?.[0]

    let coverUrl = ''

    if (fileToUpload) {
      try {
        const uploadFormData = new FormData()
        uploadFormData.append('file', fileToUpload)

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const uploadData = await uploadResponse.json()
        coverUrl = uploadData.fileUrl
      } catch (error) {
        console.error('Erro ao enviar imagem:', error)
        toast.error('Erro ao enviar imagem. Tente novamente.')
        setIsEditing(false)
        return
      }
    } else {
      coverUrl = img
    }

    try {
      const response = await fetch(`/api/sobrelider/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: title || titulo,
          name: name || nome,
          coverUrl,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        toast.success('Líder editado com sucesso!')
        setOpenEdit(null)
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
        return response.json()
      } else {
        toast.error('Erro ao editar líder. Tente novamente.')
      }

      console.error('Erro ao editar um líder:', response.statusText)
    } catch (error) {
      console.error('Erro ao editar um líder:', error)
      toast.error('Erro ao editar líder. Tente novamente.')
    } finally {
      setIsEditing(false)
    }

    return null
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
    <div className="fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-bgdark/50 dark:bg-bglight/30 p-4">
      <div className="w-full max-w-2xl bg-bglight dark:bg-bgdark rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-primary dark:text-secundary">
            Editar Líder
          </h1>
          <AiFillCloseCircle
            onClick={() => setOpenEdit(null)}
            className="cursor-pointer text-2xl text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        </div>

        {/* Área de upload única no topo */}
        <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-textlight dark:text-textdark">
              <FaCameraRetro className="text-xl text-primary dark:text-secundary" />
              <span className="font-semibold">Foto do líder</span>
            </div>
            <div className="relative">
              {preview ? (
                <Image
                  width={120}
                  height={120}
                  src={preview}
                  alt={nome}
                  className="h-[150px] w-[150px] rounded-full border-2 border-primary dark:border-secundary object-cover"
                />
              ) : (
                <Image
                  width={120}
                  height={120}
                  src={img}
                  alt={nome}
                  className="h-[150px] w-[150px] rounded-full border-2 border-primary dark:border-secundary object-cover"
                />
              )}
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Conteúdo scrollável */}
          <div className="overflow-y-auto max-h-[60vh] p-4">
            <div className="space-y-4">
              {/* Nome */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Nome
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="name"
                  required
                  defaultValue={nome}
                  placeholder="Digite um nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Título */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Título
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="title"
                  required
                  defaultValue={titulo}
                  placeholder="Digite um título"
                  onChange={(e) => setTitle(e.target.value)}
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
              Nova foto
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
              disabled={isEditing}
            >
              {isEditing ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Editando líder...
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
          onChange={onFileSelected}
        />
      </div>
    </div>
  )
}
