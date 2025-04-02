import ProductDetailsClient from "@/components/special_pages/ProductDetails";

const fetcher = async (url: string) => {
  const res = await fetch(url, { method: "GET", credentials: "include" });
  const data = await res.json();
  const prodDetails = data.results;
  return prodDetails.length > 0 ? prodDetails[0] : null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const product = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/products?slug=${slug}`
  );

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.title,
    description: product.description,
    metadataBase: new URL(`${process.env.NEXT_SITE_URL}`),
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${process.env.NEXT_SITE_URL}/product/${product.slug}`,
      images: [
        {
          url: product.images?.[0]?.image || "/Logo1.png",
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.images?.[0]?.image || "/Logo1.png"],
    },
    alternates: {
      canonical: `${process.env.NEXT_SITE_URL}/product/${product.slug}`,
    },
  };
}

export default function Page() {
  return <ProductDetailsClient />;
}
