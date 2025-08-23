import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { siteConfig } from "@/config/site-config";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Main background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('/attached_assets/AdobeStock_756714315_1755959760920.webp')"
        }}
      ></div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-10 text-brand-yellow opacity-20 animate-float"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
          }}
        >
          <Sparkles size={40} />
        </div>
        <div 
          className="absolute top-40 right-20 text-brand-turquoise opacity-30 animate-float-slow"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
          }}
        >
          <Sparkles size={30} />
        </div>
        <div 
          className="absolute bottom-40 left-20 text-brand-coral opacity-25 animate-bounce-subtle"
          style={{
            transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`
          }}
        >
          <Sparkles size={35} />
        </div>
        <div 
          className="absolute bottom-20 right-10 text-brand-blue opacity-20 animate-float"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`
          }}
        >
          <Sparkles size={25} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div 
          className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 hover-tilt transform-3d scroll-animate"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`
          }}
        >
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            <span className="text-brand-yellow animate-pulse-brand">Realce</span> sua marca com<br />
            <span className="text-brand-yellow animate-glow">criatividade</span><br />
            <span className="text-white">e alta definição</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {siteConfig.homepage.heroDescricao}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-coral gradient-animate text-black font-heading font-semibold rounded-lg hover:shadow-xl hover:shadow-yellow-500/25 hover-lift transition-all duration-300">
              <Link href="/contactos#formulario">{siteConfig.homepage.botaoPrincipal}</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="px-8 py-4 border-2 border-brand-turquoise text-brand-turquoise font-heading font-semibold rounded-lg hover:bg-brand-turquoise hover:text-black hover-lift transition-all duration-300"
            >
              <Link href="/portfolio">{siteConfig.homepage.botaoSecundario}</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        style={{
          transform: `translateX(-50%) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
        }}
      >
        <div className="bg-brand-yellow/20 rounded-full p-3 animate-glow">
          <ChevronDown className="text-brand-yellow text-2xl" />
        </div>
      </div>
    </section>
  );
}
