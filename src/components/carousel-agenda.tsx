'use client'
import { FaArrowRight, FaPlus } from 'react-icons/fa'
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
import { Clock, MapPin, Calendar } from 'lucide-react'

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
  }, [setDataAgenda])

  const handleLocalChange = (newLocal: string) => {
    setLocalLoading(true)
    setLocal(newLocal)
  }

  // Buscar o ID da igreja baseado no slug
  const [currentIgreja, setCurrentIgreja] = useState<{
    id: string
    nome?: string
  } | null>(null)

  const podeAdicionar =
    token &&
    (token.role === 'SUPERADMIN' ||
      (token.role === 'ADMIN' && token.igrejaId === currentIgreja?.id))

  useEffect(() => {
    const fetchIgreja = async () => {
      try {
        const response = await fetch(`/api/igrejas/slug/${local}`)
        if (response.ok) {
          const igreja = await response.json()
          setCurrentIgreja(igreja)
        }
      } catch (error) {
        console.error('Erro ao buscar igreja:', error)
      } finally {
        setLocalLoading(false) // Adicionar aqui para parar o loading
      }
    }
    fetchIgreja()
  }, [local])

  const filteredAgenda = currentIgreja
    ? dataAgenda.filter((item: Agenda) => item.igrejaId === currentIgreja.id)
    : []

  // Função para buscar nome da igreja sem fazer API calls extras
  const getIgrejaNameById = (igrejaId: string | null) => {
    if (!igrejaId) return 'Igreja não encontrada'
    if (currentIgreja && igrejaId === currentIgreja.id) {
      return currentIgreja.nome || 'Igreja não encontrada'
    }
    return 'Igreja não encontrada'
  }

  const podeEditarRemover = (item: Agenda) => {
    if (!token) return false
    if (token.role === 'SUPERADMIN') return true
    if (token.role === 'ADMIN' && token.igrejaId === item.igrejaId) return true
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
              <button
                className="flex items-center gap-2 px-6 py-3 bg-primary dark:bg-gray-600 text-white font-semibold rounded-lg hover:bg-primary/90 dark:hover:bg-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() => setOpenAgenda(true)}
              >
                <FaPlus className="text-sm" />
                Adicionar evento
              </button>
            ) : (
              <div className="w-full max-w-2xl">
                {' '}
                <AddAgenda setOpenAgenda={setOpenAgenda} />{' '}
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
                  const dataBR = new Date(product.day).toLocaleDateString(
                    'pt-BR',
                  )
                  return (
                    <div key={product.id} className="p-3">
                      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex min-h-[450px] overflow-hidden group relative flex-col border-[1px] border-zinc-300 dark:border-zinc-800">
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

                        {/* Header com data destacada */}
                        <div className="relative h-40 bg-gradient-to-br from-primary via-primary/95 to-primary/90 dark:from-secundary dark:via-secundary/95 dark:to-secundary/90 overflow-hidden">
                          {/* Padrão decorativo sutil */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                          </div>

                          {/* Padrão de grid de calendário */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-1/4 left-0 right-0 h-px bg-white"></div>
                            <div className="absolute top-2/4 left-0 right-0 h-px bg-white"></div>
                            <div className="absolute top-3/4 left-0 right-0 h-px bg-white"></div>
                            <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white"></div>
                            <div className="absolute top-0 bottom-0 left-2/4 w-px bg-white"></div>
                            <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white"></div>
                          </div>

                          {/* Linha decorativa no topo */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                          {/* Ícone de calendário decorativo */}
                          <div className="absolute top-3 right-3 opacity-20">
                            <Calendar className="w-8 h-8 text-white" />
                          </div>

                          {/* Conteúdo da data */}
                          <div className="relative h-full flex flex-col items-center justify-center px-4">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-5xl font-extrabold text-white leading-none drop-shadow-lg">
                                {dataBR.split('/')[0]}
                              </span>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-white/95 uppercase tracking-wider leading-tight">
                                  {new Date(product.day).toLocaleDateString(
                                    'pt-BR',
                                    { month: 'short' },
                                  )}
                                </span>
                                <span className="text-xs text-white/80 font-medium mt-0.5">
                                  {dataBR.split('/')[2]}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Conteúdo principal */}
                        <div className="p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-900/50">
                          {/* Título do evento */}
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-primary dark:group-hover:text-secundary transition-colors">
                              {product.name}
                            </h3>
                          </div>

                          {/* Informações do evento */}
                          <div className="space-y-3 mt-auto">
                            {/* Horário */}
                            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 transition-colors">
                              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-sm">
                                <Clock className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                {product.hour}
                              </span>
                            </div>

                            {/* Localização */}
                            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-green-100 dark:bg-green-950/30 border border-green-100 dark:border-green-900/30 transition-colors">
                              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 flex items-center justify-center shadow-sm">
                                <MapPin className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-base font-semibold text-gray-700 dark:text-gray-200 truncate flex-1">
                                {getIgrejaNameById(product.igrejaId)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          )}
        </div>
        <div className="border-t-[1px] border-zinc-300 dark:border-zinc-800 w-[70%] mx-auto mt-16"></div>
      </section>

      {showModal && selectedProduct && <RemoveAgenda id={selectedProduct.id} />}
      {openEdit && selectedProduct && (
        <EditAgenda
          id={selectedProduct.id}
          title={selectedProduct.name}
          hora={selectedProduct.hour}
          dia={selectedProduct.day}
          setOpenEdit={setOpenEdit}
          igrejaId={selectedProduct.igrejaId}
        />
      )}
    </>
  )
}
