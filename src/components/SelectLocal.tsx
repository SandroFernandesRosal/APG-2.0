'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocal } from '../store/useStore'
import { MapPin, Check, ChevronDown } from 'lucide-react'

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
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Lógica para fechar o dropdown ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleLocalSelection = (selected: string) => {
    setLocal(selected)
    onChange(selected)
    setIsOpen(false) // Fecha o menu após a seleção
  }

  const getSelectedLabel = () => {
    const selectedRole = ROLES.find((r) => r.key === local)
    return selectedRole ? selectedRole.label : 'Selecione um local'
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center w-full flex-wrap gap-2 justify-center">
        <div className="flex items-center gap-2 font-bold">
          <MapPin
            className="h-5 w-5 text-primary dark:text-secundary"
            aria-hidden="true"
          />{' '}
          Selecionar local:
        </div>
        <button
          type="button"
          className="inline-flex  justify-center items-center gap-x-2 rounded-full bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-800 hover:bg-gray-50 dark:hover:bg-slate-700"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {getSelectedLabel()}
          <ChevronDown
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        className={`absolute z-50 right-0  mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 ${isOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95'}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="py-1" role="none">
          {ROLES.map((role) => (
            <button
              key={role.key}
              onClick={() => handleLocalSelection(role.key)}
              className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 block w-full text-left px-4 py-2 text-sm"
              role="menuitem"
              tabIndex={-1}
              id={`menu-item-${role.key}`}
            >
              <span className="flex items-center justify-between">
                {role.label}

                {local === role.key && (
                  <Check className="h-5 w-5 text-primary dark:text-secundary" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
