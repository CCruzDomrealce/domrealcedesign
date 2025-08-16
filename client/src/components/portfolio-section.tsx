import { Button } from "@/components/ui/button";

const portfolioItems = [
  {
    image: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Adesivos Personalizados",
    description: "Alta definição e durabilidade para qualquer superfície",
    price: "A partir de €5",
    titleColor: "text-brand-yellow"
  },
  {
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Placas e Painéis",
    description: "Sinalização profissional para interior e exterior",
    price: "A partir de €25",
    titleColor: "text-brand-turquoise"
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Quadros Decorativos",
    description: "Personalização completa para ambientes únicos",
    price: "A partir de €15",
    titleColor: "text-brand-blue"
  },
  {
    image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Banners Personalizados",
    description: "Grande formato com impressão de alta qualidade",
    price: "A partir de €20",
    titleColor: "text-brand-coral"
  },
  {
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Wrapping Veículos",
    description: "Transforme seu carro numa ferramenta de marketing",
    price: "A partir de €300",
    titleColor: "text-brand-yellow"
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Vitrines Criativas",
    description: "Design impactante para atrair mais clientes",
    price: "A partir de €150",
    titleColor: "text-brand-turquoise"
  }
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-black/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="text-brand-turquoise">Produtos</span> <span className="text-white">de Destaque</span>
          </h3>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Conheça alguns dos nossos produtos mais procurados com qualidade excepcional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-black">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h4 className={`text-xl font-heading font-semibold mb-2 ${item.titleColor}`}>
                  {item.title}
                </h4>
                <p className="text-white/80 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-coral font-semibold">{item.price}</span>
                  <Button 
                    variant="link" 
                    className="text-brand-blue hover:text-brand-turquoise transition-colors p-0"
                  >
                    Ver Mais
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
