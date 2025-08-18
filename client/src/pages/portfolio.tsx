import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  MessageCircle, 
  Upload,
  Image as ImageIcon,
  Folder,
  FolderOpen
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface PortfolioProject {
  id: string;
  title: string;
  image: string;
  category: string;
  subcategory: string;
}

interface PortfolioCategory {
  name: string;
  subcategories: {
    name: string;
    projects: PortfolioProject[];
  }[];
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  
  // Buscar automaticamente as imagens organizadas por pastas
  const { data: portfolioData = [], isLoading } = useQuery({
    queryKey: ['/api/portfolio-images'],
    retry: 1
  });

  // Organizar dados por categorias
  const categories: PortfolioCategory[] = portfolioData;
  const allProjects = categories.flatMap(cat => 
    cat.subcategories.flatMap(sub => sub.projects)
  );

  const filteredProjects = selectedCategory === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory);

  const availableCategories = [
    { id: 'all', name: 'Todos os Projetos', count: allProjects.length },
    ...categories.map(cat => ({
      id: cat.name.toLowerCase().replace(/\s+/g, '-'),
      name: cat.name,
      count: cat.subcategories.reduce((acc, sub) => acc + sub.projects.length, 0)
    }))
  ];

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
              Imagens organizadas automaticamente por categorias.
            </p>
            
            {/* Instruções do Sistema de Pastas */}
            <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#20B2AA]/10 rounded-2xl p-6 border border-[#333] max-w-4xl mx-auto mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Folder className="w-5 h-5 text-[#FFD700]" />
                <h3 className="text-lg font-bold text-white">Sistema de Organização Automática</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <p className="mb-2"><strong>Estrutura de Pastas:</strong></p>
                  <div className="bg-[#222] p-3 rounded font-mono text-xs">
                    📁 portfolio/<br/>
                    &nbsp;&nbsp;📁 design-grafico/<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;📁 logotipos/<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;📁 branding/<br/>
                    &nbsp;&nbsp;📁 impressao-digital/<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;📁 banners/<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;📁 folhetos/
                  </div>
                </div>
                <div>
                  <p className="mb-2"><strong>Como Funciona:</strong></p>
                  <ul className="space-y-1 text-xs">
                    <li>• Crie pastas no Object Storage</li>
                    <li>• Organize por categoria → subcategoria</li>
                    <li>• Adicione imagens nas subpastas</li>
                    <li>• Sincronização automática</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loading State */}
        {isLoading && (
          <section className="px-4 pb-16">
            <div className="max-w-7xl mx-auto text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-[#333] rounded w-48 mx-auto mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 bg-[#333] rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filtros de Categoria */}
        {!isLoading && availableCategories.length > 1 && (
          <section className="px-4 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-3 mb-8 justify-center">
                {availableCategories.map((category) => (
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
        )}

        {/* Grade de Projetos */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            {!isLoading && filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="bg-[#111111] border-[#333] hover:border-[#FFD700] transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="w-full h-64 rounded-t-lg overflow-hidden">
                          <img 
                            src={`/public-objects/portfolio/${project.category}/${project.subcategory}/${project.image}`}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23333"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%23666" text-anchor="middle" dy=".3em">Imagem não encontrada</text></svg>`;
                            }}
                          />
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#FFD700] text-black text-xs px-2 py-1 rounded font-bold">
                            {project.subcategory}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#FFD700] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          {project.category} • {project.subcategory}
                        </p>
                        
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
            ) : !isLoading ? (
              <div className="text-center py-16">
                <div className="bg-[#111111] border-[#333] border-2 border-dashed rounded-2xl p-12 max-w-lg mx-auto">
                  <FolderOpen className="w-20 h-20 text-gray-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Portfolio Vazio</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Crie a estrutura de pastas no Object Storage para começar:
                  </p>
                  
                  <div className="bg-[#222] rounded-lg p-4 mb-6 text-left">
                    <p className="text-xs text-gray-500 mb-2">Exemplo de estrutura:</p>
                    <div className="font-mono text-xs text-gray-300 space-y-1">
                      <div>📁 <strong>portfolio/</strong></div>
                      <div>&nbsp;&nbsp;📁 <strong>design-grafico/</strong></div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;📁 logotipos/</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;📁 branding/</div>
                      <div>&nbsp;&nbsp;📁 <strong>impressao-digital/</strong></div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;📁 banners/</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;📁 folhetos/</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-[#222] rounded-lg p-3">
                    <Upload className="w-4 h-4 text-[#FFD700]" />
                    <span>Depois adicione imagens nas subpastas</span>
                  </div>
                </div>
              </div>
            ) : null}
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
          <DialogContent className="max-w-3xl bg-[#111111] border-[#333]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {selectedProject?.title}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {selectedProject?.category} • {selectedProject?.subcategory}
              </DialogDescription>
            </DialogHeader>
            
            {selectedProject && (
              <div className="space-y-6">
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <img 
                    src={`/public-objects/portfolio/${selectedProject.category}/${selectedProject.subcategory}/${selectedProject.image}`}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
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