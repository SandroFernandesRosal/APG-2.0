'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Doacao } from '@/data/types/doacao'
import RemoveDoacao from './crud/RemoveDoacao'
import AddDoacao from './crud/AddDoacao'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import EditDoacao from './crud/EditDoacao'
import SkeletonNew from './skeleton/SkeletonNew'
import { useToken } from '@/hooks/useToken'

import DoacaoHeader from './doacao-header'

export default function CarouselDoacao() {
  const [data, setData] = useState<Doacao[]>([])
  const [loading, setLoading] = useState(true)
  const [openDoacao, setOpenDoacao] = useState(false)
  const token = useToken()
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Doacao | null>(null)

  useEffect(() => {
    setLoading(true)
    api
      .get(`/doacao`)
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

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
      <section className="text-textprimary flex flex-col items-center py-4 justify-center overflow-hidden  w-full border-b-[1px] border-zinc-300 dark:border-zinc-800   ">
        <DoacaoHeader />

        {token && (
          <>
            {openDoacao === false && (
              <button className="button" onClick={() => setOpenDoacao(true)}>
                Adicionar igreja
              </button>
            )}

            {openDoacao && (
              <div className="md:min-w-[35%]">
                {' '}
                <AddDoacao
                  openDoacao={openDoacao}
                  setOpenDoacao={setOpenDoacao}
                />
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
          ) : data.length === 0 ? (
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-400 dark:border-zinc-700 p-5 rounded-lg justify-center items-center">
              <p>Nenhuma igreja cadastrada.</p>
            </div>
          ) : (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 mx-10 gap-2 "
            >
              {data.map((product: Doacao) => {
                return (
                  <div
                    className="justify-between flex flex-col h-[400px] rounded-md border-[1px] border-zinc-400 dark:border-zinc-700"
                    key={product.id}
                  >
                    <div className="border-b-[3px] border-primary dark:border-secundary  flex text-xl justify-around w-full h-[50%]  py-1 flex-col items-center">
                      <h1 className="font-bold ">{product.local}</h1>{' '}
                      <span className=" flex items-center   text-gray-900 dark:text-white">
                        {product.banco}
                      </span>
                      <span>C: {product.conta}</span>
                      <span>Ag: {product.agencia}</span>
                      <span>{product.nomebanco}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center h-[50%]">
                      <span>Chave pix:</span>
                      <h1>{product.pix}</h1>
                      <h2>{product.nomepix}</h2>

                      {token && (
                        <div className=" mb-1 flex w-full flex-1 items-end justify-around text-white">
                          {openEdit !== product.id ? (
                            <button
                              className="button !mb-0"
                              onClick={() => {
                                setOpenEdit(product.id)
                                setSelectedProduct(product)
                              }}
                            >
                              Editar
                            </button>
                          ) : null}
                          <RemoveDoacao id={product.id} />
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
        <EditDoacao
          localInitial={selectedProduct.local}
          bancoInitial={selectedProduct.banco}
          contaInitial={selectedProduct.conta}
          agenciaInitial={selectedProduct.agencia}
          nomebancoInitial={selectedProduct.nomebanco}
          pixInitial={selectedProduct.pix}
          nomepixInitial={selectedProduct.nomepix}
          id={selectedProduct.id}
          setOpenEdit={setOpenEdit}
        />
      )}
    </>
  )
}
