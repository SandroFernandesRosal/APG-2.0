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

export default function CarouselHighlight() {
  const { data, setData } = useData()
  const { local } = useLocal()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/news/${local}`)
      .then((response) => {
        setData(response.data.newsTotal)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
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
    <section className="highligt text-textprimary flex flex-col items-center  mb-5 justify-center w-full overflow-hidden">
      <div className="flex w-full gap-3 justify-center">
        {loading ? (
          <SkeletonHighlight />
        ) : data.length === 0 ? (
          <div className="flex flex-col  overflow-hidden border-[1px] w-full rounded-3xl h-[200px] border-zinc-300 dark:border-zinc-800 p-5  justify-center items-center">
            <p>Nenhuma notícia cadastrada.</p>
          </div>
        ) : (
          <Slider {...settings} className="h-full  w-[100vw] my-5 mx-10">
            {data.map((item: New) => {
              return (
                <div
                  className="flex flex-col  h-full  place-items-center   overflow-hidden"
                  key={item.id}
                >
                  <Link
                    href={`/noticias/${item.page}/${item.id}`}
                    className="group flex justify-center items-center h-[400px]  max-w-[600px]  overflow-hidden border-[1px] border-zinc-300 dark:border-zinc-800  rounded-3xl w-full"
                  >
                    <Image
                      src={item.coverUrl}
                      width={900}
                      height={500}
                      alt={item.title}
                      priority
                      className="group-hover:scale-105 transition-transform duration-500 h-full w-full md:object-fill md:object-center  rounded-xl"
                    />
                  </Link>
                </div>
              )
            })}
          </Slider>
        )}
      </div>
    </section>
  )
}
