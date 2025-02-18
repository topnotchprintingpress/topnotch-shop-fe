"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductBase } from "@/types/types";

interface AppContextProps {
  products: ProductBase[] | null;
  books: ProductBase[] | null;
  bestSellers: ProductBase[] | null;
  featuredBooks: ProductBase[] | null;
  discountedItems: ProductBase[] | null;
  newItems: ProductBase[] | null;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppWrapper({
  products,
  books,
  children,
}: Readonly<{
  products: ProductBase[] | null;
  books: ProductBase[] | null;
  children: React.ReactNode;
}>) {
  const [bestSellers, setBestSellers] = useState<ProductBase[]>([]);
  const featuredBooks: ProductBase[] = (books ?? []).filter(
    (book) => book.featured
  );
  const discountedItems: ProductBase[] = (products ?? []).filter(
    (item) => item.discount > 0
  );
  const newItems: ProductBase[] = (products ?? []).reverse();

  useEffect(() => {
    if (products) {
      const filteredBestSellers = products.filter(
        (product) => product.best_seller
      );
      setBestSellers(filteredBestSellers);
    }
  }, [products]);

  return (
    <AppContext.Provider
      value={{
        products,
        books,
        bestSellers,
        featuredBooks,
        discountedItems,
        newItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
