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
import { Minus } from 'lucide-react'
import MinisterioHighlight from './ministerio-highlight'
import CarouselLideres from './carousel-lideres'
import { useTheme } from 'next-themes'
import logo from '../../public/img/logo.png'
import logob from '../../public/img/logob.png'

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
      <section className="text-textprimary flex flex-col items-center  relative  justify-center overflow-hidden bg-bglight w-full border-b-[1px] border-zinc-300 dark:border-zinc-800  dark:bg-bgdark ">
        <section className="flex flex-col bg-bglight dark:bg-bgdark w-full py-5 ">
          <div className="flex flex-wrap justify-center gap-5 items-center px-5">
            {theme === 'dark' ? (
              <Image
                src={logob}
                height={200}
                width={200}
                priority
                quality={100}
                alt="logo do site"
                className="w-[200px] h-[200px]"
              />
            ) : (
              <Image
                src={logo}
                height={200}
                width={200}
                priority
                quality={100}
                alt="logo do site"
                className="w-[200px] h-[200px]"
              />
            )}
            <div className="flex flex-col">
              <h1 className="text-3xl mb-2 font-bold text-primary dark:text-white text-center md:text-start">
                Ministerio Alcançados pela Graça
              </h1>
              <div className="flex flex-col items-start gap-3">
                <h2 className="text-xl  italic">
                  &quot;Porque pela graça sois salvos, por meio da fé.&ldquo; -
                  Efésios 2:8
                </h2>
                <Link href={'/sobre'} className="button">
                  Conheça nossa Igreja
                </Link>
              </div>
            </div>
          </div>

          <div className="h-[500px] md:h-[600px] w-full bg-primary md:my-48 my-32 relative text-center">
            <MinisterioHighlight />
            <h1 className="text-3xl pt-4">Conheça nossos líderes</h1>
            <CarouselLideres />
          </div>
        </section>
        <h1 className="text-xl font-bold flex mt-14">
          <Minus
            size={45}
            strokeWidth={3}
            className="text-secundary dark:text-primary  flex place-self-end"
          />

          <span className="text-primary dark:text-secundary text-2xl">
            Ministério
          </span>
        </h1>

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
        <div className="flex gap-2 items-center justify-between px-2 w-[80vw] lg:max-w-[1200px] mt-5 ">
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
                    className={`justify-between mb-12 relative  flex flex-col h-[300px] md:h-[400px] rounded-md border-[1px] border-zinc-400 dark:border-zinc-700 bg-bglight dark:bg-bgdark group ${token && 'mb-10 md:mb-14'}`}
                    key={product.id}
                  >
                    <div className="h-[100%] relative overflow-hidden">
                      <div className="group h-full  rounded-md overflow-hidden relative">
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
                          className="relative z-10 h-full w-full rounded-md object-contain object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <div className="hidden group-hover:flex flex-col gap-1 absolute bottom-0 rounded-b-md z-10  bg-black/80 w-full justify-center items-center text-white cursor-pointer border-primary dark:border-secundary border-t-2 ">
                      <div className="text-primary z-30">
                        <p className="text-center px-1 text-xl text-white font-semibold ">
                          {product.name}
                        </p>
                      </div>
                      <div className="flex px-2 text-white z-30">
                        {product.title}
                      </div>
                      <span>{product.local}</span>
                    </div>

                    {token && (
                      <div className=" mb-1 flex w-full mt-5 flex-1 items-end justify-around text-white">
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
