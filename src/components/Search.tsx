'use client'
import { ChangeEvent } from 'react'
import { useSearch } from '../store/useStore'
import { FaSearch } from 'react-icons/fa'

export default function SearchMd() {
  const { search, setSearch } = useSearch()

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const normalizedQuery = e.target.value.toLowerCase()
    setSearch(normalizedQuery)
  }

  return (
    <>
      <input
        name="search"
        type="text"
        placeholder="Buscar notícia..."
        className="border:none flex cursor-pointer rounded-lg border-[1px] border-zinc-300 bg-bglight placeholder-black outline-none focus:ring-0 dark:border-zinc-800 dark:bg-bgdark dark:placeholder-white p-2"
        value={search}
        onChange={handleSearchChange}
      />
      <FaSearch className="pointer-events-none relative -top-[27px] left-[85px] mb-1 text-primary dark:text-secundary text-lg" />
    </>
  )
}
