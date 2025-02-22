interface ResultLengthProps {
  dataSearch: { id: number; title: string; content: string }[]
}

export default function ResultLength({ dataSearch }: ResultLengthProps) {
  return (
    <>
      {dataSearch.length === 0 ? (
        <div className="flex-col items-center text-center">
          <h1 className="m-0 px-2 text-lg font-bold text-primary dark:text-secundary">
            Nenhuma notícia encontrada
          </h1>
          <p className="px-2 text-xl">Faça uma nova pesquisa</p>
        </div>
      ) : (
        <div className="mb-4 flex-col items-center text-center">
          <p className="text-xl font-bold text-primary dark:text-secundary">
            {dataSearch.length} notícia{dataSearch.length === 1 ? '' : 's'}{' '}
            encontrada{dataSearch.length === 1 ? '' : 's'}
          </p>
        </div>
      )}
    </>
  )
}
