import Hero from "@/components/homepage/Hero";
import Search from "@/components/homepage/Search";
import FeatureCards from "@/components/custom/Features";
import Banner from "@/components/custom/Banner";
import HeroOffers from "@/components/custom/Discount";

export default function Home() {
  return (
    <main className="w-full">
      <Search />
      <Hero />
      <FeatureCards />
      <HeroOffers />
      <Banner />
    </main>
  );
}
