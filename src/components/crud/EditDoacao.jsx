'use client'
import Cookies from 'js-cookie'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'

export default function EditDoacao({
  setOpenEdit,
  id,
  localInitial,
  bancoInitial,
  contaInitial,
  agenciaInitial,
  nomebancoInitial,
  pixInitial,
  nomepixInitial,
}) {
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
      const response = await api.put(
        `/doacao/${id}`,
        {
          local: local || localInitial,
          banco: banco || bancoInitial,
          conta: conta || contaInitial,
          agencia: agencia || agenciaInitial,
          nomebanco: nomebanco || nomebancoInitial,
          pix: pix || pixInitial,
          nomepix: nomepix || nomepixInitial,
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
        setOpenEdit(false)
        router.push('/')
        window.location.href = '/'
        return doacao
      }

      console.log(doacao)
    } catch (error) {
      console.error('Erro ao editar doação:', error)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-30 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg md:mt-20"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Editar doação{' '}
        <AiFillCloseCircle
          onClick={() => setOpenEdit(false)}
          className="cursor-pointer text-2xl font-bold text-black dark:text-white"
        />
      </h1>
      <input
        className="mb-4 mt-2  w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="local"
        required={true}
        placeholder="Digite o local"
        defaultValue={localInitial}
        onChange={(e) => setLocal(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg  border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center  font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark"
        type="text"
        name="banco"
        required={true}
        placeholder="Digite o nome do banco"
        defaultValue={bancoInitial}
        onChange={(e) => setBanco(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="conta"
        required={true}
        placeholder="Digite número da conta"
        defaultValue={contaInitial}
        onChange={(e) => setConta(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="agencia"
        required={true}
        placeholder="Digite número da agência"
        defaultValue={agenciaInitial}
        onChange={(e) => setAgencia(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="nomebanco"
        required={true}
        placeholder="Digite nome titular da conta"
        defaultValue={nomebancoInitial}
        onChange={(e) => setNomeBanco(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg   border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="pix"
        required={true}
        placeholder="Digite o pix"
        defaultValue={pixInitial}
        onChange={(e) => setPix(e.target.value)}
      />

      <input
        className="mb-4  w-[80%] max-w-[600px] cursor-pointer rounded-lg border-[1px] border-zinc-400 bg-bglightsecundary p-2 text-center font-bold placeholder-textlight outline-none  focus:ring-0 dark:border-zinc-700 dark:bg-bgdarksecundary dark:placeholder-textdark "
        type="text"
        name="nomepix"
        required={true}
        placeholder="Digite nome do titular do pix"
        defaultValue={nomepixInitial}
        onChange={(e) => setNomePix(e.target.value)}
      />

      <button
        type="submit"
        className="z-20  m-1 mr-2 flex cursor-pointer items-center justify-center  rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r from-slate-950 to-blue-900  px-6  font-bold text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700"
      >
        Enviar
      </button>
    </form>
  )
}
