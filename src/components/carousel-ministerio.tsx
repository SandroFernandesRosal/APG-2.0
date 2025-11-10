'use client'

import {
  FaArrowRight,
  FaPlus,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
} from 'react-icons/fa'
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
import { useIgrejas } from '@/hooks/useIgrejas'

import EditMinisterio from './crud/EditMinisterio'
import RemoveMinisterio from './crud/RemoveMinisterio'
import MinisterioHeader from './ministerio-header'

export default function CarouselMinisterio({
  titleproducts,
  children,
}: {
  titleproducts: string
  children?: React.ReactNode
}) {
  const { dataMinisterio, setDataMinisterio } = useDataMinisterio()
  const { local, setLocal } = useLocal()
  const { igrejas } = useIgrejas({ showInactive: false })
  const [loading, setLoading] = useState(true)
  const [localLoading, setLocalLoading] = useState(false)

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
        const response = await fetch(`/api/auth/register`, {
          cache: 'no-store',
        })
        if (!response.ok) {
          throw new Error('Erro ao buscar membros')
        }
        const data = await response.json()
        setDataMinisterio(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Erro ao buscar membros:', error)
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

  // Encontrar a igreja pelo slug
  const currentIgreja = igrejas.find((igreja) => igreja.slug === local)

  const filteredMinisterios = dataMinisterio
    .filter((item: Ministerio) => item.cargo && item.cargo.length > 0)
    .filter((item: Ministerio) => item.igrejaId === currentIgreja?.id)

  const podeAdicionar =
    token && (token.role === 'SUPERADMIN' || token.role === 'ADMIN')

  const podeEditarRemover = (item: Ministerio) => {
    if (!token?.role) return false
    if (token.role === 'SUPERADMIN') return true
    if (
      token.role === 'ADMIN' &&
      token.igrejaId?.toUpperCase() === item.igrejaId?.toUpperCase()
    )
      return true

    return false
  }

  const settings = {
    dots: true,
    infinite: filteredMinisterios.length > 2,
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
        <section className="flex flex-col bg-bglight dark:bg-bgdark w-full py-5 ">
          {children}
        </section>
        <MinisterioHeader />
        {podeAdicionar && (
          <Link
            href="/usuarios"
            className="flex items-center gap-2 px-6 py-3 bg-primary dark:bg-gray-600 text-white font-semibold rounded-lg hover:bg-primary/90 dark:hover:bg-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
          >
            <FaPlus className="text-sm" />
            Adicionar líder
          </Link>
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

        <div className="w-full lg:max-w-6xl px-8 pb-8">
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
              <p>
                Nenhum membro cadastrado para {currentIgreja?.nome || local}.
              </p>
            </div>
          ) : (
            <div className="w-full mt-5">
              <Slider {...settings}>
                {filteredMinisterios.map((product: Ministerio) => (
                  <div key={product.id} className="p-2">
                    <div className="relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/60 dark:border-gray-700/60 transition-all duration-500 flex flex-col overflow-hidden group h-[460px]">
                      {/* Background decorativo animado */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secundary/5 dark:from-primary/10 dark:to-secundary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Header com padrão igual ao card de eventos */}
                      <div className="relative h-40 bg-gradient-to-br from-primary via-primary/95 to-primary/90 dark:from-secundary dark:via-secundary/95 dark:to-secundary/90 overflow-hidden">
                        {/* Padrão decorativo sutil */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                        </div>
                      </div>

                      {/* Avatar em destaque */}
                      <div className="relative -mt-20 flex justify-center mb-4 z-10">
                        <div className="relative group/avatar">
                          {/* Borda com gradiente */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secundary rounded-full p-0.5">
                            <div className="w-full h-full bg-white dark:bg-slate-800 rounded-full"></div>
                          </div>
                          {/* Imagem */}
                          <div className="relative">
                            <Image
                              src={product.avatarUrl || '/img/Placeholder.png'}
                              width={130}
                              height={130}
                              alt={product.name || 'Líder'}
                              quality={100}
                              className="relative w-32 h-32 object-cover rounded-full border-4 border-white dark:border-slate-800 group-hover/avatar:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Conteúdo */}
                      <div className="px-5 pb-6 flex flex-col flex-grow text-center relative z-10">
                        {/* Nome */}
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-secundary transition-colors duration-300">
                          {product.name}
                        </h3>

                        {/* Cargo com badges modernos */}
                        <div className="mb-4">
                          {Array.isArray(product.cargo) &&
                          product.cargo.length > 0 ? (
                            <div className="flex flex-wrap gap-2 justify-center">
                              {product.cargo.map((cargo, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-3.5 py-1.5 bg-gradient-to-r from-primary/10 to-secundary/10 dark:from-primary/20 dark:to-secundary/20 text-primary dark:text-secundary font-bold text-xs uppercase tracking-wide rounded-full border border-primary/20 dark:border-secundary/30 shadow-sm backdrop-blur-sm"
                                >
                                  {cargo.replace(/_/g, ' ')}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        {/* Divisor elegante */}
                        <div className="flex items-center justify-center my-4">
                          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                          <div className="mx-2 w-1.5 h-1.5 rounded-full bg-primary/40 dark:bg-secundary/40"></div>
                          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                        </div>

                        {/* Localização */}
                        <div className="mt-auto pt-2">
                          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100/80 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                            <FaMapMarkerAlt className="w-4 h-4 text-primary dark:text-secundary flex-shrink-0" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {igrejas.find(
                                (igreja) => igreja.id === product.igrejaId,
                              )?.nome || 'Igreja não encontrada'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Botões de ação */}
                      {podeEditarRemover(product) && (
                        <div className="absolute top-3 right-3 flex gap-2 z-20">
                          <button
                            onClick={() => {
                              setOpenEdit(product.id)
                              setSelectedProduct(product)
                            }}
                            className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-blue-200/50 dark:border-blue-600/50"
                            title="Editar"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setShowModal(product.id)
                              setSelectedProduct(product)
                            }}
                            className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-600 text-red-600 dark:text-red-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-red-200/50 dark:border-red-600/50"
                            title="Remover"
                          >
                            <FaTrash className="w-4 h-4" />
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
        <div className="border-t-[1px] border-zinc-300 dark:border-zinc-800 w-[70%] mx-auto mt-16"></div>
      </section>

      {showModal && selectedProduct && (
        <RemoveMinisterio id={selectedProduct.id} />
      )}
      {openEdit && selectedProduct && (
        <EditMinisterio
          nome={selectedProduct.name}
          titulo={selectedProduct.cargo}
          img={selectedProduct.avatarUrl || ''}
          lugar={
            igrejas.find((igreja) => igreja.id === selectedProduct.igrejaId)
              ?.nome || 'Sem igreja definida'
          }
          id={selectedProduct.id}
          setOpenEdit={setOpenEdit}
          igrejaId={selectedProduct.igrejaId}
        />
      )}
    </>
  )
}
