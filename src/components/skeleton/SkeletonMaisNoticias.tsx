export default function SkeletonMaisNoticias() {
  return (
    <div className="flex w-full animate-pulse flex-col justify-center gap-5 rounded-md p-4">
      <div className="flex gap-4">
        <div className="h-[30px] w-[70px] animate-pulse rounded-lg bg-gray-700"></div>
        <div className="mb-5 h-[30px] w-[70%] max-w-[500px] animate-pulse  rounded-md bg-gray-700"></div>
      </div>

      <div className="flex gap-4">
        <div className="h-[30px] w-[70px] animate-pulse rounded-lg bg-gray-700"></div>
        <div className="mb-5 h-[30px] w-[70%] max-w-[500px] animate-pulse  rounded-md bg-gray-700"></div>
      </div>

      <div className="flex gap-4">
        <div className="h-[30px] w-[70px] animate-pulse rounded-lg bg-gray-700"></div>
        <div className="mb-5 h-[30px] w-[70%] max-w-[500px] animate-pulse  rounded-md bg-gray-700"></div>
      </div>

      <div className="flex gap-4">
        <div className="h-[30px] w-[70px] animate-pulse rounded-lg bg-gray-700"></div>
        <div className="mb-5 h-[30px] w-[70%] max-w-[500px] animate-pulse  rounded-md bg-gray-700"></div>
      </div>
    </div>
  )
}
