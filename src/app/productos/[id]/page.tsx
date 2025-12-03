import Link from 'next/link'
import ImagenZoom from '@/components/ImagenZoom'
import { getProduct } from '@/lib/api'
import BotonAgregarCarrito from '@/components/AddToCartButton'

export default async function ProductDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  await new Promise((r) => setTimeout(r, 2000))
  const product = await getProduct(id)
  const { title: titulo, description: descripcion, image: imagen, price: precio } = product
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-8">
      <div className="flex items-center justify-center">
        <ImagenZoom src={imagen} alt={titulo} width={400} height={400} className="h-80" overlayTargetSelector="#detalle-producto" />
      </div>
      <div id="detalle-producto" className="relative">
        <h2 className="text-2xl font-semibold">{titulo}</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{descripcion}</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-xl font-bold">${precio.toFixed(2)}</span>
          <span className="inline-block transition-transform hover:-translate-y-0.5">
            <BotonAgregarCarrito product={product} />
          </span>
        </div>
        <div className="mt-6">
          <Link href="/productos" className="rounded border border-zinc-400 px-4 py-2 shadow-sm hover:shadow transition-transform hover:-translate-y-0.5">Volver al catálogo</Link>
        </div>
      </div>
    </main>
  )
}
export const dynamic = 'force-dynamic'
