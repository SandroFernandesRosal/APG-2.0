'use client'
import { useState, useEffect } from 'react'
// Importamos ícones relevantes para os tipos de contribuição
import { Landmark, HandHeart, Globe, HelpingHand } from 'lucide-react'

// Componente para os cartões de contribuição
function ContributionCard({
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

export default function DoacaoHeader() {
  return (
    <section className="w-full bg-bglight dark:bg-bgdark pb-16 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center px-6">
        {/* Coluna de Texto */}
        <div className="flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Sua Generosidade{' '}
            <span className="text-primary dark:text-secundary">
              Impulsiona a Missão.
            </span>
          </h1>
          <blockquote className="mt-6 border-l-4 border-primary/50 dark:border-secundary/50 pl-4 italic">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              &quot;Cada um dê conforme determinou em seu coração, não com pesar
              ou por obrigação, pois Deus ama quem dá com alegria.&quot;
            </p>
            <cite className="block text-right mt-2 text-gray-500 dark:text-gray-400 not-italic">
              - 2 Coríntios 9:7
            </cite>
          </blockquote>
        </div>

        {/* Coluna com os Cartões de Contribuição */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ContributionCard
            icon={<Landmark className="w-6 h-6" />}
            title="Dízimos"
            description="Fidelidade que sustenta a casa de Deus."
            delay="delay-100"
          />
          <ContributionCard
            icon={<HandHeart className="w-6 h-6" />}
            title="Ofertas de Amor"
            description="Semeando com um coração grato e alegre."
            delay="delay-200"
          />
          <ContributionCard
            icon={<Globe className="w-6 h-6" />}
            title="Projetos Missionários"
            description="Levando o Evangelho além das fronteiras."
            delay="delay-300"
          />
          <ContributionCard
            icon={<HelpingHand className="w-6 h-6" />}
            title="Ação Social"
            description="Amando nosso próximo com obras de fé."
            delay="delay-400"
          />
        </div>
      </div>
    </section>
  )
}
