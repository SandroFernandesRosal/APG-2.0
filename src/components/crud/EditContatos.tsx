'use client'
import Cookies from 'js-cookie'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

interface EditContatoProps {
  setOpenEdit: (open: string | null) => void
  id: string
  localInitial: string
  whatsappInitial: string
  facebookInitial: string
  instagramInitial: string
}

export default function EditContatos({
  setOpenEdit,
  id,
  localInitial,
  whatsappInitial,
  facebookInitial,
  instagramInitial,
}: EditContatoProps) {
  const [local, setLocal] = useState<string>(localInitial)
  const [whatsapp, setWhatsapp] = useState<string>(whatsappInitial)
  const [facebook, setFacebook] = useState<string>(facebookInitial)
  const [instagram, setInstagram] = useState<string>(instagramInitial)
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)

    try {
      const response = await fetch(`/api/contato/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          local: local || localInitial,
          whatsapp: whatsapp || whatsappInitial,
          facebook: facebook || facebookInitial,
          instagram: instagram || instagramInitial,
        }),
      })

      const contato = await response.json()

      if (response.ok && contato) {
        setOpenEdit(null)
        router.push('/')
        window.location.href = '/'
        return contato
      }

      console.log(contato)
    } catch (error) {
      console.error('Erro ao editar contato:', error)
    }

    return null
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-bgdark/50 dark:bg-bglight/30 p-4">
      <div className="w-full max-w-2xl bg-bglight dark:bg-bgdark rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-primary dark:text-secundary">
            Editar Contato
          </h1>
          <AiFillCloseCircle
            onClick={() => setOpenEdit(null)}
            className="cursor-pointer text-2xl text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Conteúdo scrollável */}
          <div className="overflow-y-auto max-h-[60vh] p-4">
            <div className="space-y-4">
              {/* Local */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Local
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="local"
                  required
                  placeholder="Digite o local"
                  defaultValue={localInitial}
                  onChange={(e) => setLocal(e.target.value)}
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  WhatsApp
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="whatsapp"
                  required
                  placeholder="Digite o número"
                  defaultValue={whatsappInitial}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Instagram
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="instagram"
                  required
                  placeholder="Digite o Instagram"
                  defaultValue={instagramInitial}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>

              {/* Facebook */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Facebook
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="facebook"
                  required
                  placeholder="Digite o Facebook"
                  defaultValue={facebookInitial}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setOpenEdit(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="button flex items-center gap-2"
              disabled={isEditing}
            >
              {isEditing ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Editando contato...
                </>
              ) : (
                'Editar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
