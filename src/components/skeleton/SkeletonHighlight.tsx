export default function SkeletonHighlight() {
  return (
    <div className=" animate-pulse flex flex-col w-[100%] h-[400px] overflow-hidden border-[1px] border-zinc-300 dark:border-zinc-700  justify-center items-center">
      <div className="group animate-pulse flex justify-center items-center h-[400px] w-[100%] overflow-hidden bg-gray-300"></div>
    </div>
  )
}
