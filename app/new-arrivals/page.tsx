"use client";
import React from "react";
import ProductList from "@/components/special_pages/ProductList";
import { useAppContext } from "@/providers/ProductProvider";

const NewArrivalsPage = () => {
  const { newItems } = useAppContext();

  return (
    <>
      <ProductList title="New Arrivals" products={newItems} />
    </>
  );
};

export default NewArrivalsPage;
