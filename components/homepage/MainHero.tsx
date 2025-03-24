"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useAppContext } from "@/providers/ProductProvider";
import { FaBoxOpen } from "react-icons/fa";
import { Banner } from "@/types/types";

export default function MainHero() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  const context = useAppContext();
  const { topBanner } = context;

  if (!topBanner || topBanner.length == 0) {
    <section className="bg-white w-full px-4 py-8 md:py-4 lg:py-2 xl:px-24 2xl:px-32 flex flex-col items-center justify-center">
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

  const [banner, setBanner] = useState<Banner[]>([]);
  useEffect(() => {
    setBanner(topBanner?.slice(0, 9) || []);
  }, [topBanner]);

  return (
    <section className="relative w-full mx-auto z-30">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {banner.map((prod, id) => (
            <CarouselItem key={id} className="relative w-full">
              <div className="p-1">
                <Link href={`/categories/${prod.link}`}>
                  <Card>
                    <Image
                      src={prod.image || "/path/to/default/image.jpg"}
                      width={1200}
                      height={48}
                      alt="Product Image"
                      className="w-full"
                    />
                  </Card>
                </Link>
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
