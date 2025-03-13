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
// shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOut from "../buttons/SignOut";

function Navbar() {
  const { cart } = useCartContext();
  const cartItems = cart ? cart.flatMap((cartObj) => cartObj.items ?? []) : [];
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(true);
  const { data: session, status } = useSession();
  console.log("SESSION DATA: ", session);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#fffcf7] z-50 h-[12vh] md:h-[18vh] 2xl:h-[12vh] w-full flex justify-center items-center px-4 md:px-6 2xl:px-0 border-b-2 border-[#2b0909]">
      <div className="container flex justify-between items-center mx-auto">
        {/* Branding Section */}
        <div>
          <Link href="/">
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
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
              { href: "/subscription", label: "FAQ" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block p-3 hover:border hover:border-[#2b0909] rounded-xl transition-colors"
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
            <ul className="flex flex-col gap-2 text-[#2b0909] font-semibold">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
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
                className="bg-[#f8d6b6] hover:bg-[#facba0] text-center py-3 rounded-lg text-[#2b0909] font-semibold"
              >
                Join Now
              </Link>
              <Link
                href="/signin"
                onClick={handleNav}
                className="text-center py-3 rounded-lg text-[#2b0909] font-semibold border-2 border-[#2b0909] hover:bg-[#f8d6b6] transition-colors"
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
                href="/shopping-cart"
                className="flex text-[#2b0909] justify-center items-center "
              >
                <MdOutlineShoppingCart className="relative text-[28px]" />
                <h4 className="ml-2 text-xs tracking-tighter">My cart</h4>
                <div className="absolute top-8 -ml-8 text-xs">
                  <p className="text-white p-2.5 font-bold bg-[#2b0909] rounded-[100%] w-[19px] h-[19px] flex justify-center items-center">
                    {cartItems?.length || 0}
                  </p>
                </div>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="focus:outline-none focus:ring-transparent"
                >
                  <div className="flex items-center gap-1 cursor-pointer">
                    <button className="border-2 border-[#350203] p-2 rounded-full">
                      <SlUser size={20} className=" text-[#350203]" />
                    </button>
                    <h4 className="ml-2 text-xs tracking-tighter font-semibold">
                      My Account
                    </h4>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-24 rounded-2xl bg-[#fffcf7] border-2 border-[#2b0909] text-[#2b0909] py-2 px-1">
                  {status === "authenticated" ? (
                    <>
                      <DropdownMenuLabel className="capitalize">
                        Hey {session?.user.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-[#350203]" />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => {
                            router.push("/Scollah/tutor");
                          }}
                          className="cursor-pointer"
                        >
                          Account
                          <DropdownMenuShortcut>
                            <MdManageAccounts size={15} className="cert" />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            router.push("/my_account/orders");
                          }}
                          className="cursor-pointer"
                        >
                          Orders{" "}
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
                      <DropdownMenuSeparator className="bg-[#350203]" />
                      <DropdownMenuItem>
                        <SignOut />
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/signin");
                        }}
                        className="cursor-pointer flex justify-between items-center hover:border-b hover:rounded-full hover:border-[#350203]"
                      >
                        Log In <IoIosLogIn />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/signup");
                        }}
                        className="cursor-pointer flex justify-between items-center hover:border-b hover:rounded-full hover:border-[#350203]"
                      >
                        Sign Up
                        <TiUserAdd />
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="md:hidden mr-4">
            <Link
              href="/shopping-cart"
              className="flex text-[#2b0909] justify-center items-center "
            >
              <MdOutlineShoppingCart className="relative text-[28px]" />

              <div className="absolute top- ml-4 text-xs">
                <p className="text-white p-2.5 font-bold bg-[#2b0909] rounded-[100%] w-[19px] h-[19px] flex justify-center items-center">
                  {cartItems?.length || 0}
                </p>
              </div>
            </Link>
          </div>
          <div className="mobile-menu md:hidden" onClick={handleNav}>
            <BsMenuButtonWideFill
              size={30}
              className={
                menuOpen
                  ? "text-[#2b0909] cursor-pointer transition-all duration-700 ease-in-out"
                  : "hidden transition-all duration-700 ease-in-out"
              }
            />
            <RiCloseLargeFill
              size={30}
              className={
                !menuOpen
                  ? "text-[#2b0909] cursor-pointer transition-all duration-700 ease-in-out"
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
