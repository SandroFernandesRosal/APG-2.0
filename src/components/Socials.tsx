'use client'
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaPhone,
  FaYoutube,
} from 'react-icons/fa'
import Link from 'next/link'

interface SocialsProps {
  numerowhatsapp: string
  nomeinstagram: string
  nomefacebook: string
  title: string
  telefone?: string
  youtube?: string
}

export default function Socials({
  numerowhatsapp,
  nomeinstagram,
  nomefacebook,
  title,
  telefone,
  youtube,
}: SocialsProps) {
  return (
    <div className="relative bg-white/80 dark:bg-bgdark/80 border border-primary/10 dark:border-secundary/20 rounded-xl shadow-md px-4 py-3 flex flex-col gap-1 items-start max-w-[260px] w-full mx-auto transition-all">
      <span className="text-sm font-bold text-primary dark:text-secundary mb-1 truncate w-full">
        {title}
      </span>
      <div className="flex flex-col gap-1 w-full">
        {telefone && (
          <Link
            href={`tel:${telefone}`}
            className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2 py-1 rounded transition text-sm"
          >
            <FaPhone className="text-lg text-blue-600 dark:text-blue-400" />
            <span className="truncate">{telefone}</span>
          </Link>
        )}
        {numerowhatsapp && (
          <Link
            href={`https://api.whatsapp.com/send?phone=${numerowhatsapp}`}
            target="_blank"
            className="flex items-center gap-2 hover:bg-green-50 dark:hover:bg-green-900/30 px-2 py-1 rounded transition text-sm"
          >
            <FaWhatsapp className="text-lg text-green-600 dark:text-green-400" />
            <span className="truncate">{numerowhatsapp}</span>
          </Link>
        )}
        {nomeinstagram && (
          <Link
            href={`https://www.instagram.com/${nomeinstagram}`}
            target="_blank"
            className="flex items-center gap-2 hover:bg-pink-50 dark:hover:bg-pink-900/30 px-2 py-1 rounded transition text-sm"
          >
            <FaInstagram className="text-lg text-pink-500 dark:text-pink-300" />
            <span className="truncate">@{nomeinstagram}</span>
          </Link>
        )}
        {nomefacebook && (
          <Link
            href={`https://www.facebook.com/${nomefacebook}`}
            target="_blank"
            className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2 py-1 rounded transition text-sm"
          >
            <FaFacebook className="text-lg text-blue-600 dark:text-blue-400" />
            <span className="truncate">{nomefacebook}</span>
          </Link>
        )}
        {youtube && (
          <Link
            href={youtube}
            target="_blank"
            className="flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/30 px-2 py-1 rounded transition text-sm"
          >
            <FaYoutube className="text-lg text-red-600 dark:text-red-400" />
            <span className="truncate">YouTube</span>
          </Link>
        )}
      </div>
    </div>
  )
}
