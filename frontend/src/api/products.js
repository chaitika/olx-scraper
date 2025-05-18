export async function fetchProducts(page = 1, limit = 10) {
  const res = await fetch(
    `http://localhost:3001/products?page=${page}&limit=${limit}`,
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
}
