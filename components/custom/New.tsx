import React from "react";
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

const newProducts = [
  {
    id: 1,
    name: "Physics Form 3",
    description: "books",
    price: 1500,
    discountPercentage: 20,
    image: "/books/phy3.png",
  },
  {
    id: 2,
    name: "Chemistry Form 2",
    description: "books",
    price: 1200,
    discountPercentage: 15,
    image: "/books/form2chem.png",
  },
  {
    id: 3,
    name: "Maths Form 2",
    description: "books",
    price: 2000,
    discountPercentage: 25,
    image: "/books/maths2.png",
  },
  {
    id: 4,
    name: "Maths Guru Book 2",
    description: "books",
    price: 2000,
    discountPercentage: 25,
    image: "/books/maths2.png",
  },
  {
    id: 5,
    name: "Maths Guru Book 2",
    description: "books",
    price: 2000,
    discountPercentage: 25,
    image: "/books/maths2.png",
  },
  {
    id: 6,
    name: "Maths Guru Book 2",
    description: "books",
    price: 2000,
    discountPercentage: 25,
    image: "/books/maths2.png",
  },
  {
    id: 7,
    name: "Maths Guru Book 2",
    description: "books",
    price: 2000,
    discountPercentage: 25,
    image: "/books/maths2.png",
  },
  {
    id: 8,
    name: "Maths Guru Book 2",
    description: "books",
    price: 2000,
    discountPercentage: 25,
    image: "/books/maths2.png",
  },
];

function New() {
  return (
    <section className="bg-white w-full px-4 py-8 md:py-4 lg:py-2 xl:px-24 2xl:px-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl xl:max-w-full my-2 mx-2 bg-[#fffcf7] p-4 border border-[#2b0909]">
        <h3 className="text-sm md:text-base xl:text-xl border-[#2b0909] w-max px-1 tracking-wider font-bold">
          What{"'"}s New?
        </h3>
      </div>
      <div className="w-full max-w-7xl xl:max-w-full mx-auto">
        <div className="p-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          {newProducts.map((item) => (
            <Card
              key={item.id}
              className="relative w-full  shadow-none border border-[#2b0909]"
            >
              <CardHeader className="relative p-0">
                <div className="absolute top-2 left-2 z-10 bg-[#ff8080] text-white px-2 py-1 rounded-full text-sm font-bold">
                  new
                </div>
                <Image
                  src={item.image || "/placeholder.svg"}
                  width={300}
                  height={200}
                  alt={item.name}
                  className="w-full h-48 object-contain rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-sm md:text-base xl:text-lg mb-2">
                  {item.name}
                </CardTitle>
                <p className="text-base lg:text-lg xl:text-lg font-bold text-[#ff8080]">
                  Kes. {item.price}
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
