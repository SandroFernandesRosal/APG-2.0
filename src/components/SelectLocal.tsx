'use client'

import { useLocal } from '../store/useStore'

interface SelectLocalProps {
  onChange: (newLocal: string) => void
}

const ROLES = [
  { key: 'VILADAPENHA', label: 'Vila da Penha' },
  { key: 'MARIAHELENA', label: 'Vila Maria Helena' },
  { key: 'TOMAZINHO', label: 'Tomazinho' },
]

export default function SelectLocal({ onChange }: SelectLocalProps) {
  const { local, setLocal } = useLocal()

  const handleLocalSelection = (selected: string) => {
    setLocal(selected)
    onChange(selected)
  }

  return (
    <ul className="flex flex-wrap justify-center pb-3">
      {ROLES.map((role) => (
        <li
          key={role.key}
          className={`m-2 flex cursor-pointer rounded-lg border-[1px] border-primary text-primary font-bold hover:border-secundary dark:border-secundary dark:text-secundary dark:hover:text-white p-2 placeholder-black outline-none hover:bg-primary dark:hover:bg-primary hover:text-white focus:ring-0 dark:placeholder-white ${
            local === role.key
              ? 'bg-primary dark:bg-primary text-white dark:text-white border-secundary'
              : ''
          }`}
          onClick={() => handleLocalSelection(role.key)}
        >
          {role.label}
        </li>
      ))}
    </ul>
  )
}
