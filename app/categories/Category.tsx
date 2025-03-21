"use client";
import React from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import PaginationComponent from "@/components/navigation/PaginationComponent";
import { ProductBase } from "@/types/types";
import AddToCart from "@/components/buttons/AddToCart";

interface CategoryPageProps {
  main_category: string;
  products: ProductBase[];
  totalPages: number;
  currentPage: number;
}

const CategoryPage = ({
  main_category,
  products,
  totalPages,
  currentPage,
}: CategoryPageProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-full min-h-screen bg-[#fffcf7] text-[#2b0909]">
      {/* Category Header */}
      <motion.div
        className="relative w-full h-16 overflow-hidden rounded-b-lg mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 flex flex-col justify-center p-8 z-20 text-[#2b0909]">
          <motion.h4
            className="text-4xl font-bold mb-2 capitalize"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {main_category}
          </motion.h4>
        </div>
      </motion.div>
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main container with filter sidebar and products */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Products */}
          <motion.div
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <motion.div
                  key={item.id}
                  className="group"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
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
                    <CardFooter className="absolute bottom-0  md:-bottom-2 right-0 md:flex items-center justify-between w-full px-4 border-t border-[#2b0909] py-4">
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
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {products.length > 0 && (
              <motion.div
                className="mt-8 flex justify-center"
                variants={fadeIn}
              >
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
