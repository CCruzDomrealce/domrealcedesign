import Navigation from "@/components/navigation";
import DynamicSlider from "@/components/DynamicSlider";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/components/portfolio-section";
import NewsSection from "@/components/news-section";
import Footer from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { usePageConfig } from "@/hooks/use-page-config";

export default function Home() {
  const { getConfig, isLoading } = usePageConfig("home");

  return (
    <div
      className="overflow-x-hidden"
      style={{ background: "none", backgroundColor: "transparent" }}
    >
      <SEOHead
        title="Comunicação Visual e Impressão Digital ! Portugal"
        description="DOMREALCE - Especialista em comunicação visual, impressão digital, papel de parede, decoração de viaturas e sinalética comercial. 40 anos de experiência em Lisboa."
        keywords="comunicação visual, impressão digital, papel de parede, decoração viaturas, sinalética, publicidade, Portugal, DOMREALCE"
        canonicalUrl="https://www.domrealce.com/"
      />

      {/* Navigation (menu fixo no topo) */}
      <Navigation />

      {/* Slider em tela cheia */}
      <section className="relative w-full h-screen">
        <DynamicSlider />
      </section>

      {/* Restante conteúdo */}
      <ServicesSection />
      <PortfolioSection />
      <NewsSection />
      <Footer />
    </div>
  );
}
