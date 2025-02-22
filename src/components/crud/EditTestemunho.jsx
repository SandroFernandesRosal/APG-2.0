'use client'
import Cookies from 'js-cookie'
import { FaCameraRetro } from 'react-icons/fa'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AiFillCloseCircle } from 'react-icons/ai'

import { api } from '@/lib/api'

export default function EditTestemunho({
  setOpenEdit,

  id,
  img,
  conteudo,
  name,
  avatarUrl,
}) {
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState(null)
  const formRef = useRef(null)

  const router = useRouter()
  const token = Cookies.get('tokenigreja')
  const tokenAdm = Cookies.get('tokennn')

  async function handleSubmit(event) {
    event.preventDefault()

    const form = formRef.current
    const fileToUpload = form.querySelector('input[type="file"]').files[0]

    let coverUrl = ''

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
    } else {
      coverUrl = img
    }

    try {
      const response = await api.put(
        `/testemunhos/${id}`,
        {
          name,
          avatarUrl,
          content,
          coverUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || tokenAdm}`,
          },
        },
      )

      const newss = response.data

      if (response.status === 200 && newss) {
        setOpenEdit(null)
        router.push('/testemunhos')
        window.location.href = '/testemunhos'
        return newss
      }

      console.log(newss)
      return null
    } catch (error) {
      console.error('Erro ao criar testemunho:', error)
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
      className="fixed  left-0 top-0  flex min-h-screen  w-[100vw] flex-col items-start  gap-3 bg-black/50 px-6 py-4 pt-[165px]  text-black   backdrop-blur-lg dark:text-white md:flex-row md:items-start md:justify-center"
      onSubmit={handleSubmit}
    >
      <Image
        width={300}
        height={300}
        src={avatarUrl}
        alt={name}
        className="mx-1 h-[100px] w-[100px] rounded-full border-[1px] border-zinc-400 bg-gradient-to-r from-slate-950 to-blue-900  p-[4px] text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700"
      />

      <div className="border-zinc-400md:w-[70%] flex w-full flex-col gap-2 rounded-2xl border-[1px]  bg-bglight dark:border-zinc-700 dark:bg-bgdark lg:min-w-[700px]">
        <div className="flex items-center justify-between">
          {' '}
          <p className="pl-3 text-lg font-bold">{name}</p>
          <button onClick={() => setOpenEdit(null)} className="pr-1">
            <AiFillCloseCircle className="text-2xl font-bold text-red-500" />
          </button>{' '}
        </div>

        <textarea
          className="mx-1 flex w-full  flex-col gap-2 border-none bg-bglight  outline-none ring-0 focus:ring-0  dark:bg-bgdark"
          type="text"
          name="content"
          defaultValue={conteudo}
          required
          placeholder="Escreva seu testemunho"
          onChange={(e) => setContent(e.target.value)}
        />

        {preview ? (
          <div className="mb-4 flex w-full items-center justify-center">
            <img src={preview} alt="" className=" aspect-video w-[200px]" />
          </div>
        ) : (
          <>
            {img && (
              <label
                htmlFor="coverUrl"
                className=" flex cursor-pointer items-center justify-center gap-2  font-bold"
              >
                <Image
                  src={img}
                  height={200}
                  width={200}
                  alt=""
                  className=" aspect-video w-[200px]"
                />
              </label>
            )}
          </>
        )}
        <div className="mx-2 mb-2 flex w-full flex-wrap justify-center gap-4">
          <label
            htmlFor="coverUrl"
            className=" flex w-full cursor-pointer items-center justify-center gap-2  text-center font-bold"
          >
            <FaCameraRetro className="text-xl  text-primary dark:text-secundary" />{' '}
            Anexar foto {img && 'nova '}
            (Opcional)
          </label>
          <button
            type="submit"
            className="z-20  m-2 mr-2 flex cursor-pointer items-center justify-center rounded-lg border-[1px] border-zinc-400  bg-gradient-to-r from-slate-950 to-blue-900 px-6  font-bold  text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700"
          >
            Editar
          </button>
        </div>
      </div>

      <input
        className="invisible h-0 w-0"
        type="file"
        name="coverUrl"
        id="coverUrl"
        placeholder="Digite a url da notícia"
        onChange={onFileSelected}
      />
    </form>
  )
}
