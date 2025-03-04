'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Image from 'next/image'
import { New } from '@/data/types/new'
import { api } from '@/lib/api'
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
    api
      .get(`/news/${local}`)
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log('Erro na requisição:', err)
        setLoading(false)
      })
  }, [setData, local])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
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
        ) : !data || data.length === 0 ? (
          <div className="flex flex-col overflow-hidden border-[1px] w-full rounded-3xl h-[400px] p-5 justify-center items-center">
            <p>Nenhuma notícia cadastrada.</p>
          </div>
        ) : (
          <Slider {...settings} className="h-full w-[100%]">
            {data.map((item: New) => (
              <div
                className="flex flex-col h-full place-items-center overflow-hidden"
                key={item.id}
              >
                <Link
                  href={`/noticias/${item.page}/${item.id}`}
                  className="group flex justify-center items-center h-[400px] md:h-[600px] overflow-hidden w-full"
                >
                  <Image
                    src={item.coverUrl}
                    width={900}
                    height={500}
                    alt={item.title}
                    priority
                    quality={100}
                    className="group-hover:scale-105 transition-transform duration-500 h-full w-full  object-fill"
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
