import { ProductBase, Category } from "@/types/types";
import type { MetadataRoute } from "next";

// Function to generate multiple sitemaps if needed
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
      next: { revalidate: 60 },
    }),
  ]);

  if (!productsRes.ok) {
    throw new Error(`Failed to fetch products: ${productsRes.statusText}`);
  }

  if (!categoriesRes.ok) {
    throw new Error(`Failed to fetch categories: ${categoriesRes.statusText}`);
  }

  const productsData = await productsRes.json();
  const categoriesData = await categoriesRes.json();

  const totalProducts = productsData.length;
  const totalCategories = categoriesData.length;

  // Google's limit is 50,000 URLs per sitemap
  const totalUrls = totalProducts + totalCategories;
  const sitemapCount = Math.ceil(totalUrls / 50000);

  // Generate sitemap IDs based on the number of products and categories
  return Array.from({ length: sitemapCount }, (_, index) => ({ id: index }));
}

// Default sitemap function
export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const start = id * 50000;
  const end = start + 50000;

  // Fetch products and categories
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
      next: { revalidate: 3600 },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`),
  ]);

  if (!productsRes.ok || !categoriesRes.ok) {
    throw new Error(
      `Failed to fetch data: ${
        !productsRes.ok ? productsRes.statusText : categoriesRes.statusText
      }`
    );
  }

  const productsData = await productsRes.json();
  const categoriesData = await categoriesRes.json();

  // Combine products and categories into a single array
  const allItems = [
    ...productsData.map((product: ProductBase) => ({
      type: "product",
      url: `https://topnotchprintingpress.com/products/${product.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...categoriesData.map((category: Category) => ({
      type: "category",
      url: `https://topnotchprintingpress.com/categories/${category.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];

  // Slice the combined array to fit within the range
  const itemsInRange = allItems.slice(start, end);

  // Add static URLs to the sitemap
  const staticUrls = [
    {
      url: "https://topnotchprintingpress.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://topnotchprintingpress.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://topnotchprintingpress.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Combine static URLs and dynamic URLs (products + categories)
  return [...staticUrls, ...itemsInRange];
}
