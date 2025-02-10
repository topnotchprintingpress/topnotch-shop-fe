import React from "react";
import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <section className="w-full flex justify-center items-center md:py-8 bg-[#fffcf7]">
      <div className="flex justify-center items-center mx-auto p-4 md:p-0">
        <Link href="#">
          <Image
            src="/banner.png"
            width={1200}
            height={48}
            alt="Ad Banner"
            className="border-2 border-[#ff8080] shadow-2xl"
          />
        </Link>
      </div>
    </section>
  );
}

export default Banner;
