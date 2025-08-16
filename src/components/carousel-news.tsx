'use client'
import { FaArrowRight, FaCameraRetro } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Image from 'next/image'
import { New } from '@/data/types/new'
import { useEffect, useState } from 'react'
import { useData, useLocal, useShowModal } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'
import SelectLocal from './SelectLocal'
import { useToken } from '@/hooks/useToken'
import AddNew from './crud/AddNew'
import EditNew from './crud/EditNew'
import RemoveNew from './crud/RemoveNew'
import NoticiasHeader from './noticias-header'
import { getIgrejaLabel } from '@/lib/getIgrejaLabel'

export default function CarouselNews({
  titleproducts,
}: {
  titleproducts: string
}) {
  const { data, setData } = useData()
  const { local, setLocal } = useLocal()
  const [loading, setLoading] = useState(true)
  const [localLoading, setLocalLoading] = useState(false)
  const [page, setPage] = useState('')
  const [openNew, setOpenNew] = useState(false)
  const token = useToken()
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const { showModal, setShowModal } = useShowModal()
  const [selectedProduct, setSelectedProduct] = useState<New | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/news`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Erro ao buscar notícias')
        const data = await res.json()
        setData(data)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
        setLocalLoading(false)
      })
  }, [setData, local])

  const handleLocalChange = (newLocal: string) => {
    setLocalLoading(true)
    setLocal(newLocal)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('pt-BR', { month: 'long' })
    const year = date.getFullYear()
    return `${day} de ${month} de ${year}`
  }

  const filteredNews = data.filter(
    (item: New) => item.role === local.toUpperCase(),
  )

  const podeAdicionar =
    token && (token.role === 'SUPERADMIN' || token.role === 'ADMIN')

  const podeEditarRemover = (itemRole: string | undefined) => {
    if (!token?.role) return false
    if (token.role === 'SUPERADMIN') return true
    if (
      token.role === 'ADMIN' &&
      token.ministryRole?.toUpperCase() === local?.toUpperCase() &&
      itemRole?.toUpperCase() === local?.toUpperCase()
    )
      return true
    return false
  }

  const settings = {
    dots: true,
    infinite: filteredNews.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: filteredNews.length > 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: filteredNews.length > 1,
        },
      },
    ],
  }

  return (
    <>
      <section className="text-textprimary flex flex-col items-center py-5 mt-5 justify-center overflow-hidden w-full">
        <NoticiasHeader />
        {podeAdicionar && (
          <div className="my-4">
            {!openNew ? (
              <button className="button" onClick={() => setOpenNew(true)}>
                Adicionar notícia
              </button>
            ) : (
              <div className="w-full max-w-2xl">
                <AddNew openNew={openNew} setOpenNew={setOpenNew} />
              </div>
            )}
          </div>
        )}
        <SelectLocal onChange={handleLocalChange} />
        <div className="flex gap-2 items-center justify-between px-4 w-full lg:max-w-6xl mt-5 text-primary dark:text-secundary">
          <h1 className="text-2xl md:text-3xl font-bold">{titleproducts}</h1>
          <Link
            href={`/noticias`}
            className="font-bold text-base md:text-lg flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span>Ver todas</span> <FaArrowRight />
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
          ) : filteredNews.length === 0 ? (
            <div className="flex flex-col h-40 my-5 border border-dashed border-zinc-300 dark:border-zinc-700 p-5 rounded-lg justify-center items-center text-gray-500">
              <p>Nenhuma notícia encontrada para {getIgrejaLabel(local)}.</p>
            </div>
          ) : (
            <div className="w-full mt-5">
              <Slider {...settings}>
                {filteredNews.map((product: New) => {
                  if (!page) {
                    setPage(product.page)
                  }
                  return (
                    <div key={product.id} className="p-2">
                      <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-[420px] overflow-hidden group relative border-[1px] border-zinc-300 dark:border-zinc-800">
                        <div className="h-48 relative overflow-hidden">
                          {product.coverUrl ? (
                            <Image
                              src={product.coverUrl}
                              alt={product.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : product.videoUrl ? (
                            <div className="w-full h-full relative">
                              <video
                                src={product.videoUrl}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                muted
                                preload="metadata"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/50 rounded-full p-3">
                                  <svg
                                    className="w-8 h-8 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secundary/20 flex items-center justify-center">
                              <FaCameraRetro className="text-4xl text-primary/50 dark:text-secundary/50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <span className="absolute top-2 right-2 bg-primary/80 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {getIgrejaLabel(product.role)}
                          </span>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow line-clamp-3">
                            {product.content}
                          </p>
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                              <span>{formatDate(product.createdAt)}</span>
                              <Link
                                href={`/noticias/${product.role?.toLowerCase()}/${product.url}`}
                                className="font-semibold text-primary dark:text-secundary hover:underline"
                              >
                                Ler mais
                              </Link>
                            </div>
                          </div>
                        </div>

                        {podeEditarRemover(product.role) && (
                          <div className="absolute top-2 left-2 flex gap-2">
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
        <div className="border-t-[1px] border-zinc-300 dark:border-zinc-800 w-[70%] mx-auto mt-16"></div>
      </section>

      {showModal && selectedProduct && <RemoveNew id={selectedProduct.id} />}

      {openEdit && selectedProduct && (
        <EditNew
          id={selectedProduct.id}
          titulo={selectedProduct.title}
          conteudo={selectedProduct.content}
          img={selectedProduct.coverUrl}
          setOpenEdit={setOpenEdit}
          destacar={selectedProduct.destaque}
          role={selectedProduct.role}
        />
      )}
    </>
  )
}
