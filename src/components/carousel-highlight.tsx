'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Image from 'next/image'
import { New } from '@/data/types/new'
import { useEffect, useState } from 'react'
import { useData, useLocal } from '@/store/useStore'
import { useIgrejas } from '@/hooks/useIgrejas'
import SkeletonHighlight from './skeleton/SkeletonHighlight'
import { FaCameraRetro } from 'react-icons/fa6'

export default function CarouselHighlight() {
  const { data, setData } = useData()
  const { local } = useLocal()
  const { igrejas } = useIgrejas()
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, setSliderRef] = useState<Slider | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/news`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar dados')
        return res.json()
      })
      .then((data) => {
        setData(data)
        setLoading(false)
        // Iniciar progresso quando os dados carregarem
        if (data.length > 0) {
          setProgress(0)
        }
      })
      .catch((err) => {
        console.error('Erro na requisição:', err)
        setLoading(false)
      })
  }, [setData, local])

  // Encontrar igreja pelo slug
  const currentIgreja = igrejas.find((igreja) => igreja.slug === local)

  const highlightedNews = data
    .filter(
      (item: New) =>
        item.destaque === true && item.igrejaId === currentIgreja?.id,
    )
    .slice(0, 8)

  // Reset progress quando o slide muda
  useEffect(() => {
    if (highlightedNews.length > 1) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 100 / 50 // 5000ms / 100 = 50 intervalos de 100ms
          if (next >= 100) {
            return 100
          }
          return next
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [currentSlide, highlightedNews.length])

  const settings = {
    dots: false,
    infinite: highlightedNews.length > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: highlightedNews.length > 1,
    autoplaySpeed: 5000,
    initialSlide: 0,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next)
      setProgress(0)
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: highlightedNews.length > 1,
          dots: false,
          fade: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: highlightedNews.length > 1,
          dots: false,
          fade: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: highlightedNews.length > 1,
          dots: false,
          fade: true,
          arrows: false,
        },
      },
    ],
  }

  const goToSlide = (index: number) => {
    if (sliderRef) {
      sliderRef.slickGoTo(index)
      setCurrentSlide(index)
    }
  }

  // Função para truncar texto
  const truncateText = (text: string, maxLength: number = 150) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  return (
    <section className="highligt text-textprimary flex flex-col items-center justify-center w-full relative">
      <div className="w-full">
        {loading ? (
          <SkeletonHighlight />
        ) : highlightedNews.length === 0 ? (
          <div className="flex flex-col overflow-hidden border-[1px] w-full h-[400px] p-5 justify-center items-center">
            <p>Nenhuma notícia cadastrada.</p>
          </div>
        ) : (
          <>
            {/* Carousel Principal */}
            <Slider
              {...settings}
              className="h-full w-full"
              ref={(slider) => setSliderRef(slider)}
            >
              {highlightedNews.map((item: New) => (
                <div
                  className="flex flex-col h-full place-items-center overflow-hidden"
                  key={item.id}
                >
                  <Link
                    aria-hidden="true"
                    tabIndex={-1}
                    href={`/noticias/${currentIgreja?.slug || 'igreja'}/${item.url}`}
                    className="group relative w-full h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden block"
                  >
                    {item.coverUrl ? (
                      <>
                        {/* Imagem principal full width com zoom automático */}
                        <Image
                          src={item.coverUrl}
                          fill
                          alt={item.title}
                          priority
                          quality={100}
                          className="object-cover object-center animate-slow-zoom"
                          sizes="100vw"
                          style={{
                            objectPosition: 'center',
                          }}
                        />

                        {/* Overlay gradiente mais claro para legibilidade do texto */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />

                        {/* Conteúdo sobreposto */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 z-10">
                          <div className="max-w-4xl mb-4">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                              {item.title}
                            </h2>
                            {item.content && (
                              <p className="text-sm md:text-base lg:text-lg text-gray-200 mb-4 line-clamp-2 md:line-clamp-3 drop-shadow-md">
                                {truncateText(item.content, 200)}
                              </p>
                            )}
                            <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm">
                              <span className="bg-primary/80 dark:bg-secundary/80 px-3 py-1 rounded-full font-semibold">
                                Ler mais →
                              </span>
                            </div>
                          </div>

                          {/* Thumbnails DENTRO do carousel, na parte inferior */}
                          {highlightedNews.length > 1 && (
                            <div className="w-full pt-4">
                              <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide justify-center">
                                {highlightedNews.map(
                                  (thumbItem: New, thumbIndex: number) => (
                                    <div
                                      key={thumbItem.id}
                                      className="relative flex flex-col items-center w-16 md:w-24"
                                    >
                                      {/* Barra de progresso em cima da thumbnail - SEMPRE RESERVA O ESPAÇO */}
                                      <div className="w-full h-[4px] md:h-[5px] overflow-hidden">
                                        {currentSlide === thumbIndex ? (
                                          <>
                                            <div className="w-full h-full bg-black/60">
                                              <div
                                                className="h-full bg-primary dark:bg-secundary transition-all duration-100 ease-linear"
                                                style={{
                                                  width: `${Math.max(progress, 0)}%`,
                                                }}
                                              />
                                            </div>
                                          </>
                                        ) : null}
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          goToSlide(thumbIndex)
                                          setProgress(0)
                                        }}
                                        className={`relative flex-shrink-0 w-full aspect-square overflow-hidden transition-opacity duration-300 ${
                                          currentSlide === thumbIndex
                                            ? 'opacity-100'
                                            : 'opacity-70 hover:opacity-100'
                                        }`}
                                      >
                                        {thumbItem.coverUrl ? (
                                          <Image
                                            src={thumbItem.coverUrl}
                                            fill
                                            alt={thumbItem.title}
                                            className="object-cover"
                                            sizes="(max-width: 768px) 64px, 96px"
                                          />
                                        ) : thumbItem.videoUrl ? (
                                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secundary/20 flex items-center justify-center">
                                            <svg
                                              className="w-4 h-4 md:w-6 md:h-6 text-white"
                                              fill="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path d="M8 5v14l11-7z" />
                                            </svg>
                                          </div>
                                        ) : (
                                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secundary/20 flex items-center justify-center">
                                            <FaCameraRetro className="text-sm md:text-lg text-primary/50 dark:text-secundary/50" />
                                          </div>
                                        )}
                                        {currentSlide !== thumbIndex && (
                                          <div className="absolute inset-0 bg-black/50" />
                                        )}
                                      </button>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    ) : item.videoUrl ? (
                      <div className="w-full h-full relative">
                        <video
                          src={item.videoUrl}
                          className="absolute inset-0 w-full h-full object-cover object-center animate-slow-zoom"
                          muted
                          autoPlay
                          loop
                          playsInline
                          style={{
                            objectPosition: 'center',
                          }}
                        />
                        {/* Overlay gradiente mais claro */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />

                        {/* Conteúdo sobreposto */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 z-10">
                          <div className="max-w-4xl mb-4">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                              {item.title}
                            </h2>
                            {item.content && (
                              <p className="text-sm md:text-base lg:text-lg text-gray-200 mb-4 line-clamp-2 md:line-clamp-3 drop-shadow-md">
                                {truncateText(item.content, 200)}
                              </p>
                            )}
                            <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm">
                              <span className="bg-primary/80 dark:bg-secundary/80 px-3 py-1 rounded-full font-semibold">
                                Assistir →
                              </span>
                            </div>
                          </div>

                          {/* Thumbnails DENTRO do carousel, na parte inferior */}
                          {highlightedNews.length > 1 && (
                            <div className="w-full pt-4">
                              <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide justify-center">
                                {highlightedNews.map(
                                  (thumbItem: New, thumbIndex: number) => (
                                    <div
                                      key={thumbItem.id}
                                      className="relative flex flex-col items-center w-16 md:w-24"
                                    >
                                      {/* Barra de progresso em cima da thumbnail - SEMPRE RESERVA O ESPAÇO */}
                                      <div className="w-full h-[4px] md:h-[5px] overflow-hidden">
                                        {currentSlide === thumbIndex ? (
                                          <>
                                            <div className="w-full h-full bg-black/60">
                                              <div
                                                className="h-full bg-primary dark:bg-secundary transition-all duration-100 ease-linear"
                                                style={{
                                                  width: `${Math.max(progress, 0)}%`,
                                                }}
                                              />
                                            </div>
                                          </>
                                        ) : null}
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          goToSlide(thumbIndex)
                                          setProgress(0)
                                        }}
                                        className={`relative flex-shrink-0 w-full aspect-square overflow-hidden transition-opacity duration-300 ${
                                          currentSlide === thumbIndex
                                            ? 'opacity-100'
                                            : 'opacity-70 hover:opacity-100'
                                        }`}
                                      >
                                        {thumbItem.coverUrl ? (
                                          <Image
                                            src={thumbItem.coverUrl}
                                            fill
                                            alt={thumbItem.title}
                                            className="object-cover"
                                            sizes="(max-width: 768px) 64px, 96px"
                                          />
                                        ) : thumbItem.videoUrl ? (
                                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secundary/20 flex items-center justify-center">
                                            <svg
                                              className="w-4 h-4 md:w-6 md:h-6 text-white"
                                              fill="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path d="M8 5v14l11-7z" />
                                            </svg>
                                          </div>
                                        ) : (
                                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secundary/20 flex items-center justify-center">
                                            <FaCameraRetro className="text-sm md:text-lg text-primary/50 dark:text-secundary/50" />
                                          </div>
                                        )}
                                        {currentSlide !== thumbIndex && (
                                          <div className="absolute inset-0 bg-black/50" />
                                        )}
                                      </button>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Ícone de play centralizado */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/60 backdrop-blur-sm rounded-full p-4 md:p-6 border-2 border-white/30">
                            <svg
                              className="w-8 h-8 md:w-12 md:h-12 text-white ml-1"
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
                        <FaCameraRetro className="text-6xl text-primary/50 dark:text-secundary/50" />
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </Slider>
          </>
        )}
      </div>
    </section>
  )
}
