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
  filteredProducts: ProductBase[] | null;
  searchProducts: (query: string) => Promise<void>;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppWrapper({
  products,
  banners,
  totalPages: initialTotalPages,
  children,
}: Readonly<{
  products: ProductBase[] | null;
  banners: Banner[] | null;
  totalPages: number;
  children: React.ReactNode;
}>) {
  const [bestSellers, setBestSellers] = useState<ProductBase[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    ProductBase[] | null
  >(products);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (products) {
      const filteredBestSellers = products.filter(
        (product) => product.best_seller
      );
      setBestSellers(filteredBestSellers);
    }
  }, [products]);

  // books
  const books: ProductBase[] = (products ?? []).filter(
    (book) => book.main_category == "Books" && book.featured
  );

  // featured books
  const featuredBooks: ProductBase[] = (products ?? []).filter(
    (book) => book.main_category == "Books" && book.featured
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
  useEffect(() => {
    setFilteredProducts(products); // Initialize filtered products
  }, [products]);

  // Function to search for products
  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/?search=${query}`
      );
      if (!res.ok) throw new Error("Failed to fetch search results");

      const data = await res.json();
      const filtered = data.results;
      setFilteredProducts(filtered);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

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
        filteredProducts,
        searchProducts,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
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
