import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Truck,
  Tags,
  Lock,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="border-b border-muted-foreground/10">
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-6 w-6 mb-2" />
              <span className="text-sm font-semibold">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <Tags className="h-6 w-6 mb-2" />
              <span className="text-sm font-semibold">Great Prices</span>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="h-6 w-6 mb-2" />
              <span className="text-sm font-semibold">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <PhoneCall className="h-6 w-6 mb-2" />
              <span className="text-sm font-semibold">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <Image
                src="/logo/Logo1.png"
                alt="Company Logo"
                width={120}
                height={120}
                className="mr-2"
              />
            </div>
            <address className="not-italic text-sm mb-4">
              A104, Muchane Avenue
              <br />
              Kikuyu,Kiambu
              <br />
              Kenya
            </address>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/books" className="text-sm hover:text-primary">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-sm hover:text-primary">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm hover:text-primary">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm hover:text-primary">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm hover:text-primary">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex flex-col space-y-2">
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-muted-foreground/10 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Topnotch Publishers. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
