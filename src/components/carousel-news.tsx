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
      <section className="text-textprimary flex flex-col items-center py-4 mb-5 justify-center overflow-hidden bg-bglightsecundary w-full border-[1px] border-zinc-300 dark:border-zinc-800 rounded-3xl dark:bg-bgdarksecundary md:w-[90%]">
        <h1 className="text-xl font-bold text-primary dark:text-secundary">
          Notícias
        </h1>
        <h2 className="text-xl mb-5">Fique por dentro das notícias</h2>

        {token && (
          <>
            {openNew === false && (
              <button
                className="rounded-md mb-4 border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   p-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                onClick={() => setOpenNew(true)}
              >
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
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 mx-10 gap-2 "
            >
              {data.map((product: New) => {
                if (!page) {
                  setPage(product.page)
                }
                return (
                  <div
                    className="justify-between flex flex-col h-[300px] md:h-[400px]  rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
                    key={product.id}
                  >
                    <div className="border-b-[3px] border-primary dark:border-secundary h-[50%] pb-2">
                      <Link
                        href={`/noticias/${product.page}/${product.id}`}
                        className="group h-full"
                      >
                        <Image
                          src={product.coverUrl}
                          width={500}
                          height={500}
                          alt={product.title}
                          className="group-hover:scale-105 transition-transform duration-500 p-2 h-full rounded-t-md"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col my-2 min-h-[100px] md:min-h-[70px] gap-2 justify-between">
                      <Link href={`/${product.page}/${product.id}`}>
                        <p className="text-center px-1">{product.title}</p>
                      </Link>
                      <div className="flex flex-wrap justify-evenly px-2 gap-2">
                        {product.content}
                      </div>

                      {token && (
                        <div className=" mb-1 flex w-full flex-1 items-end justify-around text-white">
                          {openEdit !== product.id ? (
                            <button
                              className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
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
