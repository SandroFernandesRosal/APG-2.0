'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { Megaphone, CalendarCheck, Users, BookMarked } from 'lucide-react'

function NewsCategoryCard({
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
      className={`bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 ${transitionClasses} border-[1px] border-zinc-300 dark:border-zinc-800`}
    >
      <div className="flex items-center gap-4 ">
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

export default function NoticiasHeader() {
  return (
    <section className="w-full bg-bglight dark:bg-bgdark py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center px-6">
        <div className="flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Fique por Dentro de{' '}
            <span className="text-primary dark:text-secundary">Tudo.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Acompanhe as novidades, comunicados e eventos futuros. Aqui você
            encontra tudo o que está a acontecer em nossas congregações para não
            perder nenhum momento.
          </p>
          <div className="mt-8">
            <Link
              href={'/noticias'}
              className="inline-flex items-center gap-3 px-6 py-4 bg-primary dark:bg-slate-800 hover:bg-primary/90 dark:hover:bg-slate-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-0"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Ver Todas as Notícias
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NewsCategoryCard
            icon={<Megaphone className="w-6 h-6" />}
            title="Comunicados Oficiais"
            description="Informações importantes da liderança."
            delay="delay-100"
          />
          <NewsCategoryCard
            icon={<CalendarCheck className="w-6 h-6" />}
            title="Próximos Eventos"
            description="Agende-se para nossos encontros."
            delay="delay-200"
          />
          <NewsCategoryCard
            icon={<Users className="w-6 h-6" />}
            title="Vida da Igreja"
            description="Celebrações, batismos e comunhão."
            delay="delay-300"
          />
          <NewsCategoryCard
            icon={<BookMarked className="w-6 h-6" />}
            title="Palavra da Semana"
            description="Reflexões e estudos da última pregação."
            delay="delay-400"
          />
        </div>
      </div>
    </section>
  )
}
