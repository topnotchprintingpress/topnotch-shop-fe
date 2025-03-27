"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { Gift, Home, Phone, Receipt, Star, Tag } from "lucide-react";
import { BsMenuButtonWideFill } from "react-icons/bs";

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
    { href: "/", label: "Home", icon: <Home size={16} /> },
    {
      href: "/categories/best-sellers",
      label: "Best Sellers",
      icon: <Star size={16} />,
    },
    {
      href: "/categories/new-arrivals",
      label: "New Arrivals",
      icon: <Tag size={16} />,
    },
    {
      href: "/categories/deals-and-offers",
      label: "Deals & Offers",
      icon: <Receipt size={16} />,
    },
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
              <span>Free shipping on order with 10 books or more</span>
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
                <Link
                  className="flex justify-center items-center gap-2"
                  href="/"
                >
                  <Image
                    src="/logo/logo.png"
                    width={130}
                    height={45}
                    alt="Topnotch Logo"
                    className="h-12 md:h-20 w-auto"
                  />
                  <h4 className="logo-name text-base font-black text-[#350203] leading-4">
                    Topnotch <br /> Printing <br /> Press
                  </h4>
                </Link>
              </div>
              {/* Desktop Menu */}
              <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
                {menuItems.map((item) => (
                  <li key={item.href} className="flex items-center gap-1">
                    {item.icon}
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
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Link
                href="/shopping-cart"
                className="flex text-[#2b0909] justify-center items-center"
              >
                <MdOutlineShoppingCart className="relative text-[28px]" />
                <h4 className="hidden md:block ml-4 text-xs tracking-tighter font-semibold">
                  My cart
                </h4>
                <div className="absolute top-4 md:top-8 ml-6 md:-ml-8 text-xs">
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
                    <h4 className="hidden md:block ml-2 text-xs tracking-tighter font-semibold">
                      My Account
                    </h4>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#fffcf7] mr-4 rounded-3xl">
                  {status === "authenticated" && session ? (
                    <>
                      <DropdownMenuLabel className="border-b border-[#2b0909]">
                        Hey, {session?.user.name || session.user.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => router.push("/my_account/dashboard")}
                          className="cursor-pointer"
                        >
                          Account
                          <DropdownMenuShortcut>
                            <MdManageAccounts size={15} />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push("/my_account/orders")}
                          className="cursor-pointer"
                        >
                          Orders
                          <DropdownMenuShortcut>
                            <LuListOrdered size={16} />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Support
                          <DropdownMenuShortcut>
                            <MdOutlineSupportAgent size={15} />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer border-t p-2">
                        <SignOut />
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        onClick={() => router.push("/signin")}
                        className="cursor-pointer"
                      >
                        Log In
                        <DropdownMenuShortcut>
                          <IoIosLogIn />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/signup")}
                        className="cursor-pointer"
                      >
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
                className="inline-flex lg:hidden items-center justify-center p-2"
              >
                <BsMenuButtonWideFill
                  size={26}
                  className="text-[#2b0909] cursor-pointer transition-all duration-700 ease-in-out"
                />
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          <div
            id="ecommerce-navbar-menu-1"
            className={`bg-gray-50 border border-[#2b0909] rounded-3xl py-3 px-4 mt-4 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="text-gray-900 dark:text-white text-sm font-bold space-y-3">
              {menuItems.map((item) => (
                <li
                  key={item.href}
                  className="flex items-center justify-between gap-8"
                >
                  <Link
                    href={item.href}
                    className="hover:text-primary-700 dark:hover:text-primary-500"
                    onClick={handleNav}
                  >
                    {item.label}
                  </Link>
                  {item.icon}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
