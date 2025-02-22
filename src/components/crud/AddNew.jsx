'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { api } from '@/lib/api'

export default function AddNew({ openNew, setOpenNew }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [destaque, setDestaque] = useState(false)
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

    if (!fileToUpload) {
      alert('você precisa adicionar uma imagem.')
      return
    }

    if (fileToUpload) {
      const formData = new FormData()
      formData.append('file', fileToUpload)

      try {
        const uploadResponse = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        coverUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.error('Erro ao carregar arquivo:', error)
      }
    }

    try {
      const response = await api.post(
        `/news/${local}`,
        {
          title,
          content,
          coverUrl,
          page: local,
          destaque,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const newss = response.data

      if (response.status === 200 && newss) {
        setOpenNew(false)
        router.push('/')
        window.location.href = '/'
        return newss
      }

      console.log(newss)
      return null
    } catch (error) {
      console.error('Erro ao criar notícia:', error)
    }
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
      className="fixed left-0 top-0  z-30 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar Notícia{' '}
        {openNew === true && (
          <AiFillCloseCircle
            onClick={() => setOpenNew(false)}
            className="cursor-pointer text-2xl font-bold text-black dark:text-white"
          />
        )}
      </h1>

      <label
        htmlFor="coverUrl"
        className="mb-3 flex cursor-pointer items-center gap-2  font-bold"
      >
        {' '}
        <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
        Anexar foto (até 5mb)
      </label>
      {preview && (
        <img src={preview} alt="" className=" aspect-video w-[200px]" />
      )}

      <input
        className="mb-4 mt-2 w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="title"
        required
        placeholder="Título da notícia"
        onChange={(e) => setTitle(e.target.value.toLowerCase())}
      />

      <textarea
        className="mb-1  w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="content"
        required
        placeholder="Conteúdo da notícia"
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="invisible h-0 w-0"
        type="file"
        name="coverUrl"
        id="coverUrl"
        required={true}
        placeholder="Digite a url da notícia"
        onChange={onFileSelected}
      />

      <div className="mb-4 flex items-center gap-2  p-2">
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
        className="z-20  m-1 mr-2 flex cursor-pointer items-center justify-center  rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r from-slate-950 to-blue-900  px-6 font-bold text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700 "
      >
        Enviar
      </button>
    </form>
  )
}
