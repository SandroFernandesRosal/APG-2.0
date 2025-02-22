export default function SkeletonNew() {
  return (
    <div className="animate-pulse flex flex-col h-[300px] rounded-md border-[1px] border-zinc-300">
      <div className="border-b-[3px] border-primary h-[50%] pb-2 bg-gray-300 rounded-t-md"></div>
      <div className="flex flex-col my-2 min-h-[100px] md:min-h-[70px] gap-2 justify-between p-2">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}
