import Navigation from "@/components/navigation";
import DynamicSlider from "@/components/DynamicSlider";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/components/portfolio-section";
import NewsSection from "@/components/news-section";
import Footer from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { usePageConfig } from "@/hooks/use-page-config";
import ClientLogos from "@/components/ClientLogos";
import { Button } from "@/components/ui/button";
import { Play, Monitor, ShoppingCart, Camera, ArrowRight } from "lucide-react";
import { Link } from "wouter";

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

      <Navigation />
      
      <DynamicSlider />
      
      {/* Demonstração Interativa Section */}
      <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#111111]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Content */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                🎬 Conheça a DOMREALCE numa{' '}
                <span className="bg-gradient-to-r from-[#e84b5e] to-[#4dabf7] bg-clip-text text-transparent">
                  Jornada Interativa
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Descubra nossos produtos, serviços e portfólio numa apresentação envolvente 
                que pode controlar ao seu ritmo!
              </p>
            </div>

            {/* Demo Preview Card */}
            <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl mb-8">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#e84b5e]/10 to-[#4dabf7]/10 rounded-2xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Play Button - Large and Prominent */}
                <Link href="/demo-interativo">
                  <div className="relative mb-6 group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e84b5e] to-[#4dabf7] rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-[#e84b5e] to-[#4dabf7] w-24 h-24 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Play className="h-10 w-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </Link>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#e84b5e]/20 rounded-full flex items-center justify-center mb-3">
                      <ShoppingCart className="h-6 w-6 text-[#e84b5e]" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">Loja Online</h3>
                    <p className="text-gray-400 text-sm">Explore nossos produtos em ação</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#4dabf7]/20 rounded-full flex items-center justify-center mb-3">
                      <Monitor className="h-6 w-6 text-[#4dabf7]" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">Serviços</h3>
                    <p className="text-gray-400 text-sm">Conheça nossa expertise</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#00d4aa]/20 rounded-full flex items-center justify-center mb-3">
                      <Camera className="h-6 w-6 text-[#00d4aa]" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">Portfólio</h3>
                    <p className="text-gray-400 text-sm">Veja nossos trabalhos</p>
                  </div>
                </div>

                {/* Call to Action */}
                <Link href="/demo-interativo">
                  <Button className="bg-gradient-to-r from-[#e84b5e] to-[#d63951] hover:from-[#d63951] hover:to-[#c02d42] text-white text-lg px-8 py-3">
                    <Play className="h-5 w-5 mr-2" />
                    Iniciar Demonstração
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>

                {/* Quick Stats */}
                <div className="flex justify-center items-center gap-8 mt-8 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#00d4aa] rounded-full"></div>
                    <span>6 Passos Guiados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4dabf7] rounded-full"></div>
                    <span>Controlo Total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#e84b5e] rounded-full"></div>
                    <span>Dados Reais</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <p className="text-gray-500 text-sm">
              ✨ Sem instalações, sem registos - comece já a explorar!
            </p>
          </div>
        </div>
      </section>
      
      <ServicesSection />
      <PortfolioSection />
      <NewsSection />
      <ClientLogos />
      <Footer />
    </div>
  );
}
