"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useAppContext } from "@/providers/ProductProvider";
import { ProductBase } from "@/types/types";
import { FaBoxOpen } from "react-icons/fa";

function New() {
  const context = useAppContext();
  const { newItems } = context;
  const [latest, setLatest] = useState<ProductBase[]>([]);

  useEffect(() => {
    setLatest(newItems?.slice(0, 9) || []);
  }, [newItems]);

  if (!newItems || newItems.length == 0) {
    <section className="bg-white w-full px-4 py-8 md:py-4 lg:py-2 xl:px-24 2xl:px-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
        <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
          What{"'"}s New?
        </h3>
      </div>
      <div className="w-full max-w-7xl xl:max-w-full mx-auto">
        <div className="w-full max-w-7xl xl:max-w-full mx-auto flex flex-col items-center justify-center py-12">
          <FaBoxOpen className="text-6xl text-gray-400 mb-4" /> {/* Icon */}
          <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">
            No Items Available
          </h3>
          <p className="text-sm md:text-base text-gray-500 text-center">
            Check back later for new items available.
          </p>
        </div>
      </div>
    </section>;
  }

  return (
    <section className="bg-white w-full px-4 py-8 md:py-4 lg:py-2 xl:px-24 2xl:px-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
        <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
          What{"'"}s New?
        </h3>
      </div>
      <div className="w-full max-w-7xl xl:max-w-full mx-auto">
        <div className="p-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          {latest.map((item) => (
            <Card
              key={item.id}
              className="relative w-full  shadow-none border border-[#2b0909]"
            >
              <CardHeader className="relative p-0">
                <div className="absolute top-2 left-2 z-10 bg-[#ff8080] text-white px-2 py-1 rounded-full text-sm font-bold">
                  new
                </div>
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
                <Link href={`/product/${item.slug}`}>
                  <CardTitle className="text-sm md:text-base xl:text-lg mb-2">
                    {item.title}
                  </CardTitle>
                </Link>
                <p className="text-base lg:text-lg xl:text-lg font-bold text-[#ff8080]">
                  KES . {item.price}
                </p>
              </CardContent>
              <CardFooter className="absolute -bottom-3 md:-bottom-2 -right-4 md:right-0">
                <Link
                  href="/shop"
                  className="flex items-center justify-center gap-3 w-full bg-[#ff8080] text-white px-1 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-[#e67373] transition-colors md:mt-0 border border-[#2b0909]"
                >
                  <BsFillCartPlusFill size={20} />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default New;
