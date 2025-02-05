import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Categories from "../custom/Categories";

import { BsFillCartPlusFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaAward } from "react-icons/fa6";

const books = [
  {
    id: 1,
    title: "Topnotch Chemistry Guru",
    author: "F. Scott Fitzgerald",
    price: "Kes. 1200",
    image: "/books/chem.png",
  },
  {
    id: 2,
    title: "Topnotch English Guru",
    author: "Harper Lee",
    price: "Kes. 1200",
    image: "/books/english.png",
  },
  {
    id: 3,
    title: "Topnotch Maths Guru",
    author: "Topnotch Maths Guru",
    price: "Kes. 1500",
    image: "/books/maths2.png",
  },
  {
    id: 4,
    title: "Topnotch Form 2 Chemistry",
    author: "Topnotch Maths Guru",
    price: "Kes. 1500",
    image: "/books/form2chem.png",
  },
];

function Hero() {
  return (
    <section className="bg-white w-full px-4 py-0 md:py-16 lg:py-0 xl:px-24 2xl:px-32 flex flex-col items-center justify-center border-t border-[#2b0909] my-16 sm:my-14 md:my-4">
      <div className="w-full mt-4 mb-6">
        <Categories />
      </div>
      <div className="flex w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
        <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
          Best Sellers
        </h3>
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
            {books.map((book) => (
              <CarouselItem
                key={book.id}
                className="basis-1/1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2">
                  <Card className="bg-[#fffcf7] rounded-none">
                    <CardContent className="flex flex-col md:flex-row md:items-center gap-6 h-80 md:h-52 p-4 md:p-6 xl:p-10 border border-[#2b0909]">
                      <div className="flex justify-center items-center">
                        <Image
                          src={book.image}
                          alt={book.title}
                          width={100}
                          height={150}
                          className="w-28 md:w-auto object-cover rounded-md"
                        />
                      </div>
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <h4 className="text-sm md:text-base xl:text-lg font-semibold text-[#2b0909]">
                            {book.title}
                          </h4>
                          <p className="text-base lg:text-lg xl:text-lg font-bold text-[#ff8080]">
                            {book.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 xl:gap-8 mb-2 mt-2">
                          <div className="flex items-center gap-1">
                            <TbTruckDelivery size={12} />
                            <h3 className="text-[.6rem] xl:text-sm">
                              Fast Delivery
                            </h3>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaAward size={12} />
                            <h3 className="text-[.6rem] xl:text-sm text-nowrap">
                              Best Seller
                            </h3>
                          </div>
                        </div>
                        <Link
                          href="/shop"
                          className="flex items-center justify-center gap-3 w-full bg-[#ff8080] text-white px-1 md:px-5 py-1.5 md:py-2 rounded-md hover:bg-[#e67373] transition-colors md:mt-0 text-xs md:text-sm lg:text-base"
                        >
                          <BsFillCartPlusFill size={20} />
                          Add to Cart
                        </Link>
                      </div>
                    </CardContent>
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

export default Hero;
