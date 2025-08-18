import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Eye, 
  MessageCircle, 
  Award, 
  Users, 
  Calendar,
  MapPin,
  Star,
  Filter
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";

// Import das imagens autênticas
import logoImage from "@assets/LOGO DOMREALCE_1755363285699.png";
import iconImage from "@assets/icon DOMREALCE_1755337082794.png";
import projectImage1 from "@assets/image_1755363415610.png";
import projectImage2 from "@assets/image_1755363938717.png";
import projectImage3 from "@assets/image_1755538598588.png";
import projectImage4 from "@assets/image_1755539043825.png";
import texture3D1 from "@assets/3D-001_1755541326630.webp";
import texture3D2 from "@assets/3D-002_1755541330130.webp";
import texture3D3 from "@assets/3D-003_1755541332938.webp";
import poaTexture from "@assets/Póa_1755539373566.webp";

interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  client: string;
  date: string;
  location: string;
  tags: string[];
  featured: boolean;
}

const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "Identidade Visual Corporativa",
    description: "Desenvolvimento completo da identidade visual incluindo logótipo, cartões de visita e material promocional.",
    category: "design-grafico",
    image: logoImage,
    client: "DOMREALCE",
    date: "2024",
    location: "Porto",
    tags: ["Logótipo", "Branding", "Design Corporativo"],
    featured: true
  },
  {
    id: 2,
    title: "Sinalética Comercial Moderna",
    description: "Sistema de sinalética completo para espaço comercial com design contemporâneo e funcional.",
    category: "sinaletica",
    image: projectImage1,
    client: "Cliente Comercial",
    date: "2024",
    location: "Lisboa",
    tags: ["Sinalética", "Design Interior", "Comunicação Visual"],
    featured: true
  },
  {
    id: 3,
    title: "Impressão Digital de Grande Formato",
    description: "Impressão de alta qualidade para evento corporativo incluindo banners, displays e material promocional.",
    category: "impressao-digital",
    image: projectImage2,
    client: "Empresa Eventos",
    date: "2024",
    location: "Braga",
    tags: ["Grande Formato", "Eventos", "Display"],
    featured: false
  },
  {
    id: 4,
    title: "Decoração de Viatura Comercial",
    description: "Projeto completo de decoração de frota comercial com design impactante e materiais duradouros.",
    category: "decoracao-viaturas",
    image: projectImage3,
    client: "Frota Comercial",
    date: "2024",
    location: "Aveiro",
    tags: ["Viaturas", "Vinil", "Fleet Branding"],
    featured: true
  },
  {
    id: 5,
    title: "Material Promocional Personalizado",
    description: "Criação e produção de material promocional diversificado para campanha de marketing.",
    category: "material-promocional",
    image: projectImage4,
    client: "Agência Marketing",
    date: "2024",
    location: "Coimbra",
    tags: ["Promocional", "Marketing", "Personalização"],
    featured: false
  },
  {
    id: 6,
    title: "Papel de Parede 3D Premium",
    description: "Aplicação de texturas 3D de alta qualidade em espaço residencial moderno.",
    category: "papel-parede",
    image: texture3D1,
    client: "Residência Privada",
    date: "2024",
    location: "Porto",
    tags: ["3D", "Texturas", "Decoração"],
    featured: true
  },
  {
    id: 7,
    title: "Texturas Especiais para Interiores",
    description: "Aplicação de texturas decorativas especiais em projeto de arquitetura de interiores.",
    category: "papel-parede",
    image: texture3D2,
    client: "Estúdio Arquitetura",
    date: "2024",
    location: "Lisboa",
    tags: ["Texturas", "Interiores", "Premium"],
    featured: false
  },
  {
    id: 8,
    title: "Revestimentos Decorativos Únicos",
    description: "Projeto especial com texturas exclusivas para espaço comercial de luxo.",
    category: "papel-parede",
    image: poaTexture,
    client: "Loja Premium",
    date: "2024",
    location: "Cascais",
    tags: ["Luxo", "Exclusivo", "Comercial"],
    featured: true
  }
];

const categories = [
  { id: "all", name: "Todos os Projetos", count: projects.length },
  { id: "design-grafico", name: "Design Gráfico", count: projects.filter(p => p.category === "design-grafico").length },
  { id: "impressao-digital", name: "Impressão Digital", count: projects.filter(p => p.category === "impressao-digital").length },
  { id: "papel-parede", name: "Papel de Parede", count: projects.filter(p => p.category === "papel-parede").length },
  { id: "decoracao-viaturas", name: "Decoração Viaturas", count: projects.filter(p => p.category === "decoracao-viaturas").length },
  { id: "sinaletica", name: "Sinalética", count: projects.filter(p => p.category === "sinaletica").length }
];

export default function PortfolioNovo() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesFeatured = !showFeaturedOnly || project.featured;
    return matchesCategory && matchesFeatured;
  });

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-[#111111] to-[#0A0A0A]">
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#FFD700] via-[#20B2AA] to-[#FF6B6B] bg-clip-text text-transparent">
              PORTFOLIO DOMREALCE
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Descubra os nossos trabalhos mais marcantes em comunicação visual e impressão digital. 
              Cada projeto reflete o nosso compromisso com a excelência e criatividade.
            </p>
            
            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFD700]">100+</div>
                <div className="text-gray-400 text-sm">Projetos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#20B2AA]">50+</div>
                <div className="text-gray-400 text-sm">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF6B6B]">5</div>
                <div className="text-gray-400 text-sm">Anos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFD700]">99%</div>
                <div className="text-gray-400 text-sm">Satisfação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Projetos em Destaque */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-6 h-6 text-[#FFD700]" />
              <h2 className="text-3xl font-bold text-white">Projetos em Destaque</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredProjects.slice(0, 4).map((project) => (
                <Card key={project.id} className="bg-[#111111] border-[#333] hover:border-[#FFD700] transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="w-full h-48 rounded-t-lg overflow-hidden">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            size="sm"
                            onClick={() => setSelectedProject(project)}
                            className="bg-[#FFD700] text-black hover:bg-yellow-400"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                      <Badge className="absolute top-3 left-3 bg-[#FFD700] text-black">
                        Destaque
                      </Badge>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-white font-bold text-sm mb-2 group-hover:text-[#FFD700] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{project.client}</span>
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="px-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-[#20B2AA]" />
                <h3 className="text-xl font-bold text-white">Filtrar Projetos</h3>
              </div>
              
              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={showFeaturedOnly 
                  ? "bg-[#FFD700] text-black hover:bg-yellow-400" 
                  : "border-[#333] text-gray-300 hover:border-[#FFD700] hover:text-[#FFD700]"
                }
              >
                <Star className="w-4 h-4 mr-2" />
                {showFeaturedOnly ? "Mostrar Todos" : "Apenas Destaques"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    ${selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold' 
                      : 'border-[#333] text-gray-300 hover:border-[#FFD700] hover:text-[#FFD700]'
                    }
                    transition-all duration-300
                  `}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 bg-[#333] text-white text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Grade de Projetos */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="bg-[#111111] border-[#333] hover:border-[#FFD700] transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="w-full h-64 rounded-t-lg overflow-hidden">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            onClick={() => setSelectedProject(project)}
                            className="bg-[#FFD700] text-black hover:bg-yellow-400"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                      {project.featured && (
                        <Badge className="absolute top-3 left-3 bg-[#FFD700] text-black">
                          Destaque
                        </Badge>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#FFD700] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-[#333] text-gray-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-500 text-lg">
                  Nenhum projeto encontrado com os filtros selecionados.
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#20B2AA]/10 rounded-2xl p-8 border border-[#333]">
              <h3 className="text-3xl font-bold text-white mb-4">
                Tem um Projeto em Mente?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Transformamos as suas ideias em realidade com soluções criativas e profissionais. 
                Entre em contacto connosco para discutir o seu próximo projeto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contactos">
                  <Button size="lg" className="bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold hover:opacity-90">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contactar Agora
                  </Button>
                </Link>
                <Link href="/servicos">
                  <Button size="lg" variant="outline" className="border-[#333] text-gray-300 hover:border-[#FFD700] hover:text-[#FFD700]">
                    Ver Serviços
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Modal de Detalhes do Projeto */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] bg-[#111111] border-[#333] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {selectedProject?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedProject && (
              <div className="space-y-6">
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <img 
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-bold text-white mb-3">Descrição do Projeto</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {selectedProject.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} className="bg-[#FFD700] text-black">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">Detalhes</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="w-4 h-4 text-[#20B2AA]" />
                        <span className="text-sm">Cliente: {selectedProject.client}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-[#20B2AA]" />
                        <span className="text-sm">Data: {selectedProject.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-[#20B2AA]" />
                        <span className="text-sm">Local: {selectedProject.location}</span>
                      </div>
                      {selectedProject.featured && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <Award className="w-4 h-4 text-[#FFD700]" />
                          <span className="text-sm">Projeto em Destaque</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-center pt-4 border-t border-[#333]">
                  <Link href="/contactos">
                    <Button className="bg-[#FFD700] text-black hover:bg-yellow-400">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Solicitar Orçamento
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedProject(null)}
                    className="border-[#333] text-gray-300"
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </>
  );
}