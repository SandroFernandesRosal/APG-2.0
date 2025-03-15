'use client'
import { FaPlus } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'

import { Agenda } from '@/data/types/agenda'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useDataAgenda, useLocal } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'
import SelectLocal from './SelectLocal'
import { useToken } from '@/hooks/useToken'
import AddAgenda from './crud/AddAgenda'
import EditAgenda from './crud/EditAgenda'
import RemoveAgenda from './crud/RemoveAgenda'
import { Minus } from 'lucide-react'
import Image from 'next/image'

export default function CarouselAgenda({
  titleproducts,
}: {
  titleproducts: string
}) {
  const { dataAgenda, setDataAgenda } = useDataAgenda()
  const { local, setLocal } = useLocal()
  const [loading, setLoading] = useState(true)
  const [localLoading, setLocalLoading] = useState(false)
  const [openAgenda, setOpenAgenda] = useState(false)
  const token = useToken()
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Agenda | null>(null)

  useEffect(() => {
    setLoading(true)
    api
      .get(`/agenda/${local}`)
      .then((response) => {
        setDataAgenda(response.data)
        setLoading(false)
        setLocalLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setLocalLoading(false)
      })
  }, [setDataAgenda, local])

  const handleLocalChange = (newLocal: string) => {
    setLocalLoading(true)
    setLocal(newLocal)
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
          arrows: true,
        },
      },
    ],
  }

  return (
    <>
      <section className="text-textprimary flex flex-col items-center py-4 justify-center overflow-hidden bg-bglightsecundary w-full border-b-[1px] border-zinc-300 dark:border-zinc-800  dark:bg-bgdarksecundary ">
        <h1 className="text-xl font-bold flex">
          <Minus
            size={45}
            strokeWidth={3}
            className="text-secundary dark:text-primary  flex place-self-end"
          />

          <span className="text-primary dark:text-secundary text-2xl">
            Agenda
          </span>
        </h1>

        {token && (
          <>
            {openAgenda === false && (
              <button className="button" onClick={() => setOpenAgenda(true)}>
                Adicionar evento
              </button>
            )}

            {openAgenda && (
              <div className="md:min-w-[35%]">
                {' '}
                <AddAgenda
                  openAgenda={openAgenda}
                  setOpenAgenda={setOpenAgenda}
                />
              </div>
            )}
          </>
        )}
        <SelectLocal onChange={handleLocalChange} />
        <div className="flex gap-2 items-center justify-between px-2 w-[80vw] lg:max-w-[1200px] mt-5">
          <h1 className="md:text-2xl w-full font-bold">{titleproducts}</h1>
          <Link
            href={`/agenda`}
            className="font-bold md:text-lg w-full justify-end flex items-center gap-2"
          >
            <span>Ver todos</span> <FaPlus />
          </Link>
        </div>

        <div className="flex w-full gap-3 justify-center">
          {loading || localLoading ? (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 gap-2 overflow-hidden"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonNew key={index} />
              ))}
            </Slider>
          ) : dataAgenda.length === 0 ? (
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-400 dark:border-zinc-700 p-5 rounded-lg justify-center items-center">
              <p>Nenhum evento cadastrado.</p>
            </div>
          ) : (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 mx-10 gap-2 "
            >
              {dataAgenda.map((product: Agenda) => {
                return (
                  <div
                    className="flex justify-center relative content-center flex-col h-[300px] md:h-[400px] rounded-md border-[1px] border-zinc-400 dark:border-zinc-700 "
                    key={product.id}
                  >
                    <Image
                      src={'/img/agenda.png'}
                      width={500}
                      height={500}
                      alt="imagem de evento"
                      className="absolute top-0 inset-0 h-full w-full "
                    />
                    <div className=" bg-primary   text-white dark:border-secundary flex text-xl  justify-center w-[80%] place-self-center  rounded-md">
                      {product.day}
                    </div>
                    <div className="relative    mt-5  flex place-self-center w-[80%] overflow-visible border-l border-zinc-400 dark:border-zinc-700 border-[1px] ">
                      <div className="  w-full">
                        <span className="absolute  left-2 top-5 flex h-2 w-2 items-center justify-center rounded-full bg-primary ring-8 ring-primary/20 dark:bg-secundary "></span>
                        <h1 className=" flex items-center  font-semibold text-gray-900 dark:text-white border-b-[1px] border-zinc-400  dark:border-zinc-700 place-content-center">
                          {product.name}
                        </h1>

                        <p className="font-normal place-content-center flex">
                          {product.hour}
                        </p>
                      </div>
                    </div>
                    {token && (
                      <div className="mt-2 flex w-full flex-1 items-end justify-around text-white ">
                        {openEdit !== product.id ? (
                          <button
                            className="button"
                            onClick={() => {
                              setOpenEdit(product.id)
                              setSelectedProduct(product)
                            }}
                          >
                            Editar
                          </button>
                        ) : null}
                        <RemoveAgenda id={product.id} />
                      </div>
                    )}
                  </div>
                )
              })}
            </Slider>
          )}
        </div>
      </section>

      {openEdit && selectedProduct && (
        <EditAgenda
          id={selectedProduct.id}
          title={selectedProduct.name}
          hora={selectedProduct.hour}
          dia={selectedProduct.day}
          setOpenEdit={setOpenEdit}
        />
      )}
    </>
  )
}
