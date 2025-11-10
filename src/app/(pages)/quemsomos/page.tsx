'use client'

import { useEffect, useState } from 'react'
import LiderQuemSomos from '@/components/LiderQuemSomos'
import ContentQuemSomos from '@/components/ContentQuemSomos'

import { Sobre } from '@/data/types/sobre'
import { SobreLider } from '@/data/types/sobrelider'
import CarouselMinisterio from '@/components/carousel-ministerio'
import QuemSomosHeader from '@/components/quemsomos-header'

export default function QuemSomos() {
  const [dataSobre, setDataSobre] = useState<Sobre[]>([])
  const [dataSobreLider, setDataSobreLider] = useState<SobreLider[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sobreRes, liderRes] = await Promise.all([
          fetch('/api/sobre'),
          fetch('/api/sobrelider'),
        ])

        if (!sobreRes.ok || !liderRes.ok) {
          throw new Error('Erro na resposta')
        }

        const sobre = await sobreRes.json()
        const lider = await liderRes.json()

        setDataSobre(sobre)
        setDataSobreLider(lider)
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
        setError(true)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="mb-2 flex min-h-screen flex-col items-center pt-[60px] md:mt-0 md:pt-[135px]">
      <CarouselMinisterio titleproducts="Ministério">
        <QuemSomosHeader />
        <article className="mb-5 flex w-full flex-col items-center pb-5 pt-5">
          {error ? (
            <div className="text-red-500 p-4">
              Erro ao carregar os dados. Por favor, tente novamente mais tarde.
            </div>
          ) : (
            <>
              <LiderQuemSomos dataSobreLider={dataSobreLider} />

              {dataSobre.length > 0 ? (
                <ContentQuemSomos dataSobre={dataSobre} />
              ) : (
                <div className="flex flex-col items-center">
                  <ContentQuemSomos dataSobre={dataSobre} />
                  <p className="text-gray-500 text-sm mb-4">
                    Nenhum conteúdo sobre a igreja foi adicionado.
                  </p>
                </div>
              )}
            </>
          )}
        </article>
      </CarouselMinisterio>
    </main>
  )
}
