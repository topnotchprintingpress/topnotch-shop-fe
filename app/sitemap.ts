import type { MetadataRoute } from "next";
import { ProductBase, Category } from "@/types/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const products = productsData.results;
  const categories = categoriesData.results;

  const prodEntries: MetadataRoute.Sitemap = products.map(
    (product: ProductBase) => ({
      type: "product",
      url: `https://topnotchprintingpress.com/products/${product.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const catEntries: MetadataRoute.Sitemap = categories.map((cat: Category) => ({
    type: "product",
    url: `https://topnotchprintingpress.com/categories/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
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
    ...prodEntries,
    ...catEntries,
  ];
}
