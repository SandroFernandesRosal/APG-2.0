'use client'
import { FaCameraRetro } from 'react-icons/fa'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useToken } from '@/hooks/useToken'
import { api } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'

export default function EditUser({ id, nome, email, img }) {
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const PlaceHolder =
    'https://drive.google.com/uc?export=view&id=1hYXAUQfIieWGK0P9VCW8bpCgnamvnB1C'

  const [preview, setPreview] = useState(null)
  const formRef = useRef(null)

  const router = useRouter()
  const token = useToken()

  async function handleSubmit(event) {
    event.preventDefault()

    const form = formRef.current
    const fileToUpload = form.querySelector('input[type="file"]').files[0]

    let avatarUrl = ''

    if (fileToUpload) {
      const formData = new FormData()
      formData.append('file', fileToUpload)

      try {
        const uploadResponse = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }, //
        })
        avatarUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.error('Erro ao carregar foto:', error)
      }
    } else {
      avatarUrl = img
    }

    try {
      const response = await api.put(
        `/register/${id}`,
        {
          name: name || nome,
          login: login || email,
          avatarUrl: avatarUrl || PlaceHolder,
          password,
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
        Cookies.remove('tokennn')
        router.push('/login/adm')
        window.location.href = '/login/adm'
        return newss
      }

      console.log(newss)
      return null
    } catch (error) {
      console.error('Erro ao editar', error)
    }
  }

  function onFileSelected(event) {
    const { files } = event.target

    const previewUrl = URL.createObjectURL(files[0])

    setPreview(previewUrl)
  }

  return (
    <>
      {token ? (
        <div className="mt-[80px] flex w-full  justify-center md:mt-[140px]">
          <div className="my-10 flex min-h-screen w-[100vw] flex-col items-center rounded-[35px] border-[1px] border-zinc-400 bg-bglightsecundary dark:border-zinc-700 dark:bg-bgdarksecundary   md:w-[90vw] md:rounded-xl">
            <h1 className="mt-2 text-lg font-bold text-primary dark:text-secundary">
              Editar perfil
            </h1>
            <p className="mb-5 text-xl">Faça alterações nos campos abaixo</p>
            <form
              ref={formRef}
              className="flex w-[75%] max-w-[500px] flex-col items-center gap-3 rounded-xl border-[1px] border-zinc-400 bg-bglight p-3 dark:border-zinc-700 dark:bg-bgdark md:mb-5"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="avatarUrl"
                className=" flex cursor-pointer flex-col items-center gap-2  font-bold"
              >
                <p className="flex gap-2">
                  <FaCameraRetro className="text-xl text-primary dark:text-secundary" />{' '}
                  Anexar foto de perfil (opcional)
                </p>
                {preview ? (
                  <Image
                    src={preview}
                    alt=""
                    width={150}
                    height={150}
                    className="m-2 h-[150px] w-[150px] rounded-full  border-[1px]  border-zinc-400 bg-gradient-to-r from-slate-950  to-blue-900 p-[4px] hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700"
                  />
                ) : (
                  <Image
                    src={img}
                    alt=""
                    width={150}
                    height={150}
                    className="m-2 h-[150px] w-[150px] rounded-full  border-[1px]  border-zinc-400 bg-gradient-to-r from-slate-950 to-blue-900 p-[4px] hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700 "
                  />
                )}
              </label>

              <input
                className=" mt-2 w-[200px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
                type="text"
                name="name"
                defaultValue={nome}
                required
                placeholder="Seu nome"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="mt-2 w-[200px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
                type="text"
                name="login"
                value={email}
                readOnly
                required
                placeholder="seu email"
                onChange={(e) => setLogin(e.target.value)}
              />

              <input
                className=" mt-2 w-[200px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
                type="password"
                name="password"
                required
                placeholder="Crie uma senha"
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                className="invisible h-0 w-0"
                type="file"
                name="avatarUrl"
                id="avatarUrl"
                placeholder="Digite a url da notícia"
                onChange={onFileSelected}
              />

              <button
                type="submit"
                className="z-20  m-1 mr-2 flex cursor-pointer items-center justify-center  rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r from-slate-950 to-blue-900  px-6 font-bold text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700 "
              >
                Editar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <main className="mb-2 mt-4 flex min-h-screen flex-col items-center gap-5 pt-24 md:mt-0 md:pt-[165px]">
          <div className="mb-4 flex  min-h-screen w-[100vw] flex-col flex-wrap items-center   gap-1 rounded-[35px] bg-bglightsecundary  px-1  pb-4 shadow-light dark:bg-bgdarksecundary  dark:shadow-dark md:w-[90vw] md:rounded-xl ">
            <div className="flex flex-col items-center  md:min-w-[35%]">
              <h1 className="m-0 text-lg font-bold text-primary dark:text-secundary">
                Você não está logado
              </h1>
              <p className="mb-4 text-xl ">Faça login ou registre-se</p>
            </div>

            <div className="flex gap-3">
              <Link
                href={'/login/igreja'}
                className="cursor-pointer items-center  rounded-lg bg-gradient-to-r from-slate-950 to-blue-900 px-2  font-bold text-white  hover:from-blue-900 hover:to-slate-900"
              >
                login
              </Link>

              <Link
                href={'/register'}
                className="cursor-pointer  rounded-lg bg-gradient-to-r from-slate-950 to-blue-900 px-2  font-bold text-white  hover:from-blue-900 hover:to-slate-900"
              >
                Registre-se
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  )
}
