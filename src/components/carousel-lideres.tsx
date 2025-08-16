'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Image from 'next/image'
import { SobreLider } from '@/data/types/sobrelider'
import { useEffect, useState } from 'react'
import { useDataSobre, useShowModal } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'

import { useToken } from '@/hooks/useToken'
import AddSobreLider from './crud/AddSobreLider'
import EditSobreLider from './crud/EditSobreLider'
import RemoveSobreLider from './crud/RemoveSobreLider'
import { ArrowDown } from 'lucide-react'
import { FaCameraRetro, FaPlus } from 'react-icons/fa6'

export default function CarouselLideres() {
  const { dataSobre, setDataSobre } = useDataSobre()

  const [loading, setLoading] = useState(true)
  const [openNew, setOpenNew] = useState(false)
  const token = useToken()
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<SobreLider | null>(
    null,
  )
  const { showModal, setShowModal } = useShowModal()

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
        {token?.role === 'SUPERADMIN' && (
          <>
            {!openNew && (
              <button
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/30"
                onClick={() => setOpenNew(true)}
              >
                <FaPlus className="text-sm" />
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
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-300 dark:border-zinc-800 p-5 rounded-lg justify-center items-center">
              <FaCameraRetro className="text-6xl text-white/50 mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">
                Nenhum líder encontrado
              </h2>
              <p className="text-white/70 text-center">
                Não há líderes cadastrados ainda.
              </p>
            </div>
          ) : (
            <Slider {...settings} className="w-[80vw] lg:max-w-[1200px] my-5">
              {dataSobre.map((item) => (
                <div key={item.id} className="p-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-[400px] overflow-hidden group relative border border-white/20">
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-center mb-4">
                        <div className="relative">
                          <Image
                            width={120}
                            height={120}
                            src={item.coverUrl || '/img/Placeholder.png'}
                            alt={item.name}
                            className="h-[120px] w-[120px] rounded-full border-4 border-white/30 object-cover"
                          />
                        </div>
                      </div>

                      <div className="text-center flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {item.name}
                        </h3>
                        <p className="text-white/80 text-sm mb-4">
                          {item.title}
                        </p>
                      </div>
                    </div>

                    {token?.role === 'SUPERADMIN' && (
                      <div className="flex w-full items-start justify-around text-white py-3 h-[170px]">
                        {openEdit !== item.id && (
                          <button
                            className="button !mb-0"
                            onClick={() => {
                              setOpenEdit(item.id)
                              setSelectedProduct(item)
                            }}
                          >
                            Editar
                          </button>
                        )}
                        <button
                          aria-hidden="true"
                          tabIndex={-1}
                          className="button !mb-0"
                          onClick={() => {
                            setShowModal(item.id)
                            setSelectedProduct(item)
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      {openEdit && selectedProduct && (
        <EditSobreLider
          setOpenEdit={setOpenEdit}
          id={selectedProduct.id}
          nome={selectedProduct.name}
          titulo={selectedProduct.title}
          img={selectedProduct.coverUrl}
        />
      )}

      {showModal && selectedProduct && (
        <RemoveSobreLider id={selectedProduct.id} />
      )}
    </>
  )
}
