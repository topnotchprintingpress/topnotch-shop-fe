"use client";
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
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAppContext } from "@/providers/ProductProvider";
import { FaBoxOpen } from "react-icons/fa";
import AddToCart from "../buttons/AddToCart";

export default function FeaturedBooks() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  const context = useAppContext();
  const { featuredBooks } = context;

  if (!featuredBooks || featuredBooks.length === 0) {
    return (
      <section className="bg-white w-full px-4 md:px-8 py-8 md:py-4 lg:py-2 flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
          <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
            Featured Books
          </h3>
        </div>
        <div className="w-full max-w-7xl xl:max-w-full mx-auto flex flex-col items-center justify-center py-12">
          <FaBoxOpen className="text-6xl text-gray-400 mb-4" /> {/* Icon */}
          <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">
            No Items Available
          </h3>
          <p className="text-sm md:text-base text-gray-500 text-center">
            Check back later for featured books.
          </p>
        </div>
      </section>
    );
  }

  const featuredFew = featuredBooks?.slice(0, 9);

  return (
    <section className="bg-white w-full px-4 md:px-8 py-8 md:py-4 lg:py-2 flex flex-col items-center justify-center">
      <div className="w-full relative flex justify-between items-center max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
        <div>
          <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
            Featured Books
          </h3>
        </div>
        <div className="absolute right-40 md:right-52 hidden md:flex items-center">
          <Link
            className="border-b hover:border-none text-xs md:text-base"
            href="/categories/books"
          >
            View more
          </Link>
        </div>
      </div>
      <div className="w-full max-w-7xl xl:max-w-full mx-auto">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredFew.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2">
                  <Card className="relative w-[70vw] md:w-full 2xl:w-[21vw] bg-[#fffcf7] border border-[#2b0909] h-[52vh] md:h-[58vh] xl:h-[64vh] 2xl:h-[38vh]">
                    <CardHeader className="relative p-0">
                      {item.discount ? (
                        <div className="absolute top-2 left-2 z-10 bg-[#ff8080] text-white px-2 py-1 rounded-full text-sm font-bold">
                          {item.discount}% OFF
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <Image
                        src={
                          item.images.length > 0
                            ? item.images[0].image
                            : "/books/english.png"
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
                        <CardTitle className="text-base">
                          {item.title}
                        </CardTitle>
                      </Link>
                    </CardContent>
                    <CardFooter className="absolute bottom-0  md:-bottom-2 right-0 md:flex items-center justify-between w-full px-4">
                      {item.discount ? (
                        <div className="flex flex-col md:flex-row gap-1 md:gap-2 items-center">
                          <h3 className="text-lg font-bold truncate tracking-tighter text-[#2b0909]">
                            KES{" "}
                            {(
                              item.price *
                              (1 - item.discount / 100)
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </h3>
                          <span className="text-xs sm:text-sm text-gray-500 line-through">
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
          <CarouselPrevious className="bg-[#ffbfbf] text-[#2b0909] absolute -top-9 md:-top-10 -translate-y-1/2 right-20 md:right-28 transform hover:bg-[#e67373] transition-colors" />
          <CarouselNext className="bg-[#ffbfbf] text-[#2b0909] absolute -top-9 md:-top-10 -translate-y-1/2 right-2 md:right-8 transform hover:bg-[#e67373] transition-colors" />
        </Carousel>
      </div>
      <div className="flex md:hidden items-center mt-2">
        <Link
          className="border border-[#350203] hover:bg-[#350203] hover:text-white  rounded-xl px-8 py-1 text-sm"
          href="/categories/books"
        >
          View more
        </Link>
      </div>
    </section>
  );
}
