'use client'
import { FaPlus } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Image from 'next/image'
import { New } from '@/data/types/new'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useData, useLocal } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'
import SelectLocal from './SelectLocal'
import { useToken } from '@/hooks/useToken'
import AddNew from './crud/AddNew'
import EditNew from './crud/EditNew'
import RemoveNew from './crud/RemoveNew'
import { Minus } from 'lucide-react'

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
  const [selectedProduct, setSelectedProduct] = useState<New | null>(null)

  useEffect(() => {
    setLoading(true)
    api
      .get(`/news/${local}`)
      .then((response) => {
        setData(response.data)
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
    const month = date.toLocaleString('default', { month: 'short' })
    return `${day} ${month}`
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
      <section className="text-textprimary flex flex-col items-center py-5 mt-5  justify-center overflow-hidden  w-full">
        <h1 className="text-xl font-bold flex">
          <Minus
            size={45}
            strokeWidth={3}
            className="text-secundary dark:text-primary  flex place-self-end"
          />

          <span className="text-primary dark:text-secundary text-2xl">
            Notícias{' '}
          </span>
        </h1>

        {token && (
          <>
            {openNew === false && (
              <button className="button" onClick={() => setOpenNew(true)}>
                Adicionar notícia
              </button>
            )}

            {openNew && (
              <div className="md:min-w-[35%]">
                {' '}
                <AddNew openNew={openNew} setOpenNew={setOpenNew} />
              </div>
            )}
          </>
        )}
        <SelectLocal onChange={handleLocalChange} />
        <div className="flex gap-2 items-center justify-between px-2 w-[80vw] lg:max-w-[1200px] mt-5">
          <h1 className="md:text-2xl w-full font-bold">{titleproducts}</h1>
          <Link
            href={`/noticias`}
            className="font-bold md:text-lg w-full justify-end flex items-center gap-2"
          >
            <span>Ver todos</span> <FaPlus />
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
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-300 dark:border-zinc-700 p-5 rounded-lg justify-center items-center">
              <p>Nenhuma notícia cadastrada.</p>
            </div>
          ) : (
            <Slider {...settings} className="w-[80vw] lg:max-w-[1200px] my-5">
              {data.map((product: New) => {
                if (!page) {
                  setPage(product.page)
                }
                return (
                  <div
                    className={`justify-between relative flex flex-col h-[300px] md:h-[400px] rounded-md border-[1px] border-zinc-400 dark:border-zinc-700 group ${token && 'mb-10'} `}
                    key={product.id}
                  >
                    <div className="h-[100%] relative overflow-hidden">
                      <Link
                        aria-hidden="true"
                        tabIndex={-1}
                        href={`/noticias/${product.page}/${product.id}`}
                        className="group h-full rounded-md overflow-hidden"
                      >
                        <Image
                          src={product.coverUrl}
                          width={500}
                          height={500}
                          alt={product.title}
                          className="group-hover:scale-105 transition-transform duration-500 h-full rounded-md object-cover object-center opacity-90"
                        />
                      </Link>
                    </div>

                    <div className="hidden group-hover:flex flex-col gap-1 absolute bottom-0 rounded-b-md h-[50%] bg-black/80 w-full ">
                      <Link
                        aria-hidden="true"
                        tabIndex={-1}
                        href={`/noticias/${product.page}/${product.id}`}
                        className="text-primary z-30"
                      >
                        <p className="text-center px-1 text-xl text-white font-semibold ">
                          {product.title}
                        </p>
                      </Link>
                      <div className="flex px-2 text-white z-30">
                        {product.content}
                      </div>
                    </div>

                    <Link
                      aria-hidden="true"
                      tabIndex={-1}
                      href={`/noticias/${product.page}/${product.id}`}
                      className="rounded-md text-white bg-primary absolute bottom-5 left-5 text-center px-2 md:text-xl border-[1px] border-secundary z-20"
                    >
                      Ler notícia
                    </Link>

                    <span className="absolute top-3 right-3 text-sm bg-primary rounded-md p-1 text-white border-[1px] border-secundary z-20 flex flex-wrap w-10   justify-center items-center text-center">
                      {formatDate(product.createdAt)}
                    </span>

                    {token && (
                      <div className="flex w-full items-start justify-around text-white py-3 h-[170px]">
                        {openEdit !== product.id ? (
                          <button
                            aria-hidden="true"
                            tabIndex={-1}
                            className="button"
                            onClick={() => {
                              setOpenEdit(product.id)
                              setSelectedProduct(product)
                            }}
                          >
                            Editar
                          </button>
                        ) : null}
                        <RemoveNew id={product.id} />
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
