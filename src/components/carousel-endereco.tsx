'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useIgrejas } from '@/hooks/useIgrejas'
import SkeletonNew from './skeleton/SkeletonNew'
import EnderecosHeader from './enderecos-header'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Link from 'next/link'

export default function CarouselEndereco() {
  const { igrejas, loading } = useIgrejas({ showInactive: false })

  const openGoogleMaps = (endereco: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`
    window.open(url, '_blank')
  }

  const settings = {
    dots: true,
    infinite: igrejas.length > 2,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: igrejas.length > 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: igrejas.length > 1,
        },
      },
    ],
  }

  return (
    <>
      <section className="text-textprimary flex flex-col items-center py-4 justify-center overflow-hidden w-full">
        <EnderecosHeader />

        <div className="w-full lg:max-w-6xl px-8 pb-4">
          {loading ? (
            <div className="w-full mt-5">
              <Slider {...settings}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-2">
                    <SkeletonNew />
                  </div>
                ))}
              </Slider>
            </div>
          ) : igrejas.length === 0 ? (
            <div className="flex flex-col h-40 my-5 border border-dashed border-zinc-300 dark:border-zinc-700 p-5 rounded-lg justify-center items-center text-gray-500">
              <p>Nenhuma igreja cadastrada.</p>
            </div>
          ) : (
            <div className="w-full mt-5">
              <Slider {...settings} className="w-full">
                {igrejas.map((igreja) => {
                  return (
                    <div key={igreja.id} className="p-2">
                      <Link href={`/igrejas/${igreja.slug}`}>
                        <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-auto min-h-[450px] overflow-hidden group relative border-[1px] border-zinc-300 dark:border-zinc-800 cursor-pointer">
                          <div className="h-56 w-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FaMapMarkerAlt className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="px-4">
                                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-2">
                                  {igreja.tipo || 'Filial'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-primary dark:text-secundary mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {igreja.nome}
                            </h3>
                            {igreja.descricao && (
                              <p className="text-base text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                                {igreja.descricao}
                              </p>
                            )}
                            {igreja.endereco && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {igreja.endereco}
                              </p>
                            )}
                            <div className="mt-auto pt-4">
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  if (igreja.endereco) {
                                    openGoogleMaps(igreja.endereco)
                                  }
                                }}
                                className="button w-full"
                              >
                                Ver no Google Maps
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </Slider>
            </div>
          )}
        </div>
        <div className="border-t-[1px] border-zinc-300 dark:border-zinc-800 w-[70%] mx-auto mt-16"></div>
      </section>
    </>
  )
}
