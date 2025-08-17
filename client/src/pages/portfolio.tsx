import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Decoração de camião Volvo da Reboconorte",
    description: "Aplicação completa de vinil em camião Volvo com design corporativo personalizado da empresa Reboconorte.",
    category: "decoracao-camioes",
    image: "/placeholder-truck.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Sinalização de Loja Comercial",
    description: "Sistema completo de sinalização interior e exterior para estabelecimento comercial em Lisboa.",
    category: "sinalizacao",
    image: "/placeholder-signage.jpg",
    featured: false
  },
  {
    id: 3,
    title: "Decoração de Frota de Viaturas",
    description: "Personalização visual de 15 viaturas comerciais com logótipo e informações da empresa.",
    category: "decoracao-camioes",
    image: "/placeholder-fleet.jpg",
    featured: true
  },
  {
    id: 4,
    title: "Impressão Digital Grande Formato",
    description: "Banners e displays promocionais para evento corporativo com 200m² de área impressa.",
    category: "impressao-digital",
    image: "/placeholder-banner.jpg",
    featured: false
  },
  {
    id: 5,
    title: "Rotulagem de Produtos Alimentares",
    description: "Design e impressão de rótulos personalizados para linha de produtos gourmet regionais.",
    category: "rotulagem",
    image: "/placeholder-labels.jpg",
    featured: false
  },
  {
    id: 6,
    title: "Decoração de Viatura de Competição",
    description: "Aplicação de vinil em carro de rally com design aerodinâmico e patrocinadores.",
    category: "decoracao-camioes",
    image: "/placeholder-racing.jpg",
    featured: true
  }
];

const categories = [
  { id: 'todos', name: 'Todos os Projetos' },
  { id: 'decoracao-camioes', name: 'Decoração de Camiões' },
  { id: 'sinalizacao', name: 'Sinalização' },
  { id: 'impressao-digital', name: 'Impressão Digital' },
  { id: 'rotulagem', name: 'Rotulagem' }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  
  const filteredProjects = selectedCategory === 'todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nosso Portfólio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubra alguns dos nossos trabalhos mais recentes em comunicação visual e publicidade.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold"
                  : "border-[#333] text-white hover:border-[#FFD700]"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-[#111111] border-[#333] hover:border-[#FFD700] transition-all duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-br from-[#333] to-[#222] flex items-center justify-center overflow-hidden">
                      <div className="text-8xl opacity-20">🚚</div>
                      {project.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-[#FFD700] text-black">Destaque</Badge>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#FFD700] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="py-16 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-[#FFD700] text-black mb-4">Projeto em Destaque</Badge>
              <h2 className="text-3xl font-bold mb-4">Decoração de camião Volvo da Reboconorte</h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Projeto completo de decoração de camião Volvo para a empresa Reboconorte. 
                Aplicação de vinil de alta qualidade com design corporativo personalizado, 
                incluindo logótipo, informações de contacto e elementos gráficos distintivos. 
                O trabalho foi executado com precisão profissional, garantindo durabilidade e 
                impacto visual máximo na estrada.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p><strong>Cliente:</strong> Reboconorte</p>
                <p><strong>Categoria:</strong> Decoração de Viaturas</p>
                <p><strong>Materiais:</strong> Vinil de alta qualidade</p>
                <p><strong>Duração:</strong> 2 dias</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-[#333] to-[#222] rounded-lg flex items-center justify-center">
                <div className="text-9xl opacity-30">🚛</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Gostou do que viu?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Entre em contacto connosco e vamos criar algo incrível para o seu projeto.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold hover:opacity-90 transition-opacity">
              <Link href="/contactos">Solicitar Orçamento</Link>
            </Button>
            <Button asChild variant="outline" className="border-[#20B2AA] text-[#20B2AA] hover:bg-[#20B2AA] hover:text-black">
              <a 
                href="https://wa.me/351930682725?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20serviços." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contactar via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}