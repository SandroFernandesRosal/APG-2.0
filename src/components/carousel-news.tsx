'use client'
import { FaArrowRight } from 'react-icons/fa'
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
    fetch(`/api/${local}/news`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Erro ao buscar notícias')
        }
        const data = await res.json()
        setData(data)
        setLoading(false)
        setLocalLoading(false)
      })
      .catch((err) => {
        console.log(err)
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
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()
    return `${day} de ${month} de ${year}`
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
      <section className="text-textprimary flex flex-col items-center py-5 mt-5  justify-center overflow-hidden  w-full">
        {token && (
          <>
            {!openNew && (
              <button className="button" onClick={() => setOpenNew(true)}>
                Adicionar notícia
              </button>
            )}
            {openNew && (
              <div className="md:min-w-[35%]">
                <AddNew openNew={openNew} setOpenNew={setOpenNew} />
              </div>
            )}
          </>
        )}
        <SelectLocal onChange={handleLocalChange} />
        <div className="flex gap-2 items-center justify-between px-2 w-[80vw] lg:max-w-[1200px] mt-5 text-primary dark:text-secundary">
          <h1 className="md:text-2xl w-full font-bold">{titleproducts}</h1>
          <Link
            href={`/noticias`}
            className="font-bold md:text-lg w-full justify-end flex items-center gap-2"
          >
            <span>Ver todas</span> <FaArrowRight />
          </Link>
        </div>

        <div className="flex w-full gap-3 justify-center">
          {loading || localLoading ? (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px]  my-5 gap-2 overflow-hidden"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonNew key={index} />
              ))}
            </Slider>
          ) : data.length === 0 ? (
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-300 dark:border-zinc-800 p-5 rounded-lg justify-center items-center">
              <p>Nenhuma notícia cadastrada.</p>
            </div>
          ) : (
            <Slider {...settings} className="w-[80vw] lg:max-w-[1200px] my-5 ">
              {data.map((product: New) => {
                if (!page) {
                  setPage(product.page)
                }
                return (
                  <div
                    className={`justify-between relative flex flex-col h-[400px] border-[1px] border-zinc-300 dark:border-zinc-800 group ${
                      token && 'mb-20 md:mb-24'
                    }`}
                    key={product.id}
                  >
                    <div className="h-[50%] relative overflow-hidden">
                      <Link
                        aria-hidden="true"
                        tabIndex={-1}
                        href={`/noticias/${product.page}/${product.url}`}
                        className="group h-full rounded-md overflow-hidden relative"
                      >
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
                          className="relative z-10 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
                        />
                      </Link>
                    </div>

                    <div className="flex flex-col gap-1 justify-around h-[50%] w-full z-10 mx-2">
                      <Link
                        aria-hidden="true"
                        tabIndex={-1}
                        href={`/noticias/${product.page}/${product.id}`}
                        className="text-primary z-30"
                      >
                        <h1 className="text-lg font-semibold text-primary dark:text-secundary">
                          {product.title}
                        </h1>
                      </Link>
                      <div className="flex text-lg">
                        {product.content.slice(0, 50).concat('...')}
                      </div>
                      <span className="text-sm flex flex-wrap items-center">
                        {formatDate(product.createdAt)}
                      </span>
                      <Link
                        aria-hidden="true"
                        tabIndex={-1}
                        href={`/noticias/${product.page}/${product.url}`}
                        className="button !mb-0 flex items-center justify-center self-center"
                      >
                        Ler notícia
                      </Link>
                    </div>
                    {token && (
                      <div className="flex w-full items-start justify-around text-white py-3">
                        {openEdit !== product.id && (
                          <button
                            aria-hidden="true"
                            tabIndex={-1}
                            className="button !mb-0"
                            onClick={() => {
                              setOpenEdit(product.id)
                              setSelectedProduct(product)
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
                            setShowModal(product.id)
                            setSelectedProduct(product)
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </Slider>
          )}
        </div>
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
        />
      )}
    </>
  )
}
