import { fetchProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductList from "@/components/special_pages/ProductList";
import Pagination from "@/components/navigation/PaginationComponent";
import { ProductBase } from "@/types/types";
import FilterBar from "@/components/navigation/FilterBar";

export async function generateMetadata({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    page?: string;
    min_price?: string;
    max_price?: string;
  }>;
}) {
  const params = await paramsPromise;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchParams = await searchParamsPromise;

  let title = "Products";
  let description = "Explore our wide range of products.";

  switch (params.slug) {
    case "books":
      title = "Books";
      description = "Discover our collection of books across various genres.";
      break;
    case "technology":
      title = "Technology";
      description = "Shop the latest gadgets and tech accessories.";
      break;
    case "stationery":
      title = "Stationery";
      description = "Find high-quality stationery for all your needs.";
      break;
    case "lab-equipment":
      title = "Lab Equipment";
      description =
        "Explore lab equipment for educational and professional use.";
      break;
    case "best-sellers":
      title = "Best Sellers";
      description = "Check out our top-selling products.";
      break;
    case "new-arrivals":
      title = "New Arrivals";
      description = "Discover the latest products added to our store.";
      break;
    case "deals-and-offers":
      title = "Deals & Offers";
      description = "Take advantage of exclusive discounts and deals.";
      break;
    default:
      return {
        title: "Page Not Found",
        description: "The requested page could not be found.",
      };
  }

  return {
    title,
    description,
    metadataBase: new URL(`${process.env.NEXT_SITE_URL}`),
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_SITE_URL}/categories/${params.slug}`,
      images: [
        {
          url: `/Logo1.png`,
          width: 1200,
          height: 630,
          alt: `${title} - Explore Now`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/Logo1.png`], // Replace with actual image paths
    },
    alternates: {
      canonical: `${process.env.NEXT_SITE_URL}/categories/${params.slug}`,
    },
  };
}

export default async function ProductCategoryPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    page?: string;
    min_price?: string;
    max_price?: string;
  }>;
}) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;
  const page = Number(searchParams?.page) || 1;
  const pageSize = 12;
  const min_price = searchParams?.min_price
    ? Number(searchParams.min_price)
    : undefined;
  const max_price = searchParams?.max_price
    ? Number(searchParams.max_price)
    : undefined;

  let filteredProducts = [];
  let totalPages = 1;
  let title = "Products";

  switch (params.slug) {
    case "books":
      ({ products: filteredProducts, totalPages } = await fetchProducts(
        page,
        pageSize,
        "",
        params.slug,
        min_price,
        max_price
      ));
      filteredProducts = filteredProducts.filter(
        (product: ProductBase) => product.main_category === "Books"
      );
      title = "Books";
      break;
    case "technology":
      ({ products: filteredProducts, totalPages } = await fetchProducts(
        page,
        pageSize,
        "",
        params.slug,
        min_price,
        max_price
      ));
      filteredProducts = filteredProducts.filter(
        (product: ProductBase) => product.main_category === "Technology"
      );
      title = "Technology";
      break;
    case "stationery":
      ({ products: filteredProducts, totalPages } = await fetchProducts(
        page,
        pageSize,
        "",
        params.slug,
        min_price,
        max_price
      ));
      filteredProducts = filteredProducts.filter(
        (product: ProductBase) => product.main_category === "Stationery"
      );
      title = "Stationery";
      break;
    case "lab-equipment":
      ({ products: filteredProducts, totalPages } = await fetchProducts(
        page,
        pageSize,
        "",
        params.slug,
        min_price,
        max_price
      ));
      filteredProducts = filteredProducts.filter(
        (product: ProductBase) => product.main_category === "Lab-Equipment"
      );
      title = "Lab Equipment";
      break;
    case "best-sellers":
      ({ products: filteredProducts, totalPages } = await fetchProducts(
        page,
        pageSize,
        "", // Empty search query
        undefined, // No main_category
        min_price,
        max_price,
        true, // is_best_seller flag
        false, // is_new_arrival flag
        false
      ));
      title = "Best Sellers";
      break;

    case "new-arrivals":
      ({ products: filteredProducts, totalPages } = await fetchProducts(
        page,
        pageSize,
        "", // Empty search query
        undefined, // No main_category
        min_price,
        max_price,
        false, // is_best_seller flag
        true, // is_new_arrival flag
        false
      ));
      title = "New Arrivals";
      break;

    case "deals-and-offers":
      ({ products: filteredProducts, totalPages } = await fetchProducts(
        page,
        pageSize,
        "", // Empty search query
        undefined, // No main_category
        min_price,
        max_price,
        false, // is_best_seller flag
        false, // is_new_arrival flag
        true // is_discounted flag
      ));
      title = "Deals & Offers";
      break;

    default:
      return notFound();
  }

  return (
    <section className="w-full">
      {/* Title Section */}
      <div className="w-full bg-[#fffcf7] border-y border-[#2b0909] mb-6">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-[#2b0909]">{title}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4">
        <div className="flex flex-col md:flex-row md:gap-0">
          {/* Sidebar Filter */}
          <div className="w-full md:w-64 lg:w-72">
            <FilterBar />
          </div>

          {/* Product Grid and Pagination */}
          <div className="flex-1">
            <ProductList title={title} products={filteredProducts} />
            <div className="mt-8 mb-12">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
