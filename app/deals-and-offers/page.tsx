"use client";
import React from "react";
import ProductList from "@/components/special_pages/ProductList";
import { useAppContext } from "@/providers/ProductProvider";

const DealsPage = () => {
  const { discountedItems } = useAppContext();

  return (
    <>
      <ProductList title="Deals & Offers" products={discountedItems} />
    </>
  );
};

export default DealsPage;
