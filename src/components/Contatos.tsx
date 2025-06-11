'use client'
import { useEffect, useState } from 'react'
import { useToken } from '@/hooks/useToken'
import { useDataContato } from '@/store/useStore'
import Socials from './Socials'
import AddContatos from './crud/AddContatos'
import SkeletonContato from './skeleton/SkeletonContato'
import { Contato } from '@/data/types/contato'

export default function Contatos() {
  const { dataContato, setDataContato } = useDataContato()
  const [loading, setLoading] = useState(true)
  const [openContato, setOpenContato] = useState(false)
  const token = useToken()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/contato')
        if (!response.ok) {
          throw new Error('Erro ao buscar contatos')
        }
        const data = await response.json()
        setDataContato(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [setDataContato])

  return (
    <div>
      {token?.role === 'SUPERADMIN' ||
        (token?.role === 'ADMIN' && (
          <>
            {!openContato && (
              <div className="flex w-full justify-center">
                <button className="button" onClick={() => setOpenContato(true)}>
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
        ))}

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
