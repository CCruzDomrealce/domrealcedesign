import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Wallpaper, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Grid,
  Palette,
  Home,
  Ruler,
  Eye,
  Search
} from "lucide-react";

export default function ServicoPapelParede() {
  const categories = [
    "Texturas Naturais", "Padrões Geométricos", "Florais", "Abstratos",
    "Infantis", "Minimalistas", "Clássicos", "Modernos", "Vintage",
    "Metálicos", "3D", "Madeira", "Pedra", "Tecido", "Mármore",
    "Tijolo", "Rústicos", "Elegantes", "Coloridos", "Neutros",
    "Brilhantes", "Mates", "Relevos", "Lisos", "Tropicais",
    "Orientais", "Art Déco", "Industriais"
  ];

  const features = [
    {
      icon: <Grid className="w-6 h-6" />,
      title: "Mais de 3000 Texturas",
      description: "Vasta coleção constantemente atualizada com as últimas tendências"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "28 Categorias",
      description: "Organização intuitiva para encontrar rapidamente o padrão ideal"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Visualização Real",
      description: "Catálogo interativo que permite ver as texturas em tamanho real"
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: "Medidas Personalizadas",
      description: "Cálculo automático de quantidades necessárias para o seu espaço"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Seleção Múltipla",
      description: "Compare diferentes padrões lado a lado para decidir melhor"
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Simulação no Ambiente",
      description: "Veja como ficará o papel na sua parede antes de comprar"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consulta do Catálogo",
      description: "Explore as 3000+ texturas organizadas em 28 categorias diferentes"
    },
    {
      step: "02", 
      title: "Seleção e Comparação",
      description: "Escolha os padrões favoritos e compare-os lado a lado"
    },
    {
      step: "03",
      title: "Medição do Espaço", 
      description: "Calculamos as quantidades exatas necessárias para o seu projeto"
    },
    {
      step: "04",
      title: "Orçamento Detalhado",
      description: "Receba orçamento completo incluindo papel e aplicação"
    },
    {
      step: "05",
      title: "Entrega e Aplicação",
      description: "Entregamos e aplicamos com garantia de qualidade profissional"
    }
  ];

  const benefits = [
    "Catálogo sempre atualizado",
    "Visualização em tamanho real", 
    "Cálculo automático de quantidades",
    "Aplicação profissional incluída",
    "Garantia de qualidade",
    "Suporte técnico especializado"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-black via-orange-900/20 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-brand-coral text-white mb-6">
              <Wallpaper className="w-4 h-4 mr-2" />
              Papel de Parede Premium
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              <span className="text-brand-coral">3000+ Texturas</span>
              <br />
              <span className="text-white">em Catálogo Interativo</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Descubra a maior coleção de papéis de parede em Portugal. 
              Catálogo interativo com visualização em tamanho real e 28 categorias diferentes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-brand-coral to-brand-yellow text-white font-bold px-8 py-6 text-lg">
                <Link href="/contactos#formulario">Explorar Catálogo</Link>
              </Button>
              <Button variant="outline" className="border-brand-turquoise text-brand-turquoise hover:bg-brand-turquoise hover:text-black px-8 py-6 text-lg">
                Solicitar Amostras
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              <span className="text-brand-coral">Catálogo</span> <span className="text-white">Interativo</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tecnologia inovadora que permite explorar milhares de texturas de forma intuitiva
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black/50 border-gray-800 hover:border-brand-coral transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-brand-coral mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              <span className="text-white">28 Categorias</span> <span className="text-brand-yellow">Disponíveis</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Organização intuitiva para encontrar exatamente o estilo que procura
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((category, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center hover:border-brand-coral transition-all duration-300 cursor-pointer">
                <span className="text-sm text-gray-300 hover:text-brand-coral transition-colors">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              <span className="text-white">Como</span> <span className="text-brand-turquoise">Funciona</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Processo simples e intuitivo para escolher e aplicar o papel perfeito
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-coral to-brand-yellow rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                  {index < process.length - 1 && (
                    <div className="w-px h-8 bg-gray-700 ml-8 mt-4"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  <span className="text-brand-coral">Vantagens</span> <span className="text-white">Exclusivas</span>
                </h2>
                <p className="text-gray-400 mb-8 text-lg">
                  Mais que um simples catálogo, oferecemos uma experiência completa 
                  de seleção e aplicação de papel de parede.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0" />
                      <span className="text-white">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
                <div className="text-center mb-6">
                  <Star className="w-12 h-12 text-brand-coral mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2 text-white">Serviço Completo</h3>
                  <p className="text-gray-400">
                    Da seleção à aplicação, cuidamos de todo o processo
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Texturas disponíveis</span>
                    <span className="text-brand-coral font-semibold">3000+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Categorias</span>
                    <span className="text-brand-coral font-semibold">28</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Aplicação incluída</span>
                    <span className="text-brand-coral font-semibold">Sim</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Garantia</span>
                    <span className="text-brand-coral font-semibold">2 anos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-coral/10 via-brand-yellow/10 to-brand-turquoise/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            <span className="text-white">Pronto para Transformar o Seu</span> <span className="text-brand-coral">Espaço?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Explore o nosso catálogo interativo e descubra milhares de possibilidades 
            para decorar as suas paredes com estilo e personalidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-brand-coral to-brand-yellow text-white font-bold px-8 py-6 text-lg">
              <Link href="/contactos#formulario">
                Agendar Consulta
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-brand-turquoise text-brand-turquoise hover:bg-brand-turquoise hover:text-black px-8 py-6 text-lg">
              <a href="https://wa.me/351930682725?text=Olá!%20Interessado%20em%20papel%20de%20parede." target="_blank" rel="noopener noreferrer">
                WhatsApp Direto
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}