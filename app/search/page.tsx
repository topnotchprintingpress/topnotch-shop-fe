"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/providers/ProductProvider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaBoxOpen } from "react-icons/fa";
import AddToCart from "@/components/buttons/AddToCart";
import { ProductBase } from "@/types/types";
import Search from "@/components/homepage/Search";

export default function SearchResults() {
  const { filteredProducts, searchProducts } = useAppContext();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [prevQuery, setPrevQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Mark component as mounted to avoid hydration mismatch
    setMounted(true);
  }, []);

  useEffect(() => {
    if (query && query !== prevQuery) {
      setLoading(true);
      searchProducts(query).finally(() => {
        setLoading(false);
        setPrevQuery(query);
      });
    } else if (mounted) {
      setLoading(false);
    }
  }, [query, searchProducts, prevQuery, mounted]);

  // Don't render anything until after client-side hydration
  if (!mounted) {
    return (
      <section className="bg-white w-full px-4 md:px-8 py-8 md:py-4 lg:py-2 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
          <div className="flex items-center gap-2">
            <FaSearch className="text-[#2b0909]" />
            <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
              Search Results for &quot;{query}&quot;
            </h3>
          </div>
        </div>
        <div className="w-full max-w-7xl xl:max-w-full mx-auto flex flex-col items-center justify-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 mb-2 rounded"></div>
            <div className="h-3 w-32 bg-gray-100 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#fffcf7] w-full px-4 md:px-8 py-8 md:py-4 lg:py-2 flex flex-col items-center justify-center">
      <Search />

      <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
        <div className="flex items-center gap-2">
          <FaSearch className="text-[#2b0909]" />
          <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
            Search Results for &quot;{query}&quot;
          </h3>
        </div>
      </div>

      {loading ? (
        <div className="w-full max-w-7xl xl:max-w-full mx-auto flex flex-col items-center justify-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 mb-2 rounded"></div>
            <div className="h-3 w-32 bg-gray-100 rounded"></div>
          </div>
        </div>
      ) : !filteredProducts || filteredProducts.length === 0 ? (
        <div className="w-full max-w-7xl xl:max-w-full mx-auto flex flex-col items-center justify-center py-12">
          <FaBoxOpen className="text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">
            No Results Found
          </h3>
          <p className="text-sm md:text-base text-gray-500 text-center">
            We couldn{"'"}t find any products matching &quot;{query}&quot;. Try
            different keywords.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-7xl xl:max-w-full mx-auto">
          <div className="text-sm text-gray-600 mb-4">
            Found {filteredProducts.length} result
            {filteredProducts.length !== 1 ? "s" : ""}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredProducts.map((product: ProductBase) => (
              <Card
                key={product.id}
                className="relative w-full bg-[#fffcf7] border border-[#2b0909] h-[52vh] md:h-[64vh] 2xl:h-[38vh]"
              >
                <CardHeader className="relative p-0">
                  {mounted && product.discount > 0 && (
                    <div className="absolute top-2 left-2 z-10 bg-[#ff8080] text-white px-2 py-1 rounded-full text-sm font-bold">
                      {product.discount}% OFF
                    </div>
                  )}
                  <div className="w-full h-48 relative">
                    <Image
                      src={
                        product.images?.length > 0
                          ? product.images[0].image
                          : "/placeholder.svg"
                      }
                      fill
                      alt={product.title || "Product image"}
                      className="object-contain rounded-t-lg"
                      priority={false}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-xs text-gray-600 mb-2">
                    {product.main_category || "General"}
                  </p>
                  <Link href={`/product/${product.slug}`}>
                    <CardTitle className="text-base hover:text-[#ff8080] transition-colors">
                      {product.title}
                    </CardTitle>
                  </Link>
                </CardContent>

                <CardFooter className="absolute -bottom-2 right-0 md:flex items-center justify-between w-full px-4">
                  <div className="flex flex-col md:flex-row gap-1 md:gap-2 items-center">
                    <h3 className="text-lg font-bold truncate tracking-tighter text-[#2b0909]">
                      KES{" "}
                      {mounted && product.discount > 0
                        ? (
                            product.price *
                            (1 - product.discount / 100)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : product.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </h3>
                    {mounted && product.discount > 0 && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        KES{" "}
                        {product.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    )}
                  </div>
                  <div className="ml-auto">
                    <AddToCart productId={product.id} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
