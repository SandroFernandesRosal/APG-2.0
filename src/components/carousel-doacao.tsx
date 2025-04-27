'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useShowModal } from '@/store/useStore'
import { Doacao } from '@/data/types/doacao'
import RemoveDoacao from './crud/RemoveDoacao'
import AddDoacao from './crud/AddDoacao'
import { useEffect, useState } from 'react'
import EditDoacao from './crud/EditDoacao'
import SkeletonNew from './skeleton/SkeletonNew'
import { useToken } from '@/hooks/useToken'
import DoacaoHeader from './doacao-header'
import {
  Church,
  CreditCard,
  Landmark,
  BadgeCent,
  Copy,
  KeyRound,
} from 'lucide-react'

export default function CarouselDoacao() {
  const [data, setData] = useState<Doacao[]>([])
  const [loading, setLoading] = useState(true)
  const [openDoacao, setOpenDoacao] = useState(false)
  const token = useToken()
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Doacao | null>(null)
  const { showModal, setShowModal } = useShowModal()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchDoacoes = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/doacao')
        if (!response.ok) {
          throw new Error('Falha ao carregar doações')
        }
        const doacoes = await response.json()
        setData(doacoes)
      } catch (error) {
        console.error('Erro ao buscar doações:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDoacoes()
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

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)

      setTimeout(() => {
        setCopiedId(null)
      }, 2000)
    } catch (err) {
      console.error('Erro ao copiar PIX:', err)
    }
  }

  return (
    <>
      <section className="text-textprimary flex flex-col items-center py-4 justify-center overflow-hidden w-full border-b-[1px] border-zinc-300 dark:border-zinc-800">
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
              className="w-[80vw] lg:max-w-[1200px] my-5 mx-10 gap-2"
            >
              {data.map((product: Doacao) => (
                <div
                  className="flex flex-col justify-between h-[400px] rounded-lg  border-[1px] border-zinc-300 dark:border-zinc-700  transition-all"
                  key={product.id}
                >
                  <div className=" flex flex-col  justify-center  gap-2 h-[50%]  w-fit place-self-center">
                    <h1 className="font-bold text-lg flex items-center gap-2">
                      <Church className="w-5 h-5" />
                      {product.local}
                    </h1>
                    <span className="flex items-center gap-2 ">
                      <Landmark className="w-4 h-4" />
                      {product.banco}
                    </span>
                    <span className="flex items-center gap-2 ">
                      <CreditCard className="w-4 h-4" />
                      Conta: {product.conta}
                    </span>
                    <span className="flex items-center gap-2 ">
                      <BadgeCent className="w-4 h-4" />
                      Agência: {product.agencia}
                    </span>
                    <span>{product.nomebanco}</span>
                  </div>

                  <div className="border-b-[1px] border-zinc-300 dark:border-zinc-700" />

                  <div className="flex flex-col justify-center h-[50%] gap-2  w-fit place-self-center">
                    <span className="font-semibold text-center flex items-center justify-center gap-2 text-lg">
                      <KeyRound className="w-4 h-4" />
                      Chave PIX:
                    </span>
                    <div className="flex items-center gap-2">
                      <h1 className="break-all">{product.pix}</h1>
                      <button
                        onClick={() => handleCopy(product.pix, product.id)}
                        className="p-1 hover:bg-primary/20 dark:hover:bg-secundary/20 rounded-md transition"
                      >
                        <Copy className="w-4 h-4 text-primary dark:text-secundary" />
                      </button>
                    </div>
                    {copiedId === product.id && (
                      <span className="text-xs text-green-500 transition-all">
                        PIX copiado!
                      </span>
                    )}
                    <h2>{product.nomepix}</h2>

                    {token && (
                      <div className="flex w-full mt-4 gap-2 justify-around">
                        {openEdit !== product.id && (
                          <button
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
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      {showModal && selectedProduct && <RemoveDoacao id={selectedProduct.id} />}
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
