'use client'
import { FaPlus } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'

import { Agenda } from '@/data/types/agenda'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useDataAgenda, useLocal } from '@/store/useStore'
import SkeletonNew from './skeleton/SkeletonNew'
import SelectLocal from './SelectLocal'

export default function CarouselAgenda({
  titleproducts,
}: {
  titleproducts: string
}) {
  const { dataAgenda, setDataAgenda } = useDataAgenda()
  const { local, setLocal } = useLocal()
  const [loading, setLoading] = useState(true)
  const [localLoading, setLocalLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .get(`/agenda/${local}`)
      .then((response) => {
        setDataAgenda(response.data.agendaTotal)
        setLoading(false)
        setLocalLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setLocalLoading(false)
      })
  }, [setDataAgenda, local])

  const handleLocalChange = (newLocal: string) => {
    setLocalLoading(true)
    setLocal(newLocal)
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
    <section className="text-textprimary flex flex-col items-center py-4 mb-5 justify-center overflow-hidden bg-bglightsecundary w-full border-[1px] border-zinc-300 dark:border-zinc-800 rounded-3xl dark:bg-bgdarksecundary">
      <h1 className="text-xl font-bold text-primary dark:text-secundary">
        Agenda
      </h1>
      <h2 className="text-xl mb-5">Todos os nossos eventos</h2>
      <SelectLocal onChange={handleLocalChange} />
      <div className="flex gap-2 items-center justify-between px-2 w-[80vw] mt-5">
        <h1 className="md:text-2xl w-full font-bold">{titleproducts}</h1>
        <Link
          href={`/agenda`}
          className="font-bold md:text-lg w-full justify-end flex items-center gap-2"
        >
          <span>Ver todos</span> <FaPlus />
        </Link>
      </div>

      <div className="flex w-full gap-3 justify-center">
        {loading || localLoading ? (
          <Slider {...settings} className="w-[80vw] my-5 gap-2 overflow-hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonNew key={index} />
            ))}
          </Slider>
        ) : dataAgenda.length === 0 ? (
          <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-300 dark:border-zinc-700 p-5 rounded-lg justify-center items-center">
            <p>Nenhum evento cadastrado.</p>
          </div>
        ) : (
          <Slider {...settings} className="w-[80vw] my-5 mx-10 gap-2 ">
            {dataAgenda.map((product: Agenda) => {
              return (
                <div
                  className="justify-between flex flex-col h-[300px] rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
                  key={product.id}
                >
                  <div className="border-b-[3px] border-primary flex text-xl font-bold justify-center w-full  py-2">
                    {product.day}
                  </div>
                  <ul className="relative   mt-10  flex place-self-center w-[80%] overflow-visible border-l border-zinc-300 dark:border-zinc-800">
                    <li className="mb-5 ml-6">
                      <span className="absolute  -left-1 flex h-2 w-2 items-center justify-center rounded-full bg-primary ring-8 ring-primary/20 dark:bg-secundary "></span>
                      <h3 className=" flex items-center  font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>

                      <p className="font-normal text-gray-500 dark:text-gray-400">
                        {product.hour}
                      </p>
                    </li>
                  </ul>
                </div>
              )
            })}
          </Slider>
        )}
      </div>
    </section>
  )
}
