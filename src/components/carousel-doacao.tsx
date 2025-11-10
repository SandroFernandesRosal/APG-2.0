'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useIgrejas } from '@/hooks/useIgrejas'
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
import { FaPlus } from 'react-icons/fa6'
import AddDoacao from './crud/AddDoacao'
import { useState } from 'react'

export default function CarouselDoacao() {
  const { igrejas, loading } = useIgrejas({ showInactive: false })
  const [openDoacao, setOpenDoacao] = useState(false)
  const token = useToken()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const podeGerenciar = token?.role === 'ADMIN' || token?.role === 'SUPERADMIN'

  const settings = {
    dots: true,
    infinite: igrejas.length > 2,
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
          infinite: igrejas.length > 2,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: igrejas.length > 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: igrejas.length > 1,
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
              <button
                className="flex items-center gap-2 px-6 py-3 bg-primary dark:bg-gray-600 text-white font-semibold rounded-lg hover:bg-primary/90 dark:hover:bg-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
                onClick={() => setOpenDoacao(true)}
              >
                <FaPlus className="text-sm" />
                Configurar Doações
              </button>
            )}
            {openDoacao && (
              <div className="md:min-w-[35%]">
                <AddDoacao setOpenDoacao={setOpenDoacao} />
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
          ) : igrejas.length === 0 ? (
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-300 dark:border-zinc-800 p-5 rounded-lg justify-center items-center">
              <p>Nenhuma igreja cadastrada.</p>
            </div>
          ) : (
            <div className="w-full lg:max-w-6xl px-8 mb-4">
              <Slider {...settings} className="w-full">
                {igrejas.map((igreja) => (
                  <div
                    key={igreja.id}
                    className="relative flex flex-col justify-between bg-gradient-to-br from-primary/10 via-white to-secundary/10 dark:from-bgdark dark:via-slate-800 dark:to-bgdarksecundary rounded-2xl shadow-lg border border-zinc-300 dark:border-zinc-800 min-h-[420px] w-full max-w-[320px] mx-auto p-0 overflow-hidden group transition-all"
                  >
                    <div className="flex items-center gap-2 mt-6 mb-2 px-6">
                      <Church className="w-7 h-7 text-primary dark:text-secundary" />
                      <span className="bg-primary/90 dark:bg-secundary/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        {igreja.nome}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 px-6">
                      <div className="flex items-center gap-2 text-base">
                        <Landmark className="w-5 h-5 text-primary dark:text-secundary" />
                        <span className="font-semibold">Banco:</span>
                        <span>{igreja.banco || 'Não informado'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base">
                        <CreditCard className="w-5 h-5 text-primary dark:text-secundary" />
                        <span className="font-semibold">Conta:</span>
                        <span>{igreja.conta || 'Não informado'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base">
                        <BadgeCent className="w-5 h-5 text-primary dark:text-secundary" />
                        <span className="font-semibold">Agência:</span>
                        <span>{igreja.agencia || 'Não informado'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base">
                        <span className="font-semibold">Titular:</span>
                        <span>{igreja.nomebanco || 'Não informado'}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-primary/10 via-white to-secundary/10 dark:from-bgdarksecundary dark:via-slate-800 dark:to-bgdark p-4 mt-4 rounded-b-2xl">
                      <span className="font-bold flex items-center gap-2 text-lg text-primary dark:text-secundary mb-1">
                        <KeyRound className="w-6 h-6" /> Chave PIX
                      </span>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="break-all font-mono text-base text-gray-800 dark:text-gray-100">
                          {igreja.pix || 'Não informado'}
                        </span>
                        {igreja.pix && (
                          <button
                            onClick={() => handleCopy(igreja.pix!, igreja.id)}
                            className="p-1 hover:bg-primary/20 dark:hover:bg-secundary/20 rounded-md transition"
                            title="Copiar PIX"
                          >
                            <Copy className="w-5 h-5 text-primary dark:text-secundary" />
                          </button>
                        )}
                      </div>
                      {copiedId === igreja.id && (
                        <span className="text-xs text-green-500 transition-all">
                          PIX copiado!
                        </span>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {igreja.nomepix || 'Não informado'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-4 text-xs text-gray-400">
                      Obrigado por contribuir!
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
        <div className="border-t-[1px] border-zinc-300 dark:border-zinc-800 w-[70%] mx-auto mt-16"></div>
      </section>
    </>
  )
}
