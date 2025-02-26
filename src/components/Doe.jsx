'use client'
import { useToken } from '@/hooks/useToken'
import ItemDoe from './item-doe'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'

import AddDoacao from './crud/AddDoacao'
import SkeletonDoe from './skeleton/SkeletonDoe'

export default function Doe() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDoacao, setOpenDoacao] = useState(false)
  const token = useToken()

  useEffect(() => {
    api
      .get('/doacao')
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="mb-4 flex w-[100vw] flex-col items-center rounded-[35px]  border-[1px]  border-zinc-400 bg-bglightsecundary dark:border-zinc-700  dark:bg-bgdarksecundary   md:w-[90vw] md:rounded-xl">
      <div className="mb-5 flex-col items-center text-center">
        <h1 className="m-0 text-lg font-bold text-primary dark:text-secundary ">
          Ajude a igreja
        </h1>
        <p className="px-[5px] text-xl ">
          Faça uma doação por pix ou transferência bancária
        </p>
      </div>

      {token && (
        <>
          {openDoacao === false && (
            <div
              className="mb-4 flex cursor-pointer rounded-lg border-[1px] border-zinc-400 bg-bglight p-2 placeholder-black outline-none hover:bg-gradient-to-r hover:from-blue-900 hover:to-slate-900 hover:text-white focus:ring-0 dark:border-zinc-700 dark:bg-bgdark dark:placeholder-white "
              onClick={() => setOpenDoacao(true)}
            >
              Adicionar igreja
            </div>
          )}

          {openDoacao && (
            <div className="md:min-w-[35%]">
              {' '}
              <AddDoacao
                openDoacao={openDoacao}
                setOpenDoacao={setOpenDoacao}
              />
            </div>
          )}
        </>
      )}

      <div className="relative -top-[30px] mb-5 flex w-full flex-wrap justify-center gap-x-5 p-1 px-2 pt-10 md:gap-x-5">
        {!loading ? (
          data.length < 1 ? (
            <p>Nenhuma igreja cadastrada.</p>
          ) : (
            data &&
            data.map((item) => {
              return (
                <ItemDoe
                  key={item.id}
                  id={item.id}
                  local={item.local}
                  banco={item.banco}
                  conta={item.conta}
                  agencia={item.agencia}
                  nomebanco={item.nomebanco}
                  pix={item.pix}
                  nomepix={item.nomepix}
                />
              )
            })
          )
        ) : (
          <SkeletonDoe />
        )}
      </div>
    </div>
  )
}
