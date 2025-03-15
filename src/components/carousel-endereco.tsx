'use client'
import { FaPlus, FaMapMarkerAlt } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { Endereco } from '@/data/types/endereco'

import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import SkeletonNew from './skeleton/SkeletonNew'
import { useToken } from '@/hooks/useToken'
import EditEndereco from './crud/EditEndereco'
import RemoveEndereco from './crud/RemoveEndereco'
import AddEndereco from './crud/AddEndereco'
import { Minus } from 'lucide-react'

export default function CarouselEndereco({
  titleproducts,
}: {
  titleproducts: string
}) {
  const [data, setData] = useState<Endereco[]>([])
  const [loading, setLoading] = useState(true)
  const token = useToken()
  const [openEndereco, setOpenEndereco] = useState(false)
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Endereco | null>(null)

  useEffect(() => {
    setLoading(true)
    api
      .get(`/endereco`)
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const formatarEnderecoParaGoogleMaps = (endereco: Endereco) => {
    const { rua, numero, local, cidade, cep } = endereco
    const enderecoFormatado = `${rua},${numero},${local},${cidade},${cep}`
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      enderecoFormatado,
    )}`
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
      <section className="text-textprimary flex flex-col items-center py-4 justify-center overflow-hidden bg-bglight w-full border-[1px] border-zinc-300 dark:border-zinc-800 dark:bg-bgdark">
        <h1 className="text-xl font-bold flex">
          <Minus
            size={45}
            strokeWidth={3}
            className="text-secundary dark:text-primary flex place-self-end"
          />
          <span className="text-primary dark:text-secundary text-2xl">
            Endereços
          </span>
        </h1>

        {token && (
          <>
            {openEndereco === false && (
              <button className="button" onClick={() => setOpenEndereco(true)}>
                Adicionar endereço
              </button>
            )}

            {openEndereco && (
              <div className="md:min-w-[35%]">
                <AddEndereco
                  openEndereco={openEndereco}
                  setOpenEndereco={setOpenEndereco}
                />
              </div>
            )}
          </>
        )}

        <div className="flex gap-2 items-center justify-between px-2 w-[80vw] lg:max-w-[1200px] mt-5">
          <h1 className="md:text-2xl w-full font-bold">{titleproducts}</h1>
          <Link
            href={`/enderecos`}
            className="font-bold md:text-lg w-full justify-end flex items-center gap-2"
          >
            <span>Ver todos</span> <FaPlus />
          </Link>
        </div>

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
              <p>Nenhum endereço cadastrado.</p>
            </div>
          ) : (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 mx-10 gap-2"
            >
              {data.map((product: Endereco) => {
                const googleMapsLink = formatarEnderecoParaGoogleMaps(product)

                return (
                  <div
                    className="justify-between flex flex-col h-[300px] md:h-[400px] rounded-md border-[1px] border-zinc-400 dark:border-zinc-700"
                    key={product.id}
                  >
                    <div className="border-b-[3px] border-primary px-2 dark:border-secundary flex text-xl font-bold justify-around w-full h-[50%] py-2 flex-col items-center">
                      <h1>{product.local}</h1>
                      <h2 className="flex items-center font-semibold text-gray-900 dark:text-white">
                        {product.rua}, {product.numero}, {product.cidade}
                      </h2>
                      <span className="font-normal ">CEP: {product.cep}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center  h-[50%]">
                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
                      >
                        <FaMapMarkerAlt className="text-4xl text-primary dark:text-secundary" />
                        <span className="text-sm ">Ver no Google Maps</span>
                      </a>
                      {token && (
                        <div className="mb-1 flex w-full flex-1 items-end justify-around text-white">
                          {openEdit !== product.id ? (
                            <button
                              className="button"
                              onClick={() => {
                                setOpenEdit(product.id)
                                setSelectedProduct(product)
                              }}
                            >
                              Editar
                            </button>
                          ) : null}
                          <RemoveEndereco id={product.id} />
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
        <EditEndereco
          localInitial={selectedProduct.local}
          ruaInitial={selectedProduct.rua}
          cepInitial={selectedProduct.cep}
          id={selectedProduct.id}
          numeroInitial={selectedProduct.numero}
          cidadeInitial={selectedProduct.cidade}
          setOpenEdit={setOpenEdit}
        />
      )}
    </>
  )
}
