'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type ValorTema = { oscuro: boolean; alternar: () => void }

const ContextoTema = createContext<ValorTema | null>(null)

export function useTema() {
  const ctx = useContext(ContextoTema)
  if (!ctx) throw new Error('useTema debe usarse dentro de ProveedorTema')
  return ctx
}

export default function ProveedorTema({ children }: { children: React.ReactNode }) {
  const [oscuro, setOscuro] = useState(false)

  useEffect(() => {
    try {
      const guardado = localStorage.getItem('theme')
      const preferido = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const debeOscuro = guardado ? guardado === 'dark' : preferido
      document.documentElement.classList.toggle('dark', debeOscuro)
      setOscuro(debeOscuro)
    } catch {}
  }, [])

  const alternar = () => {
    const nuevo = !oscuro
    document.documentElement.classList.toggle('dark', nuevo)
    try {
      localStorage.setItem('theme', nuevo ? 'dark' : 'light')
      document.cookie = `theme=${nuevo ? 'dark' : 'light'}; path=/; max-age=31536000`
    } catch {}
    setOscuro(nuevo)
  }

  return <ContextoTema.Provider value={{ oscuro, alternar }}>{children}</ContextoTema.Provider>
}

