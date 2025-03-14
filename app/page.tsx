import MainHero from "@/components/homepage/MainHero";
import Hero from "@/components/homepage/Hero";
import Search from "@/components/homepage/Search";
import MiddleBanner from "@/components/custom/Banner";
import HeroOffers from "@/components/custom/Discount";
import New from "@/components/custom/New";
import TechProds from "@/components/custom/Tech";
import LabProds from "@/components/custom/Labs";
import SaleBanner from "@/components/custom/SaleBanner";
import FeaturedBooks from "@/components/custom/Books";

export default function Home() {
  return (
    <main className="w-full">
      <Search />
      <MainHero />
      <Hero />
      <HeroOffers />
      <MiddleBanner />
      <New />
      <FeaturedBooks />
      <TechProds />
      <SaleBanner />
      <LabProds />
    </main>
  );
}
