import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/components/portfolio-section";
import NewsSection from "@/components/news-section";
import Footer from "@/components/footer";
import { SEOHead } from "@/components/seo-head";

export default function Home() {
  return (
    <div className="text-white overflow-x-hidden">
      <SEOHead 
        title="Comunicação Visual e Impressão Digital | Lisboa, Portugal"
        description="DOMREALCE - Especialista em comunicação visual, impressão digital, papel de parede, decoração de viaturas e sinalética comercial. 40 anos de experiência em Lisboa."
        keywords="comunicação visual, impressão digital, papel de parede, decoração viaturas, sinalética, publicidade, Lisboa, Portugal, DOMREALCE"
        canonicalUrl="https://www.domrealce.com/"
      />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <NewsSection />
      <Footer />
    </div>
  );
}
