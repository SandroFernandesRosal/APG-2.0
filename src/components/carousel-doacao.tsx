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

  const podeGerenciar = token?.role === 'ADMIN' || token?.role === 'SUPERADMIN'

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
      <section className="text-textprimary flex flex-col items-center py-4 justify-center overflow-hidden w-full ">
        <DoacaoHeader />

        {podeGerenciar && (
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
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-300 dark:border-zinc-800 p-5 rounded-lg justify-center items-center">
              <p>Nenhuma igreja cadastrada.</p>
            </div>
          ) : (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 mx-10 gap-2"
            >
              {data.map((product: Doacao) => (
                <div
                  key={product.id}
                  className="relative flex flex-col justify-between bg-gradient-to-br from-primary/10 via-white to-secundary/10 dark:from-bgdark dark:via-slate-800 dark:to-bgdarksecundary rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 min-h-[420px] max-w-xs w-full mx-auto p-0 overflow-hidden group transition-all"
                >
                  {/* Botões flutuantes no canto superior direito */}
                  {podeGerenciar && (
                    <div className="absolute top-3 right-3 flex gap-2 z-20">
                      <button
                        onClick={() => {
                          setOpenEdit(product.id)
                          setSelectedProduct(product)
                        }}
                        className="p-2 rounded-full bg-white/90 dark:bg-slate-700/80 hover:bg-primary/10 text-blue-600 shadow-md transition"
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
                        className="p-2 rounded-full bg-white/90 dark:bg-slate-700/80 hover:bg-red-100 text-red-600 shadow-md transition"
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

                  {/* Badge da igreja */}
                  <div className="flex items-center gap-2 mt-6 mb-2 px-6">
                    <Church className="w-7 h-7 text-primary dark:text-secundary" />
                    <span className="bg-primary/90 dark:bg-secundary/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {product.local}
                    </span>
                  </div>

                  {/* Dados bancários */}
                  <div className="flex flex-col gap-2 px-6">
                    <div className="flex items-center gap-2 text-base">
                      <Landmark className="w-5 h-5 text-primary dark:text-secundary" />
                      <span className="font-semibold">Banco:</span>
                      <span>{product.banco}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base">
                      <CreditCard className="w-5 h-5 text-primary dark:text-secundary" />
                      <span className="font-semibold">Conta:</span>
                      <span>{product.conta}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base">
                      <BadgeCent className="w-5 h-5 text-primary dark:text-secundary" />
                      <span className="font-semibold">Agência:</span>
                      <span>{product.agencia}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base">
                      <span className="font-semibold">Titular:</span>
                      <span>{product.nomebanco}</span>
                    </div>
                  </div>

                  {/* PIX destacado */}
                  <div className="flex flex-col items-center justify-center bg-gradient-to-r from-primary/10 via-white to-secundary/10 dark:from-bgdarksecundary dark:via-slate-800 dark:to-bgdark p-4 mt-4 rounded-b-2xl">
                    <span className="font-bold flex items-center gap-2 text-lg text-primary dark:text-secundary mb-1">
                      <KeyRound className="w-6 h-6" /> Chave PIX
                    </span>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="break-all font-mono text-base text-gray-800 dark:text-gray-100">
                        {product.pix}
                      </span>
                      <button
                        onClick={() => handleCopy(product.pix, product.id)}
                        className="p-1 hover:bg-primary/20 dark:hover:bg-secundary/20 rounded-md transition"
                        title="Copiar PIX"
                      >
                        <Copy className="w-5 h-5 text-primary dark:text-secundary" />
                      </button>
                    </div>
                    {copiedId === product.id && (
                      <span className="text-xs text-green-500 transition-all">
                        PIX copiado!
                      </span>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {product.nomepix}
                    </span>
                  </div>

                  {/* Mensagem de agradecimento */}
                  <div className="absolute bottom-3 right-4 text-xs text-gray-400">
                    Obrigado por contribuir!
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
