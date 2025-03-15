'use client'

import { useState, FormEvent } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SearchForm() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const inputElement = event.currentTarget.elements.namedItem(
      'q',
    ) as HTMLInputElement
    const newQuery = inputElement.value

    if (!newQuery) {
      return
    }

    setQuery(newQuery)
    router.push(`/search?q=${newQuery}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex  items-center  rounded-md w-full p-1 border-[1px] border-zinc-400 dark:border-zinc-700"
    >
      <Search className="w-7 h-7 text-primary dark:text-secundary" />
      <input
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar notícia..."
        className=" w-full bg-transparent text-sm outline-none placeholder:text-black dark:placeholder:text-white/50 focus:ring-0 border-none rounded-full px-1"
        required
      />
    </form>
  )
}
