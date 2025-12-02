'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/components/cart/CartProvider'

export default function CartPage() {
  const { items, remove, clear } = useCart()
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Carrito</h1>
        <Link href="/productos" className="rounded border border-zinc-400 px-4 py-2 shadow-sm hover:shadow transition-transform hover:-translate-y-0.5">Volver al catálogo</Link>
      </div>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <Link key={item.id} href={`/productos/${item.id}`} className="flex items-center gap-4 border rounded p-3 shadow-sm hover:shadow transition-transform hover:-translate-y-0.5">
              <Image src={item.image} alt={item.title} width={64} height={64} className="object-contain h-16 w-16" />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Cantidad: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className="mt-2 text-sm rounded border px-3 py-1"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); remove(item.id) }}
                >
                  Eliminar
                </button>
              </div>
            </Link>
          ))}
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-3">
            <button className="rounded bg-black text-white dark:bg-white dark:text-black px-4 py-2 transition-transform hover:-translate-y-0.5">Comprar</button>
            <button className="rounded border px-4 py-2 transition-transform hover:-translate-y-0.5" onClick={clear}>Vaciar carrito</button>
          </div>
        </div>
      )}
    </div>
  )
}
