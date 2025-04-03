'use client'
import { FaPlus } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Image from 'next/image'
import { Ministerio } from '@/data/types/ministerio'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useDataMinisterio, useLocal } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'
import SelectLocal from './SelectLocal'
import { useToken } from '@/hooks/useToken'
import AddMinisterio from './crud/AddMinisterio'
import EditMinisterio from './crud/EditMinisterio'
import RemoveMinisterio from './crud/RemoveMinisterio'

import { useTheme } from 'next-themes'
import logo from '../../public/img/logo.png'
import logob from '../../public/img/logob.png'
import CarouselEndereco from './carousel-endereco'

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
  const { theme } = useTheme()

  useEffect(() => {
    setLoading(true)
    api
      .get(`/ministerio/${local}`)
      .then((response) => {
        setDataMinisterio(response.data)
        setLoading(false)
        setLocalLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setLocalLoading(false)
      })
  }, [setDataMinisterio, local])

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
      <section className="text-textprimary flex flex-col items-center  relative  justify-center overflow-hidden ">
        <section className="flex flex-col bg-bglight dark:bg-bgdark w-full py-5 ">
          <div className="flex flex-col-reverse md:flex-row justify-center ">
            <div className="w-full lg:max-w-[400px] md:flex justify-center items-center relative overflow-hidden hidden">
              <div className="absolute inset-0 bg-[url(/img/logob.png)] bg-cover bg-center blur-sm"></div>
              {theme === 'dark' ? (
                <Image
                  src={logob}
                  height={200}
                  width={200}
                  priority
                  quality={100}
                  alt="logo do site"
                  className="relative z-10 w-[200px] object-contain md:h-full"
                />
              ) : (
                <Image
                  src={logo}
                  height={200}
                  width={200}
                  priority
                  quality={100}
                  alt="logo do site"
                  className="relative z-10 w-[200px] object-contain md:h-full "
                />
              )}
            </div>

            <div className="flex flex-col w-full bg-primary text-white justify-center py-5 px-5">
              <h1 className="text-3xl mb-2 font-bold text-center md:text-start">
                Ministerio Alcançados pela Graça
              </h1>
              <div className="flex flex-col items-start gap-3">
                <h2 className="text-xl italic">
                  &quot;Porque pela graça sois salvos, por meio da fé.&ldquo; -
                  Efésios 2:8
                </h2>

                <div>
                  <p className="mb-4">
                    Fundada em XX de X de XXXX, somos a Igreja Evangélica
                    Alcançados pela Graça, uma comunidade de fé comprometida com
                    a proclamação do evangelho e a edificação dos cristãos.
                    Atuamos em três localidades, levando a mensagem de Cristo e
                    promovendo comunhão e crescimento espiritual. Nossa missão é
                    alcançar vidas com a graça de Deus, fortalecendo famílias e
                    edificando discípulos.
                  </p>
                  <Link
                    href={'/sobre'}
                    className="button p-2 !text-white !border-secundary"
                  >
                    Conheça nossa Igreja
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <CarouselEndereco />
        </section>

        <div className="flex relative flex-col-reverse md:flex-row-reverse justify-center  mb-5">
          <div className="w-full lg:max-w-[400px] md:flex justify-center items-center relative overflow-hidden hidden">
            <div className="absolute inset-0 bg-[url(/img/ministerio.jpg)] bg-cover bg-center blur-sm scale-110 "></div>
            <Image
              src={'/img/ministerio.jpg'}
              height={300}
              width={300}
              priority
              quality={100}
              alt="imagem de agenda"
              className="object-contain w-full h-[200px] md:h-full relative z-10"
            />
          </div>

          <div className="flex flex-col w-full bg-primary text-white justify-center py-5 px-5">
            <h1 className="text-3xl mb-2 font-bold text-center md:text-start">
              Nosso ministério
            </h1>
            <div className="flex flex-col items-start gap-3">
              <div>
                <p className="mb-4">
                  A Igreja Alcançados pela Graça é liderada por um ministério
                  comprometido com o chamado de Deus, servindo com amor e
                  dedicação para guiar a igreja no caminho da fé. Cada membro do
                  ministério tem um papel essencial na edificação da igreja e no
                  cumprimento da missão que Deus nos confiou.
                </p>
              </div>
            </div>
          </div>
        </div>

        {token && (
          <>
            {openMinisterio === false && (
              <button
                className="button"
                onClick={() => setOpenMinisterio(true)}
              >
                Adicionar líder
              </button>
            )}

            {openMinisterio && (
              <div className="md:min-w-[35%]">
                {' '}
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
          ) : dataMinisterio.length === 0 ? (
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-400 dark:border-zinc-700 p-5 rounded-lg justify-center items-center">
              <p>Nenhum membro cadastrado.</p>
            </div>
          ) : (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 mx-10 gap-2"
            >
              {dataMinisterio.map((product: Ministerio) => {
                return (
                  <div
                    className={`justify-between mb-12 relative  flex flex-col h-[400px]  border-[1px] border-zinc-300 dark:border-zinc-800   bg-bglight dark:bg-bgdark group ${token && 'mb-10 md:mb-14'}`}
                    key={product.id}
                  >
                    <div className="h-[60%] relative overflow-hidden">
                      <div className="group h-full  overflow-hidden relative ">
                        <div
                          className="absolute inset-0 bg-cover bg-center  blur-sm scale-110"
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

                    <div className="flex flex-col gap-1  h-[40%]  w-full justify-evenly items-center text-xl">
                      <div className="text-primary dark:text-secundary z-30">
                        <p className="text-center  font-bold ">
                          {product.name}
                        </p>
                      </div>
                      <div className="flex px-2  z-30 ">{product.title}</div>
                      <span>{product.local}</span>
                    </div>

                    {token && (
                      <div className=" mb-1 flex w-full mt-5 flex-1 items-end justify-around text-white">
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
                        <RemoveMinisterio id={product.id} />
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
