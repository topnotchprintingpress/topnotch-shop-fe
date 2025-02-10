"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(true);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#fffcf7] z-50 h-[12vh] md:h-[18vh] xl:h-[10vh] w-full flex justify-center items-center px-4 md:px-2 border-b-2 border-[#2b0909]">
      <div className="container flex justify-between items-center mx-auto">
        {/* Branding Section */}
        <div>
          <Link href="">
            <Image
              src="/logo/Logo1.png"
              width={150}
              height={150}
              alt="Topnotch Logo"
              className="w-32 md:w-auto xl:w-52"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex gap-8 2xl:gap-12 items-center text-[#2b0909] font-bold text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/subjects", label: "About Us" },
              { href: "/topics", label: "Contact" },
              { href: "/subscription", label: "FAQ" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleNav}
                  className="block p-3 rounded-lg hover:bg-[#f8d6b6] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed top-[7rem] left-0 w-full h-[calc(100vh-4rem)] bg-[#fffcf7] transition-transform duration-300 ease-in-out shadow-2xl z-50 ${
            menuOpen ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="p-6 flex flex-col gap-6 overflow-y-auto">
            <ul className="flex flex-col gap-2 text-[#350203] font-semibold">
              {[
                { href: "/", label: "Home" },
                { href: "/subjects", label: "About Us" },
                { href: "/topics", label: "Contact" },
                { href: "/subscription", label: "FAQ" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleNav}
                    className="block p-3 rounded-lg hover:bg-[#f8d6b6] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/signup"
                onClick={handleNav}
                className="bg-[#f8d6b6] hover:bg-[#facba0] text-center py-3 rounded-lg text-[#350203] font-semibold"
              >
                Join Now
              </Link>
              <Link
                href="/signin"
                onClick={handleNav}
                className="text-center py-3 rounded-lg text-[#350203] font-semibold border-2 border-[#350203] hover:bg-[#f8d6b6] transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>

        {/* Right side of the Navbar */}
        <div className="flex">
          <div className="hidden md:flex gap-6 justify-center items-center font-semibold text-sm">
            <>
              <Link
                href="/signin"
                className="flex text-[#2b0909] justify-center items-center"
              >
                <MdOutlineShoppingCart className="relative text-[28px]" />
                <h4 className="ml-2 text-xs tracking-tighter">My cart</h4>
                <div className="absolute top-8 -ml-8 text-xs">
                  <p className="text-white p-2.5 font-bold bg-[#2b0909] rounded-[100%] w-[19px] h-[19px] flex justify-center items-center">
                    20
                  </p>
                </div>
              </Link>
              <Link
                href="/signup"
                className="flex text-[#2b0909] justify-center items-center"
              >
                <FaUserAlt size={16} />
                <h4 className="ml-4 text-xs tracking-tighter">My Account</h4>
              </Link>
            </>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="mobile-menu md:hidden" onClick={handleNav}>
            <BsMenuButtonWideFill
              size={30}
              className={
                menuOpen
                  ? "text-[#350203] cursor-pointer transition-all duration-700 ease-in-out"
                  : "hidden transition-all duration-700 ease-in-out"
              }
            />
            <RiCloseLargeFill
              size={30}
              className={
                !menuOpen
                  ? "text-[#350203] cursor-pointer transition-all duration-700 ease-in-out"
                  : "hidden transition-all duration-700 ease-in-out"
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
