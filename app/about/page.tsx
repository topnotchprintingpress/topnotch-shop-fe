import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Topnotch Printing Press",
  description:
    "Learn more about Topnotch Printing Press, a leading provider of educational materials. We specialize in books, stationery, tech, and lab equipment, helping educators and learners succeed.",

  openGraph: {
    title: "About Us - Topnotch Printing Press",
    description:
      "Topnotch Printing Press is dedicated to providing high-quality educational materials, including books, stationery, tech, and lab equipment. Our mission is to support education and innovation.",
    url: `${process.env.NEXT_SITE_URL}/about`,
    images: [
      {
        url: "/Logo1.png",
        width: 1200,
        height: 630,
        alt: "About Topnotch Printing Press",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_SITE_URL}/about`,
  },
};

function AboutPage() {
  return (
    <section className="overflow-hidden pt-2 pb-12 px-4 md:px-0 xl:pt-32 xl:px-20 lg:pt-2 lg:pb-[90px] bg-white dark:bg-dark">
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-col-reverse md:flex-row items-center justify-center md:justify-between xl:justify-around -mx-4">
          {/* Product Showcase Section */}
          <div className="w-12/12 px-4 xl:px-0 md:w-5/12 xl:w-1/3 mt-10 md:mt-0">
            <div className="flex items-center -mx-3 sm:-mx-4">
              <div className="w-10/12 px-3 sm:px-4 xl:w-1/2">
                <div className="py-3 sm:py-4">
                  <Image
                    src="/books/chem.png" // Replace with actual image path
                    alt="Textbook"
                    className="w-full rounded-2xl border-2 border-[#350203]"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="py-3 sm:py-4">
                  <Image
                    src="/books/phy3.png" // Replace with actual image path
                    alt="Stationery"
                    className="w-10/12 rounded-2xl border-2 border-[#350203]"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="relative z-10 my-4">
                  <Image
                    src="/books/english.png" // Replace with actual image path
                    alt="Lab Equipment"
                    className="w-10/12 rounded-2xl border-2 border-[#350203] bg-gradient-to-t from-blue-500 to-black"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="mt-10 lg:mt-0">
              <span className="block mb-2 text-base font-semibold text-[#3502038c]">
                Why Choose Topnotch Publishers
              </span>
              <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                Your One-Stop Shop for Educational Excellence
              </h2>
              <p className="mb-5 text-base text-body-color dark:text-dark-6">
                At Topnotch Publishers, we are dedicated to providing
                high-quality educational resources that empower students,
                educators, and institutions. Our wide range of products includes
                textbooks, premium stationery, and state-of-the-art laboratory
                equipment, all designed to meet the diverse needs of learners.
              </p>
              <p className="mb-8 text-base text-body-color dark:text-dark-6">
                Whether you{"'"}re a student preparing for exams, a teacher
                looking for classroom supplies, or a researcher needing
                specialized tools, we have everything you need to succeed. Our
                commitment to quality and reliability ensures that every product
                meets the highest standards.
              </p>
              <Link
                href="/products"
                className="py-3 px-5 font-medium text-[#350203] border-2 border-[#350203] hover:bg-[#350203] hover:text-[#f8d6b6] p-2 text-sm rounded-2xl"
              >
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
