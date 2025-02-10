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

interface OfferItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const offerItems: OfferItem[] = [
  {
    id: 1,
    name: "Hewlett-Packard Printer Laser Printing",
    description: "printer",
    price: 56000,
    imageUrl: "/tech/printer.png",
  },
  {
    id: 2,
    name: "HP EliteBook Laptop Intel Core i5",
    description: "laptop",
    price: 1200,
    imageUrl: "/tech/laptop.png",
  },
  {
    id: 3,
    name: "HP Desktop Computer",
    description: "computer",
    price: 2000,
    imageUrl: "/tech/tower.png",
  },
  {
    id: 4,
    name: "iPad Pro 13 M4",
    description: "tablet",
    price: 2000,
    imageUrl: "/tech/ipad.png",
  },
  {
    id: 5,
    name: "Hewlett-Packard Printer Inkjet Printing",
    description: "printer",
    price: 56000,
    imageUrl: "/tech/inkjet.png",
  },
];

export default function TechProds() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));

  return (
    <section className="bg-white w-full px-4 py-8 md:py-4 lg:py-2 xl:px-24 2xl:px-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
        <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
          Featured Technology
        </h3>
        <h3></h3>
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
            {offerItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/1 md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-2">
                  <Card className="relative bg-[#fffcf7] border border-[#2b0909] w-[70vw] md:w-full md:h-[56vh]">
                    <CardHeader className="relative p-0">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        width={300}
                        height={200}
                        alt={item.name}
                        className="w-full h-52 object-contain rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-sm md:text-base xl:text-lg mb-2">
                        {item.name}
                      </CardTitle>
                      <p className="text-xs text-gray-600">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-sm md:text-base xl:text-lg font-bold">
                          Ksh.{item.price.toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="absolute -bottom-2 right-0">
                      <Link
                        href="/shop"
                        className="flex items-center justify-center gap-3 w-full bg-[#ff8080] text-white px-1 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-[#e67373] transition-colors md:mt-0 text-xs md:text-sm lg:text-base border border-[#2b0909]"
                      >
                        <BsFillCartPlusFill size={20} />
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
