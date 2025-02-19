"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch the user's cart from the backend
  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart/");
      if (response.ok) {
        const data = await response.json();
        setCart(data.items);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Add an item to the cart
  const addToCart = async (productId: number, quantity: number) => {
    try {
      const response = await fetch("/api/cart/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      if (response.ok) {
        await fetchCart(); // Refresh the cart
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId: number) => {
    try {
      const response = await fetch(`/api/cart/items/${itemId}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchCart(); // Refresh the cart
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
