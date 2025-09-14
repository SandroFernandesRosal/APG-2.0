'use client'
import { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { useIgrejas } from '@/hooks/useIgrejas'
import Link from 'next/link'

function LocationCard({
  title,
  description,
  delay,
  href,
}: {
  title: string
  description: string
  delay: string
  href: string
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${delay}`}
    >
      <Link href={href} className="block">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function IgrejasHeader() {
  const { igrejas, loading } = useIgrejas({ showInactive: false })

  return (
    <section className="w-full dark:bg-bgdark pb-16 bg-bglight">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center px-6">
        <div className="flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Nossas{' '}
            <span className="text-primary dark:text-secundary">Igrejas.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            A Igreja Alcançados pela Graça tem o prazer de o receber em qualquer
            uma das nossas localidades. Encontre a igreja mais próxima e venha
            celebrar conosco.
          </p>
        </div>

        {/* Coluna com os Cartões de Igrejas - Dinâmico */}
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            // Skeleton loading
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))
          ) : igrejas.length > 0 ? (
            igrejas.map((igreja, index) => (
              <LocationCard
                key={igreja.id}
                title={`${igreja.tipo || 'Filial'} - ${igreja.nome}`}
                description={igreja.descricao || `Levando a Palavra e o amor à comunidade local.`}
                delay={`delay-${(index + 1) * 100}`}
                href={`/igrejas/${igreja.slug}`}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Nenhuma igreja cadastrada.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
