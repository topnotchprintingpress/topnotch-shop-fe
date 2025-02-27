"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Minus,
  X,
  ShoppingBag,
  ArrowRight,
  Heart,
  Truck,
  CreditCard,
} from "lucide-react";

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Premium Leather Wallet",
    price: 59.99,
    quantity: 1,
    image: "/api/placeholder/80/80",
  },
  {
    id: 2,
    name: "Handcrafted Ceramic Mug",
    price: 24.99,
    quantity: 2,
    image: "/api/placeholder/80/80",
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    quantity: 1,
    image: "/api/placeholder/80/80",
  },
];

// Main component
const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [savedItems, setSavedItems] = useState([]);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.08; // 8% tax rate
  const shipping = subtotal > 100 ? 0 : 12.99;
  const total = subtotal + taxes + shipping;

  // Handle quantity changes
  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Save item for later
  const saveForLater = (id) => {
    const itemToSave = cartItems.find((item) => item.id === id);
    if (itemToSave) {
      setSavedItems((prev) => [...prev, itemToSave]);
      removeItem(id);
    }
  };

  // Move saved item back to cart
  const moveToCart = (id) => {
    const itemToMove = savedItems.find((item) => item.id === id);
    if (itemToMove) {
      setCartItems((prev) => [...prev, itemToMove]);
      setSavedItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

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

  return (
    <div
      className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto p-4"
      style={{ color: "#2b0909", background: "#fffcf7" }}
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
            Your Cart ({cartItems.length})
          </h2>
          <Button
            variant="outline"
            className="text-sm"
            style={{ borderColor: "#2b0909", color: "#2b0909" }}
          >
            Continue Shopping
          </Button>
        </div>

        {/* Cart items */}
        <Card className="mb-6 bg-white shadow-sm">
          <CardContent className="p-0">
            <AnimatePresence>
              {cartItems.map((item) => (
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
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-2">
                        <div className="flex items-center border rounded-md">
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
                          <span className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => saveForLater(item.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <Heart size={18} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
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

            {cartItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <ShoppingBag className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-500">Your cart is empty</p>
                <Button className="mt-4" style={{ backgroundColor: "#2b0909" }}>
                  Start Shopping
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Saved for later */}
        {savedItems.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Saved for Later ({savedItems.length})
            </h3>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-0">
                <AnimatePresence>
                  {savedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      exit="exit"
                      className="p-4 border-b last:border-b-0"
                      whileHover={{ backgroundColor: "rgba(43, 9, 9, 0.02)" }}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold">
                              ${item.price.toFixed(2)}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => moveToCart(item.id)}
                              className="text-xs"
                              style={{
                                borderColor: "#2b0909",
                                color: "#2b0909",
                              }}
                            >
                              Move to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        )}
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  Free shipping on orders over $100
                </div>
              )}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
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

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full text-white flex items-center justify-center gap-2"
                size="lg"
                style={{ backgroundColor: "#2b0909" }}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ShoppingCart;
