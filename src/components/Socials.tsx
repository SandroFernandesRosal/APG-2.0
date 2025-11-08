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
    <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-primary/20 dark:border-secundary/30 rounded-lg shadow-md hover:shadow-lg px-3 py-2.5 flex flex-col gap-2 min-w-[200px] max-w-[220px] w-full transition-all duration-200">
      {/* Header do card */}
      <div className="flex items-center gap-2 pb-1.5 border-b border-gray-200 dark:border-gray-700">
        <div className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-secundary"></div>
        <h3 className="text-sm font-bold text-primary dark:text-secundary truncate">
          {title}
        </h3>
      </div>

      {/* Lista de contatos */}
      <div className="flex flex-col gap-1.5 w-full">
        {/* Telefone */}
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
            <FaPhone className="text-xs text-blue-600 dark:text-blue-400" />
          </div>
          {telefone ? (
            <Link
              href={`tel:${telefone}`}
              className="flex-1 text-xs text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
            >
              {telefone}
            </Link>
          ) : (
            <span className="flex-1 text-xs text-gray-400 dark:text-gray-500 italic">
              Não informado
            </span>
          )}
        </div>

        {/* WhatsApp */}
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-6 h-6 rounded bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
            <FaWhatsapp className="text-xs text-green-600 dark:text-green-400" />
          </div>
          {numerowhatsapp ? (
            <Link
              href={`https://api.whatsapp.com/send?phone=${numerowhatsapp}`}
              target="_blank"
              className="flex-1 text-xs text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors truncate"
            >
              {numerowhatsapp}
            </Link>
          ) : (
            <span className="flex-1 text-xs text-gray-400 dark:text-gray-500 italic">
              Não informado
            </span>
          )}
        </div>

        {/* Instagram */}
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-6 h-6 rounded bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center">
            <FaInstagram className="text-xs text-pink-500 dark:text-pink-300" />
          </div>
          {nomeinstagram ? (
            <Link
              href={`https://www.instagram.com/${nomeinstagram}`}
              target="_blank"
              className="flex-1 text-xs text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-300 transition-colors truncate"
            >
              @{nomeinstagram}
            </Link>
          ) : (
            <span className="flex-1 text-xs text-gray-400 dark:text-gray-500 italic">
              Não informado
            </span>
          )}
        </div>

        {/* Facebook */}
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
            <FaFacebook className="text-xs text-blue-600 dark:text-blue-400" />
          </div>
          {nomefacebook ? (
            <Link
              href={`https://www.facebook.com/${nomefacebook}`}
              target="_blank"
              className="flex-1 text-xs text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
            >
              {nomefacebook}
            </Link>
          ) : (
            <span className="flex-1 text-xs text-gray-400 dark:text-gray-500 italic">
              Não informado
            </span>
          )}
        </div>

        {/* YouTube */}
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-6 h-6 rounded bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
            <FaYoutube className="text-xs text-red-600 dark:text-red-400" />
          </div>
          {youtube ? (
            <Link
              href={youtube}
              target="_blank"
              className="flex-1 text-xs text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors truncate"
            >
              YouTube
            </Link>
          ) : (
            <span className="flex-1 text-xs text-gray-400 dark:text-gray-500 italic">
              Não informado
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
