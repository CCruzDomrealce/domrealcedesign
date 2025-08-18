import { Printer, Scissors, Store, Car, Eye, Sparkles, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    icon: Printer,
    title: "Impressão Digital",
    description: "Banners, adesivos e painéis com alta definição e cores vibrantes.",
    color: "from-brand-yellow to-brand-coral",
    titleColor: "text-brand-yellow",
    link: "/servico-impressao-digital"
  },
  {
    icon: Scissors,
    title: "Corte de Vinil",
    description: "Frases decorativas, sinalização e personalização de paredes.",
    color: "from-brand-turquoise to-brand-blue",
    titleColor: "text-brand-turquoise",
    link: "/servico-autocolantes"
  },
  {
    icon: Store,
    title: "Fachadas e Letreiros",
    description: "Sinalização exterior profissional para seu negócio.",
    color: "from-brand-blue to-brand-coral",
    titleColor: "text-brand-turquoise",
    link: "/servico-espacos-comerciais"
  },
  {
    icon: Car,
    title: "Adesivação de Veículos",
    description: "Transforme seu veículo numa ferramenta de marketing.",
    color: "from-brand-coral to-brand-yellow",
    titleColor: "text-brand-coral",
    link: "/servico-decoracao-viaturas"
  },
  {
    icon: Eye,
    title: "Comunicação Visual",
    description: "Vitrines criativas que atraem e convertem clientes.",
    color: "from-brand-yellow to-brand-turquoise",
    titleColor: "text-brand-yellow",
    link: "/servico-design-grafico"
  },
  {
    icon: Sparkles,
    title: "Personalização",
    description: "Soluções únicas e criativas para cada projeto.",
    color: "from-brand-turquoise to-brand-coral",
    titleColor: "text-brand-turquoise",
    link: "/servicos"
  }
];

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section ref={sectionRef} id="servicos" className="py-20 bg-black/90 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-animate-left">
          <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="text-brand-yellow animate-pulse-brand">Nossos</span> <span className="text-white">Serviços</span>
          </h3>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Soluções completas em comunicação visual para destacar sua marca no mercado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isHovered = hoveredCard === index;
            const rotateX = isHovered ? (mousePosition.y - 0.5) * 20 : 0;
            const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0;
            
            return (
              <Link href={service.link} key={index}>
                <div 
                  className="gradient-border mouse-track transform-3d scroll-animate cursor-pointer"
                  style={{
                    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`,
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="gradient-border-inner p-6 h-full relative overflow-hidden">
                    {/* Floating background effect */}
                    <div 
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, var(--brand-yellow) 0%, transparent 50%)`,
                        transform: isHovered ? 'scale(1.2)' : 'scale(0.8)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mb-4 ${isHovered ? 'animate-bounce-subtle' : ''}`}>
                      <service.icon className="text-black text-2xl" size={24} />
                    </div>
                    <h4 className={`text-xl font-heading font-semibold mb-3 ${service.titleColor} ${isHovered ? 'animate-glow' : ''}`}>
                      {service.title}
                    </h4>
                    <p className="text-white/80 mb-4">{service.description}</p>
                    
                    <div className="text-brand-turquoise hover:text-brand-turquoise font-semibold transition-colors hover-lift group">
                      Ver mais <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline" size={16} />
                    </div>
                    
                    {/* Hover accent */}
                    {isHovered && (
                      <div className="absolute top-2 right-2 text-brand-coral animate-float">
                        <Sparkles size={16} />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
