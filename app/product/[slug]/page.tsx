"use client";
import React, { use, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  ShoppingCart,
  Truck,
} from "lucide-react";
import useSWR from "swr";
import Loader from "@/components/custom/Loader";
import ProductNotFound from "@/components/errorpages/ProductNotFound";

// types
import { ProductDetail } from "@/types/types";

const fetcher = async (url: string) => {
  const res = await fetch(url, { method: "GET", credentials: "include" });
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
};

const ProductDetailsPage: React.FC<ProductDetail> = ({ params }) => {
  const { slug } = use(params);

  // Fetch product details
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(
    slug ? `${process.env.NEXT_PUBLIC_API_URL}/products?slug=${slug}` : null,
    fetcher,
    {
      onSuccess: (data) => console.log("API Response:", data),
      onError: (err) => console.error("API Error:", err),
    }
  );

  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //   const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  // Handlers
  const nextImage = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images?.length) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  if (error || !product) {
    return <ProductNotFound />;
  }

  return (
    <div className="bg-[#fffcf7] min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm flex items-center text-[#2b0909]/70">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span>Books</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="font-medium">{product?.title}</span>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="relative">
            <motion.div
              className="relative rounded-xl overflow-hidden aspect-square bg-white shadow-xl border border-[#2b0909]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {product?.images?.length > 0 &&
              product.images[currentImageIndex] ? (
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex].image}
                  alt={`${product?.title} - Image ${currentImageIndex + 1}`}
                  className="w-full max-h-[400px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}

              {/* Image Navigation */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5 text-[#2b0909]" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5 text-[#2b0909]" />
              </Button>

              {/* Wishlist button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 bg-white/80 hover:bg-white rounded-full shadow-sm"
              >
                <Heart className="h-5 w-5 text-[#2b0909]" />
              </Button>
            </motion.div>

            {/* Thumbnail Navigation */}
            <div className="flex space-x-2 mt-4 justify-center">
              {product?.images?.map((img: { image: string }, index: number) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 rounded-md overflow-hidden ${
                    currentImageIndex === index
                      ? "ring-2 ring-[#2b0909]"
                      : "opacity-70"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  {img ? (
                    <Image
                      src={img.image}
                      width={64}
                      height={64}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500 text-xs">No Image</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col text-[#2b0909]">
            <motion.div
              initial={{ opacity: 0, y: window.innerWidth > 768 ? 20 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>

              <p className="text-2xl font-semibold mb-6">
                KES {product?.price}
              </p>

              <p className="text-[#2b0909]/80 mb-6">{product?.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                {/* <p className="font-medium mb-2">
                  Color: <span className="font-normal">{selectedColor}</span>
                </p> */}
                {/* <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-[#2b0909]"
                          : "border-[#2b0909]/20"
                      }`}
                      style={{
                        backgroundColor:
                          color.toLowerCase() === "tan"
                            ? "#D2B48C"
                            : color.toLowerCase() === "black"
                            ? "#000000"
                            : color.toLowerCase() === "brown"
                            ? "#8B4513"
                            : "#FFFFFF",
                      }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div> */}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="font-medium mb-2">Quantity</p>
                <div className="flex items-center border border-[#2b0909]/20 rounded-md w-32">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#2b0909] h-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#2b0909] h-8"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product?.stock > 0 ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                    In Stock ({product?.stock} available)
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Shipping Info */}
              <div className="flex items-center mb-8 text-sm text-[#2b0909]/80">
                <Truck className="w-4 h-4 mr-2" />
                <span>Free shipping on orders over $100</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    variant="default"
                    className="w-full bg-[#2b0909] hover:bg-[#2b0909]/90 text-white flex items-center justify-center py-6"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-[#2b0909] text-[#2b0909] hover:bg-[#2b0909]/5 py-6"
                  >
                    Buy Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: window.innerWidth > 768 ? 20 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="border-b border-[#2b0909]/10 w-full justify-start mb-4 bg-transparent">
              <TabsTrigger
                value="details"
                className="text-[#2b0909] data-[state=active]:border-b-2 data-[state=active]:border-[#2b0909] rounded-none"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="text-[#2b0909] data-[state=active]:border-b-2 data-[state=active]:border-[#2b0909] rounded-none"
              >
                Reviews (0)
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="text-[#2b0909] data-[state=active]:border-b-2 data-[state=active]:border-[#2b0909] rounded-none"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="details"
              className="text-[#2b0909]/80 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#2b0909]">
                    Product Specifications
                  </h3>
                  <ul className="space-y-2">
                    {/* <li>
                      <span className="font-medium">Dimensions:</span>{" "}
                      {product.details.dimensions}
                    </li> */}
                    {/* <li>
                      <span className="font-medium">Material:</span>{" "}
                      {product.details.material}
                    </li> */}
                    <li>
                      <span className="font-medium">Features:</span>{" "}
                      {product?.description}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#2b0909]">
                    Care Instructions
                  </h3>
                  {/* <p>{product.details.care}</p> */}
                </div>
              </div>
            </TabsContent>

            {/* <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-[#2b0909]">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-[#2b0909]/80">
                        Based on {product.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                  <Button className="bg-[#2b0909] hover:bg-[#2b0909]/90 text-white">
                    Write a Review
                  </Button>
                </div>

                <Card className="border border-[#2b0909]/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">James W.</h4>
                        <div className="flex my-1">{renderStars(5)}</div>
                      </div>
                      <span className="text-sm text-[#2b0909]/60">
                        3 months ago
                      </span>
                    </div>
                    <p className="text-[#2b0909]/80 mt-2">
                      This bag exceeded my expectations. The leather quality is
                      exceptional and it's the perfect size for weekend trips.
                      The design is both functional and stylish.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-[#2b0909]/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">Emily R.</h4>
                        <div className="flex my-1">{renderStars(4)}</div>
                      </div>
                      <span className="text-sm text-[#2b0909]/60">
                        1 month ago
                      </span>
                    </div>
                    <p className="text-[#2b0909]/80 mt-2">
                      Beautiful bag with excellent craftsmanship. The only
                      reason for 4 stars instead of 5 is that I wish it had one
                      more interior pocket. Otherwise, it's perfect!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent> */}

            <TabsContent value="shipping" className="text-[#2b0909]/80">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#2b0909]">
                  Shipping Information
                </h3>
                <p>
                  We offer free standard shipping on all orders over $100.
                  Standard shipping taKES 3-5 business days. Express shipping
                  options are available at checkout.
                </p>

                <h3 className="text-lg font-semibold text-[#2b0909] mt-4">
                  Return Policy
                </h3>
                <p>
                  We accept returns within 30 days of delivery. Items must be
                  unused and in their original packaging. Please note that
                  custom or personalized items cannot be returned unless there
                  is a defect.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
