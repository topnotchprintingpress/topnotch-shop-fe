"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const featuredProducts = [
  {
    id: 1,
    title: "Topnotch Chemistry Guru",
    author: "F. Scott Fitzgerald",
    price: 1200,
    image: "/banner.png",
  },
  {
    id: 2,
    title: "Topnotch English Guru",
    author: "Harper Lee",
    price: 1200,
    image: "/banner.png",
  },
  {
    id: 3,
    title: "Topnotch Maths Guru",
    author: "Topnotch Maths Guru",
    price: 1500,
    image: "/banner.png",
  },
];

export default function MainHero() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <section className="relative w-full mx-auto z-30">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {featuredProducts.map((prod, id) => (
            <CarouselItem key={id} className="relative w-full  mt-6 md:mt-0">
              <div className="p-1">
                <Card>
                  <Image
                    src={prod.image}
                    width={1200}
                    height={500}
                    alt="Product Image"
                    className="w-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-[#2b0909] text-white absolute bottom-0 md:top-8 -translate-y-1/2 right-20 md:right-28 transform hover:bg-[#e67373] transition-colors" />
        <CarouselNext className="bg-[#2b0909] text-white absolute bottom-0 md:top-8 -translate-y-1/2 right-2 md:right-8 transform hover:bg-[#e67373] transition-colors" />
      </Carousel>
    </section>
  );
}
