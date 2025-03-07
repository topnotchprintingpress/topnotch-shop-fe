// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsFillCartPlusFill } from "react-icons/bs";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => (
  <motion.div
    className="rounded-xl overflow-hidden hover:shadow-md transition-shadow"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <Card className="relative bg-[#fffcf7] border border-[#2b0909]">
      <CardHeader className="relative p-4">
        <Image
          src={product.images[0]?.image || "/placeholder.svg"}
          width={300}
          height={200}
          alt={product.title}
          className="w-full h-40 object-contain rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <CardTitle className="text-sm md:text-base xl:text-lg mb-2">
            {product.title}
          </CardTitle>
        </Link>
        <p className="text-xs text-gray-600">{product.category?.toString()}</p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-sm md:text-base xl:text-lg font-bold">
            KES {product.price}
          </span>
        </div>
      </CardContent>
      <CardFooter className="absolute -bottom-2 right-0">
        <Link
          href="/shop"
          className="flex items-center justify-center gap-3 w-full bg-[#ff8080] text-white px-1 md:px-5 py-1.5 rounded-full hover:bg-[#e67373]"
        >
          <BsFillCartPlusFill size={20} />
        </Link>
      </CardFooter>
    </Card>
  </motion.div>
);

export default ProductCard;
