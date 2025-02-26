'use client'
import { FaCameraRetro } from 'react-icons/fa'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { api } from '@/lib/api'

export default function RegisterIgreja() {
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const PlaceHolder =
    'https://drive.google.com/uc?export=view&id=1hYXAUQfIieWGK0P9VCW8bpCgnamvnB1C'

  const [preview, setPreview] = useState(null)
  const formRef = useRef(null)

  const router = useRouter()

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
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        avatarUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.error('Erro ao carregar foto:', error)
        setError('Falha ao carregar a foto do perfil. Tente novamente.')
        return
      }
    }

    try {
      const response = await api.post(
        `/register/igreja`,
        {
          name,
          login,
          avatarUrl: avatarUrl || PlaceHolder,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const user = response.data

      if (response.status === 200 && user) {
        // Redireciona para a página de login apenas se a resposta for bem-sucedida
        router.push('/login/igreja')
        window.location.href = '/login/igreja'
        return user
      } else if (user.error) {
        setError(user.error)
      } else {
        setError('Erro ao registrar. Tente novamente mais tarde.')
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 400 ||
          error.response.status === 404 ||
          error.response.status === 500) &&
        error.response.data &&
        error.response.data.error
      ) {
        setError(error.response.data.error)
      } else {
        setError('Erro ao registrar. Tente novamente mais tarde.')
      }
    }
  }

  function onFileSelected(event) {
    const { files } = event.target

    const previewUrl = URL.createObjectURL(files[0])

    setPreview(previewUrl)
  }

  return (
    <div className="mt-[80px] flex w-full  justify-center md:mt-[140px]">
      <div className="my-10 flex min-h-screen w-[100vw] flex-col items-center rounded-[35px] bg-bglightsecundary shadow-light dark:bg-bgdarksecundary dark:shadow-dark  md:w-[90vw] md:rounded-xl">
        <h1 className="mt-2 text-lg font-bold text-primary dark:text-secundary ">
          Fazer login
        </h1>
        <p className="mb-5 text-xl">Use suas credenciais</p>
        <form
          ref={formRef}
          className="flex w-[75%] max-w-[500px] flex-col items-center gap-3 rounded-xl bg-bglight p-3 shadow-light dark:bg-bgdark dark:shadow-dark md:mb-5"
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
            {preview && (
              <img
                src={preview}
                alt=""
                className=" h-[150px] w-[150px] rounded-full border-2 border-primary"
              />
            )}
          </label>

          <input
            className=" mt-2 w-[200px] cursor-pointer rounded-lg  border-none bg-bglightsecundary p-2 text-center font-bold placeholder-textlight shadow-light outline-none focus:ring-0 dark:bg-bgdarksecundary dark:placeholder-textdark dark:shadow-dark"
            type="text"
            name="name"
            required
            placeholder="Seu nome"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="mt-2 w-[200px] cursor-pointer rounded-lg  border-none bg-bglightsecundary p-2 text-center font-bold placeholder-textlight shadow-light outline-none focus:ring-0 dark:bg-bgdarksecundary dark:placeholder-textdark dark:shadow-dark"
            type="text"
            name="login"
            required
            placeholder="seu email"
            onChange={(e) => setLogin(e.target.value.toLowerCase())}
          />

          <input
            className=" mt-2 w-[200px] cursor-pointer rounded-lg  border-none bg-bglightsecundary p-2 text-center font-bold placeholder-textlight shadow-light outline-none focus:ring-0 dark:bg-bgdarksecundary dark:placeholder-textdark dark:shadow-dark"
            type="password"
            name="password"
            required
            placeholder="Crie uma senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className=" font-bold text-red-500">{error}</p>}

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
            className="z-20 my-3 flex w-[100px] cursor-pointer items-center justify-center rounded-lg  bg-gradient-to-r from-slate-950 to-blue-900  font-bold text-white  shadow-light hover:from-blue-900 hover:to-slate-900 dark:shadow-dark"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
