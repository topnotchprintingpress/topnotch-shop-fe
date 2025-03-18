// components/pages/CategoryPage.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Grid3x3,
  List,
  ChevronDown,
  ShoppingCart,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useAppContext } from "@/providers/ProductProvider";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BsFillCartPlusFill } from "react-icons/bs";
import PaginationComponent from "@/components/navigation/PaginationComponent";
import { ProductBase } from "@/types/types";
import AddToCart from "@/components/buttons/AddToCart";

interface CategoryPageProps {
  main_category: string; // The category to fetch (e.g., "books", "stationery", "technology")
  products: ProductBase[]; // Replace `any` with your actual Product type
  totalPages: number;
  currentPage: number;
}

const CategoryPage = ({
  main_category,
  products,
  totalPages,
  currentPage,
}: CategoryPageProps) => {
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 10000],
    ratings: null,
    author: null,
  });
  const [sortOption, setSortOption] = useState("popularity");

  const toggleFilters = () => setIsFilterOpen(!isFilterOpen);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
        className="relative w-full h-24 overflow-hidden rounded-b-lg mb-8"
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
        {/* Search and view controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          {/* Search within category */}
          <motion.div
            className="relative w-full md:w-96"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={`Search in ${main_category}...`}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2b0909] focus:border-[#2b0909] bg-white"
            />
          </motion.div>

          {/* View controls */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-[#2b0909] text-white"
                    : "bg-white text-[#2b0909]"
                }`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-[#2b0909] text-white"
                    : "bg-white text-[#2b0909]"
                }`}
              >
                <List size={20} />
              </button>
            </div>
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => {}}
                className="flex items-center space-x-1 border border-gray-300 rounded-md py-2 px-3 bg-white"
              >
                <ArrowUpDown size={16} />
                <span className="text-sm">Sort</span>
                <ChevronDown size={16} />
              </button>
            </div>
            {/* Filter button for mobile */}
            <button
              onClick={toggleFilters}
              className="md:hidden flex items-center space-x-1 border border-gray-300 rounded-md py-2 px-3 bg-white"
            >
              <Filter size={16} />
              <span className="text-sm">Filters</span>
            </button>
          </motion.div>
        </div>

        {/* Main container with filter sidebar and products */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar - hidden on mobile until toggled */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 768) && (
              <motion.div
                className={`w-full md:w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${
                  isFilterOpen
                    ? "fixed inset-0 z-50 md:relative md:z-auto overflow-auto"
                    : "hidden md:block"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isFilterOpen && (
                  <div className="flex justify-between items-center md:hidden mb-4">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <button onClick={toggleFilters} className="text-gray-500">
                      ✕
                    </button>
                  </div>
                )}
                <div className="space-y-6">
                  {/* Price range filter */}
                  <div>
                    <h3 className="font-semibold mb-3">Price Range</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        KES {selectedFilters.priceRange[0]}
                      </span>
                      <span className="text-sm">
                        KES {selectedFilters.priceRange[1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      defaultValue="0"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2b0909] mt-2"
                    />
                  </div>
                  {/* Author filter */}
                  <div>
                    <h3 className="font-semibold mb-3">Subjects</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {[
                        "Chemistry",
                        "Physics",
                        "Biology",
                        "English",
                        "Mathematics",
                        "Kiswahili",
                        "History",
                        "Geography",
                        "CRE",
                        "IRE",
                        "Agriculture",
                        "Business Studies",
                        "Computer Studies",
                        "Home Science",
                      ].map((subject) => (
                        <div key={subject} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`subject-${subject}`}
                            className="h-4 w-4 text-[#2b0909] focus:ring-[#2b0909] border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`subject-${subject}`}
                            className="ml-2 text-sm"
                          >
                            {subject}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Apply filters button */}
                  <button className="w-full py-2 bg-[#2b0909] text-white rounded-md hover:bg-[#2b0909]/90 transition-colors">
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products grid/list */}
          <motion.div
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((item) => (
                  <motion.div
                    key={item.id}
                    className="rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card className="relative bg-[#fffcf7] border border-[#2b0909] w-[70vw] md:w-[24vw] 2xl:w-[20vw] h-[52vh] md:h-[64vh] 2xl:h-[38vh]">
                      <CardHeader className="relative p-4">
                        <Image
                          src={
                            item.images.length > 0
                              ? item.images[0].image
                              : "/placeholder.svg"
                          }
                          width={300}
                          height={200}
                          alt={item.title}
                          className="w-full h-40 object-contain rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <Link href={`/product/${item.slug}`}>
                          <CardTitle className="text-sm md:text-base xl:text-lg mb-2">
                            {item.title}
                          </CardTitle>
                        </Link>
                        <p className="text-xs text-gray-600">
                          {item.category?.toString()}
                        </p>
                      </CardContent>
                      <CardFooter className="absolute bottom-0  md:-bottom-2 right-0 md:flex items-center justify-between w-full px-4">
                        {item.discount ? (
                          <div className="flex flex-col md:flex-row gap-1 md:gap-2 items-center">
                            <h3 className="text-lg font-bold tracking-tighter text-[#2b0909]">
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
            ) : (
              <div className="space-y-4">
                {products?.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#2b0909] hover:shadow-md transition-shadow"
                    variants={itemVariants}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-2 md:w-48 p-4">
                        <div className="aspect-[3/4] overflow-hidden rounded-md">
                          <Image
                            src={
                              item.images.length > 0
                                ? item.images[0].image
                                : "/placeholder.svg"
                            }
                            width={300}
                            height={200}
                            alt={item.title}
                            className="w-full md:h-52 object-contain rounded-t-lg"
                          />
                        </div>
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-sm md:text-lg xl:text-xl mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {item.category?.toString()}
                          </p>
                          <p className="text-gray-700 mb-4 text-sm hidden md:block">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">
                            KES{" "}
                            {item.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                          <motion.button
                            className="flex items-center space-x-1 bg-[#2b0909] text-white px-3 py-1.5 rounded-md text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ShoppingCart size={16} />
                            <span>Add to Cart</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {/* Pagination */}
            <motion.div className="mt-8 flex justify-center" variants={fadeIn}>
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
