// books/page.tsx
import React from "react";
import { fetchProducts } from "@/lib/data";
import CategoryPage from "../Category";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch paginated products based on the query and current page
  const pageSize = 6; // Number of items per page
  const mainCategory = "Technology"; // Replace with the desired main category

  const { products, totalPages } = await fetchProducts(
    currentPage,
    pageSize,
    query,
    mainCategory
  );

  return (
    <CategoryPage
      main_category={mainCategory}
      products={products}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
