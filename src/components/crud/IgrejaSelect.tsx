'use client'

import { useState, useEffect } from 'react'
import { useIgrejas } from '@/hooks/useIgrejas'

interface IgrejaSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}

export default function IgrejaSelect({
  value,
  onChange,
  placeholder = 'Selecione uma igreja',
  required = false,
}: IgrejaSelectProps) {
  const { igrejas, loading } = useIgrejas({ showInactive: false })

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    >
      <option value="">
        {loading ? 'Carregando...' : placeholder}
      </option>
      {igrejas.map((igreja) => (
        <option key={igreja.id} value={igreja.id}>
          {igreja.nome}
        </option>
      ))}
    </select>
  )
}
