'use client'
import Cookies from 'js-cookie'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaCameraRetro } from 'react-icons/fa'

export default function AddSobreLider({ open, setOpen }) {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const formRef = useRef(null)
  const [preview, setPreview] = useState(null)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event) {
    event.preventDefault()

    const form = formRef.current
    const fileToUpload = form.querySelector('input[type="file"]').files[0]

    let coverUrl = ''

    if (!fileToUpload) {
      alert('Você precisa adicionar uma imagem.')
      return
    }

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.append('file', fileToUpload)

      try {
        const uploadResponse = await api.post('/upload', uploadFormData)
        coverUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.error('Error uploading file:', error)

        return
      }
    }

    try {
      const res = await api.post(
        `/sobre/lider`,
        {
          name,
          title,
          coverUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const lider = res.data

      if (res.status === 200 && lider) {
        setOpen(false)
        router.push('/quemsomos')
        window.location.href = '/quemsomos'
        return lider
      }
      console.log(lider)
      return null
    } catch (error) {
      console.error('Error during API request:', error)
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
      className="fixed left-0 top-0 z-20 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar lider{' '}
        {open === true && (
          <AiFillCloseCircle
            onClick={() => setOpen(false)}
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
        className="mb-4 mt-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="name"
        placeholder="Nome"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="mb-4   w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="title"
        placeholder="Cargo de liderança"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="invisible h-0 w-0"
        type="file"
        name="coverUrl"
        id="coverUrl"
        placeholder="Digite a url do perfil"
        onChange={onFileSelected}
      />

      <button
        type="submit"
        className="z-20 my-3 flex w-[100px] cursor-pointer items-center justify-center rounded-lg border-[1px] border-zinc-400  bg-gradient-to-r from-slate-950 to-blue-900  font-bold text-white hover:from-blue-900 hover:to-slate-900  dark:border-zinc-700 "
      >
        Enviar
      </button>
    </form>
  )
}
