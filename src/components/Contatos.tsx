'use client'
import { useIgrejas } from '@/hooks/useIgrejas'
import Socials from './Socials'
import SkeletonContato from './skeleton/SkeletonContato'

export default function Contatos() {
  const { igrejas, loading } = useIgrejas({ showInactive: false })

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-4">
        {!loading ? (
          igrejas && igrejas.length < 1 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Nenhuma igreja cadastrada.
            </p>
          ) : (
            igrejas.map((igreja) => (
              <Socials
                key={igreja.id}
                title={igreja.nome}
                numerowhatsapp={igreja.whatsapp || ''}
                nomefacebook={igreja.facebook || ''}
                nomeinstagram={igreja.instagram || ''}
                telefone={igreja.telefone}
                youtube={igreja.youtube}
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
