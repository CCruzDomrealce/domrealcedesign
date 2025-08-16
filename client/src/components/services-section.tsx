import { Printer, Scissors, Store, Car, Eye, Sparkles } from "lucide-react";

const services = [
  {
    icon: Printer,
    title: "Impressão Digital",
    description: "Banners, adesivos e painéis com alta definição e cores vibrantes.",
    color: "from-brand-yellow to-brand-coral",
    titleColor: "text-brand-yellow"
  },
  {
    icon: Scissors,
    title: "Corte de Vinil",
    description: "Frases decorativas, sinalização e personalização de paredes.",
    color: "from-brand-turquoise to-brand-blue",
    titleColor: "text-brand-turquoise"
  },
  {
    icon: Store,
    title: "Fachadas e Letreiros",
    description: "Sinalização exterior profissional para seu negócio.",
    color: "from-brand-blue to-brand-coral",
    titleColor: "text-brand-blue"
  },
  {
    icon: Car,
    title: "Adesivação de Veículos",
    description: "Transforme seu veículo numa ferramenta de marketing.",
    color: "from-brand-coral to-brand-yellow",
    titleColor: "text-brand-coral"
  },
  {
    icon: Eye,
    title: "Comunicação Visual",
    description: "Vitrines criativas que atraem e convertem clientes.",
    color: "from-brand-yellow to-brand-turquoise",
    titleColor: "text-brand-yellow"
  },
  {
    icon: Sparkles,
    title: "Personalização",
    description: "Soluções únicas e criativas para cada projeto.",
    color: "from-brand-turquoise to-brand-coral",
    titleColor: "text-brand-turquoise"
  }
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="text-brand-yellow">Nossos</span> <span className="text-white">Serviços</span>
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluções completas em comunicação visual para destacar sua marca no mercado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="gradient-border hover:scale-105 transition-transform duration-300">
              <div className="gradient-border-inner p-6 h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mb-4`}>
                  <service.icon className="text-black text-2xl" size={24} />
                </div>
                <h4 className={`text-xl font-heading font-semibold mb-3 ${service.titleColor}`}>
                  {service.title}
                </h4>
                <p className="text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
