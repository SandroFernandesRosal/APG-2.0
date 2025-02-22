'use client'
import Cookies from 'js-cookie'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'

export default function AddDoacao({ openDoacao, setOpenDoacao }) {
  const [local, setLocal] = useState('')
  const [banco, setBanco] = useState('')
  const [conta, setConta] = useState('')
  const [agencia, setAgencia] = useState('')
  const [nomebanco, setNomeBanco] = useState('')
  const [pix, setPix] = useState('')
  const [nomepix, setNomePix] = useState('')

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await api.post(
        '/doacao',
        {
          local,
          banco,
          conta,
          agencia,
          nomebanco,
          pix,
          nomepix,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const doacao = response.data

      if (response.status === 200 && doacao) {
        setOpenDoacao(false)
        router.push('/')
        window.location.href = '/'
        return doacao
      }

      console.log(doacao)
    } catch (error) {
      console.error('Erro ao criar doação:', error)
    }

    return null
  }

  return (
    <form
      className=" fixed left-0 top-0 z-20 mt-10 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-black/50 p-5 backdrop-blur-lg md:mt-20"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar igreja{' '}
        {openDoacao === true && (
          <AiFillCloseCircle
            onClick={() => setOpenDoacao(false)}
            className="cursor-pointer text-2xl font-bold text-black dark:text-white"
          />
        )}
      </h1>
      <input
        className="mt-2 w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="local"
        placeholder="Digite um local"
        onChange={(e) => setLocal(e.target.value)}
      />

      <input
        className="my-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="banco"
        placeholder="Digite o nome do banco"
        onChange={(e) => setBanco(e.target.value)}
      />

      <input
        className="mb-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none  focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="conta"
        placeholder="Digite número da conta"
        onChange={(e) => setConta(e.target.value)}
      />

      <input
        className="mb-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight shadow-light outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="agencia"
        placeholder="Digite a agência"
        onChange={(e) => setAgencia(e.target.value)}
      />

      <input
        className="mb-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="nomeBanco"
        placeholder="Nome do beneficiário"
        onChange={(e) => setNomeBanco(e.target.value)}
      />

      <input
        className="mb-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="pix"
        placeholder="Digite a chave pix"
        onChange={(e) => setPix(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="nomePix"
        placeholder="Nome do beneficiário"
        onChange={(e) => setNomePix(e.target.value)}
      />

      <button
        type="submit"
        className="z-20  m-1 mr-2 flex cursor-pointer items-center justify-center  rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r from-slate-950 to-blue-900  px-6 font-bold text-white  hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700"
      >
        Enviar
      </button>
    </form>
  )
}
