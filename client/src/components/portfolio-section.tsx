import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const portfolioItems = [
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Papel de Parede Premium",
    description: "Mais de 3000 texturas em alta definição. Personalização completa com medidas exatas.",
    price: "A partir de €12/m²",
    titleColor: "text-brand-yellow"
  },
  {
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Papel de Parede Personalizado",
    description: "Transforme a sua imagem ou design numa obra de arte para as suas paredes.",
    price: "A partir de €15/m²",
    titleColor: "text-brand-turquoise"
  },
  {
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Instalação Profissional",
    description: "Serviço completo de medição, impressão e aplicação por profissionais experientes.",
    price: "Orçamento personalizado",
    titleColor: "text-brand-coral"
  }
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-black/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-animate-right">
          <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="text-brand-turquoise animate-pulse-brand">Produtos</span> <span className="text-white">de Destaque</span>
          </h3>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Conheça alguns dos nossos produtos mais procurados com qualidade excepcional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-black hover-tilt scroll-animate transform-3d">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 p-6 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className={`text-xl font-heading font-semibold mb-2 ${item.titleColor} group-hover:animate-pulse-brand`}>
                  {item.title}
                </h4>
                <p className="text-white/80 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-coral font-semibold group-hover:animate-glow">{item.price}</span>
                  <Button 
                    variant="link" 
                    className="text-brand-turquoise hover:text-brand-turquoise transition-colors p-0 hover-lift"
                    asChild
                  >
                    <Link href="/loja/papel-parede">Ver Mais</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
