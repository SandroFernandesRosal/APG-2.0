'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Users, ShieldCheck, HeartHandshake } from 'lucide-react'

const DEFAULT_AVATAR = '/img/Placeholder.png'

type User = {
  id: string
  name: string
  avatarUrl?: string
  cargo?: string // <- agora usa o campo correto
}

function LeaderCard({
  icon,
  title,
  subtitle,
  images,
  delay,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  images: string[]
  delay: string
}) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const transitionClasses = `transition-all duration-500 ease-out ${delay} ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`

  return (
    <div
      className={`bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 flex flex-col justify-between ${transitionClasses}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-secundary/10 dark:text-secundary">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-lg text-gray-800 dark:text-white">
            {title}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
      <hr className="my-4 border-gray-200 dark:border-gray-700" />
      <div className="flex items-center -space-x-3">
        {images.slice(0, 5).map((imgSrc, index) => (
          <Image
            key={index}
            src={imgSrc}
            alt={`Líder ${index + 1}`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
          />
        ))}
        {images.length > 5 && (
          <div className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full dark:border-gray-800">
            +{images.length - 5}
          </div>
        )}
      </div>
    </div>
  )
}

export default function MinisterioHeader() {
  const [isMounted, setIsMounted] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    fetch('/api/auth/register')
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]))
  }, [])

  // Helper para obter avatares por cargo
  const getAvatarsByCargo = (cargo: string) => {
    const filtered = users.filter(
      (user) => user.cargo && user.cargo.toUpperCase() === cargo,
    )
    if (filtered.length === 0) return [DEFAULT_AVATAR]
    return filtered.map((user) => user.avatarUrl || DEFAULT_AVATAR)
  }

  // Para "equipes", mostra quem não é PASTOR, DIACONO ou PRESBITERO
  const getEquipeAvatars = () => {
    const cargosPrincipais = ['PASTOR', 'DIACONO', 'PRESBITERO']
    const filtered = users.filter(
      (user) =>
        !user.cargo || !cargosPrincipais.includes(user.cargo.toUpperCase()),
    )
    if (filtered.length === 0) return [DEFAULT_AVATAR]
    return filtered.map((user) => user.avatarUrl || DEFAULT_AVATAR)
  }

  const pastoresImages = getAvatarsByCargo('PASTOR')
  const diaconatoImages = getAvatarsByCargo('DIACONO')
  const presbiterosImages = getAvatarsByCargo('PRESBITERO')
  const equipesImages = getEquipeAvatars()

  const transitionClasses = (delay: string) =>
    `transition-all duration-500 ease-out ${delay} ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900/70 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center px-6">
        {/* Coluna de Texto */}
        <div className="flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Liderança que Inspira,{' '}
            <span className="text-primary dark:text-secundary">
              Fé que Transforma.
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Conheça o coração por trás da nossa igreja. Um ministério dedicado a
            guiar, servir e edificar nossa comunidade na rocha sólida do
            Evangelho, com amor, integridade e um compromisso inabalável com a
            Palavra de Deus.
          </p>
        </div>

        {/* Coluna com os Cartões de Liderança */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LeaderCard
            icon={<Users className="w-6 h-6" />}
            title="Pastorado"
            subtitle="Liderança Principal"
            images={pastoresImages}
            delay="delay-100"
          />
          <LeaderCard
            icon={<HeartHandshake className="w-6 h-6" />}
            title="Diaconato"
            subtitle="Serviço e Cuidado"
            images={diaconatoImages}
            delay="delay-200"
          />
          <LeaderCard
            icon={<ShieldCheck className="w-6 h-6" />}
            title="Presbíteros"
            subtitle="Doutrina e Conselho"
            images={presbiterosImages}
            delay="delay-300"
          />
          {/* --- ALTERAÇÃO AQUI --- */}
          <div
            className={`bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 flex flex-col justify-between ${transitionClasses('delay-400')}`}
          >
            <p className="text-center text-base text-gray-600 dark:text-gray-300 italic">
              E muitos outros que servem com amor...
            </p>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <div className="flex items-center justify-center -space-x-3">
              {equipesImages.slice(0, 5).map((imgSrc, index) => (
                <Image
                  key={index}
                  src={imgSrc}
                  alt={`Voluntário ${index + 1}`}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                />
              ))}
              {equipesImages.length > 5 && (
                <div className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full dark:border-gray-800">
                  +{equipesImages.length - 5}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
