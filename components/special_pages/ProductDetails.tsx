"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  Truck,
  Minus,
  Plus,
} from "lucide-react";
import useSWR from "swr";
import Loader from "@/components/custom/Loader";
import ProductNotFound from "@/components/errorpages/ProductNotFound";
import { useCartContext } from "@/providers/CartContext";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/types";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

// Fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url, { method: "GET", credentials: "include" });
  const data = await res.json();
  const prodDetails = data.results;
  return prodDetails.length > 0 ? prodDetails[0] : null;
};

const ProductDetailsClient = () => {
  const params = useParams();
  const { cart, updateCart, addToCart } = useCartContext();
  const router = useRouter();
  const { slug } = params;
  const { data: session } = useSession();

  const handleAddToCart = (productId: number) => {
    if (!session) {
      router.push("/signin");
      return;
    }

    addToCart(productId, 1);
  };
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

  const cartItems: CartItem[] = cart
    ? cart.flatMap((cartObj) => cartObj.items ?? [])
    : [];

  const updateQuantity = (itemId: number, change: number) => {
    if (!session) {
      router.push("/signin");
      return;
    }

    const currentItem = cartItems.find((item) => item.id === itemId);
    if (!currentItem) {
      addToCart(itemId, 1);
      return;
    }

    const newQuantity = Math.max(1, currentItem.quantity + change);

    updateCart(itemId, newQuantity);
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

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
              className="relative flex justify-center items-center rounded-xl overflow-hidden aspect-square bg-white shadow-xl border border-[#2b0909]"
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
            </motion.div>

            {/* Thumbnail Navigation */}
            <div className="flex space-x-2 mt-4 justify-center">
              {product?.images?.map((img: { image: string }, index: number) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 rounded-md overflow-hidden ${
                    currentImageIndex === index ? "" : "opacity-70"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  {img ? (
                    <Image
                      src={img.image}
                      width={64}
                      height={64}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
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

              {product.discount ? (
                <div className="flex flex-col md:flex-col gap-1 md:gap-0 items-start">
                  <span className="text-xs text-gray-500 line-through">
                    KES{" "}
                    {product.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <h3 className="text-lg font-bold  tracking-tighter text-[#2b0909]">
                    KES{" "}
                    {(
                      product.price *
                      (1 - product.discount / 100)
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h3>
                </div>
              ) : (
                <h3 className="text-lg font-bold truncate tracking-tighter text-[#2b0909]">
                  KES{" "}
                  {product.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
              )}

              <p className="text-[#2b0909]/80 mb-6">{product?.description}</p>

              {/* Quantity */}
              <div className="mb-6">
                <p className="font-medium mb-2">Quantity</p>
                <motion.div
                  variants={itemVariants}
                  exit="exit"
                  layout
                  className="p-4 border-b last:border-b-0"
                  whileHover={{ backgroundColor: "rgba(43, 9, 9, 0.02)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-2">
                        <div className="flex items-center border rounded-md justify-between">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="p-1 px-2"
                            onClick={() =>
                              updateQuantity(
                                cartItems.find((item) => item.id)?.id ??
                                  product.id,
                                -1
                              )
                            }
                          >
                            <Minus size={16} />
                          </motion.button>
                          <span className="px-4">
                            {cartItems.find((item) => item.id)?.quantity || 0}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="p-1 px-2"
                            onClick={() =>
                              updateQuantity(
                                cartItems.find((item) => item.id)?.id ??
                                  product.id,
                                +1
                              )
                            }
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
                <span>Free shipping on all orders with 10 books or more</span>
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
                    className="w-full bg-[#2b0909] hover:bg-[#2b0909]/90 text-white rounded-3xl flex items-center justify-center py-6"
                    onClick={() => handleAddToCart(product.id)}
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
                    className="w-full border-[#2b0909] text-[#2b0909] rounded-3xl hover:bg-[#2b0909]/5 py-6"
                    onClick={() => {
                      handleAddToCart(product.id);
                      router.push("/checkout");
                    }}
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
                    <li>
                      <span className="font-medium">Features:</span>{" "}
                      {product?.description}
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="text-[#2b0909]/80">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#2b0909]">
                  Shipping Information
                </h3>
                <p>
                  We offer free standard shipping on all orders with 10 books or
                  more. Standard shipping taKES 3-5 business days.
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

export default ProductDetailsClient;
