'use client'

import { FaArrowRight } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Image from 'next/image'
import { Ministerio } from '@/data/types/ministerio'
import { useEffect, useState } from 'react'
import { useDataMinisterio, useLocal, useShowModal } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'
import SelectLocal from './SelectLocal'
import { useToken } from '@/hooks/useToken'
import AddMinisterio from './crud/AddMinisterio'
import EditMinisterio from './crud/EditMinisterio'
import RemoveMinisterio from './crud/RemoveMinisterio'

import CarouselEndereco from './carousel-endereco'
import MinisterioHeader from './ministerio-header'
import { getIgrejaLabel } from '@/lib/getIgrejaLabel'
import EnderecosHeader from './enderecos-header'

export default function CarouselMinisterio({
  titleproducts,
  children,
}: {
  titleproducts: string
  children?: React.ReactNode
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
  const { showModal, setShowModal } = useShowModal()

  useEffect(() => {
    const fetchMinisterios = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/ministerio`, {
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

  const filteredMinisterios = dataMinisterio.filter(
    (item: Ministerio) => item.role === local.toUpperCase(),
  )

  const podeAdicionar =
    token && (token.role === 'SUPERADMIN' || token.role === 'ADMIN')

  const podeEditarRemover = (itemRole: string | undefined) => {
    if (!token?.role) return false
    if (token.role === 'SUPERADMIN') return true
    if (
      token.role === 'ADMIN' &&
      token.ministryRole?.toUpperCase() === itemRole?.toUpperCase()
    )
      return true

    return false
  }

  const settings = {
    dots: true,
    infinite: filteredMinisterios.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: filteredMinisterios.length > 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: filteredMinisterios.length > 1,
        },
      },
    ],
  }

  return (
    <>
      <section className="text-textprimary flex flex-col items-center relative justify-center overflow-hidden w-full">
        {/* O seu código original de headers e AddMinisterio mantido */}
        <section className="flex flex-col bg-bglight dark:bg-bgdark w-full py-5 ">
          <EnderecosHeader />
          {children}
          <CarouselEndereco />
        </section>
        <MinisterioHeader />
        {podeAdicionar && (
          <div className="my-4">
            {!openMinisterio ? (
              <button
                className="button"
                onClick={() => setOpenMinisterio(true)}
              >
                {' '}
                Adicionar líder{' '}
              </button>
            ) : (
              <div className="w-full max-w-2xl">
                <AddMinisterio
                  openMinisterio={openMinisterio}
                  setOpenMinisterio={setOpenMinisterio}
                />
              </div>
            )}
          </div>
        )}
        <SelectLocal onChange={handleLocalChange} />
        <div className="flex gap-2 items-center justify-between px-4 w-full lg:max-w-6xl mt-5 text-primary dark:text-secundary">
          <h1 className="text-2xl md:text-3xl font-bold">{titleproducts}</h1>
          <Link
            href={`/ministerio`}
            className="font-bold text-base md:text-lg flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span>Ver todos</span> <FaArrowRight />
          </Link>
        </div>

        <div className="w-full lg:max-w-6xl px-8 pb-4">
          {loading || localLoading ? (
            <div className="w-full mt-5">
              <Slider {...settings}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-2">
                    <SkeletonNew />
                  </div>
                ))}
              </Slider>
            </div>
          ) : filteredMinisterios.length === 0 ? (
            <div className="flex flex-col h-40 my-5 border border-dashed border-zinc-300 dark:border-zinc-700 p-5 rounded-lg justify-center items-center text-gray-500">
              <p>Nenhum membro cadastrado para {getIgrejaLabel(local)}.</p>
            </div>
          ) : (
            <div className="w-full mt-5">
              <Slider {...settings}>
                {filteredMinisterios.map((product: Ministerio) => (
                  <div key={product.id} className="p-2">
                    <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-[420px] overflow-hidden group relative">
                      {/* --- SEU EFEITO DE IMAGEM ORIGINAL RESTAURADO AQUI --- */}
                      <div className="h-3/5 relative overflow-hidden">
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
                            className="relative z-10 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-grow text-center items-center justify-center">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {product.name}
                        </h3>
                        <p className="text-base text-primary dark:text-secundary font-semibold">
                          {product.title}
                        </p>
                        <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {getIgrejaLabel(product.role)}
                        </span>
                      </div>

                      {podeEditarRemover(product.role) && (
                        <div className="absolute top-2 left-2 flex gap-2 z-10">
                          <button
                            onClick={() => {
                              setOpenEdit(product.id)
                              setSelectedProduct(product)
                            }}
                            className="p-2 rounded-full bg-white/80 dark:bg-slate-700/80 hover:bg-white text-blue-600 shadow-md transition"
                            title="Editar"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                              <path
                                fillRule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              setShowModal(product.id)
                              setSelectedProduct(product)
                            }}
                            className="p-2 rounded-full bg-white/80 dark:bg-slate-700/80 hover:bg-white text-red-600 shadow-md transition"
                            title="Remover"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </section>

      {showModal && selectedProduct && (
        <RemoveMinisterio id={selectedProduct.id} />
      )}
      {openEdit && selectedProduct && (
        <EditMinisterio
          nome={selectedProduct.name}
          titulo={selectedProduct.title}
          img={selectedProduct.coverUrl}
          lugar={selectedProduct.local}
          id={selectedProduct.id}
          setOpenEdit={setOpenEdit}
          role={selectedProduct.role}
        />
      )}
    </>
  )
}
