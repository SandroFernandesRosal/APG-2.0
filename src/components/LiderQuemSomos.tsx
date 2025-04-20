'use client'
import Image from 'next/image'
import { Suspense, useState } from 'react'
import { useToken } from '@/hooks/useToken'
import AddSobreLider from './crud/AddSobreLider'
import RemoveSobreLider from './crud/RemoveSobreLider'
import EditSobreLider from './crud/EditSobreLider'
import { SobreLider } from '@/data/types/sobrelider'

interface LiderQuemSomosProps {
  dataSobreLider: SobreLider[]
}

export default function LiderQuemSomos({
  dataSobreLider,
}: LiderQuemSomosProps) {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      {token && (
        <>
          {open === false && (
            <button className="button" onClick={() => setOpen(true)}>
              Adicionar lider
            </button>
          )}

          {open && (
            <div className="md:min-w-[35%]">
              <AddSobreLider open={open} setOpen={setOpen} />
            </div>
          )}
        </>
      )}

      <div className="my-4 mb-12 flex flex-wrap justify-center gap-4 w-full">
        {dataSobreLider &&
          dataSobreLider.map((product) => (
            <div
              className="justify-between flex flex-col h-[300px] md:h-[400px] w-[47%] max-w-[200px] rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
              key={product.id}
            >
              <div className="border-b-[3px] border-primary dark:border-secundary h-[50%] py-2 flex justify-center items-center">
                <Image
                  src={product.coverUrl}
                  width={130}
                  height={130}
                  alt={product.title}
                  className="group-hover:scale-105 transition-transform duration-500 p-1 w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full border-[1px] border-primary dark:border-secundary"
                />
              </div>
              <div className="flex flex-col my-2 min-h-[100px] md:min-h-[70px] gap-2 justify-between items-center">
                <h1 className="text-center px-1">{product.name}</h1>

                <span>{product.title}</span>

                {token && (
                  <div className=" mb-1 flex w-full flex-1 items-end justify-around text-white">
                    {openEdit !== product.id ? (
                      <button
                        className="button !mb-0"
                        onClick={() => {
                          setOpenEdit(product.id)
                        }}
                      >
                        Editar
                      </button>
                    ) : (
                      <EditSobreLider
                        nome={product.name}
                        titulo={product.title}
                        img={product.coverUrl}
                        id={product.id}
                        setOpenEdit={setOpenEdit}
                      />
                    )}
                    <RemoveSobreLider id={product.id} />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </Suspense>
  )
}
