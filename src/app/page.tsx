import { FeaturesSection } from "@/Layers/FeaturesSection";
import { Footer } from "@/Layers/Footer";
import { Hero } from "@/Layers/Hero";
import TechMarquee from "@/Layers/MarqueeCom";
import { StatsSection } from "@/Layers/StatsSection";
import { StepsSection } from "@/Layers/StepsSection";
import { CTASection } from "@/Layers/CTASection";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <TechMarquee></TechMarquee>
      <FeaturesSection></FeaturesSection>
      <StepsSection></StepsSection>
      <StatsSection></StatsSection>
      <CTASection></CTASection>
      <Footer></Footer>
    </div>
  );
}
