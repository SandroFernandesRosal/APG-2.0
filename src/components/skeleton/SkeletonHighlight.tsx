export default function SkeletonHighlight() {
  return (
    <div className="mt-10 animate-pulse flex flex-col w-[80%] lg:w-[50%] h-[400px] overflow-hidden border-[1px] border-zinc-300 dark:border-zinc-700  p-5 rounded-lg justify-center items-center">
      <div className="group animate-pulse flex justify-center items-center md:h-[400px] w-[100%] overflow-hidden bg-gray-300 rounded-lg"></div>
    </div>
  )
}
