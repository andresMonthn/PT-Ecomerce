'use client'

import { useCart } from '@/components/cart/CartProvider'

export default function IndicadorCarrito() {
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  return (
    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs">
      {count}
    </span>
  )
}
