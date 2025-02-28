'use client'
import Image from 'next/image'
import { useTokenIgreja } from '@/hooks/useTokenIgreja'
import AddTestemunho from '@/components/crud/AddTestemunho'
import { useState, useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { format } from 'date-fns'
import EditTestemunho from './crud/EditTestemunho'
import RemoveTestemunho from './crud/RemoveTestemunho'
import Link from 'next/link'
import { useToken } from '@/hooks/useToken'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import { api } from '@/lib/api'
import { useDataTestemunho } from '@/store/useStore'
import SkeletonTestemunhos from './skeleton/SkeletonTestemunhos'
import { UserIgreja } from '@/data/types/userigreja'
import { Testemunho } from '@/data/types/testemunho'

export default function TestemunhoLine({
  userIgreja,
}: {
  userIgreja: UserIgreja
}) {
  const [open, setOpen] = useState(false)
  const { dataTestemunho, setDataTestemunho } = useDataTestemunho()
  const [loading, setLoading] = useState(true)
  const [openEdit, setOpenEdit] = useState<string | null>(null)

  const tokenIgreja = useTokenIgreja()
  const token = useToken()

  const [offset, setOffset] = useState(0)
  const [isDisabledNext, setIsDisabledNext] = useState(false)
  const [isDisabledPrev, setIsDisabledPrev] = useState(true)
  const newsPerPage = 4

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy HH:mm')
  }

  const loadNextPage = () => {
    if (dataTestemunho.length < offset + newsPerPage) {
      setIsDisabledNext(true)
      return
    }
    setOffset(offset + newsPerPage)
    setIsDisabledPrev(false)
  }

  const loadPreviousPage = () => {
    if (offset <= 0) {
      setIsDisabledPrev(true)
      return
    }
    setOffset(offset - newsPerPage)
    setIsDisabledNext(false)
  }

  const totalNews = dataTestemunho ? dataTestemunho.length : 0
  const totalPages = Math.ceil(totalNews / newsPerPage)
  const currentPage = Math.ceil((offset + newsPerPage) / newsPerPage)
  const displayCurrentPage = Math.min(currentPage, totalPages)

  const newsToDisplay = dataTestemunho.slice(
    (displayCurrentPage - 1) * newsPerPage,
    displayCurrentPage * newsPerPage,
  )

  useEffect(() => {
    api
      .get('/testemunhos')
      .then((response) => {
        setDataTestemunho(response.data.testemunhoTotal)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [setDataTestemunho])

  return (
    <>
      <section className="mb-8 flex w-full flex-col items-center   pb-4  md:rounded-xl">
        <div className="flex flex-col items-center md:min-w-[35%] pt-2">
          <h1 className="m-0 text-lg font-bold text-primary dark:text-secundary">
            Testemunhos
          </h1>
          <p className="mb-4 text-xl">O agir de Deus em nossas vidas</p>
        </div>

        {!tokenIgreja ||
          (token && (
            <>
              <div className="flex w-full flex-wrap items-end justify-center gap-1">
                Faça
                <Link
                  href={'/login/igreja'}
                  className="cursor-pointer rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                >
                  login
                </Link>{' '}
                ou{' '}
                <Link
                  href={'/register'}
                  className="cursor-pointer rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                >
                  Registre-se
                </Link>
                e envie seu testemunho.
              </div>
            </>
          ))}

        {tokenIgreja && (
          <>
            {open === false && (
              <button
                className="mb-4 rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                onClick={() => setOpen(true)}
              >
                Adicionar testemunho
                {open && (
                  <AiFillCloseCircle
                    onClick={() => setOpen(false)}
                    className="cursor-pointer text-2xl font-bold text-black dark:text-white"
                  />
                )}
              </button>
            )}

            {open && (
              <div className="md:min-w-[35%]">
                <AddTestemunho userIgreja={userIgreja} setOpen={setOpen} />
              </div>
            )}
          </>
        )}

        {!loading ? (
          newsToDisplay && newsToDisplay.length < 1 ? (
            <p className="mb-5 text-center">
              Nenhum testemunho cadastrado ainda.
            </p>
          ) : (
            <>
              {newsToDisplay.map((item: Testemunho) => (
                <div
                  key={item.id}
                  className="flex w-full flex-col items-start gap-3 px-6 py-4 md:flex-row md:justify-center"
                >
                  {item.avatarUrl && (
                    <Image
                      width={120}
                      height={120}
                      src={item.avatarUrl}
                      alt={item.name}
                      className="p-[2px] mr-1 h-[120px] w-[120px] rounded-full border-[1px] border-primary  dark:border-secundary"
                    />
                  )}

                  <div className="flex w-full flex-col gap-2 rounded-2xl bg-bglightsecundary shadow-light dark:bg-bgdarksecundary  md:w-[70%] lg:min-w-[700px] border-[1px] border-zinc-300 dark:border-zinc-800">
                    <div className="flex items-center justify-between px-3">
                      <p className="text-lg font-bold">{item.name}</p>
                      <span className="text-sm">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>

                    <p className="pl-3">{item.content}</p>
                    {item.coverUrl && (
                      <div className="mb-4 flex w-full items-center justify-center">
                        <Image
                          width={500}
                          height={500}
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
                            className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
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
              ))}
            </>
          )
        ) : (
          <SkeletonTestemunhos />
        )}

        {!loading && newsToDisplay.length > 0 && (
          <>
            <div className="flex gap-3">
              <button
                onClick={loadPreviousPage}
                disabled={isDisabledPrev}
                className={`rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold" ${
                  isDisabledPrev && 'border-zinc-300 dark:border-zinc-800'
                }`}
              >
                <MdArrowBack className="text-3xl font-bold text-white" />
              </button>
              <button
                onClick={loadNextPage}
                disabled={isDisabledNext}
                className={`rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold" ${
                  isDisabledPrev && 'border-zinc-300 dark:border-zinc-800'
                }`}
              >
                <MdArrowForward className="text-3xl font-bold text-white" />
              </button>
            </div>

            <p className="font-bold">
              Página {displayCurrentPage} de {totalPages}
            </p>
          </>
        )}
      </section>
    </>
  )
}
