"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types/types";
import { getSession } from "next-auth/react";

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  updateCart: (itemId: number, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch the user's cart
  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart/", {
        method: "GET",
        credentials: "include",
      });
      console.log("Cart API Response Status:", response.status);
      if (response.ok) {
        const data = await response.json();
        const cartProds = data.results;
        console.log("Fetched Cart Data:", data); // Log the cart data

        setCart(cartProds);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Add an item to the cart
  const addToCart = async (productId: number, quantity: number) => {
    const session = await getSession();

    if (!session || !session.access) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`api/cart/items/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`, // <-- Ensure token is sent
        },
        body: JSON.stringify({ product: productId, quantity }),
      });

      if (response.ok) {
        await fetchCart();
      } else {
        console.error("Failed to add item:", await response.text());
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Update an item in the cart
  const updateCart = async (itemId: number, quantity: number) => {
    const session = await getSession();

    if (!session || !session.access) {
      console.error("User not authenticated");
      return;
    }

    if (typeof quantity !== "number") {
      console.error("Invalid quantity:", quantity);
      return;
    }

    try {
      console.log("Sending update request:", { id: itemId, quantity });

      const response = await fetch(`/api/cart/update/`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`,
        },
        body: JSON.stringify({ id: itemId, quantity }),
      });

      if (!response.ok) {
        console.error("Failed to update item:", await response.text());
        return;
      }

      await fetchCart(); // Refresh cart after update
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId: number) => {
    try {
      const response = await fetch(`/api/cart/remove?id=${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      await fetchCart(); // Refresh the cart
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, fetchCart, updateCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
