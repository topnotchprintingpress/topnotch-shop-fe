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

  const pageSize = 6;
  const mainCategory = "Technology";

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
