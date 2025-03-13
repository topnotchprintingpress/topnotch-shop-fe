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
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/providers/ProductProvider";
import { ProductBase } from "@/types/types";
import { FaBoxOpen } from "react-icons/fa";
import AddToCart from "../buttons/AddToCart";

export default function LabProds() {
  const context = useAppContext();
  const { newLab } = context;
  const [labEquip, setLabEquip] = useState<ProductBase[]>([]);

  useEffect(() => {
    setLabEquip(newLab?.slice(0, 9) || []);
  }, [newLab]);

  if (!newLab || newLab.length == 0) {
    return (
      <section className="bg-white w-full px-4 md:px-8 py-8 md:py-4 lg:py-2 flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
          <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
            New Lab Equipment
          </h3>
        </div>
        <div className="w-full max-w-7xl xl:max-w-full mx-auto flex flex-col items-center justify-center py-12">
          <FaBoxOpen className="text-6xl text-gray-400 mb-4" /> {/* Icon */}
          <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">
            No Items Available
          </h3>
          <p className="text-sm md:text-base text-gray-500 text-center">
            Check back later for new lab equipment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white w-full px-4 md:px-8 py-8 md:py-4 lg:py-2 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
        <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
          New Lab Equipment
        </h3>
        <h3></h3>
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
            {labEquip.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/1 md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-2">
                  <Card className="relative bg-[#fffcf7] border border-[#2b0909] w-[70vw] md:w-full md:h-[56vh]">
                    <CardHeader className="relative p-0">
                      <Image
                        src={
                          item.images.length > 0
                            ? item.images[0].image
                            : "/placeholder.svg"
                        }
                        width={300}
                        height={200}
                        alt={item.title}
                        className="w-full h-52 object-contain rounded-t-lg"
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
                            KES {item.price * (1 - item.discount / 100)}
                          </h3>
                          <span className="text-xs sm:text-sm text-gray-500 line-through">
                            KES {item.price}
                          </span>
                        </div>
                      ) : (
                        <h3 className="text-lg font-bold truncate tracking-tighter text-[#2b0909]">
                          KES {item.price}
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
    </section>
  );
}
