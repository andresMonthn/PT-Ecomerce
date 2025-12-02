'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function FiltroCategorias({ categories }: { categories: string[] }) {
  const router = useRouter()
  const search = useSearchParams()
  const current = search.get('category') || ''
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler as any)
    return () => document.removeEventListener('mousedown', handler as any)
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [current])

  return (
    <div className="flex items-center gap-3" ref={ref}>
      <label className="text-sm text-zinc-900 dark:text-zinc-100">Categoría</label>
      <div className="relative">
        <button
          className={`inline-flex items-center justify-between min-w-[12rem] rounded px-3 py-2 border border-zinc-700 text-white bg-black/40 backdrop-blur-md shadow-sm hover:bg-black/50 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={() => !loading && setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-busy={loading}
          disabled={loading}
        >
          <span className="truncate mr-2">{current || 'Todas'}</span>
          {loading ? (
            <span className="inline-block h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" aria-hidden />
          ) : (
            <span aria-hidden>▾</span>
          )}
        </button>
        {open && (
          <div className="absolute left-0 mt-2 w-56 rounded border border-zinc-700 bg-black/70 backdrop-blur-xl text-white shadow-lg z-50">
            <button
              className={`block w-full text-left px-3 py-2 hover:bg-white/10 ${current === '' ? 'bg-white/10' : ''}`}
              onClick={() => {
                setOpen(false)
                if (current === '') {
                  setLoading(false)
                } else {
                  setLoading(true)
                  router.push('/productos')
                }
              }}
            >
              Todas
            </button>
            {categories.map((c) => (
              <button
                key={c}
                className={`block w-full text-left px-3 py-2 hover:bg-white/10 ${current === c ? 'bg-white/10' : ''}`}
                onClick={() => {
                  setOpen(false)
                  if (current === c) {
                    setLoading(false)
                  } else {
                    setLoading(true)
                    router.push(`/productos?category=${encodeURIComponent(c)}`)
                  }
                }}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
