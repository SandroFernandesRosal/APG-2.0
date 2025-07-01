'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
// Importamos ícones relevantes para os temas dos testemunhos
import { Sparkles, HeartPulse, Package, ShieldCheck } from 'lucide-react'

// Componente para os cartões de temas de testemunho
function TestimonyThemeCard({
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

export default function TestemunhosHeader() {
  return (
    <section className="w-full bg-bglight dark:bg-bgdark py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center px-6">
        {/* Coluna de Texto */}
        <div className="flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Histórias que{' '}
            <span className="text-primary dark:text-secundary">
              Inspiram a Fé.
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Os testemunhos edificam, inspiram corações e mostram o agir de Deus
            no meio do Seu povo. Se você tem uma história de transformação,
            vitória ou milagre, compartilhe aqui e abençoe outras vidas!
          </p>
          <div className="mt-8">
            <Link href="/testemunhos" className="button">
              Compartilhe sua História
            </Link>
          </div>
        </div>

        {/* Coluna com os Cartões de Temas de Testemunho */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TestimonyThemeCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Transformação"
            description="Vidas renovadas pela graça de Deus."
            delay="delay-100"
          />
          <TestimonyThemeCard
            icon={<HeartPulse className="w-6 h-6" />}
            title="Cura Divina"
            description="O poder de Deus restaurando o corpo e a alma."
            delay="delay-200"
          />
          <TestimonyThemeCard
            icon={<Package className="w-6 h-6" />}
            title="Provisão Fiel"
            description="Testemunhos do cuidado de Deus em todas as áreas."
            delay="delay-300"
          />
          <TestimonyThemeCard
            icon={<ShieldCheck className="w-6 h-6" />}
            title="Grande Livramento"
            description="Histórias de proteção, salvação e vitória."
            delay="delay-400"
          />
        </div>
      </div>
    </section>
  )
}
