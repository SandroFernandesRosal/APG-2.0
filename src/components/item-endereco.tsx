import Image from 'next/image'
import EditEndereco from './crud/EditEndereco'
import { Endereco } from '@/data/types/endereco'
import { useState } from 'react'

import { useToken } from '@/hooks/useToken'
import RemoveEndereco from './crud/RemoveEndereco'

export default function ItemEndereco({ id, local, rua, cep }: Endereco) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()
  return (
    <div
      className="justify-between flex flex-col h-[300px] md:h-[400px] rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
      key={id}
    >
      <div className="border-b-[3px] border-primary dark:border-secundary flex text-xl font-bold justify-around w-full h-[50%]  py-2 flex-col items-center">
        <h1>{local}</h1>{' '}
        <h3 className=" flex items-center  font-semibold text-gray-900 dark:text-white">
          {rua}
        </h3>
        <span className="font-normal text-gray-500 dark:text-gray-400">
          CEP: {cep}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center h-[50%]">
        {' '}
        <Image
          src={'/img/map.png'}
          alt="mapa"
          width={150}
          height={150}
          className="max-w-[100px] md:max-w-[180px]"
        />
        {token && (
          <div className=" mb-1 flex w-full flex-1 items-end justify-around text-white">
            {openEdit !== id ? (
              <button
                className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                onClick={() => {
                  setOpenEdit(id)
                }}
              >
                Editar
              </button>
            ) : (
              <EditEndereco
                localInitial={local}
                ruaInitial={rua}
                cepInitial={cep}
                id={id}
                setOpenEdit={setOpenEdit}
              />
            )}
            <RemoveEndereco id={id} />
          </div>
        )}
      </div>
    </div>
  )
}
