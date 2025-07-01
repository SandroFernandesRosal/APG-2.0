'use client'
import { useState, useEffect } from 'react'
// Importamos os ícones que vamos usar nos cartões
import { Church, Flame, Users, Star } from 'lucide-react'

// Componente para os cartões de eventos, para manter o código limpo
function EventCard({
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

export default function AgendaHeader() {
  return (
    <section className="w-full bg-bglight dark:bg-bgdark py-16 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center px-6">
        {/* Coluna de Texto */}
        <div className="flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Nossa Vida em{' '}
            <span className="text-primary dark:text-secundary">
              Comunidade.
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Cada encontro é uma oportunidade para crescer na fé e fortalecer os
            laços. A nossa igreja está sempre de portas abertas para receber
            você e sua família. Participe conosco!
          </p>
        </div>

        {/* Coluna com os Cartões de Eventos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EventCard
            icon={<Church className="w-6 h-6" />}
            title="Cultos de Celebração"
            description="Domingos, 10h e 18h"
            delay="delay-100"
          />
          <EventCard
            icon={<Flame className="w-6 h-6" />}
            title="Noite de Oração"
            description="Quartas-feiras, 19h30"
            delay="delay-200"
          />
          <EventCard
            icon={<Users className="w-6 h-6" />}
            title="Conexão Jovem"
            description="Sábados, 19h"
            delay="delay-300"
          />
          <EventCard
            icon={<Star className="w-6 h-6" />}
            title="Eventos Especiais"
            description="Fique atento às novidades"
            delay="delay-400"
          />
        </div>
      </div>
    </section>
  )
}
