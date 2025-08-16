'use client'
import Image from 'next/image'
import { Suspense, useState } from 'react'
import { useToken } from '@/hooks/useToken'
import AddSobreLider from './crud/AddSobreLider'
import RemoveSobreLider from './crud/RemoveSobreLider'
import EditSobreLider from './crud/EditSobreLider'
import { SobreLider } from '@/data/types/sobrelider'
import { FaCameraRetro, FaPlus } from 'react-icons/fa'

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
      {token?.role === 'SUPERADMIN' && (
        <>
          {open === false && (
            <button
              className="!flex !items-center !gap-2 !px-6 !py-3 !bg-primary dark:!bg-secundary !text-white !font-semibold !rounded-lg hover:!bg-primary/90 dark:hover:!bg-secundary/90 !transition-all !duration-200 !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !mb-4"
              onClick={() => setOpen(true)}
            >
              <FaPlus className="text-sm" />
              Adicionar líder
            </button>
          )}

          {open && (
            <div className="md:min-w-[35%]">
              <AddSobreLider open={open} setOpen={setOpen} />
            </div>
          )}
        </>
      )}

      <div className=" flex flex-wrap justify-center gap-4 w-full">
        {dataSobreLider &&
          dataSobreLider.map((product) => (
            <div
              className="justify-between mb-12 relative flex flex-col h-[400px] w-[47%] max-w-[300px] border-[1px] border-zinc-300 dark:border-zinc-800 bg-bglight dark:bg-bgdark group"
              key={product.id}
            >
              <div className="h-[60%] relative overflow-hidden">
                <div className="group h-full overflow-hidden relative ">
                  {product.coverUrl ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
                        style={{
                          backgroundImage: `url(${product.coverUrl})`,
                        }}
                      />
                      <Image
                        src={product.coverUrl}
                        width={500}
                        height={500}
                        alt={product.title}
                        quality={100}
                        className="relative z-10 h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secundary/20 flex items-center justify-center">
                      <FaCameraRetro className="text-6xl text-primary/50 dark:text-secundary/50" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1 h-[40%] w-full justify-evenly items-center text-xl">
                <div className="text-primary dark:text-secundary z-30">
                  <p className="text-center font-bold">{product.name}</p>
                </div>
                <div className="flex px-2 z-30">{product.title}</div>

                {token?.role === 'SUPERADMIN' && (
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
