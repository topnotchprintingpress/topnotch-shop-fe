import { fetchProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductList from "@/components/special_pages/ProductList";
import Pagination from "@/components/navigation/PaginationComponent";
import { ProductBase } from "@/types/types";

export default async function ProductCategoryPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;
  const page = Number(searchParams?.page) || 1;
  const pageSize = 6;

  let filteredProducts = [];
  let totalPages = 1;
  let title = "Products";

  switch (params.slug) {
    case "best-sellers":
      ({ products: filteredProducts, totalPages } = await fetchProducts(
        page,
        pageSize
      ));
      filteredProducts = filteredProducts.filter(
        (product: ProductBase) => product.best_seller
      );
      title = "Best Sellers";
      break;
    case "new-arrivals":
      ({ products: filteredProducts, totalPages } = await fetchProducts(
        page,
        pageSize
      ));
      title = "New Arrivals";
      break;
    case "deals-and-offers":
      ({ products: filteredProducts, totalPages } = await fetchProducts(
        page,
        pageSize
      ));
      filteredProducts = filteredProducts.filter(
        (product: ProductBase) => product.discount > 0
      );
      title = "Deals & Offers";
      break;
    default:
      return notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <ProductList products={filteredProducts} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
