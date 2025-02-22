'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { api } from '@/lib/api'
import Image from 'next/image'

export default function EditMinisterio({
  setOpenEdit,
  id,
  nome,
  lugar,
  titulo,
  img,
}) {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [igreja, setIgreja] = useState('')
  const [preview, setPreview] = useState(null)
  const formRef = useRef(null)

  const { local } = useLocal()
  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event) {
    event.preventDefault()

    const form = formRef.current
    const fileToUpload = form.querySelector('input[type="file"]').files[0]

    let coverUrl = ''

    if (fileToUpload) {
      try {
        const uploadFormData = new FormData()
        uploadFormData.append('file', fileToUpload)

        const uploadResponse = await api.post('/upload', uploadFormData)
        coverUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.error('Erro ao enviar imagem:', error)

        return
      }
    } else {
      coverUrl = img
    }

    try {
      const response = await api.put(
        `/ministerio/${local}/${id}`,
        {
          title: title || titulo,
          name: name || nome,
          local: igreja || lugar,
          coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.status === 200) {
        setOpenEdit(false)
        router.push('/')
        window.location.href = '/'
        return response.data
      }

      console.error('Erro ao editar um líder:', response.statusText)
    } catch (error) {
      console.error('Erro ao editar um líder:', error)
    }

    return null
  }
  function onFileSelected(event) {
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
      className="fixed left-0 top-0 z-30 mt-10 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg md:mt-20"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Editar Líder{' '}
        <AiFillCloseCircle
          onClick={() => setOpenEdit(false)}
          className="cursor-pointer text-2xl font-bold text-black dark:text-white"
        />
      </h1>

      <label
        htmlFor="coverUrl"
        className="mb-3 flex cursor-pointer flex-col items-center gap-2  font-bold"
      >
        {' '}
        <p className="flex items-center gap-3">
          {' '}
          <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
          Anexar nova foto (até 5mb){' '}
        </p>
        {preview ? (
          <Image
            width={120}
            height={120}
            src={preview}
            alt={nome}
            className="flex  h-[120px] w-[120px] items-center justify-center rounded-full border-2  border-primary"
          />
        ) : (
          <Image
            width={120}
            height={120}
            src={img}
            alt={nome}
            className="flex  h-[120px] w-[120px] items-center justify-center rounded-full border-2  border-primary"
          />
        )}
      </label>

      <input
        className="mb-4 mt-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="name"
        required={true}
        defaultValue={nome}
        placeholder="Digite um nome"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="mb-1  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="title"
        required={true}
        defaultValue={titulo}
        placeholder="Digite um título"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="mb-4   w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="local"
        required={true}
        defaultValue={lugar}
        placeholder="Digite um local"
        onChange={(e) => setIgreja(e.target.value)}
      />

      <input
        className="invisible h-0 w-0"
        type="file"
        name="coverUrl"
        id="coverUrl"
        placeholder="Digite a url da notícia"
        onChange={onFileSelected}
      />

      <button
        type="submit"
        className="z-20  m-1 mr-2 flex cursor-pointer items-center justify-center  rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r from-slate-950 to-blue-900  px-6 font-bold text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700 "
      >
        Enviar
      </button>
    </form>
  )
}
