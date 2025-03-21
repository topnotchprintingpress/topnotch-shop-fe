"use client";
import React from "react";
import ProductList from "@/components/special_pages/ProductList";
import { useAppContext } from "@/providers/ProductProvider";

const BestSellersPage = () => {
  const { bestSellers } = useAppContext();

  return (
    <>
      <ProductList title="Best Sellers" products={bestSellers} />
    </>
  );
};

export default BestSellersPage;
