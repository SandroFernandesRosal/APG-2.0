'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
// Importamos os ícones que representam os valores da igreja
import { Megaphone, BookOpen, HeartHandshake, Music } from 'lucide-react'

// Componente para os cartões de valores, para manter o código limpo
function ValueCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode
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
          {icon}
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

export default function QuemSomosHeader() {
  return (
    <section className="w-full bg-bglight dark:bg-bgdark pb-16 pt-5 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center px-6">
        {/* Coluna de Texto */}
        <div className="flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Nossa Identidade,{' '}
            <span className="text-primary dark:text-secundary">
              Nossa Missão.
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Somos uma comunidade de fé comprometida com a proclamação do
            evangelho. A nossa missão é alcançar vidas com a graça de Deus,
            fortalecendo famílias e edificando discípulos.
          </p>
          <div className="mt-8">
            <Link href={'/sobre'} className="button">
              Conheça mais sobre nós
            </Link>
          </div>
        </div>

        {/* Coluna com os Cartões de Valores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ValueCard
            icon={<Megaphone className="w-6 h-6" />}
            title="Proclamação"
            description="Levando o Evangelho a todos."
            delay="delay-100"
          />
          <ValueCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Edificação"
            description="Crescendo juntos na Palavra."
            delay="delay-200"
          />
          <ValueCard
            icon={<HeartHandshake className="w-6 h-6" />}
            title="Comunhão"
            description="Fortalecendo famílias e laços."
            delay="delay-300"
          />
          <ValueCard
            icon={<Music className="w-6 h-6" />}
            title="Adoração"
            description="Celebrando a grandeza de Deus."
            delay="delay-400"
          />
        </div>
      </div>
    </section>
  )
}
