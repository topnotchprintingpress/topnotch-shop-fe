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
import { BsFillCartPlusFill } from "react-icons/bs";
import { useAppContext } from "@/providers/ProductProvider";
import { FaBoxOpen } from "react-icons/fa";
import { useCartContext } from "@/providers/CartContext";

export default function FeaturedBooks() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  const context = useAppContext();
  const { cart } = useCartContext();
  const { featuredBooks } = context;

  if (!featuredBooks || featuredBooks.length === 0) {
    return (
      <section className="bg-white w-full px-4 py-8 md:py-4 lg:py-2 xl:px-24 2xl:px-32 flex flex-col items-center justify-center">
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
    <section className="bg-white w-full px-4 py-8 md:py-4 lg:py-2 xl:px-24 2xl:px-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
        <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
          Featured Books
        </h3>
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
                  <Card className="w-full bg-[#fffcf7] border border-[#2b0909]">
                    <CardHeader className="relative p-0">
                      <div className="absolute top-2 left-2 z-10 bg-[#ff8080] text-white px-2 py-1 rounded-full text-sm font-bold">
                        {item.discount}% OFF
                      </div>
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
                      <Link href={`/product/${item.slug}`}>
                        <CardTitle className="text-sm md:text-base xl:text-lg mb-2">
                          {item.title}
                        </CardTitle>
                      </Link>
                      <p className="text-xs text-gray-600">
                        {item.main_category}
                      </p>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-sm md:text-base xl:text-lg font-bold">
                          KES {item.price * (1 - item.discount / 100)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          KES {item.price}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/shop"
                        className="flex items-center justify-center gap-3 w-full bg-[#ff8080] text-white px-1 md:px-5 py-1.5 md:py-2 rounded-md hover:bg-[#e67373] transition-colors md:mt-0 text-xs md:text-sm lg:text-base"
                      >
                        <BsFillCartPlusFill size={20} />
                        Add to Cart
                      </Link>
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
    </section>
  );
}
