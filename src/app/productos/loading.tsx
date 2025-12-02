export default function Loading() {
  return (
    <div className="mx-8">
      <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse m-[calc(1rem*1.2)]">
            <div className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-3/4 mt-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="mt-3 flex items-center justify-between">
              <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
