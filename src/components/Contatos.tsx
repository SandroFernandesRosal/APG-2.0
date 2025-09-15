'use client'
import { useIgrejas } from '@/hooks/useIgrejas'
import Socials from './Socials'
import SkeletonContato from './skeleton/SkeletonContato'

export default function Contatos() {
  const { igrejas, loading } = useIgrejas({ showInactive: false })

  return (
    <div>
      <div className="m-2 flex w-full flex-wrap justify-center gap-5">
        {!loading ? (
          igrejas && igrejas.length < 1 ? (
            <p>Nenhuma igreja cadastrada.</p>
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
