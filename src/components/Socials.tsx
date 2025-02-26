import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useState } from 'react'
import EditContatos from './crud/EditContatos'
import RemoveContatos from './crud/RemoveContatos'

interface SocialsProps {
  numerowhatsapp: string
  nomeinstagram: string
  nomefacebook: string
  title: string
  id: string
}

export default function Socials({
  numerowhatsapp,
  nomeinstagram,
  nomefacebook,
  title,
  id,
}: SocialsProps) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = Cookies.get('tokennn')
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
              <button
                className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                onClick={() => {
                  setOpenEdit(id)
                }}
              >
                Editar
              </button>
            ) : null}
            <RemoveContatos id={id} />
          </div>
        )}
      </div>

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
