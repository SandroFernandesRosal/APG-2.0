'use client'
import { useState, useEffect } from 'react'
// Importamos o ícone que vamos usar nos cartões
import { MapPin } from 'lucide-react'

// Componente para os cartões de localização, para manter o código limpo
function LocationCard({
  title,
  description,
  delay,
}: {
  title: string
  description: string
  delay: string
}) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const transitionClasses = `transition-all duration-500 ease-out ${delay} ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`

  return (
    <div
      className={`bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 ${transitionClasses}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-secundary/10 dark:text-secundary">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-lg text-gray-800 dark:text-white">
            {title}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function EnderecosHeader() {
  return (
    <section className="w-full  dark:bg-bgdark pb-16 bg-bglight">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center px-6">
        {/* Coluna de Texto */}
        <div className="flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Nossos Pontos de{' '}
            <span className="text-primary dark:text-secundary">Encontro.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            A Igreja Alcançados pela Graça tem o prazer de o receber em qualquer
            uma das nossas localidades. Encontre o endereço mais próximo e venha
            celebrar conosco.
          </p>
        </div>

        {/* Coluna com os Cartões de Endereços */}
        <div className="grid grid-cols-1 gap-4">
          <LocationCard
            title="Sede - Tomazinho"
            description="Onde tudo começou. Nosso ponto central de adoração."
            delay="delay-100"
          />
          <LocationCard
            title="Filial - Vila da Penha"
            description="Levando a Palavra e o amor à comunidade local."
            delay="delay-200"
          />
          <LocationCard
            title="Filial - Vila Maria Helena"
            description="Levando a Palavra e o amor à comunidade local."
            delay="delay-300"
          />
        </div>
      </div>
    </section>
  )
}
