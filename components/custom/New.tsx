"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/providers/ProductProvider";
import { ProductBase } from "@/types/types";
import { FaBoxOpen } from "react-icons/fa";
import AddToCart from "../buttons/AddToCart";

function New() {
  const context = useAppContext();
  const { newItems } = context;
  const [latest, setLatest] = useState<ProductBase[]>([]);

  useEffect(() => {
    setLatest(newItems?.slice(0, 8) || []);
  }, [newItems]);

  if (!newItems || newItems.length === 0) {
    return (
      <section className="bg-white w-full px-4 py-8 md:py-12 lg:py-16 xl:px-24 2xl:px-32 flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909] rounded-md">
          <h3 className="text-sm md:text-base xl:text-xl border-b border-[#2b0909] w-max px-1 pb-1 tracking-wider font-bold">
            What{"'"}s New?
          </h3>
        </div>
        <div className="w-full max-w-7xl xl:max-w-full mx-auto">
          <div className="w-full max-w-7xl xl:max-w-full mx-auto flex flex-col items-center justify-center py-12 md:py-16">
            <FaBoxOpen className="text-6xl text-gray-400 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">
              No Items Available
            </h3>
            <p className="text-sm md:text-base text-gray-500 text-center max-w-md">
              Check back later for new items available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white w-full px-4 md:px-8 py-0 md:py-12 lg:py-16 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between items-center max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
        <div>
          <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
            What{"'"}s New?
          </h3>
        </div>
        <div className="absolute right-32 md:right-60 flex items-center">
          <Link
            className="border-b hover:border-none text-xs md:text-base"
            href="/categories/new-arrivals"
          >
            View more
          </Link>
        </div>
      </div>
      <div className="w-full max-w-7xl xl:max-w-full mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {latest.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2">
                  <Card className="relative bg-[#fffcf7] border border-[#2b0909] w-[70vw] md:w-full h-[56vh] md:h-[62vh] xl:h-[66vh] 2xl:h-[38vh]">
                    <CardHeader className="relative p-4">
                      {item.discount ? (
                        <div className="absolute top-2 left-2 z-10 bg-[#ff8080] text-white px-2 py-1 rounded-full text-sm  font-bold">
                          {item.discount}% OFF
                        </div>
                      ) : (
                        <div></div>
                      )}
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
                        <CardTitle className="text-base font-bold">
                          {item.title}
                        </CardTitle>
                      </Link>
                    </CardContent>
                    <CardFooter className="absolute -bottom-2 right-0 md:flex items-center justify-between w-full px-4">
                      {item.discount ? (
                        <div className="flex flex-col md:flex-row gap-1 md:gap-2 items-center">
                          <h3 className="text-lg font-bold  tracking-tighter text-[#2b0909]">
                            KES{" "}
                            {(
                              item.price *
                              (1 - item.discount / 100)
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#ffbfbf] text-[#2b0909] absolute -top-9 md:-top-10 -translate-y-1/2 right-14 md:right-28 transform hover:bg-[#e67373] transition-colors w-[10vw] md:w-[5vw]" />
          <CarouselNext className="bg-[#ffbfbf] text-[#2b0909] absolute -top-9 md:-top-10 -translate-y-1/2 right-2 md:right-8 transform hover:bg-[#e67373] transition-colors w-[10vw] md:w-[5vw]" />
        </Carousel>
      </div>
    </section>
  );
}

export default New;
