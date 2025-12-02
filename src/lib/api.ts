export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

const BASE = "https://fakestoreapi.com";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`, { cache: "no-store", signal });
  const data = await handle<Product[]>(res);
  return data.map(normalizeProduct);
}

export async function getProduct(id: string, signal?: AbortSignal): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`, { cache: "no-store", signal });
  const data = await handle<Product>(res);
  return normalizeProduct(data);
}

export async function getCategories(signal?: AbortSignal): Promise<string[]> {
  const res = await fetch(`${BASE}/products/categories`, { cache: "no-store", signal });
  return handle<string[]>(res);
}

export async function getProductsByCategory(category: string, signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(`${BASE}/products/category/${encodeURIComponent(category)}`, { cache: "no-store", signal });
  const data = await handle<Product[]>(res);
  return data.map(normalizeProduct);
}

function normalizeProduct(p: Product): Product {
  const img = (p.image || "").trim().replace(/\)+$/, "");
  return { ...p, image: img };
}
