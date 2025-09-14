export default function SkeletonEndereco() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )
}
