'use client'
import { useToken } from '@/hooks/useToken'
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa'
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
      <div className="mb-[7px] flex flex-col justify-center gap-2">
        <h1 className="text-lg">{title}</h1>
        <Link
          href={`https://api.whatsapp.com/send?phone=${numerowhatsapp}`}
          target="blank"
          className="flex items-center gap-2"
        >
          <FaWhatsapp className="text-2xl text-secundary hover:text-secundary/50" />
          <p>{numerowhatsapp}</p>
        </Link>

        <Link
          href={`https://www.instagram.com/${nomeinstagram}`}
          target="blank"
          className="flex items-center gap-2"
        >
          <FaInstagram className="text-2xl text-secundary hover:text-secundary/50" />
          <p>{nomeinstagram}</p>
        </Link>

        <Link
          href={`https://www.facebook.com/${nomefacebook}`}
          target="blank"
          className="flex items-center gap-2"
        >
          <FaFacebook className="text-2xl text-secundary hover:text-secundary/50" />
          <p>{nomefacebook}</p>
        </Link>

        {token && (
          <div className="flex w-full justify-around md:gap-2">
            {openEdit !== id ? (
              <button className="button !mb-0" onClick={() => setOpenEdit(id)}>
                Editar
              </button>
            ) : null}
            <button
              aria-hidden="true"
              tabIndex={-1}
              className="button !mb-0"
              onClick={() => {
                setShowModal(id)
                setSelectedProduct(contatoItem)
              }}
            >
              Remover
            </button>
          </div>
        )}
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
