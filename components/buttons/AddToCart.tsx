import React from "react";
import { useCartContext } from "@/providers/CartContext";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AddToCartProps {
  productId: number;
}

export default function AddToCart({ productId }: AddToCartProps) {
  const { addToCart } = useCartContext();
  const { status } = useSession();
  const router = useRouter();

  const handleAddToCart = () => {
    if (status === "authenticated") {
      addToCart(productId, 1);
    } else {
      router.push("/signin");
    }
  };

  return (
    <Button
      className="flex items-center justify-center gap-3 w-full bg-[#ff8080] text-white px-6 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-[#e67373] transition-colors md:mt-0 text-xs md:text-sm lg:text-base border border-[#2b0909]"
      onClick={handleAddToCart}
    >
      <BsFillCartPlusFill size={20} />
    </Button>
  );
}
