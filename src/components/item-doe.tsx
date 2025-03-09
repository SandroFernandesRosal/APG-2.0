import { Doacao } from '@/data/types/doacao'
import EditDoacao from './crud/EditDoacao'
import RemoveDoacao from './crud/RemoveDoacao'
import { useState } from 'react'
import { useToken } from '@/hooks/useToken'

export default function ItemDoe({
  id,
  local,
  banco,
  conta,
  agencia,
  nomebanco,
  pix,
  nomepix,
}: Doacao) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()
  return (
    <div
      className="justify-between flex flex-col h-[300px] md:h-[400px] w-[47%] max-w-[200px] rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
      key={id}
    >
      <div className="border-b-[3px] border-primary dark:border-secundary  flex text-xl justify-around w-full h-[50%]  py-1 flex-col items-center">
        <h1 className="font-bold ">{local}</h1>{' '}
        <span className=" flex items-center   text-gray-900 dark:text-white">
          {banco}
        </span>
        <span className=" text-gray-500 dark:text-gray-400">C: {conta}</span>
        <span className=" text-gray-500 dark:text-gray-400">Ag: {agencia}</span>
        <span className=" text-gray-500 dark:text-gray-400">{nomebanco}</span>
      </div>
      <div className="flex flex-col justify-center items-center h-[50%]">
        <span>Chave pix:</span>
        <h1>{pix}</h1>
        <h2>{nomepix}</h2>

        {token && (
          <div className=" mb-1 flex w-full flex-1 items-end justify-around text-white">
            {openEdit !== id ? (
              <button
                className="button"
                onClick={() => {
                  setOpenEdit(id)
                }}
              >
                Editar
              </button>
            ) : (
              <EditDoacao
                localInitial={local}
                bancoInitial={banco}
                contaInitial={conta}
                agenciaInitial={agencia}
                nomebancoInitial={nomebanco}
                pixInitial={pix}
                nomepixInitial={nomepix}
                id={id}
                setOpenEdit={setOpenEdit}
              />
            )}
            <RemoveDoacao id={id} />
          </div>
        )}
      </div>
    </div>
  )
}
