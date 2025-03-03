'use client'
import { Endereco } from '@/data/types/endereco'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useToken } from '@/hooks/useToken'
import ItemEndereco from './item-endereco'
import AddEndereco from './crud/AddEndereco'
import SkeletonEndereco from './skeleton/SkeletonEndereco'

export default function Locais() {
  const [data, setData] = useState<Endereco[]>([])
  const [loading, setLoading] = useState(true)
  const [openEndereco, setOpenEndereco] = useState(false)
  const token = useToken()

  useEffect(() => {
    api
      .get('/endereco')
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <section className="mb-5 flex w-[100vw] flex-col items-center rounded-[35px] border-[1px] border-zinc-400 bg-bglightsecundary dark:border-zinc-700 dark:bg-bgdarksecundary md:w-[90vw] md:rounded-xl">
      <h1 className="m-0 mt-1 text-lg font-bold text-primary dark:text-secundary">
        Endereços
      </h1>
      <p className="mb-5 text-xl">Todos os nossos endereços</p>

      {token && (
        <>
          {openEndereco === false && (
            <div
              className="mb-4 flex cursor-pointer rounded-lg border-[1px] border-zinc-400 bg-bglight p-2 placeholder-black outline-none hover:bg-gradient-to-r hover:from-blue-900 hover:to-slate-900 hover:text-white focus:ring-0 dark:border-zinc-700 dark:bg-bgdark dark:placeholder-white"
              onClick={() => setOpenEndereco(true)}
            >
              Adicionar endereço
            </div>
          )}

          {openEndereco && (
            <div className="md:min-w-[35%]">
              <AddEndereco
                openEndereco={openEndereco}
                setOpenEndereco={setOpenEndereco}
              />
            </div>
          )}
        </>
      )}

      <div className="relative -top-[30px] mb-2 flex w-full flex-wrap justify-center gap-x-5 p-1 px-2 pt-10 md:gap-x-5">
        {!loading ? (
          data.length < 1 ? (
            <p>Nenhum endereço cadastrado.</p>
          ) : (
            data.map((item) => (
              <ItemEndereco
                id={item.id}
                key={item.id}
                local={item.local}
                rua={item.rua}
                cep={item.cep}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
              />
            ))
          )
        ) : (
          <SkeletonEndereco />
        )}
      </div>
    </section>
  )
}
