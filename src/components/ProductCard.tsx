import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/api'
import BotonAgregarCarrito from '@/components/AddToCartButton'

export default function TarjetaProducto({ product }: { product: Product }) {
  return (
    <Link href={`/productos/${product.id}`} className="border border-zinc-400 rounded-lg p-4 flex flex-col m-[calc(1rem*1.2)] shadow-sm hover:shadow bg-inherit text-zinc-900 dark:text-zinc-100 transition-transform hover:-translate-y-0.5">
      <div className="flex flex-col items-center text-center bg-inherit">
        <Image src={product.image} alt={product.title} width={200} height={200} className="object-contain h-40 w-auto" />
        <h3 className="mt-2 text-sm font-medium line-clamp-2 text-zinc-900 dark:text-zinc-100">{product.title}</h3>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">${product.price.toFixed(2)}</span>
        <span className="inline-block transition-transform hover:-translate-y-0.5">
          <BotonAgregarCarrito product={product} className="rounded-full bg-black text-white dark:bg-white dark:text-black px-3 py-1 text-sm">Agregar al carrito</BotonAgregarCarrito>
        </span>
      </div>
    </Link>
  )
}
