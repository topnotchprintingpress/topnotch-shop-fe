// app/lib/data.ts
export async function fetchProducts(
  page: number,
  pageSize: number,
  query: string = "",
  main_category: string = ""
) {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/products/?page=${page}&page_size=${pageSize}`;

    if (query) {
      url += `&search=${encodeURIComponent(query)}`;
    }

    if (main_category) {
      url += `&main_category=${encodeURIComponent(main_category)}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    const products = data.results;
    const totalPages = Math.ceil(data.count / pageSize);

    return { products, totalPages };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 1 };
  }
}
