import { getCategories, getProducts, getProductsByCategory } from '@/lib/api'
import FiltroCategorias from '@/components/CategoryFilter'
import TarjetaProducto from '@/components/ProductCard'

export default async function ProductsPage(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await props.searchParams
  const raw = sp?.category
  const category = Array.isArray(raw) ? raw[0] : raw || ''
  await new Promise((r) => setTimeout(r, 2000))
  const [categorias, productos] = await Promise.all([
    getCategories(),
    category ? getProductsByCategory(category) : getProducts(),
  ])

  return (
    <div className="mx-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Catálogo</h1>
        <FiltroCategorias categories={categorias} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
        {productos.map(p => (
          <TarjetaProducto key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
