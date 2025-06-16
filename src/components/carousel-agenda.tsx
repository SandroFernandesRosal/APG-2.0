'use client'
import { FaArrowRight } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { Agenda } from '@/data/types/agenda'
import { useEffect, useState } from 'react'
import { useDataAgenda, useShowModal, useLocal } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'
import SelectLocal from './SelectLocal'
import { useToken } from '@/hooks/useToken'
import AddAgenda from './crud/AddAgenda'
import EditAgenda from './crud/EditAgenda'
import RemoveAgenda from './crud/RemoveAgenda'
import AgendaHeader from './agenda-header'
import { getIgrejaLabel } from '@/lib/getIgrejaLabel'
import { Clock, MapPin } from 'lucide-react'

export default function CarouselAgenda({ title }: { title: string }) {
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
        if (!response.ok) throw new Error('Falha ao carregar agenda')
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

  const podeAdicionar =
    token && (token.role === 'SUPERADMIN' || token.role === 'ADMIN')

  const filteredAgenda = dataAgenda.filter((item: Agenda) => {
    // Sua lógica de filtro original
    if (!token) return item.role?.toUpperCase() === local.toUpperCase()
    if (token.role === 'SUPERADMIN')
      return item.role?.toUpperCase() === local.toUpperCase()
    if (token.role === 'ADMIN')
      return item.role?.toUpperCase() === token.ministryRole?.toUpperCase()
    return item.role?.toUpperCase() === local.toUpperCase()
  })

  const podeEditarRemover = (item: Agenda) => {
    if (!token) return false
    if (token.role === 'SUPERADMIN') return true
    if (token.role === 'ADMIN' && token.ministryRole === item.role) return true
    return false
  }

  const settings = {
    dots: true,
    infinite: filteredAgenda.length > 3,
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
          infinite: filteredAgenda.length > 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: filteredAgenda.length > 1,
        },
      },
    ],
  }

  return (
    <>
      <section className="text-textprimary flex flex-col items-center py-4 justify-center overflow-hidden w-full mb-10">
        <AgendaHeader />
        {podeAdicionar && (
          <div className="my-4">
            {!openAgenda ? (
              <button className="button" onClick={() => setOpenAgenda(true)}>
                {' '}
                Adicionar evento{' '}
              </button>
            ) : (
              <div className="w-full max-w-2xl">
                {' '}
                <AddAgenda
                  openAgenda={openAgenda}
                  setOpenAgenda={setOpenAgenda}
                />{' '}
              </div>
            )}
          </div>
        )}
        <SelectLocal onChange={handleLocalChange} />
        <div className="flex gap-2 items-center justify-between px-4 w-full lg:max-w-6xl mt-5 text-primary dark:text-secundary">
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <Link
            href={`/agenda`}
            className="font-bold text-base md:text-lg flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span>Ver todos</span> <FaArrowRight />
          </Link>
        </div>
        <div className="w-full lg:max-w-6xl px-8 mb-4">
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
          ) : filteredAgenda.length === 0 ? (
            <div className="flex flex-col h-40 my-5 border border-dashed border-zinc-300 dark:border-zinc-700 p-5 rounded-lg justify-center items-center text-gray-500">
              <p>Nenhum evento cadastrado para esta localidade.</p>
            </div>
          ) : (
            <div className="w-full mt-5">
              <Slider {...settings}>
                {filteredAgenda.map((product: Agenda) => {
                  const [dia, mes] = product.day.split(' ')
                  return (
                    <div key={product.id} className="p-3">
                      {/* --- NOVO DESIGN CRIATIVO DO CARTÃO DE AGENDA --- */}
                      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex  min-h-[450px]  overflow-hidden group relative flex-col ">
                        {/* Coluna da Data */}
                        <div className="flex flex-col flex-1 text-center border-r border-gray-200 dark:border-gray-700 w-full bg-bglightsecundary dark:bg-bgdarksecundary h-40">
                          <div className="bg-primary text-white text-sm font-semibold py-1">
                            {mes?.substring(0, 3).toUpperCase()}
                          </div>
                          <div className="flex-grow flex items-center justify-center">
                            <span className="text-xl font-bold text-gray-700 dark:text-gray-200">
                              {dia}
                            </span>
                          </div>
                        </div>

                        {/* Coluna dos Detalhes */}
                        <div className=" p-4 flex flex-col   w-full h-full flex-1 justify-around">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {product.name}
                          </h3>
                          <div className="mt-2 space-y-1  text-gray-500 dark:text-gray-400 text-xl">
                            <p className="flex items-center gap-2">
                              <Clock size={24} />
                              <span>{product.hour}</span>
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin size={24} />
                              <span>{getIgrejaLabel(product.role)}</span>
                            </p>
                          </div>
                        </div>

                        {/* Botões de Admin (flutuantes no canto superior direito) */}
                        {podeEditarRemover(product) && (
                          <div className="absolute top-2 right-2 flex gap-2 z-10">
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
                  )
                })}
              </Slider>
            </div>
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
