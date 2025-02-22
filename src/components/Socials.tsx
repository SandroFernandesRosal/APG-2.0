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
  const [openEdit, setOpenEdit] = useState(false)
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
            {openEdit === false && (
              <button
                className="m-2 rounded-lg border-[1px] border-zinc-400 bg-gradient-to-r from-slate-950 to-blue-900 px-2 font-bold text-white hover:from-blue-900 hover:to-slate-900 dark:border-zinc-700 md:px-3 md:text-lg"
                onClick={() => setOpenEdit(true)}
              >
                Editar
              </button>
            )}
            <RemoveContatos id={id} />
          </div>
        )}
      </div>

      {openEdit && (
        <EditContatos
          localInitial={title}
          whatsappInitial={numerowhatsapp}
          facebookInitial={nomefacebook}
          instagranInitial={nomeinstagram}
          id={id}
          setOpenEdit={setOpenEdit}
        />
      )}
    </>
  )
}
