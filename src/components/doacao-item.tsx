import EditDoacao from './crud/EditDoacao'
import RemoveDoacao from './crud/RemoveDoacao'
import { Doacao } from '@/data/types/doacao'

interface DoacaoItemProps {
  product: Doacao
  openEdit: number | null
  setOpenEdit: (id: number | null) => void
  token: string | null
}

export default function DoacaoItem({
  product,
  openEdit,
  setOpenEdit,
  token,
}: DoacaoItemProps) {
  return (
    <>
      <div
        className="justify-between flex flex-col h-[300px] md:h-[400px] rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
        key={product.id}
      >
        <div className="border-b-[3px] border-primary flex text-xl font-bold justify-around w-full h-[50%]  py-2 flex-col items-center">
          <h1>{product.local}</h1>{' '}
          <h3 className=" flex items-center  font-semibold text-gray-900 dark:text-white">
            {product.nomebanco}
          </h3>
          <span className="font-normal text-gray-500 dark:text-gray-400">
            {product.conta}
          </span>
          <span className="font-normal text-gray-500 dark:text-gray-400">
            {product.agencia}
          </span>
          <span className="font-normal text-gray-500 dark:text-gray-400">
            {product.banco}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center h-[50%]">
          <h1>{product.pix}</h1>
          <h2>{product.nomepix}</h2>

          {token && (
            <div className=" mb-1 flex w-full flex-1 items-end justify-around text-white">
              {openEdit !== Number(product.id) && (
                <button
                  className="m-[5px]  rounded-lg bg-gradient-to-r from-slate-950 to-blue-900  px-1 text-white  shadow-light hover:from-blue-900 hover:to-slate-900 dark:shadow-dark md:px-3 md:text-lg md:font-bold"
                  onClick={() => setOpenEdit(Number(product.id))}
                >
                  Editar
                </button>
              )}
              <RemoveDoacao id={product.id} />
            </div>
          )}
        </div>
      </div>
      {openEdit && (
        <EditDoacao
          localInitial={product.local}
          bancoInitial={product.banco}
          contaInitial={product.conta}
          agenciaInitial={product.agencia}
          nomebancoInitial={product.nomebanco}
          pixInitial={product.pix}
          nomepixInitial={product.nomepix}
          id={product.id}
          setOpenEdit={setOpenEdit}
        />
      )}
    </>
  )
}
