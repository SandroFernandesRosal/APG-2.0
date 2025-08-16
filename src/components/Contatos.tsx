'use client'
import { useEffect, useState } from 'react'
import { useToken } from '@/hooks/useToken'
import { useDataContato } from '@/store/useStore'
import Socials from './Socials'
import AddContatos from './crud/AddContatos'
import SkeletonContato from './skeleton/SkeletonContato'
import { Contato } from '@/data/types/contato'
import { FaPlus } from 'react-icons/fa'

export default function Contatos() {
  const { dataContato, setDataContato } = useDataContato()
  const [loading, setLoading] = useState(true)
  const [openContato, setOpenContato] = useState(false)
  const token = useToken()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/contato')
        if (!response.ok) {
          throw new Error('Falha ao carregar contatos')
        }
        const data = await response.json()
        setDataContato(data)
      } catch (error) {
        console.error('Erro ao buscar contatos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [setDataContato])

  return (
    <div>
      {(token?.role === 'SUPERADMIN' || token?.role === 'ADMIN') && (
        <>
          {!openContato && (
            <div className="flex w-full justify-center">
              <button
                className="flex items-center gap-2 px-6 py-3 bg-primary dark:bg-secundary text-white font-semibold rounded-lg hover:bg-primary/90 dark:hover:bg-secundary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-6"
                onClick={() => setOpenContato(true)}
              >
                <FaPlus className="text-sm" />
                Adicionar contato
              </button>
            </div>
          )}

          {openContato && (
            <div className="md:min-w-[35%]">
              <AddContatos
                openContato={openContato}
                setOpenContato={setOpenContato}
              />
            </div>
          )}
        </>
      )}

      <div className="m-2 flex w-full flex-wrap justify-center gap-5">
        {!loading ? (
          dataContato && dataContato.length < 1 ? (
            <p>Nenhum contato cadastrado.</p>
          ) : (
            dataContato.map((item: Contato) => (
              <Socials
                key={item.id}
                id={item.id}
                title={item.local}
                numerowhatsapp={item.whatsapp}
                nomefacebook={item.facebook}
                nomeinstagram={item.instagram}
                contatoItem={{
                  numerowhatsapp: item.whatsapp,
                  nomeinstagram: item.instagram,
                  nomefacebook: item.facebook,
                  title: item.local,
                  id: item.id,
                  contatoItem: null,
                }}
              />
            ))
          )
        ) : (
          <SkeletonContato />
        )}
      </div>
    </div>
  )
}
