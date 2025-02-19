"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Banner, ProductBase } from "@/types/types";

interface AppContextProps {
  products: ProductBase[] | null;
  books: ProductBase[] | null;
  banners: Banner[] | null;
  bestSellers: ProductBase[] | null;
  featuredBooks: ProductBase[] | null;
  discountedItems: ProductBase[] | null;
  newItems: ProductBase[] | null;
  featuredTech: ProductBase[] | null;
  newLab: ProductBase[] | null;
  topBanner: Banner[] | null;
  middleBanner: Banner[] | null;
  bottomBanner: Banner[] | null;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppWrapper({
  products,
  books,
  banners,
  children,
}: Readonly<{
  products: ProductBase[] | null;
  books: ProductBase[] | null;
  banners: Banner[] | null;
  children: React.ReactNode;
}>) {
  const [bestSellers, setBestSellers] = useState<ProductBase[]>([]);

  useEffect(() => {
    if (products) {
      const filteredBestSellers = products.filter(
        (product) => product.best_seller
      );
      setBestSellers(filteredBestSellers);
    }
  }, [products]);

  // featured books
  const featuredBooks: ProductBase[] = (books ?? []).filter(
    (book) => book.featured
  );

  // discounted items
  const discountedItems: ProductBase[] = (products ?? []).filter(
    (item) => item.discount > 0
  );

  // new items
  const newItems: ProductBase[] = (products ?? []).reverse();

  // featured tech
  const featuredTech: ProductBase[] = (products ?? []).filter(
    (tech) => tech.main_category == "Technology" && tech.featured
  );

  // new lab equipment
  const newLab: ProductBase[] = (products ?? [])
    .filter((lab) => lab.main_category == "Lab Equipment")
    .reverse();

  // topbanner
  const topBanner: Banner[] = (banners ?? []).filter(
    (banner) => banner.is_active && banner.position == "top"
  );

  // middlebanner
  const middleBanner: Banner[] = (banners ?? []).filter(
    (banner) => banner.is_active && banner.position == "middle"
  );

  // bottomBanner
  const bottomBanner: Banner[] = (banners ?? []).filter(
    (banner) => banner.is_active && banner.position == "bottom"
  );

  return (
    <AppContext.Provider
      value={{
        products,
        books,
        banners,
        bestSellers,
        featuredBooks,
        discountedItems,
        newItems,
        featuredTech,
        newLab,
        topBanner,
        middleBanner,
        bottomBanner,
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
