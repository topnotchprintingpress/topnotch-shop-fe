import React from "react";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMailUnread } from "react-icons/io";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Topnotch Printing Press",
  description:
    "Get in touch with Topnotch Printing Press for any questions or inquiries about our educational materials, books, stationery, tech, and lab equipment. We're here to help you!",
  metadataBase: new URL(`${process.env.NEXT_SITE_URL}`),
  openGraph: {
    title: "Contact Us - Topnotch Printing Press",
    description:
      "Reach out to Topnotch Printing Press for inquiries about our educational materials, books, stationery, tech, and lab equipment. We’re here to assist you.",
    url: `${process.env.NEXT_SITE_URL}/contact`,
    images: [
      {
        url: "/Logo1.png",
        width: 1200,
        height: 630,
        alt: "Contact Topnotch Printing Press",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_SITE_URL}/contact`,
  },
};

function ContactPage() {
  return (
    <section
      className="contact bg-white w-full max-w-full px-4 pt-4 pb-6 md:p-16 md:pt-24 xl:px-24 2xl:p-24"
      id="cont"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-44 xl:gap-24 mx-auto items-center">
        {/* Left Section */}
        <div className="left">
          <div className="mb-12 text-left md:text-left">
            <div className="flex gap-4 items-center">
              <h4 className="text-[#2b0909] mb-1 md:mb-1 font-semibold text-sm md:text-base">
                CONTACT US
              </h4>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold">
              Trusted Partner for Educational Resources
            </h2>
            <p className="mt-4">
              At Topnotch Publishers, we specialize in providing high-quality
              books, stationery, and laboratory equipment to support your
              academic and professional needs. Whether you{"'"}re a student,
              educator, or researcher, we{"'"}re here to assist you. Have
              questions about our products or services? Reach out to us—we{"'"}
              re dedicated to helping you succeed.
            </p>
          </div>
          <hr className="border-[#2b0909]" />
          <div className="grid gap-6 md:flex md:gap-2 items-center mt-4 md:mt-12">
            <div className="link_1 flex items-center gap-6 bg-white p-4 md:p-2 xl:p-4 rounded-xl border-2 border-[#2b0909] w-full">
              <FaPhoneAlt
                size={40}
                className="bg-[#2b0909] text-white p-2 rounded-xl shadow-2xl shadow-[#2b0909]"
              />
              <div>
                <h6 className="md:text-sm">Call Us On:</h6>
                <Link
                  href="tel:+254742954513"
                  className="font-bold text-nowrap text-sm"
                >
                  +254 742 954513
                </Link>
              </div>
            </div>
            <div className="link_2 flex items-center gap-6 bg-white p-4 md:p-2 xl:p-4 rounded-xl border-2 border-[#2b0909] w-full">
              <IoIosMailUnread
                size={40}
                className="bg-[#2b0909] text-white p-2 rounded-xl shadow-2xl shadow-[#2b0909]"
              />
              <div>
                <h6 className="md:text-sm">Send Us an Email:</h6>
                <Link
                  href="mailto:admin@topnotchprintingpress.com"
                  className="font-bold text-sm"
                >
                  admin@topnotchprintingpress.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right mt-16 md:mt-0">
          <h4 className="text-2xl md:text-3xl font-bold md:text-center mb-8">
            Get In Touch With Us
          </h4>
          <form action="#" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                className="border border-[#2b0909] h-12 rounded-2xl p-4 placeholder-gray-500"
                placeholder="Your Name"
              />
              <input
                type="email"
                className="border border-[#2b0909] h-12 rounded-2xl p-4 placeholder-gray-500"
                placeholder="Your Email"
              />
              <input
                type="text"
                className="border border-[#2b0909] h-12 rounded-2xl p-4 placeholder-gray-500"
                placeholder="Subject"
              />
              <input
                type="tel"
                className="border border-[#2b0909] h-12 rounded-2xl p-4 placeholder-gray-500"
                placeholder="Your Phone Number"
              />
            </div>
            <textarea
              className="block w-full rounded-2xl h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-[#2b0909] md:h-48"
              name="message"
              placeholder="How can we assist you?"
            ></textarea>
            <button className="mt-8 bg-[#2b0909] w-full p-2 rounded-3xl text-white font-bold">
              Submit Your Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
