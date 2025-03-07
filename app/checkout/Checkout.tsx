"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartContext } from "@/providers/CartContext";
import { CartItem } from "@/types/types";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Lock,
  Check,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";

const CheckoutPage = () => {
  const { cart } = useCartContext();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");

  // Calculate subtotal
  const subtotal = (cart || []).reduce(
    (sum: number, item: CartItem) => sum + item.total_price,
    0
  );

  // Shipping cost based on selection
  const shippingCost = shippingMethod === "express" ? 250 : 100;

  // Free shipping on orders over 5000
  const qualifiesForFreeShipping = subtotal > 5000;
  const finalShippingCost = qualifiesForFreeShipping ? 0 : shippingCost;

  // Calculate total
  const total = subtotal + finalShippingCost;

  // Get flattened cart items array
  const cartItems = cart ? cart.flatMap((cartObj) => cartObj.items ?? []) : [];

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
        return (
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" className="mt-1" />
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
            <RadioGroup
              value={shippingMethod}
              onValueChange={setShippingMethod}
              className="space-y-3"
            >
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  shippingMethod === "standard"
                    ? "border-[#2b0909] bg-[#2b0909]/5"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start">
                  <RadioGroupItem
                    value="standard"
                    id="standard"
                    className="mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <Label
                      htmlFor="standard"
                      className="font-medium text-base cursor-pointer"
                    >
                      Standard Delivery
                    </Label>
                    <p className="text-sm text-gray-600">3-5 business days</p>
                    <p className="text-sm font-medium mt-1">
                      {qualifiesForFreeShipping
                        ? "Free"
                        : `KES ${shippingCost.toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  shippingMethod === "express"
                    ? "border-[#2b0909] bg-[#2b0909]/5"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start">
                  <RadioGroupItem
                    value="express"
                    id="express"
                    className="mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <Label
                      htmlFor="express"
                      className="font-medium text-base cursor-pointer"
                    >
                      Express Delivery
                    </Label>
                    <p className="text-sm text-gray-600">1-2 business days</p>
                    <p className="text-sm font-medium mt-1">
                      {qualifiesForFreeShipping ? "Free" : `KES ${250}`}
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>

            <Button
              className="w-full mt-6 text-white"
              style={{ backgroundColor: "#2b0909" }}
              onClick={() => setStep(2)}
            >
              Continue to Payment
            </Button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-3 mb-6"
            >
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "credit-card"
                    ? "border-[#2b0909] bg-[#2b0909]/5"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start">
                  <RadioGroupItem
                    value="credit-card"
                    id="credit-card"
                    className="mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <Label
                      htmlFor="credit-card"
                      className="font-medium text-base cursor-pointer"
                    >
                      Credit Card
                    </Label>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <div className="flex gap-1">
                        <span className="bg-blue-500 text-white rounded px-1 text-xs">
                          VISA
                        </span>
                        <span className="bg-red-500 text-white rounded px-1 text-xs">
                          MC
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "mpesa"
                    ? "border-[#2b0909] bg-[#2b0909]/5"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start">
                  <RadioGroupItem value="mpesa" id="mpesa" className="mt-1" />
                  <div className="ml-3 flex-1">
                    <Label
                      htmlFor="mpesa"
                      className="font-medium text-base cursor-pointer"
                    >
                      M-Pesa
                    </Label>
                    <p className="text-sm text-gray-600">
                      Pay using M-Pesa mobile money
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "paypal"
                    ? "border-[#2b0909] bg-[#2b0909]/5"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start">
                  <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
                  <div className="ml-3 flex-1">
                    <Label
                      htmlFor="paypal"
                      className="font-medium text-base cursor-pointer"
                    >
                      PayPal
                    </Label>
                    <p className="text-sm text-gray-600">
                      Pay using your PayPal account
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>

            {paymentMethod === "credit-card" && (
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="XXX" className="mt-1" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "mpesa" && (
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="e.g. 07XX XXX XXX"
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
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
                onClick={() => setStep(3)}
              >
                Review Order
              </Button>
            </div>
          </motion.div>
        );

      case 3:
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
                            <span className="font-medium">
                              KES{" "}
                              {(item.product?.price * item.quantity).toFixed(2)}
                            </span>
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
                <AccordionContent>
                  <div className="space-y-2 mt-2">
                    <p>
                      <span className="font-medium">Name:</span> John Doe
                    </p>
                    <p>
                      <span className="font-medium">Address:</span> 123 Main St,
                      Nairobi
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      john@example.com
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> +254 712 345
                      678
                    </p>
                    <p className="mt-3 font-medium">Shipping Method:</p>
                    <p className="flex items-center">
                      <Check size={16} className="text-green-500 mr-1" />
                      {shippingMethod === "standard"
                        ? "Standard Delivery (3-5 days)"
                        : "Express Delivery (1-2 days)"}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payment">
                <AccordionTrigger className="text-base font-medium">
                  Payment Method
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2">
                    <p className="flex items-center">
                      <Check size={16} className="text-green-500 mr-1" />
                      {paymentMethod === "credit-card"
                        ? "Credit Card (XXXX XXXX XXXX 1234)"
                        : paymentMethod === "mpesa"
                        ? "M-Pesa (07XX XXX XXX)"
                        : "PayPal"}
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
                    <span>Taxes</span>
                    <span>KES 0</span>
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
                    <span>KES {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Lock size={14} className="mr-1" />
                All information is encrypted and secure
              </div>
              <div className="flex items-start">
                <input type="checkbox" id="terms" className="mt-1" />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the Terms and Conditions and Privacy Policy
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button
                className="flex-1 text-white"
                style={{ backgroundColor: "#2b0909" }}
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
                    <span>Taxes</span>
                    <span>KES 0</span>
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
                      Free shipping on orders over KES 5,000
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Total</span>
                  <span>KES {total.toFixed(2)}</span>
                </div>

                <div className="text-sm text-gray-600 space-y-4">
                  <div className="flex items-center gap-2">
                    <Truck size={16} />
                    <div>
                      <div className="font-medium">
                        {shippingMethod === "standard"
                          ? "Standard Delivery"
                          : "Express Delivery"}
                      </div>
                      <div className="text-xs">
                        {shippingMethod === "standard"
                          ? "Estimated delivery: 3-5 business days"
                          : "Estimated delivery: 1-2 business days"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    <div>
                      <div className="font-medium">
                        {paymentMethod === "credit-card"
                          ? "Credit Card"
                          : paymentMethod === "mpesa"
                          ? "M-Pesa"
                          : "PayPal"}
                      </div>
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
