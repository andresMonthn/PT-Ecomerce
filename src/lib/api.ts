export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

const BASE = process.env.FAKESTORE_BASE ?? "https://fakestoreapi.com";

const DEFAULT_TIMEOUT_MS = Number(process.env.FETCH_TIMEOUT_MS ?? 5000);

function mergeSignals(a?: AbortSignal | null, b?: AbortSignal | null): AbortSignal | undefined {
  if (!a && !b) return undefined;
  if (a && !b) return a as AbortSignal;
  if (!a && b) return b as AbortSignal;
  const c = new AbortController();
  const onAbort = () => {
    try { c.abort(); } catch {}
  };
  (a as AbortSignal).addEventListener('abort', onAbort, { once: true });
  (b as AbortSignal).addEventListener('abort', onAbort, { once: true });
  return c.signal;
}

async function fetchWithRetry(url: string, init: RequestInit & { attempts?: number; timeoutMs?: number } = {}) {
  const attempts = init.attempts ?? 3;
  const timeoutMs = init.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  let lastErr: unknown = null;
  for (let i = 0; i < attempts; i++) {
    const ac = new AbortController();
    const timer = setTimeout(() => {
      try { ac.abort('timeout'); } catch {}
    }, timeoutMs);
    try {
      const res = await fetch(url, {
        ...init,
        headers: {
          accept: 'application/json',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
          'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
          ...(init.headers ?? {}),
        },
        cache: init.cache ?? 'no-store',
        signal: mergeSignals(init.signal, ac.signal),
        next: (init as any).next ?? { revalidate: 300 } as any,
      });
      clearTimeout(timer);
      return res;
    } catch (e) {
      clearTimeout(timer);
      lastErr = e;
      if (i < attempts - 1) await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetchWithRetry(`${BASE}/products`, { cache: "no-store", signal, attempts: 3 });
  const data = await handle<Product[]>(res);
  return data.map(normalizeProduct);
}

export async function getProduct(id: string, signal?: AbortSignal): Promise<Product> {
  const res = await fetchWithRetry(`${BASE}/products/${id}`, { cache: "no-store", signal, attempts: 3 });
  const data = await handle<Product>(res);
  return normalizeProduct(data);
}

export async function getCategories(signal?: AbortSignal): Promise<string[]> {
  const res = await fetchWithRetry(`${BASE}/products/categories`, { cache: "no-store", signal, attempts: 3 });
  return handle<string[]>(res);
}

export async function getProductsByCategory(category: string, signal?: AbortSignal): Promise<Product[]> {
  const res = await fetchWithRetry(`${BASE}/products/category/${encodeURIComponent(category)}`, { cache: "no-store", signal, attempts: 3 });
  const data = await handle<Product[]>(res);
  return data.map(normalizeProduct);
}

function normalizeProduct(p: Product): Product {
  const img = (p.image || "").trim().replace(/\)+$/, "");
  return { ...p, image: img };
}
