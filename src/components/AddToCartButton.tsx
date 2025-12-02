'use client'

import { useCart } from '@/components/cart/CartProvider'
import type { Product } from '@/lib/api'
import { useState } from 'react'

export default function BotonAgregarCarrito({ product, className, children }: { product: Product; className?: string; children?: React.ReactNode }) {
  const { add } = useCart()
  const [bouncing, setBouncing] = useState(false)
  return (
    <button
      className={`${className ?? "rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2"} ${bouncing ? "animate-bounce" : ""}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        add(product)
        setBouncing(true)
        setTimeout(() => setBouncing(false), 600)
        try {
          const src = (e.currentTarget as HTMLElement).getBoundingClientRect()
          const anchor = document.getElementById('cart-anchor')?.getBoundingClientRect()
          if (!anchor) return
          const dot = document.createElement('div')
          dot.style.position = 'fixed'
          dot.style.left = `${src.left + src.width / 2}px`
          dot.style.top = `${src.top + src.height / 2}px`
          dot.style.width = '12px'
          dot.style.height = '12px'
          dot.style.borderRadius = '9999px'
          dot.style.background = '#000'
          dot.style.opacity = '0.9'
          dot.style.zIndex = '9999'
          dot.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms'
          document.body.appendChild(dot)
          const dx = anchor.left + anchor.width / 2 - (src.left + src.width / 2)
          const dy = anchor.top + anchor.height / 2 - (src.top + src.height / 2)
          requestAnimationFrame(() => {
            dot.style.transform = `translate(${dx}px, ${dy}px) scale(0.5)`
            dot.style.opacity = '0.2'
          })
          dot.addEventListener('transitionend', () => {
            dot.remove()
          })
        } catch {}
      }}
    >
      {children ?? 'Agregar al carrito'}
    </button>
  )
}
