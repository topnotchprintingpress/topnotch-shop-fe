// components/ProductList.tsx
"use client";

import React from "react";
import { ProductBase } from "@/types/types";
import { FaBoxOpen } from "react-icons/fa";
import AddToCart from "../buttons/AddToCart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";

interface ProductListProps {
  products: ProductBase[] | null;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
}: ProductListProps) => {
  if (!products || products.length === 0) {
    return (
      <section className="bg-white w-full px-4 md:px-8 py-0 md:py-16 lg:py-0 flex flex-col items-center justify-center border-t border-[#2b0909] my-0 md:my-4">
        <div className="w-full max-w-7xl xl:max-w-full mx-auto">
          <div className="w-full max-w-7xl xl:max-w-full mx-auto flex flex-col items-center justify-center py-12">
            <FaBoxOpen className="text-6xl text-gray-400 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">
              No Items Available
            </h3>
            <p className="text-sm md:text-base text-gray-500 text-center">
              Check back later for best seller items.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white w-full px-4 md:px-8 py-0 md:py-16 lg:py-0 flex flex-col items-center justify-center my-0 md:my-4">
      <div className="w-full max-w-7xl xl:max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {products.map((item) => (
          <div className="p-2" key={item.id}>
            <Card className="relative bg-[#fffcf7] border border-[#2b0909] w-[70vw] md:w-full h-[52vh] md:h-[62vh] xl:h-[66vh] 2xl:h-[38vh]">
              <CardHeader className="relative p-4">
                {item.discount ? (
                  <div className="absolute top-2 left-2 z-10 bg-[#ff8080] text-white px-2 py-1 rounded-full text-sm  font-bold">
                    {item.discount}% OFF
                  </div>
                ) : null}
                <Image
                  src={
                    item.images.length > 0
                      ? item.images[0].image
                      : "/placeholder.svg"
                  }
                  width={300}
                  height={200}
                  alt={item.title}
                  className="w-full h-48 object-contain rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-xs text-gray-600 mb-2">
                  {item.main_category}
                </p>
                <Link href={`/product/${item.slug}`}>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </Link>
              </CardContent>
              <CardFooter className="absolute -bottom-2 right-0 md:flex items-center justify-between w-full px-4">
                {item.discount ? (
                  <div className="flex flex-col md:flex-row gap-1 md:gap-2 items-center">
                    <h3 className="text-lg font-bold  tracking-tighter text-[#2b0909]">
                      KES{" "}
                      {(item.price * (1 - item.discount / 100)).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </h3>
                    <span className="text-sm text-gray-500 line-through">
                      KES{" "}
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ) : (
                  <h3 className="text-lg font-bold truncate tracking-tighter text-[#2b0909]">
                    KES{" "}
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h3>
                )}
                <div className="ml-auto">
                  <AddToCart productId={item.id} />
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
