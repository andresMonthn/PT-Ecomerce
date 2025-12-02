'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Error al cargar el producto</h2>
      <p className="text-sm text-red-600">{error.message}</p>
      <button className="rounded border px-3 py-1" onClick={() => reset()}>Reintentar</button>
    </div>
  )
}

