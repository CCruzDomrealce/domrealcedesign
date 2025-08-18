import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, ShoppingCart, Settings, Wallpaper, ArrowLeft, Eye, Plus, CheckCircle } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
  status: 'available' | 'promotion' | 'new' | 'sold-out';
}

const products: Product[] = [
  {
    id: 1,
    name: "Placa Decorativa Vintage",
    description: "Placa decorativa em metal vintage personalizada com a sua mensagem.",
    price: 25.99,
    originalPrice: 29.99,
    rating: 4.8,
    image: "/placeholder-product.jpg",
    category: "placas-decorativas",
    status: 'promotion'
  },
  {
    id: 2,
    name: "Autocolantes Logo Empresa",
    description: "Pack de 50 autocolantes personalizados com o seu logótipo.",
    price: 15.50,
    rating: 4.9,
    image: "/placeholder-product.jpg",
    category: "autocolantes",
    status: 'new'
  },
  {
    id: 3,
    name: "Quadro Canvas Personalizado",
    description: "Quadro em canvas com a sua imagem ou design preferido.",
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.7,
    image: "/placeholder-product.jpg",
    category: "quadros",
    status: 'promotion'
  },
  {
    id: 4,
    name: "Kit Sinalização Escritório",
    description: "Kit completo de sinalização para escritórios com placas de identificação.",
    price: 89.99,
    rating: 4.6,
    image: "/placeholder-product.jpg",
    category: "sinalizacao",
    status: 'sold-out'
  },
  {
    id: 5,
    name: "Adesivos Decorativos Parede",
    description: "Conjunto de adesivos decorativos removíveis para paredes.",
    price: 12.75,
    rating: 4.5,
    image: "/placeholder-product.jpg",
    category: "autocolantes",
    status: 'new'
  },
  {
    id: 6,
    name: "Placa Identificação Porta",
    description: "Placa elegante para identificação de portas de escritório ou casa.",
    price: 18.90,
    originalPrice: 22.90,
    rating: 4.8,
    image: "/placeholder-product.jpg",
    category: "placas-decorativas",
    status: 'promotion'
  }
];

const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'papel-parede', name: 'Papel de Parede' },
  { id: 'placas-decorativas', name: 'Placas Decorativas' },
  { id: 'autocolantes', name: 'Autocolantes' },
  { id: 'quadros', name: 'Quadros' },
  { id: 'sinalizacao', name: 'Sinalização' }
];

// 28 Subcategorias de Papel de Parede
const subcategoriasPapelParede = [
  { id: 1, nome: "Madeira Rústica", categoria: "Natural", capas: ["madeira-rustica-1", "madeira-rustica-2", "madeira-rustica-3"] },
  { id: 2, nome: "Pedra Natural", categoria: "Natural", capas: ["pedra-natural-1", "pedra-natural-2", "pedra-natural-3"] },
  { id: 3, nome: "Tijolo Vintage", categoria: "Industrial", capas: ["tijolo-vintage-1", "tijolo-vintage-2", "tijolo-vintage-3"] },
  { id: 4, nome: "Mármore Elegante", categoria: "Luxo", capas: ["marmore-elegante-1", "marmore-elegante-2", "marmore-elegante-3"] },
  { id: 5, nome: "Tecido Suave", categoria: "Têxtil", capas: ["tecido-suave-1", "tecido-suave-2", "tecido-suave-3"] },
  { id: 6, nome: "Metal Escovado", categoria: "Industrial", capas: ["metal-escovado-1", "metal-escovado-2", "metal-escovado-3"] },
  { id: 7, nome: "Couro Premium", categoria: "Luxo", capas: ["couro-premium-1", "couro-premium-2", "couro-premium-3"] },
  { id: 8, nome: "Bambu Natural", categoria: "Natural", capas: ["bambu-natural-1", "bambu-natural-2", "bambu-natural-3"] },
  { id: 9, nome: "Concreto Industrial", categoria: "Industrial", capas: ["concreto-industrial-1", "concreto-industrial-2", "concreto-industrial-3"] },
  { id: 10, nome: "Seda Oriental", categoria: "Luxo", capas: ["seda-oriental-1", "seda-oriental-2", "seda-oriental-3"] },
  { id: 11, nome: "Folhagem Tropical", categoria: "Natural", capas: ["folhagem-tropical-1", "folhagem-tropical-2", "folhagem-tropical-3"] },
  { id: 12, nome: "Geometria Moderna", categoria: "Contemporâneo", capas: ["geometria-moderna-1", "geometria-moderna-2", "geometria-moderna-3"] },
  { id: 13, nome: "Flores Vintage", categoria: "Clássico", capas: ["flores-vintage-1", "flores-vintage-2", "flores-vintage-3"] },
  { id: 14, nome: "Abstrato Colorido", categoria: "Contemporâneo", capas: ["abstrato-colorido-1", "abstrato-colorido-2", "abstrato-colorido-3"] },
  { id: 15, nome: "Cortiça Natural", categoria: "Natural", capas: ["cortica-natural-1", "cortica-natural-2", "cortica-natural-3"] },
  { id: 16, nome: "Veludo Luxo", categoria: "Luxo", capas: ["veludo-luxo-1", "veludo-luxo-2", "veludo-luxo-3"] },
  { id: 17, nome: "Listras Clássicas", categoria: "Clássico", capas: ["listras-classicas-1", "listras-classicas-2", "listras-classicas-3"] },
  { id: 18, nome: "Grafite Urbano", categoria: "Industrial", capas: ["grafite-urbano-1", "grafite-urbano-2", "grafite-urbano-3"] },
  { id: 19, nome: "Damasco Dourado", categoria: "Luxo", capas: ["damasco-dourado-1", "damasco-dourado-2", "damasco-dourado-3"] },
  { id: 20, nome: "Minimalista Zen", categoria: "Contemporâneo", capas: ["minimalista-zen-1", "minimalista-zen-2", "minimalista-zen-3"] },
  { id: 21, nome: "Pedras Preciosas", categoria: "Luxo", capas: ["pedras-preciosas-1", "pedras-preciosas-2", "pedras-preciosas-3"] },
  { id: 22, nome: "Floresta Boreal", categoria: "Natural", capas: ["floresta-boreal-1", "floresta-boreal-2", "floresta-boreal-3"] },
  { id: 23, nome: "Art Déco", categoria: "Clássico", capas: ["art-deco-1", "art-deco-2", "art-deco-3"] },
  { id: 24, nome: "Neon Futurista", categoria: "Contemporâneo", capas: ["neon-futurista-1", "neon-futurista-2", "neon-futurista-3"] },
  { id: 25, nome: "Corda Náutica", categoria: "Natural", capas: ["corda-nautica-1", "corda-nautica-2", "corda-nautica-3"] },
  { id: 26, nome: "Cristal Brilhante", categoria: "Luxo", capas: ["cristal-brilhante-1", "cristal-brilhante-2", "cristal-brilhante-3"] },
  { id: 27, nome: "Padrão Étnico", categoria: "Clássico", capas: ["padrao-etnico-1", "padrao-etnico-2", "padrao-etnico-3"] },
  { id: 28, nome: "Holográfico Moderno", categoria: "Contemporâneo", capas: ["holografico-moderno-1", "holografico-moderno-2", "holografico-moderno-3"] }
];

export default function Loja() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<number | null>(null);
  const [texturaVisualizacao, setTexturaVisualizacao] = useState<string | null>(null);
  const [carrinho, setCarrinho] = useState<{textura: string, subcategoria: string}[]>([]);
  
  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'promotion':
        return <Badge className="bg-[#FF6347] text-white">Promoção</Badge>;
      case 'new':
        return <Badge className="bg-[#20B2AA] text-white">Novo</Badge>;
      case 'sold-out':
        return <Badge variant="secondary">Esgotado</Badge>;
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-400'}`} 
          />
        ))}
        <span className="text-sm text-gray-400 ml-1">({rating})</span>
      </div>
    );
  };

  const adicionarAoCarrinho = (textura: string, subcategoria: string) => {
    setCarrinho([...carrinho, { textura, subcategoria }]);
  };

  const voltarParaSubcategorias = () => {
    setSubcategoriaSelecionada(null);
  };

  const voltarParaCategorias = () => {
    setSelectedCategory('todos');
    setSubcategoriaSelecionada(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-yellow/10 via-brand-turquoise/5 to-brand-coral/10 py-20 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Nossa <span className="text-brand-yellow">Loja</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              Produtos personalizáveis prontos para entrega. Qualidade profissional com a comodidade de compra online.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="pt-0 pb-4">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSubcategoriaSelecionada(null);
                }}
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
        </div>
      </section>

      {/* Conteúdo da Loja */}
      <section className="pt-0 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Vista de Papel de Parede - Subcategorias */}
            {selectedCategory === 'papel-parede' && subcategoriaSelecionada === null && (
              <div>
                <div className="flex items-center mb-6">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory('todos')}
                    className="border-gray-700 text-gray-300 hover:border-brand-turquoise mr-4"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar às Categorias
                  </Button>
                  <h2 className="text-2xl font-bold text-white">
                    <Wallpaper className="w-6 h-6 inline mr-2" />
                    Papel de Parede - Escolha uma Subcategoria
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {subcategoriasPapelParede.map((subcategoria) => (
                    <Card
                      key={subcategoria.id}
                      onClick={() => setSubcategoriaSelecionada(subcategoria.id)}
                      className="bg-[#111111] border-[#333] hover:border-brand-turquoise transition-all duration-300 cursor-pointer group"
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="w-full aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-t-lg flex items-center justify-center">
                            <Wallpaper className="w-8 h-8 text-gray-500" />
                          </div>
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-white font-medium text-sm mb-1">{subcategoria.nome}</h3>
                          <p className="text-gray-400 text-xs">{subcategoria.categoria}</p>
                          <p className="text-brand-turquoise text-xs mt-1">{subcategoria.capas.length} texturas</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Vista de Papel de Parede - Texturas de uma Subcategoria */}
            {selectedCategory === 'papel-parede' && subcategoriaSelecionada !== null && (
              <div>
                <div className="flex items-center mb-6">
                  <Button
                    variant="outline"
                    onClick={voltarParaSubcategorias}
                    className="border-gray-700 text-gray-300 hover:border-brand-turquoise mr-4"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar às Subcategorias
                  </Button>
                  <h2 className="text-2xl font-bold text-white">
                    {subcategoriasPapelParede.find(s => s.id === subcategoriaSelecionada)?.nome}
                  </h2>
                  <div className="ml-auto flex items-center gap-4">
                    <span className="text-gray-400">
                      Carrinho: {carrinho.length} itens
                    </span>
                    <Button
                      variant="outline"
                      className="border-brand-turquoise text-brand-turquoise hover:bg-brand-turquoise hover:text-black"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Ver Carrinho
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {subcategoriasPapelParede
                    .find(s => s.id === subcategoriaSelecionada)
                    ?.capas.map((capa, index) => (
                    <Card
                      key={index}
                      className="bg-[#111111] border-[#333] hover:border-brand-turquoise transition-all duration-300 group"
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <div 
                            className="w-full aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-t-lg flex items-center justify-center cursor-pointer"
                            onClick={() => setTexturaVisualizacao(capa)}
                          >
                            <Wallpaper className="w-12 h-12 text-gray-500" />
                          </div>
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-white font-medium text-sm mb-2">
                            {capa.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-brand-yellow font-bold">€20.00</span>
                            <Button
                              size="sm"
                              onClick={() => adicionarAoCarrinho(capa, subcategoriasPapelParede.find(s => s.id === subcategoriaSelecionada)?.nome || '')}
                              className="bg-brand-turquoise text-black hover:bg-brand-turquoise/80"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Adicionar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Vista de Outras Categorias - Produtos Normais */}
            {selectedCategory !== 'papel-parede' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-[#111111] border-[#333] hover:border-[#FFD700] transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-[#333] to-[#222] rounded-t-lg flex items-center justify-center">
                      <div className="text-6xl opacity-20">📦</div>
                    </div>
                    {getStatusBadge(product.status) && (
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(product.status)}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      {renderStars(product.rating)}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#FFD700] transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 text-sm">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[#FFD700]">
                          €{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through">
                            €{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className={`flex-1 ${
                          product.status === 'sold-out' 
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold hover:opacity-90'
                        }`}
                        disabled={product.status === 'sold-out'}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.status === 'sold-out' ? 'Esgotado' : 'Adicionar ao Carrinho'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
              </div>
            )}
            
            {/* Modal de Visualização de Textura em Tamanho Grande */}
            <Dialog open={!!texturaVisualizacao} onOpenChange={() => setTexturaVisualizacao(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] bg-black border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white">
                    Visualização da Textura
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-2xl aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center mb-4">
                    <Wallpaper className="w-24 h-24 text-gray-500" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-4">
                    {texturaVisualizacao?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setTexturaVisualizacao(null)}
                      variant="outline"
                      className="border-gray-700 text-gray-300"
                    >
                      Fechar
                    </Button>
                    <Button
                      onClick={() => {
                        if (texturaVisualizacao && subcategoriaSelecionada) {
                          adicionarAoCarrinho(texturaVisualizacao, subcategoriasPapelParede.find(s => s.id === subcategoriaSelecionada)?.nome || '');
                          setTexturaVisualizacao(null);
                        }
                      }}
                      className="bg-brand-turquoise text-black hover:bg-brand-turquoise/80"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar ao Carrinho - €20.00
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#20B2AA] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#FFD700]">Personalização Gratuita</h3>
              <p className="text-gray-300">
                Todos os produtos podem ser personalizados sem custos adicionais.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#20B2AA] to-[#4169E1] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#20B2AA]">Envio Rápido</h3>
              <p className="text-gray-300">
                Entregas em 3-5 dias úteis para todo o país.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6347] to-[#FFD700] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#FF6347]">Qualidade Garantida</h3>
              <p className="text-gray-300">
                40 anos de experiência garantem a melhor qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}