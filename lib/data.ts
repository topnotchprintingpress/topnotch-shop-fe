// app/lib/data.ts
export async function fetchProducts(
  page: number,
  pageSize: number,
  query: string = "",
  main_category: string = "",
  min_price: number | null = null,
  max_price: number | null = null,
  is_best_seller: boolean = false,
  is_new_arrival: boolean = false,
  is_discounted: boolean = false
) {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/products/?page=${page}&page_size=${pageSize}`;

    if (query) {
      url += `&search=${encodeURIComponent(query)}`;
    }

    if (main_category) {
      url += `&main_category=${encodeURIComponent(main_category)}`;
    }
    if (is_best_seller) url += `&is_best_seller=true`;
    if (is_new_arrival) url += `&is_new_arrival=true`;
    if (is_discounted) url += `&is_discounted=true`;
    if (min_price !== null) url += `&min_price=${min_price}`;
    if (max_price !== null) url += `&max_price=${max_price}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    console.log("Fetched products:", data.results); // Debugging

    const products = data.results;
    const totalPages = data.count ? Math.ceil(data.count / pageSize) : 1;

    return { products, totalPages };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 1 };
  }
}
