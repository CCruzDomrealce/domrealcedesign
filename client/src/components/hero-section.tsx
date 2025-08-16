import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-black/60"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            <span className="text-brand-yellow">Realce</span> sua marca<br />
            com <span className="text-brand-turquoise">criatividade</span><br />
            <span className="text-white">e alta definição</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
            Transformamos ideias em comunicação visual impactante. Especialistas em impressão digital, corte de vinil e soluções personalizadas para comércios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-coral text-black font-heading font-semibold rounded-lg hover:shadow-xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300">
              Peça um orçamento agora
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-4 border-2 border-brand-turquoise text-brand-turquoise font-heading font-semibold rounded-lg hover:bg-brand-turquoise hover:text-black transition-all duration-300"
            >
              Ver Portfólio
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-brand-yellow text-2xl" />
      </div>
    </section>
  );
}
