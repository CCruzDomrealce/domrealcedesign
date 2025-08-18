import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  MessageCircle, 
  Plus,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";

// Apenas o logótipo
import logoImage from "@assets/LOGO DOMREALCE_1755363285699.png";

interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  client: string;
  date: string;
  location: string;
}

// Apenas um projeto com o logótipo para começar
const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "Identidade Visual DOMREALCE",
    description: "Desenvolvimento da identidade visual corporativa incluindo logótipo, tipografia e paleta de cores da empresa.",
    category: "design-grafico",
    image: logoImage,
    client: "DOMREALCE",
    date: "2024",
    location: "Porto"
  }
];

const categories = [
  { id: "design-grafico", name: "Design Gráfico", count: 1 },
  { id: "impressao-digital", name: "Impressão Digital", count: 0 },
  { id: "papel-parede", name: "Papel de Parede", count: 0 },
  { id: "decoracao-viaturas", name: "Decoração Viaturas", count: 0 },
  { id: "sinaletica", name: "Sinalética", count: 0 }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('design-grafico');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'all' || project.category === selectedCategory
  );

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
              Descubra os nossos trabalhos em comunicação visual e impressão digital. 
              Portfolio em construção - adicione as suas imagens para começar.
            </p>
            
            {/* Instruções */}
            <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#20B2AA]/10 rounded-2xl p-6 border border-[#333] max-w-2xl mx-auto mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Upload className="w-5 h-5 text-[#FFD700]" />
                <h3 className="text-lg font-bold text-white">Como Adicionar Projetos</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                1. Anexe imagens dos seus projetos aqui na conversa<br/>
                2. Eu organizo automaticamente no portfolio<br/>
                3. Cada projeto fica com categoria e detalhes próprios
              </p>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="px-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
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
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projeto Atual */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="bg-[#111111] border-[#333] hover:border-[#FFD700] transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="w-full h-64 rounded-t-lg overflow-hidden bg-[#222] flex items-center justify-center">
                          <img 
                            src={project.image}
                            alt={project.title}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#FFD700] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          {project.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{project.client}</span>
                          <span>{project.date}</span>
                        </div>
                        
                        <Button
                          onClick={() => setSelectedProject(project)}
                          className="w-full bg-[#FFD700] text-black hover:bg-yellow-400"
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-[#111111] border-[#333] border-2 border-dashed rounded-2xl p-12 max-w-md mx-auto">
                  <ImageIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Categoria Vazia</h3>
                  <p className="text-gray-400 mb-6">
                    Ainda não há projetos nesta categoria. Adicione imagens para começar a construir o seu portfolio.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-[#222] rounded-lg p-3">
                    <Plus className="w-4 h-4 text-[#FFD700]" />
                    <span>Anexe imagens na conversa para adicionar projetos</span>
                  </div>
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
                Pronto Para Começar o Seu Projeto?
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

        {/* Modal de Detalhes */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-2xl bg-[#111111] border-[#333]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {selectedProject?.title}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Detalhes do projeto desenvolvido pela DOMREALCE
              </DialogDescription>
            </DialogHeader>
            
            {selectedProject && (
              <div className="space-y-6">
                <div className="w-full h-60 rounded-lg overflow-hidden bg-[#222] flex items-center justify-center">
                  <img 
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-white mb-3">Descrição do Projeto</h4>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {selectedProject.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Cliente:</span>
                      <span className="text-white ml-2">{selectedProject.client}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Data:</span>
                      <span className="text-white ml-2">{selectedProject.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Local:</span>
                      <span className="text-white ml-2">{selectedProject.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Categoria:</span>
                      <span className="text-white ml-2">Design Gráfico</span>
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