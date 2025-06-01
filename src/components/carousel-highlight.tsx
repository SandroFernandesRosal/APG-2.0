'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Image from 'next/image'
import { New } from '@/data/types/new'
import { useEffect, useState } from 'react'
import { useData, useLocal } from '@/store/useStore'
import SkeletonHighlight from './skeleton/SkeletonHighlight'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const NextArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        right: '10px',
      }}
      onClick={onClick}
    >
      <FaArrowRight style={{ color: 'white', fontSize: '20px' }} />
    </div>
  )
}

const PrevArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
        zIndex: 1,
        left: '10px',
      }}
      onClick={onClick}
    >
      <FaArrowLeft style={{ color: 'white', fontSize: '20px' }} />
    </div>
  )
}

export default function CarouselHighlight() {
  const { data, setData } = useData()
  const { local } = useLocal()
  const [loading, setLoading] = useState(true)

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
      })
      .catch((err) => {
        console.error('Erro na requisição:', err)
        setLoading(false)
      })
  }, [setData, local])

  const highlightedNews = data
    .filter(
      (item: New) =>
        item.destaque === true && item.role === local.toUpperCase(),
    )
    .slice(0, 8)

  const settings = {
    dots: true,
    infinite: highlightedNews.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: highlightedNews.length > 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: highlightedNews.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: highlightedNews.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: highlightedNews.length > 1,
          dots: true,
        },
      },
    ],
  }

  return (
    <section className="highligt text-textprimary flex flex-col items-center mb-5 justify-center w-full">
      <div className="flex w-full gap-3 justify-center">
        {loading ? (
          <SkeletonHighlight />
        ) : highlightedNews.length === 0 ? (
          <div className="flex flex-col overflow-hidden border-[1px] w-full h-[400px] p-5 justify-center items-center">
            <p>Nenhuma notícia cadastrada.</p>
          </div>
        ) : (
          <Slider {...settings} className="h-full w-[100%]">
            {highlightedNews.map((item: New) => (
              <div
                className="flex flex-col h-full place-items-center overflow-hidden"
                key={item.id}
              >
                <Link
                  aria-hidden="true"
                  tabIndex={-1}
                  href={`/noticias/${item.role.toLowerCase()}/${item.url}`}
                  className="group flex justify-center items-center h-[300px] md:h-[500px]  overflow-hidden w-full  relative"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-md scale-110 "
                    style={{ backgroundImage: `url(${item.coverUrl})` }}
                  />
                  <Image
                    src={item.coverUrl}
                    width={1100}
                    height={500}
                    alt={item.title}
                    priority
                    quality={100}
                    className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  )
}
