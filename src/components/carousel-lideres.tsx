'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Image from 'next/image'
import { SobreLider } from '@/data/types/sobrelider'
import { useEffect, useState } from 'react'
import { useDataSobre } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'

import { useToken } from '@/hooks/useToken'
import AddSobreLider from './crud/AddSobreLider'
import EditSobreLider from './crud/EditSobreLider'
import RemoveSobreLider from './crud/RemoveSobreLider'
import { ArrowDown } from 'lucide-react'

export default function CarouselLideres() {
  const { dataSobre, setDataSobre } = useDataSobre()

  const [loading, setLoading] = useState(true)
  const [openNew, setOpenNew] = useState(false)
  const token = useToken()
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<SobreLider | null>(
    null,
  )

  useEffect(() => {
    const fetchLideres = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/sobrelider', { cache: 'no-store' })
        if (!res.ok) {
          throw new Error('Erro ao buscar líderes')
        }
        const data = await res.json()
        setDataSobre(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchLideres()
  }, [setDataSobre])

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
      <section
        className={`text-textprimary flex flex-col items-center justify-center overflow-hidden w-full absolute -bottom-[184px] md:-bottom-[250px] gap-2 ${
          dataSobre.length < 1 && 'bottom-0 md:bottom-0'
        }`}
      >
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Conheça nossos fundadores e responsáveis
        </h1>

        <ArrowDown size={40} className="text-white" />
        {token && (
          <>
            {!openNew && (
              <button
                className="text-white border-secundary border-[1px] px-2 rounded-md hover:text-secundary font-bold"
                onClick={() => setOpenNew(true)}
              >
                Adicionar Líder
              </button>
            )}

            {openNew && (
              <div className="md:min-w-[35%]">
                <AddSobreLider open={openNew} setOpen={setOpenNew} />
              </div>
            )}
          </>
        )}

        <div className="flex w-full gap-3 justify-center">
          {loading ? (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 gap-2 overflow-hidden"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonNew key={index} />
              ))}
            </Slider>
          ) : dataSobre.length === 0 ? (
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-300 dark:border-zinc-700 p-5 rounded-lg justify-center items-center">
              <p>Nenhum líder cadastrado.</p>
            </div>
          ) : (
            <Slider {...settings} className="w-[80vw] lg:max-w-[1200px] my-5">
              {dataSobre.map((product: SobreLider) => (
                <div
                  key={product.id}
                  className={`justify-between relative flex flex-col h-[300px] md:h-[400px] rounded-md border-[1px] border-zinc-400 dark:border-zinc-700 group ${
                    token && 'mb-10 md:mb-14'
                  }`}
                >
                  <div className="h-[100%] relative overflow-hidden">
                    <div className="group h-full rounded-md overflow-hidden relative">
                      <div
                        className="absolute inset-0 bg-cover bg-center blur-sm scale-110 transition-transform duration-500 group-hover:scale-115"
                        style={{
                          backgroundImage: `url(${product.coverUrl})`,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={product.coverUrl}
                          width={300}
                          height={300}
                          alt={product.title}
                          quality={100}
                          className="relative z-10 h-auto w-auto max-h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="hidden z-10 group-hover:flex flex-col gap-1 absolute bottom-0 rounded-b-md h-[50%] bg-black/80 w-full justify-center items-center cursor-pointer border-primary dark:border-secundary border-t-2">
                    <div className="text-primary z-30">
                      <p className="text-center px-1 text-xl text-white font-semibold">
                        {product.name}
                      </p>
                    </div>
                    <div className="flex px-2 text-white z-30">
                      {product.title}
                    </div>
                  </div>

                  {token && (
                    <div className="flex w-full items-start justify-around text-white py-3 h-[170px]">
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
                      <RemoveSobreLider id={product.id} />
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      {openEdit && selectedProduct && (
        <EditSobreLider
          nome={selectedProduct.name}
          titulo={selectedProduct.title}
          img={selectedProduct.coverUrl}
          id={selectedProduct.id}
          setOpenEdit={setOpenEdit}
        />
      )}
    </>
  )
}
