'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const match = /API error\s+(\d+)/i.exec(error.message)
  const status = match ? Number(match[1]) : undefined
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="space-y-6 text-center">
      <div className="flex items-center gap-4">
        <div className="relative h-10 w-10">
          <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
          <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-red-600 text-white animate-bounce">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path d="M3 8a3 3 0 0 1 3-3h4l2 2h5a3 3 0 0 1 3 3v1l-3 3m-5 5H6a3 3 0 0 1-3-3v-1l3-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 14l-4-4m0 4l4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{status === 500 ? 'Error en el servidor' : 'Desconexión de la API'}</h2>
          <p className="text-sm text-red-600">{error.message}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
          Estado: {status ?? 'desconectado'}
        </span>
        <button className="rounded border px-3 py-1" onClick={() => reset()}>Reintentar</button>
      </div>
      </div>
    </div>
  )
}
