import React from "react";
import CheckoutPage from "./Checkout";
import { ShippingProvider } from "@/providers/ShippingContext";

function page() {
  return (
    <ShippingProvider>
      <CheckoutPage />
    </ShippingProvider>
  );
}

export default page;
