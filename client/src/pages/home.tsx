import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/components/portfolio-section";
import NewsSection from "@/components/news-section";
import Footer from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
// DOMREALCE: Social proof component
import SocialProof from "@/components/social-proof";

export default function Home() {
  return (
    <div className="overflow-x-hidden" style={{ background: 'none', backgroundColor: 'transparent' }}>
      <SEOHead 
        title="Comunicação Visual e Impressão Digital | Lisboa, Portugal"
        description="DOMREALCE - Especialista em comunicação visual, impressão digital, papel de parede, decoração de viaturas e sinalética comercial. 40 anos de experiência em Lisboa."
        keywords="comunicação visual, impressão digital, papel de parede, decoração viaturas, sinalética, publicidade, Lisboa, Portugal, DOMREALCE"
        canonicalUrl="https://www.domrealce.com/"
      />
      <Navigation />
      {/* DOMREALCE: Main content wrapper with ID for skip link */}
      <main id="conteudo">
        <HeroSection />
        {/* DOMREALCE: Social proof below hero */}
        <SocialProof />
        {/* DOMREALCE: Apply below-the-fold optimization */}
        <div className="below-the-fold">
          <ServicesSection />
          <PortfolioSection />
          <NewsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
