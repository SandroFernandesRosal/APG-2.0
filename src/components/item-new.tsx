import Link from 'next/link'
import Image from 'next/image'
import type { New } from '@/data/types/new'

export default function ItemNew({ id, page, coverUrl, title, content }: New) {
  return (
    <div
      className="justify-between flex flex-col h-[300px] w-[47%] max-w-[200px] rounded-md border-[1px] border-zinc-300 dark:border-zinc-800"
      key={id}
    >
      <div className="border-b-[3px] border-primary h-[50%] pb-2">
        <Link href={`/noticias/${page}/${id}`} className="group h-full">
          <Image
            src={coverUrl}
            width={500}
            height={500}
            alt={title}
            className="group-hover:scale-105 transition-transform duration-500 p-2 h-full rounded-t-md"
          />
        </Link>
      </div>
      <div className="flex flex-col my-2 min-h-[100px] md:min-h-[70px] gap-2 justify-between">
        <Link href={`/${page}/${id}`}>
          <p className="text-center px-1">{title}</p>
        </Link>
        <div className="flex flex-wrap justify-evenly px-2 gap-2">
          {content}
        </div>
      </div>
    </div>
  )
}
