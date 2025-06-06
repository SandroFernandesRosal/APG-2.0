'use client'
import { FaArrowRight } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { Agenda } from '@/data/types/agenda'
import { useEffect, useState } from 'react'
import { useDataAgenda, useLocal, useShowModal } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'
import SelectLocal from './SelectLocal'
import { useToken } from '@/hooks/useToken'
import AddAgenda from './crud/AddAgenda'
import EditAgenda from './crud/EditAgenda'
import RemoveAgenda from './crud/RemoveAgenda'
import Image from 'next/image'
import AgendaHeader from './agenda-header'

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
  const { showModal, setShowModal } = useShowModal()

  useEffect(() => {
    const fetchAgendaData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/agenda`)

        if (!response.ok) {
          throw new Error('Falha ao carregar agenda')
        }

        const data = await response.json()
        setDataAgenda(data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
        setLocalLoading(false)
      }
    }

    fetchAgendaData()
  }, [local, setDataAgenda])

  const handleLocalChange = (newLocal: string) => {
    setLocalLoading(true)
    setLocal(newLocal)
  }

  const filteredAgenda = dataAgenda.filter(
    (item: Agenda) => item.role === local.toUpperCase(),
  )

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: true,
        },
      },
    ],
  }

  return (
    <>
      <section className="text-textprimary flex flex-col items-center py-4 justify-center overflow-hidden w-full mb-10">
        <AgendaHeader />

        {token?.role === 'ADMIN' && (
          <>
            {openAgenda === false && (
              <button className="button" onClick={() => setOpenAgenda(true)}>
                Adicionar evento
              </button>
            )}

            {openAgenda && (
              <div className="md:min-w-[35%]">
                <AddAgenda
                  openAgenda={openAgenda}
                  setOpenAgenda={setOpenAgenda}
                />
              </div>
            )}
          </>
        )}
        <SelectLocal onChange={handleLocalChange} />
        <div className="flex gap-2 items-center justify-between px-2 w-[80vw] lg:max-w-[1200px] mt-5 text-primary dark:text-secundary">
          <h1 className="md:text-2xl w-full font-bold">{titleproducts}</h1>
          <Link
            href={`/agenda`}
            className="font-bold md:text-lg w-full justify-end flex items-center gap-2"
          >
            <span>Ver todos</span> <FaArrowRight />
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
          ) : filteredAgenda.length === 0 ? (
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-300 dark:border-zinc-800 p-5 rounded-lg justify-center items-center">
              <p>Nenhum evento cadastrado.</p>
            </div>
          ) : (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 mx-10 gap-2"
            >
              {filteredAgenda.map((product: Agenda) => (
                <div
                  className="flex justify-center relative content-center flex-col h-[400px] rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
                  key={product.id}
                >
                  <Image
                    src={'/img/agenda.png'}
                    width={500}
                    height={500}
                    alt="imagem de evento"
                    className="absolute top-0 inset-0 h-full w-full"
                  />
                  <div className="bg-primary text-white dark:border-secundary flex text-xl justify-center w-[80%] place-self-center rounded-md">
                    {product.day}
                  </div>
                  <div className="relative mt-5 flex place-self-center w-[80%] overflow-visible border-l border-zinc-400 dark:border-zinc-700 border-[1px]">
                    <div className="w-full">
                      <span className="absolute left-2 top-5 flex h-2 w-2 items-center justify-center rounded-full bg-primary ring-8 ring-primary/20 dark:bg-secundary"></span>
                      <h1 className="flex items-center text-center font-semibold text-gray-900 dark:text-white border-b-[1px] border-zinc-400 dark:border-zinc-700 place-content-center">
                        {product.name}
                      </h1>
                      <p className="font-normal place-content-center flex">
                        {product.hour}
                      </p>
                    </div>
                  </div>
                  {token && (
                    <div className="mt-2 flex w-full flex-1 items-end justify-around text-white">
                      {openEdit !== product.id ? (
                        <button
                          className="button !mb-0"
                          onClick={() => {
                            setOpenEdit(product.id)
                            setSelectedProduct(product)
                          }}
                        >
                          Editar
                        </button>
                      ) : null}
                      <button
                        aria-hidden="true"
                        tabIndex={-1}
                        className="button !mb-0"
                        onClick={() => {
                          setShowModal(product.id)
                          setSelectedProduct(product)
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      {showModal && selectedProduct && <RemoveAgenda id={selectedProduct.id} />}

      {openEdit && selectedProduct && (
        <EditAgenda
          id={selectedProduct.id}
          title={selectedProduct.name}
          hora={selectedProduct.hour}
          dia={selectedProduct.day}
          setOpenEdit={setOpenEdit}
          role={selectedProduct.role}
        />
      )}
    </>
  )
}
