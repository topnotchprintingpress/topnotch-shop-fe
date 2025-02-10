import React from "react";
import Image from "next/image";
import Link from "next/link";

function SaleBanner() {
  return (
    <section className="w-full flex justify-center items-center md:py-8 bg-[#fffcf7]">
      <div className="relative flex justify-center items-center mx-auto p-4 md:p-0">
        <Image
          src="/sale.png"
          width={1600}
          height={48}
          alt="Ad Banner"
          className="relative border-2 border-[#ff8080] shadow-2xl"
        />
        <Link
          href="#"
          className="absolute z-10 bg-[#2b0909] px-4 md:px-6 py-2 text-white bottom-6 right-6 md:right-auto md:bottom-8 hover:bg-transparent hover:border hover:border-[#2b0909] hover:text-[#2b0909]"
        >
          Buy now
        </Link>
      </div>
    </section>
  );
}

export default SaleBanner;
