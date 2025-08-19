import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Settings } from "lucide-react";
import { Link } from "wouter";
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
  { id: 'papel-parede', name: 'Papel de Parede', href: '/loja/papel-parede' },
  { id: 'placas-decorativas', name: 'Placas Decorativas' },
  { id: 'autocolantes', name: 'Autocolantes' },
  { id: 'quadros', name: 'Quadros' },
  { id: 'sinalizacao', name: 'Sinalização' }
];

export default function Loja() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  
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
              category.href ? (
                <Link key={category.id} href={category.href}>
                  <Button
                    variant="outline"
                    className="border-[#333] text-white hover:border-[#FFD700]"
                  >
                    {category.name}
                  </Button>
                </Link>
              ) : (
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
              )
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pt-0 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
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
                        {product.status === 'sold-out' ? 'Esgotado' : 'Adicionar'}
                      </Button>
                      <Button variant="outline" size="icon" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
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