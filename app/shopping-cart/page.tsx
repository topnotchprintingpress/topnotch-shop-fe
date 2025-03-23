"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartContext } from "@/providers/CartContext";
import { CartItem } from "@/types/types";
import {
  Plus,
  Minus,
  X,
  ShoppingBag,
  ArrowRight,
  Truck,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

// Main component
const ShoppingCart = () => {
  const { cart, removeFromCart, updateCart } = useCartContext();

  // Ensure cart is always an array (fallback to empty array if undefined)
  const subtotal = (cart || []).reduce(
    (sum: number, item: CartItem) => sum + item.total_price,
    0
  );

  // Animation variants
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
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

  const cartItems: CartItem[] = cart
    ? cart.flatMap((cartObj) => cartObj.items ?? [])
    : [];

  const updateQuantity = (itemId: number, change: number) => {
    const currentItem = cartItems.find((item) => item.id === itemId);
    if (!currentItem) return;

    const newQuantity = Math.max(1, currentItem.quantity + change); // Prevents negative or zero quantity
    updateCart(itemId, newQuantity);
  };

  return (
    <section className="w-full bg-[#fffcf7]">
      <div
        className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto p-4"
        style={{ color: "#2b0909" }}
      >
        {/* Cart Items Section */}
        <motion.div
          className="flex-1"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Your Cart ({cartItems?.length || 0})
            </h2>
            <Button
              variant="outline"
              className="text-sm text-[#2b0909] rounded-3xl"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Cart items */}
          <Card className="mb-6 bg-white shadow-sm">
            <CardContent className="p-0">
              <AnimatePresence>
                {cartItems.map((item: CartItem) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    exit="exit"
                    layout
                    className="p-4 border-b last:border-b-0"
                    whileHover={{ backgroundColor: "rgba(43, 9, 9, 0.02)" }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.img
                        src={
                          item?.product?.images.length > 0
                            ? item.product.images[0].image
                            : "/books/chem.png"
                        }
                        alt={item.product?.title}
                        className="w-20 h-20 object-contain rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">
                          {item.product?.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-2">
                          <div className="flex items-center border rounded-md justify-between">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              className="p-1 px-2"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus size={16} />
                            </motion.button>
                            <span className="px-4">{item.quantity}</span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              className="p-1 px-2"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus size={16} />
                            </motion.button>
                          </div>
                          <div className="flex items-center gap-4">
                            {item.product.discount ? (
                              <div className="flex flex-col md:flex-row gap-1 md:gap-2 items-center">
                                <h3 className="text-lg font-bold truncate tracking-tighter text-[#2b0909]">
                                  KES{" "}
                                  {(
                                    item.product.price *
                                    (1 - item.product.discount / 100)
                                  ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </h3>
                                <span className="text-xs sm:text-sm text-gray-500 line-through">
                                  KES{" "}
                                  {item.product.price.toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </span>
                              </div>
                            ) : (
                              <h3 className="text-lg font-bold truncate tracking-tighter text-[#2b0909]">
                                KES{" "}
                                {item.product.price.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </h3>
                            )}

                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item?.id)}
                                className="text-gray-500 hover:text-red-500"
                              >
                                <X size={18} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {cart?.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center"
                >
                  <ShoppingBag
                    className="mx-auto mb-4 text-gray-400"
                    size={48}
                  />
                  <p className="text-gray-500 mb-6">Your cart is empty</p>
                  <Link
                    href="/"
                    className="mt-4 p-4 bg-[#2b0909] rounded-3xl text-[#fffcf7]"
                  >
                    Start Shopping
                  </Link>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Summary Section */}
        <motion.div
          className="w-full lg:w-96"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="sticky top-4 bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    KES{" "}
                    {subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Free shipping for more than 10 books
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total</span>
                <span>
                  KES{" "}
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Delivery & Payment Options */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Truck size={18} />
                  <div className="text-sm">
                    <div className="font-medium">Standard Delivery</div>
                    <div className="text-gray-500">
                      Estimated delivery: 3-5 business days
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CreditCard size={18} />
                  <div className="text-sm">
                    <div className="font-medium">Payment Methods</div>
                    <div className="text-gray-500">
                      Credit Card, PayPal, Apple Pay
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={cartItems.length > 0 ? `/checkout` : "#"}
                  className="w-full bg-[#2b0909] p-3 text-white flex items-center justify-center gap-2 rounded-xl"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ShoppingCart;
