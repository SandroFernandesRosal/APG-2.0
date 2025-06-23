'use client'
import { useToken } from '@/hooks/useToken'
import { FaFacebook, FaWhatsapp, FaInstagram, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'
import EditContatos from './crud/EditContatos'
import RemoveContatos from './crud/RemoveContatos'
import { useShowModal } from '@/store/useStore'

interface SocialsProps {
  numerowhatsapp: string
  nomeinstagram: string
  nomefacebook: string
  title: string
  id: string
  contatoItem: SocialsProps | null
}

export default function Socials({
  numerowhatsapp,
  nomeinstagram,
  nomefacebook,
  title,
  id,
  contatoItem,
}: SocialsProps) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const { showModal, setShowModal } = useShowModal()
  const [selectedProduct, setSelectedProduct] = useState<SocialsProps | null>(
    null,
  )
  const token = useToken()

  return (
    <>
      <div className="relative bg-white/80 dark:bg-bgdark/80 border border-primary/10 dark:border-secundary/20 rounded-xl shadow-md px-4 py-3 flex flex-col gap-1 items-start max-w-[260px] w-full mx-auto transition-all">
        {/* Botões flutuantes pequenos no canto superior direito */}
        {token && (
          <div className="absolute top-2 right-2 flex gap-1 z-20">
            {openEdit !== id && (
              <button
                onClick={() => setOpenEdit(id)}
                className="p-1 rounded bg-primary/10 dark:bg-secundary/20 hover:bg-primary/20 dark:hover:bg-secundary/30 text-primary dark:text-secundary shadow transition"
                title="Editar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            <button
              aria-hidden="true"
              tabIndex={-1}
              className="p-1 rounded bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-600 shadow transition"
              title="Remover"
              onClick={() => {
                setShowModal(id)
                setSelectedProduct(contatoItem)
              }}
            >
              <FaTrash className="h-4 w-4" />
            </button>
          </div>
        )}

        <span className="text-sm font-bold text-primary dark:text-secundary mb-1 truncate w-full">
          {title}
        </span>
        <div className="flex flex-col gap-1 w-full">
          <Link
            href={`https://api.whatsapp.com/send?phone=${numerowhatsapp}`}
            target="_blank"
            className="flex items-center gap-2 hover:bg-green-50 dark:hover:bg-green-900/30 px-2 py-1 rounded transition text-sm"
          >
            <FaWhatsapp className="text-lg text-green-600 dark:text-green-400" />
            <span className="truncate">{numerowhatsapp}</span>
          </Link>
          <Link
            href={`https://www.instagram.com/${nomeinstagram}`}
            target="_blank"
            className="flex items-center gap-2 hover:bg-pink-50 dark:hover:bg-pink-900/30 px-2 py-1 rounded transition text-sm"
          >
            <FaInstagram className="text-lg text-pink-500 dark:text-pink-300" />
            <span className="truncate">@{nomeinstagram}</span>
          </Link>
          <Link
            href={`https://www.facebook.com/${nomefacebook}`}
            target="_blank"
            className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2 py-1 rounded transition text-sm"
          >
            <FaFacebook className="text-lg text-blue-600 dark:text-blue-400" />
            <span className="truncate">{nomefacebook}</span>
          </Link>
        </div>
      </div>

      {showModal && selectedProduct && (
        <RemoveContatos id={selectedProduct.id} />
      )}

      {openEdit && (
        <EditContatos
          localInitial={title}
          whatsappInitial={numerowhatsapp}
          facebookInitial={nomefacebook}
          instagramInitial={nomeinstagram}
          id={id}
          setOpenEdit={setOpenEdit}
        />
      )}
    </>
  )
}
