import { FeaturesSection } from "@/Layers/FeaturesSection";
import { Footer } from "@/Layers/Footer";
import { Hero } from "@/Layers/Hero";
import { StatsSection } from "@/Layers/StatsSection";
import { StepsSection } from "@/Layers/StepsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <FeaturesSection></FeaturesSection>
      <StepsSection></StepsSection>
      <StatsSection></StatsSection>
      <Footer></Footer>
      
    </div>
  );
}
