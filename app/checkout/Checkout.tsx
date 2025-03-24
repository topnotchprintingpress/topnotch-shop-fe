"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartContext } from "@/providers/CartContext";
import { useShippingContext } from "@/providers/ShippingContext";
import { CartItem } from "@/types/types";
import { ArrowLeft, CreditCard, Lock, Check, ChevronRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";

// components
import Shipping from "./Shipping";

const CheckoutPage = () => {
  const { cart } = useCartContext();
  const { shipping } = useShippingContext();
  const [step, setStep] = useState(1);

  const cartItems: CartItem[] = cart
    ? cart.flatMap((cartObj) => cartObj.items ?? [])
    : [];

  // Calculate subtotal
  const subtotal = (cart || []).reduce(
    (sum: number, item: CartItem) => sum + item.total_price,
    0
  );
  const shippingCost = 200;

  const numberOfBooks = cartItems.reduce(
    (count, item) =>
      item.product.main_category === "Books" ? count + item.quantity : count,
    0
  );
  const qualifiesForFreeShipping = numberOfBooks >= 10;
  const finalShippingCost = qualifiesForFreeShipping ? 0 : shippingCost;

  // Calculate total
  const grandTotal = subtotal + finalShippingCost;
  console.log("GRAND TOTAL", grandTotal);

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <motion.div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNumber
                ? "bg-[#2b0909] text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            animate={{
              scale: step === stepNumber ? 1.1 : 1,
              backgroundColor: step >= stepNumber ? "#2b0909" : "#e5e7eb",
            }}
          >
            {stepNumber}
          </motion.div>
          {stepNumber < 3 && (
            <div className="w-20 h-0.5 mx-1 bg-gray-200 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#2b0909]"
                initial={{ width: "0%" }}
                animate={{
                  width: step > stepNumber ? "100%" : "0%",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Shipping onNextStep={() => setStep(2)} />;

      case 2:
        return (
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-lg font-semibold mb-4">Review Your Order</h3>

            <Accordion
              type="single"
              collapsible
              defaultValue="items"
              className="mb-6"
            >
              <AccordionItem value="items">
                <AccordionTrigger className="text-base font-medium">
                  Order Items ({cartItems.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 mt-2">
                    {cartItems.map((item: CartItem) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 py-2"
                      >
                        <Image
                          width={200}
                          height={200}
                          src={
                            item?.product?.images.length > 0
                              ? item.product.images[0].image
                              : "/placeholder.svg"
                          }
                          alt={item.product?.title}
                          className="w-16 h-16 object-contain rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product?.title}</h4>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </span>
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-base font-medium">
                  Shipping Information
                </AccordionTrigger>
                {shipping.map((ship) => (
                  <AccordionContent key={ship.id}>
                    <div className="space-y-2 mt-2">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {ship.first_name} {ship.last_name}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {ship.apartment} {ship.street_address}, {ship.city}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {ship.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {ship.phone_number}
                      </p>
                    </div>
                  </AccordionContent>
                ))}
              </AccordionItem>

              <AccordionItem value="payment">
                <AccordionTrigger className="text-base font-medium">
                  Payment Method
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2">
                    <p className="flex items-center">
                      <Check size={16} className="text-green-500 mr-1" />
                      Credit Card | Mpesa
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Card className="mb-6">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KES {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {qualifiesForFreeShipping
                        ? "Free"
                        : `KES ${finalShippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>KES {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Lock size={14} className="mr-1" />
                All information is encrypted and secure
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1 text-white"
                style={{ backgroundColor: "#2b0909" }}
                onClick={handlePayment}
              >
                Place Order
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const handlePayment = async () => {
    try {
      console.log("Sending total to payment:", grandTotal); // Add this debug log

      const amount = grandTotal;
      const res = await fetch("/api/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }), // Ensure you pass order_id
      });
      const data = await res.json();

      if (data.status) {
        window.location.href = data.data.authorization_url;
      } else {
        console.error("Payment initialization failed:", data.message);
        alert("Payment initialization failed. Please try again.");
      }
    } catch (error) {
      console.error("Error handling subscription:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <section className="w-full bg-[#fffcf7]">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              className="p-0 mr-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-semibold" style={{ color: "#2b0909" }}>
              Checkout
            </h1>
          </div>

          {renderStepIndicator()}
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Main checkout form */}
          <div className="md:col-span-3">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">{renderStepContent()}</CardContent>
            </Card>
          </div>

          {/* Order summary */}
          <div className="md:col-span-2">
            <Card className="bg-white shadow-sm sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="text-sm mb-4">
                  <div className="flex justify-between mb-1">
                    <span>{cartItems.length} Items</span>
                    <button className="text-[#2b0909]/80 hover:text-[#2b0909] hover:underline flex items-center">
                      View
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <Separator className="mb-4" />

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KES {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {qualifiesForFreeShipping
                        ? "Free"
                        : `KES ${finalShippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  {!qualifiesForFreeShipping && (
                    <div className="text-xs text-gray-500 mt-1">
                      Free shipping on 10 books or more
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Total</span>
                  <span>KES {grandTotal.toFixed(2)}</span>
                </div>

                <div className="text-sm text-gray-600 space-y-4">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    <div>
                      <div className="font-medium">Credit Card | MPesa</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
