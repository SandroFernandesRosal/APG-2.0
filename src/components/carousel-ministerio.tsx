'use client'

import { FaArrowRight } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Image from 'next/image'
import { Ministerio } from '@/data/types/ministerio'
import { useEffect, useState } from 'react'
import { useDataMinisterio, useLocal } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'
import SelectLocal from './SelectLocal'
import { useToken } from '@/hooks/useToken'
import AddMinisterio from './crud/AddMinisterio'
import EditMinisterio from './crud/EditMinisterio'
import RemoveMinisterio from './crud/RemoveMinisterio'

import CarouselEndereco from './carousel-endereco'
import QuemSomosHeader from './quemsomos-header'
import MinisterioHeader from './ministerio-header'

export default function CarouselMinisterio({
  titleproducts,
}: {
  titleproducts: string
}) {
  const { dataMinisterio, setDataMinisterio } = useDataMinisterio()
  const { local, setLocal } = useLocal()
  const [loading, setLoading] = useState(true)
  const [localLoading, setLocalLoading] = useState(false)
  const [openMinisterio, setOpenMinisterio] = useState(false)
  const token = useToken()
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Ministerio | null>(
    null,
  )

  useEffect(() => {
    const fetchMinisterios = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/${local}/ministerio`, {
          cache: 'no-store',
        })
        if (!response.ok) {
          throw new Error('Erro ao buscar ministérios')
        }
        const data = await response.json()
        setDataMinisterio(data)
      } catch (error) {
        console.error('Erro ao buscar ministérios:', error)
      } finally {
        setLoading(false)
        setLocalLoading(false)
      }
    }

    fetchMinisterios()
  }, [local, setDataMinisterio])

  const handleLocalChange = (newLocal: string) => {
    setLocalLoading(true)
    setLocal(newLocal)
  }

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
      <section className="text-textprimary flex flex-col items-center relative justify-center overflow-hidden w-full">
        <section className="flex flex-col bg-bglight dark:bg-bgdark w-full py-5 ">
          <QuemSomosHeader />
          <CarouselEndereco />
        </section>

        <MinisterioHeader />

        {token && (
          <>
            {!openMinisterio && (
              <button
                className="button"
                onClick={() => setOpenMinisterio(true)}
              >
                Adicionar líder
              </button>
            )}
            {openMinisterio && (
              <div className="md:min-w-[35%]">
                <AddMinisterio
                  openMinisterio={openMinisterio}
                  setOpenMinisterio={setOpenMinisterio}
                />
              </div>
            )}
          </>
        )}

        <SelectLocal onChange={handleLocalChange} />

        <div className="flex gap-2 items-center justify-between px-2 w-[80vw] lg:max-w-[1200px] mt-5 text-primary dark:text-secundary">
          <h1 className="md:text-2xl w-full font-bold">{titleproducts}</h1>
          <Link
            href={`/ministerio`}
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
          ) : dataMinisterio.length === 0 ? (
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-400 dark:border-zinc-700 p-5 rounded-lg justify-center items-center">
              <p>Nenhum membro cadastrado.</p>
            </div>
          ) : (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 mx-10 gap-2"
            >
              {dataMinisterio.map((product: Ministerio) => (
                <div
                  key={product.id}
                  className={`justify-between mb-12 relative flex flex-col h-[400px] border-[1px] border-zinc-300 dark:border-zinc-800 bg-bglight dark:bg-bgdark group ${token && 'mb-10 md:mb-14'}`}
                >
                  <div className="h-[60%] relative overflow-hidden">
                    <div className="group h-full overflow-hidden relative ">
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
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 h-[40%] w-full justify-evenly items-center text-xl">
                    <div className="text-primary dark:text-secundary z-30">
                      <p className="text-center font-bold">{product.name}</p>
                    </div>
                    <div className="flex px-2 z-30">{product.title}</div>
                    <span>{product.local}</span>
                  </div>

                  {token && (
                    <div className="mb-1 flex w-full mt-5 flex-1 items-end justify-around text-white">
                      {openEdit !== product.id && (
                        <button
                          className="button !mb-0"
                          onClick={() => {
                            setOpenEdit(product.id)
                            setSelectedProduct(product)
                          }}
                        >
                          Editar
                        </button>
                      )}
                      <RemoveMinisterio id={product.id} />
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      {openEdit && selectedProduct && (
        <EditMinisterio
          nome={selectedProduct.name}
          titulo={selectedProduct.title}
          img={selectedProduct.coverUrl}
          lugar={selectedProduct.local}
          id={selectedProduct.id}
          setOpenEdit={setOpenEdit}
        />
      )}
    </>
  )
}
