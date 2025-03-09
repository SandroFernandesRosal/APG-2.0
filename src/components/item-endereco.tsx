import EditEndereco from './crud/EditEndereco'
import { Endereco } from '@/data/types/endereco'
import { useState } from 'react'

import { useToken } from '@/hooks/useToken'
import RemoveEndereco from './crud/RemoveEndereco'
import { FaMapMarkerAlt } from 'react-icons/fa'

export interface DataProps {
  item: Endereco
  id: string
  local: string
  rua: string
  cep: string
  cidade: string
  numero: string
}

export default function ItemEndereco({
  id,
  local,
  rua,
  cep,
  cidade,
  numero,
  item,
}: DataProps) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()

  const formatarEnderecoParaGoogleMaps = (endereco: Endereco) => {
    const { rua, numero, local, cidade, cep } = endereco
    const enderecoFormatado = `${rua},${numero},${local},${cidade},${cep}`
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      enderecoFormatado,
    )}`
  }

  const googleMapsLink = formatarEnderecoParaGoogleMaps(item)
  return (
    <div
      className="justify-between flex flex-col h-[300px] md:h-[400px] w-[47%] max-w-[200px] rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
      key={id}
    >
      <div className="border-b-[3px] border-primary dark:border-secundary flex text-xl font-bold justify-around w-full h-[50%]  py-2 flex-col items-center">
        <h1>{local}</h1>{' '}
        <h3 className=" flex items-center  font-semibold text-gray-900 dark:text-white px-2">
          {rua}, {numero} - {cidade}
        </h3>
        <span className="font-normal text-gray-500 dark:text-gray-400">
          CEP: {cep}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center h-[50%]">
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <FaMapMarkerAlt className="text-4xl text-primary dark:text-secundary" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Ver no Google Maps
          </span>
        </a>
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
              <EditEndereco
                localInitial={local}
                ruaInitial={rua}
                cepInitial={cep}
                cidadeInitial={cidade}
                numeroInitial={numero}
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
