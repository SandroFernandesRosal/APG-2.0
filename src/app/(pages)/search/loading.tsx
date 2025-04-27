import { Suspense } from 'react'

import SkeletonNew from '@/components/skeleton/SkeletonNew'
import { CurrentSearch } from './current-search'

export default function SearchLoading() {
  return (
    <div className="flex flex-col gap-4 px-8 pt-[150px] w-full">
      <Suspense fallback={<p>loading...</p>}>
        <CurrentSearch />
      </Suspense>

      <div className="flex flex-wrap justify-center gap-4 items-center w-full">
        <SkeletonNew />
        <SkeletonNew />
        <SkeletonNew />
        <SkeletonNew />
        <SkeletonNew />
        <SkeletonNew />
      </div>
    </div>
  )
}
