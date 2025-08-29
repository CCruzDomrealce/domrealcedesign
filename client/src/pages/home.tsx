import Navigation from "@/components/navigation";
import DynamicSlider from "@/components/DynamicSlider";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/components/portfolio-section";
import NewsSection from "@/components/news-section";
import Footer from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { usePageConfig } from "@/hooks/use-page-config";

export default function Home() {
  const { getConfig, isLoading } = usePageConfig('home');

  return (
    <div className="overflow-x-hidden" style={{ background: 'none', backgroundColor: 'transparent' }}>
      <SEOHead 
        title="Comunicação Visual e Impressão Digital ! Portugal"
        description="DOMREALCE - Especialista em comunicação visual, impressão digital, papel de parede, decoração de viaturas e sinalética comercial. 40 anos de experiência em Lisboa."
        keywords="comunicação visual, impressão digital, papel de parede, decoração viaturas, sinalética, publicidade, Portugal, DOMREALCE"
        canonicalUrl="https://www.domrealce.com/"
      />
      <Navigation />
      <DynamicSlider />
      
      {/* Demonstração de configurações dinâmicas */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 
            className="font-bold mb-4"
            style={{ 
              fontSize: getConfig('features', 'title_size', '32px'),
              color: getConfig('hero', 'primary_color', '#FFD700')
            }}
          >
            {getConfig('hero', 'title', 'DOMREALCE - Comunicação Visual')}
          </h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            {getConfig('hero', 'subtitle', 'Comunicação visual profissional')}
          </p>
          <button 
            className="px-8 py-3 rounded-lg font-semibold transition-colors"
            style={{ 
              backgroundColor: getConfig('hero', 'primary_color', '#FFD700'),
              color: '#000'
            }}
          >
            {getConfig('cta', 'button_text', 'Contacte-nos')}
          </button>
          
          {!isLoading && (
            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              ✨ Este conteúdo é gerido dinamicamente através do sistema de administração
            </p>
          )}
        </div>
      </section>
      
      <ServicesSection />
      <PortfolioSection />
      <NewsSection />
      <Footer />
    </div>
  );
}
