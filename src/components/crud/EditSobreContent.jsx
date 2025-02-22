'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { api } from '@/lib/api'
import Image from 'next/image'

export default function EditSobreContent({
  setOpenEdit,
  id,
  img,
  titulo,
  conteudo,
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [preview, setPreview] = useState(null)

  const formRef = useRef(null)

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

        const uploadResponse = await api.post('/upload/sobre', uploadFormData)
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
        `/sobre/${id}`,
        {
          title: title || titulo,
          content: content || conteudo,
          coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.status === 200) {
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
        return response.data
      }

      console.error('Erro ao editar notícia:', response.statusText)
    } catch (error) {
      console.error('Erro ao editar notícia:', error)
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
      className="fixed left-0 top-0 mt-10 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg md:mt-20"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Editar Notícia{' '}
        <AiFillCloseCircle
          onClick={() => setOpenEdit(null)}
          className="cursor-pointer text-2xl font-bold text-black dark:text-white"
        />
      </h1>

      <label
        htmlFor="coverUrl"
        className="mb-3 flex cursor-pointer flex-col items-center gap-2  font-bold"
      >
        <p className="flex items-center gap-3">
          {' '}
          <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
          Anexar nava imagem (até 5mb){' '}
        </p>

        {preview ? (
          <Image
            src={preview}
            width={200}
            height={100}
            alt={titulo}
            className=" aspect-video"
          />
        ) : (
          <Image
            src={img}
            alt={titulo}
            width={500}
            height={250}
            className=" aspect-video w-[70%] md:w-[50%]"
          />
        )}
      </label>

      <input
        className="mb-4 mt-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] border-zinc-400  bg-bglightsecundary p-2 text-center font-bold text-black placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:text-white dark:placeholder-textdark  md:w-[50%]"
        type="text"
        name="title"
        id="title"
        required={true}
        defaultValue={titulo}
        placeholder="Você precisa digitar um título"
        onChange={(e) => setTitle(e.target.value.toLowerCase())}
      />

      <textarea
        className="mb-1 mt-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold  text-black placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:text-white dark:placeholder-textdark md:w-[50%]"
        type="text"
        name="content"
        id="content"
        required={true}
        defaultValue={conteudo}
        placeholder="Você precisa digitar um conteúdo"
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="invisible h-0 w-0"
        type="file"
        name="coverUrl"
        id="coverUrl"
        onChange={onFileSelected}
      />

      <button
        type="submit"
        className="z-20 my-3 flex w-[100px] cursor-pointer items-center justify-center rounded-lg border-[1px] border-zinc-400  bg-gradient-to-r  from-slate-950 to-blue-900 font-bold text-white hover:from-blue-900  hover:to-slate-900  dark:border-zinc-700 "
      >
        Enviar
      </button>
    </form>
  )
}
