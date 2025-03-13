"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { RiCloseLargeFill } from "react-icons/ri";
import { MdManageAccounts, MdOutlineShoppingCart } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LuListOrdered } from "react-icons/lu";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";
import { SlUser } from "react-icons/sl";
import { useCartContext } from "@/providers/CartContext";
import SignOut from "../buttons/SignOut";
// shadcn components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Gift, Phone } from "lucide-react";

function Navbar() {
  const { cart } = useCartContext();
  const cartItems = cart ? cart.flatMap((cartObj) => cartObj.items ?? []) : [];
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  // Define the menu items for both desktop and mobile
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/best-sellers", label: "Best Sellers" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/deals", label: "Deals & Offers" },
  ];

  return (
    <>
      {/* Top info bar */}
      <div className="bg-[#2b0909] text-white px-4 md:px-12 2xl:px-0 py-2 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone size={14} className="mr-1" />
              <span>+254 742 954513</span>
            </div>
            <div className="hidden md:flex items-center">
              <Gift size={14} className="mr-1" />
              <span>Free shipping on orders over KES 5000</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
      {/* The end */}
      <nav className="bg-[#fffcf7] sticky top-0 z-50 antialiased px-0 md:px-6 2xl:px-0 border-b-2 border-[#2b0909]">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
          <div className="flex items-center justify-between">
            {/* Branding Section */}
            <div className="flex items-center space-x-8">
              <div className="shrink-0">
                <Link href="/">
                  <Image
                    src="/logo/Logo1.png"
                    width={130}
                    height={45}
                    alt="Topnotch Logo"
                    className="h-12 md:h-16 w-auto"
                  />
                </Link>
              </div>
              {/* Desktop Menu */}
              <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-bold text-[#2b0909] hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right Side of Navbar */}
            <div className="flex items-center lg:space-x-2">
              <Link
                href="/shopping-cart"
                className="flex text-[#2b0909] justify-center items-center "
              >
                <MdOutlineShoppingCart className="relative text-[28px]" />
                <h4 className="hidden md:block ml-2 text-xs tracking-tighter">
                  My cart
                </h4>
                <div className="absolute top-8 -ml-8 text-xs">
                  <p className="text-white p-2.5 font-bold bg-[#2b0909] rounded-[100%] w-[19px] h-[19px] flex justify-center items-center">
                    {cartItems?.length || 0}
                  </p>
                </div>
              </Link>
              {/* Account Dropdown (shadcn) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <button className="border-2 border-[#350203] p-2 rounded-full">
                      <SlUser size={20} className="text-[#350203]" />
                    </button>
                    <h4 className="ml-2 text-xs tracking-tighter font-semibold">
                      My Account
                    </h4>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {status === "authenticated" ? (
                    <>
                      <DropdownMenuLabel>
                        Hey, {session?.user.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => router.push("/Scollah/tutor")}
                        >
                          Account
                          <DropdownMenuShortcut>
                            <MdManageAccounts size={15} />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push("/my_account/orders")}
                        >
                          Orders
                          <DropdownMenuShortcut>
                            <LuListOrdered size={16} />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Support
                          <DropdownMenuShortcut>
                            <MdOutlineSupportAgent size={15} />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <SignOut />
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => router.push("/signin")}>
                        Log In
                        <DropdownMenuShortcut>
                          <IoIosLogIn />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/signup")}>
                        Sign Up
                        <DropdownMenuShortcut>
                          <TiUserAdd />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={handleNav}
                className="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white"
              >
                <span className="sr-only">Open Menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M5 7h14M5 12h14M5 17h14"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          <div
            id="ecommerce-navbar-menu-1"
            className={`bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 px-4 mt-4 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="text-gray-900 dark:text-white text-sm font-medium space-y-3">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary-700 dark:hover:text-primary-500"
                    onClick={handleNav}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Authentication Buttons */}
            <div className="mt-4">
              {status === "authenticated" ? (
                <>
                  <p className="font-semibold text-lg text-[#350203]">
                    Hey, {session?.user.name}
                  </p>
                  <button
                    onClick={() => {
                      handleNav();
                      SignOut();
                    }}
                    className="w-full flex justify-center items-center gap-2 bg-[#350203] hover:bg-[#4a0405] text-white font-medium py-3 px-4 rounded-full transition-colors mt-2"
                  >
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    href="/signin"
                    onClick={handleNav}
                    className="flex justify-between items-center bg-[#f8d6b6] hover:bg-[#facba0] py-4 px-5 rounded-full text-[#350203] font-semibold transition-colors"
                  >
                    <span>Log In</span>
                    <IoIosLogIn size={20} />
                  </Link>
                  <Link
                    href="/signup"
                    onClick={handleNav}
                    className="flex justify-between items-center py-4 px-5 rounded-full text-[#350203] font-semibold border-2 border-[#350203] hover:bg-[#f8d6b6] transition-colors"
                  >
                    <span>Sign Up</span>
                    <TiUserAdd size={20} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
