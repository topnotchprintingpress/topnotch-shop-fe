import MainHero from "@/components/homepage/MainHero";
import Hero from "@/components/homepage/Hero";
import Search from "@/components/homepage/Search";
import Banner from "@/components/custom/Banner";
import HeroOffers from "@/components/custom/Discount";
import New from "@/components/custom/New";
import TechProds from "@/components/custom/Tech";
import LabProds from "@/components/custom/Labs";
import SaleBanner from "@/components/custom/SaleBanner";

export default function Home() {
  return (
    <main className="w-full">
      <Search />
      <MainHero />
      <Hero />
      <HeroOffers />
      <Banner />
      <New />
      <TechProds />
      <SaleBanner />
      <LabProds />
    </main>
  );
}
