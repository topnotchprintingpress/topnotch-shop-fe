"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/providers/ProductProvider";
import { Banner } from "@/types/types";
import { FaBoxOpen } from "react-icons/fa";

function SaleBanner() {
  const context = useAppContext();
  const { bottomBanner } = context;

  const [banner, setBanner] = useState<Banner[]>([]);
  useEffect(() => {
    setBanner(bottomBanner || []);
  }, [bottomBanner]);
  const firstBanner = banner[0];

  return (
    <section className="w-full flex justify-center items-center md:py-8 bg-[#fffcf7]">
      {firstBanner ? (
        <div className="flex justify-center items-center mx-auto p-4 md:p-0">
          <Link href="#">
            <Image
              src={firstBanner.image || "/banner.jpg"}
              width={1200}
              height={48}
              alt={firstBanner.title}
              className="border-2 border-[#ff8080] shadow-2xl"
            />
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-7xl xl:max-w-full mx-auto flex flex-col items-center justify-center py-12">
          <FaBoxOpen className="text-6xl text-gray-400 mb-4" /> {/* Icon */}
          <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">
            No Items Available
          </h3>
          <p className="text-sm md:text-base text-gray-500 text-center">
            Check back later for discounted items.
          </p>
        </div>
      )}
    </section>
  );
}

export default SaleBanner;
