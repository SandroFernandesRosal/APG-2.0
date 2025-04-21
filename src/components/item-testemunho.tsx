import Image from 'next/image'
import { format } from 'date-fns'
import EditTestemunho from './crud/EditTestemunho'
import RemoveTestemunho from './crud/RemoveTestemunho'
import { UserIgreja } from '@/data/types/userigreja'
import { Testemunho } from '@/data/types/testemunho'
import { useState } from 'react'
import { useToken } from '@/hooks/useToken'

interface ItemTestemunhoProps {
  item: Testemunho
  userIgreja: UserIgreja
}

export default function ItemTestemunho({
  item,
  userIgreja,
}: ItemTestemunhoProps) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy HH:mm')
  }

  return (
    <div className="flex w-full flex-col items-start gap-3 px-6 py-4 md:flex-row md:justify-center">
      {item.avatarUrl && (
        <Image
          width={120}
          height={120}
          src={item.avatarUrl}
          alt={item.name}
          className="p-[2px] mr-1  rounded-full border-[1px] border-primary dark:border-secundary"
        />
      )}

      <div className="flex w-full flex-col gap-2 rounded-2xl bg-bglightsecundary shadow-light dark:bg-bgdarksecundary md:w-[70%] lg:min-w-[700px] border-[1px] border-zinc-300 dark:border-zinc-800">
        <div className="flex items-center justify-between px-3">
          <p className="text-lg font-bold">{item.name}</p>
          <span className="text-sm">{formatDate(item.createdAt)}</span>
        </div>

        <p className="pl-3">{item.content}</p>
        {item.coverUrl && (
          <div className="mb-4 flex w-full items-center justify-center">
            <Image
              width={500}
              height={500}
              priority
              src={item.coverUrl}
              alt={item.name}
              className="m-2 w-[80%] rounded-xl shadow-light dark:shadow-dark md:max-w-[500px]"
            />
          </div>
        )}

        {token || (userIgreja && userIgreja.sub === item.userId) ? (
          <div className="mb-2 flex justify-center gap-4">
            {openEdit === null && (
              <button
                className="button !mb-0"
                onClick={() => setOpenEdit(item.id)}
              >
                Editar
              </button>
            )}

            {openEdit === item.id && (
              <div>
                <EditTestemunho
                  avatarUrl={item.avatarUrl}
                  name={item.name}
                  id={item.id}
                  img={item.coverUrl}
                  conteudo={item.content}
                  userIgreja={userIgreja}
                  setOpenEdit={setOpenEdit}
                />
              </div>
            )}
            <RemoveTestemunho id={item.id} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
