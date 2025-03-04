'use client'

import { useLocal } from '../store/useStore'

interface SelectLocalProps {
  onChange: (newLocal: string) => void
}

export default function SelectLocal({ onChange }: SelectLocalProps) {
  const { local, setLocal } = useLocal()

  const handleLocalSelection = (selected: string) => {
    setLocal(selected)
    onChange(selected)
  }

  return (
    <ul className="flex flex-wrap justify-center pb-3">
      <li
        className={`m-2 flex cursor-pointer rounded-lg border-[1px] border-primary text-primary font-bold hover:border-secundary dark:border-secundary dark:text-secundary dark:hover:text-white p-2 placeholder-black outline-none hover:bg-primary dark:hover:bg-primary   hover:text-white focus:ring-0  dark:placeholder-white ${
          local === 'viladapenha' &&
          'bg-primary dark:bg-primary text-white dark:text-white border-secundary'
        }`}
        onClick={() => handleLocalSelection('viladapenha')}
      >
        Vila da Penha
      </li>
      <li
        className={`m-2 flex cursor-pointer rounded-lg border-[1px] border-primary text-primary font-bold hover:border-secundary dark:border-secundary dark:text-secundary dark:hover:text-white  p-2 placeholder-black outline-none hover:bg-primary dark:hover:bg-primary hover:text-white focus:ring-0   dark:placeholder-white ${
          local === 'caxias' && 'bg-primary dark:bg-primary text-white'
        }`}
        onClick={() => handleLocalSelection('caxias')}
      >
        Vila Maria Helena
      </li>
      <li
        className={`m-2 flex cursor-pointer rounded-lg border-[1px] border-primary text-primary font-bold hover:border-secundary dark:border-secundary dark:text-secundary dark:hover:text-white  p-2 placeholder-black outline-none hover:bg-primary dark:hover:bg-primary hover:text-white focus:ring-0  dark:placeholder-white ${
          local === 'tomazinho' && 'bg-primary dark:bg-primary text-white'
        }`}
        onClick={() => handleLocalSelection('tomazinho')}
      >
        Tomazinho
      </li>
    </ul>
  )
}
