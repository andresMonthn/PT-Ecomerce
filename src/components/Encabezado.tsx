'use client'

import Link from 'next/link'
import IndicadorCarrito from '@/components/cart/CartBadge'
import { useTema } from '@/components/theme/ThemeProvider'
import { useEffect, useState } from 'react'

export default function Encabezado() {
  const { oscuro, alternar } = useTema()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const scrollEl = document.querySelector('.app-scroll') as HTMLElement | null
    const getY = () => {
      const yEl = scrollEl ? scrollEl.scrollTop : 0
      const yWin = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      return Math.max(yEl, yWin)
    }
    const handler = () => setScrolled(getY() > 0)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    scrollEl?.addEventListener('scroll', handler as any, { passive: true } as any)
    return () => {
      window.removeEventListener('scroll', handler)
      scrollEl?.removeEventListener('scroll', handler as any)
    }
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#header') && !target.closest('#mobile-menu')) {
        setMenuOpen(false)
      }
    }
    const mq = window.matchMedia('(min-width: 768px)')
    const mqHandler = (ev: MediaQueryListEvent) => {
      if (ev.matches) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler as any)
    mq.addEventListener('change', mqHandler)
    return () => {
      document.removeEventListener('mousedown', handler as any)
      mq.removeEventListener('change', mqHandler)
    }
  }, [])

  return (
    <header id="header" className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 ${scrolled ? 'bg-orange-500/60 backdrop-blur-md' : 'bg-orange-500'} text-black dark:text-black transition-all duration-200`}
    >
      <Link href="/productos" className="text-xl font-semibold text-black dark:text-black">Catálogo</Link>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2">
          <button
            aria-label="Cambiar tema"
            className="rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-sm text-black dark:text-black font-semibold"
            onClick={alternar}
          >
            {oscuro ? 'Tema claro' : 'Tema oscuro'}
          </button>
          <Link href="/cart" id="cart-anchor" className="relative rounded-full border border-zinc-400 px-4 py-1 text-sm shadow-sm hover:shadow text-black dark:text-black font-semibold">
            Carrito
            <span className="absolute -top-2 -right-2"><IndicadorCarrito /></span>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            className="inline-flex items-center justify-center h-9 w-9 rounded border border-zinc-400 bg-black/10 hover:bg-black/20 text-black dark:text-black"
            onClick={() => setMenuOpen(o => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div id="mobile-menu" className="absolute top-full right-4 mt-2 w-56 rounded border border-zinc-700 bg-black/70 backdrop-blur-xl text-white shadow-lg z-50">
          <button
            className="block w-full text-left px-3 py-2 hover:bg-white/10"
            onClick={() => { alternar(); setMenuOpen(false) }}
          >
            {oscuro ? 'Tema claro' : 'Tema oscuro'}
          </button>
          <Link
            href="/cart"
            id="cart-anchor"
            className="relative block px-3 py-2 hover:bg-white/10"
            onClick={() => setMenuOpen(false)}
          >
            Carrito
            <span className="absolute top-2 right-3"><IndicadorCarrito /></span>
          </Link>
        </div>
      )}
    </header>
  )
}
