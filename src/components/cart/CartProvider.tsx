'use client'

import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react'
import type { Product } from '@/lib/api'
export type CartItem = Product & { quantity: number }

type CartState = { items: CartItem[] }
type Action =
  | { type: 'add'; product: Product }
  | { type: 'remove'; id: number }
  | { type: 'clear' }
  | { type: 'hydrate'; items: CartItem[] }

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'add': {
      const indice = state.items.findIndex(i => i.id === action.product.id)
      if (indice >= 0) {
        const articulos = [...state.items]
        articulos[indice] = { ...articulos[indice], quantity: articulos[indice].quantity + 1 }
        return { items: articulos }
      }
      return { items: [...state.items, { ...action.product, quantity: 1 }] }
    }
    case 'remove': {
      return { items: state.items.filter(i => i.id !== action.id) }
    }
    case 'clear': {
      return { items: [] }
    }
    case 'hydrate': {
      return { items: action.items }
    }
    default:
      return state
  }
}

type ValorCarrito = {
  items: CartItem[]
  add: (p: Product) => void
  remove: (id: number) => void
  clear: () => void
}

const ContextoCarrito = createContext<ValorCarrito | null>(null)

export function useCart() {
  const contexto = useContext(ContextoCarrito)
  if (!contexto) throw new Error('useCart debe usarse dentro de ProveedorCarrito')
  return contexto
}

export default function ProveedorCarrito({ children }: { children: React.ReactNode }) {
  const [estado, despachar] = useReducer(reducer, { items: [] } as CartState)
  const montado = useRef(false)

  useEffect(() => {
    if (!montado.current) {
      montado.current = true
      try {
        const crudo = localStorage.getItem('cart')
        if (crudo) {
          const parseado = JSON.parse(crudo) as CartState
          if (Array.isArray(parseado?.items)) {
            despachar({ type: 'hydrate', items: parseado.items })
          }
        }
      } catch {}
      return
    }
    try {
      localStorage.setItem('cart', JSON.stringify(estado))
    } catch {}
  }, [estado])

  const valor = useMemo<ValorCarrito>(() => ({
    items: estado.items,
    add: (p) => despachar({ type: 'add', product: p }),
    remove: (id) => despachar({ type: 'remove', id }),
    clear: () => despachar({ type: 'clear' }),
  }), [estado.items])

  return <ContextoCarrito.Provider value={valor}>{children}</ContextoCarrito.Provider>
}
