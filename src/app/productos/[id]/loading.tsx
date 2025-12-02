export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-8 animate-pulse">
      <div className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded" />
      <div>
        <div className="h-6 w-64 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-full mt-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-3/4 mt-2 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  )
}
