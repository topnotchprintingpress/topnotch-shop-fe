"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { ShippingAddress, Order } from "@/types/types";

interface ShippingContextType {
  shipping: ShippingAddress[];
  order: Order[];
  addShipping: (addressData: Partial<ShippingAddress>) => Promise<void>;
  fetchShipping: () => Promise<void>;
  updateShipping: () => Promise<void>;
  fetchOrder: () => Promise<void>;
}

const ShippingContext = createContext<ShippingContextType | undefined>(
  undefined
);

export const ShippingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shipping, setShipping] = useState<ShippingAddress[]>([]);
  const [order, setOrder] = useState<Order[]>([]);

  // Fetch the user's cart
  const fetchShipping = async () => {
    try {
      const response = await fetch("/api/shipping/", {
        method: "GET",
        credentials: "include",
      });
      console.log("Shipping API Response Status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Cart Data:", data); // Log the cart data

        setShipping(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Add an item to the cart
  const addShipping = async (addressData: Partial<ShippingAddress>) => {
    const session = await getSession();

    if (!session || !session.access) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`api/shipping/add/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`, // <-- Ensure token is sent
        },
        body: JSON.stringify({ ...addressData }),
      });

      if (response.ok) {
        await fetchShipping();
      } else {
        console.error("Failed to add shipping info:", await response.text());
      }
    } catch (error) {
      console.error("Error adding shipping info:", error);
    }
  };

  // Update an item in the cart
  const updateShipping = async () => {
    const session = await getSession();

    if (!session || !session.access) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`/api/cart/update/`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        console.error("Failed to update shipping info:", await response.text());
        return;
      }

      await fetchShipping(); // Refresh cart after update
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };

  // Fetch the user's cart
  const fetchOrder = async () => {
    try {
      const response = await fetch("/api/order/", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const orderData = data.results;

        setOrder(orderData.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  useEffect(() => {
    fetchShipping();
    fetchOrder();
  }, []);

  return (
    <ShippingContext.Provider
      value={{
        shipping,
        fetchShipping,
        addShipping,
        updateShipping,
        order,
        fetchOrder,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

export function useShippingContext() {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error("useShipping must be used within a CartProvider");
  }
  return context;
}
