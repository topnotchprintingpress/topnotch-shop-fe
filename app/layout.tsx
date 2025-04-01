import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

import { AppWrapper } from "@/providers/ProductProvider";
import { Providers } from "@/providers/SessionProvider";
import { CartProvider } from "@/providers/CartContext";
import { ShippingProvider } from "@/providers/ShippingContext";
import AuthWrapper from "@/components/special_pages/AuthWrapper";

export const metadata: Metadata = {
  title:
    "Topnotch Printing Press - Your Trusted Source for Educational Materials",
  description:
    "Explore a wide range of educational materials at Topnotch Printing Press. From books authored by us to stationery, tech, and lab equipment, we have everything you need for learning and teaching.",
  keywords:
    "Topnotch Printing Press, educational materials, books, stationery, tech equipment, lab equipment, online shopz, High School Kenya",
  metadataBase: new URL(`${process.env.NEXT_SITE_URL}`),
  openGraph: {
    title: "Topnotch Printing Press - Educational Materials & More",
    description:
      "Discover high-quality educational materials, books, stationery, tech, and lab equipment at Topnotch Printing Press. Your one-stop shop for all learning needs.",
    url: `${process.env.NEXT_SITE_URL}`,
    images: [
      {
        url: "/Logo1.png",
        width: 1200,
        height: 630,
        alt: "Topnotch Printing Press - Educational Materials",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_SITE_URL}/`,
  },
};

async function fetchProducts(
  page: number,
  pageSize: number,
  all: boolean = false
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/` ||
        `${process.env.NEXT_PUBLIC_API_URL}/products/?page=${page}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Products");
    }

    const data = await res.json();
    const products = data.results;

    const totalPages = all ? 1 : Math.ceil(data.count / 12);

    return { products, totalPages };
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { chapters: [], totalPages: 1 };
  }
}

async function fetchBanners() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Banners");
    }

    const data = await res.json();
    const banners = data;
    return banners;
  } catch (error) {
    console.error("An unexpected error occured while fetching Banners:", error);
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const page = 1;
  const pageSize = 12;
  const { products, totalPages } = await fetchProducts(page, pageSize);
  const banners = await fetchBanners();
  return (
    <Providers>
      <ShippingProvider>
        <CartProvider>
          <html lang="en">
            <body>
              <Navbar />
              <AppWrapper
                products={products}
                banners={banners}
                totalPages={totalPages}
              >
                <AuthWrapper>{children}</AuthWrapper>
              </AppWrapper>
              <Footer />
            </body>
          </html>
        </CartProvider>
      </ShippingProvider>
    </Providers>
  );
}
