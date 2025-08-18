import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Settings } from "lucide-react";
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
  }
];

export default function LojaLimpa() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos os Produtos', count: products.length },
    { id: 'placas-decorativas', name: 'Placas Decorativas', count: 1 },
    { id: 'autocolantes', name: 'Autocolantes', count: 1 },
    { id: 'quadros', name: 'Quadros', count: 1 }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'promotion':
        return <Badge className="bg-red-600 text-white">Promoção</Badge>;
      case 'new':
        return <Badge className="bg-green-600 text-white">Novo</Badge>;
      case 'sold-out':
        return <Badge className="bg-gray-600 text-white">Esgotado</Badge>;
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-400'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-400">({rating})</span>
      </div>
    );
  };

  return (
    <>
      <Navigation />
      
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-black via-[#111111] to-[#0A0A0A] min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#FFD700] via-[#20B2AA] to-[#FF6B6B] bg-clip-text text-transparent">
              LOJA DOMREALCE
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore a nossa gama de produtos personalizados de comunicação visual e impressão digital.
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
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
                <Badge variant="secondary" className="ml-2 bg-[#333] text-white">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Products Grid */}
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

          {/* Features Section */}
          <section className="py-16 px-4">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-[#20B2AA] to-[#FF6B6B] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#20B2AA]">Entrega Rápida</h3>
                  <p className="text-gray-300">
                    Entregamos em todo o país com prazos reduzidos.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B6B] to-[#FFD700] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Star className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#FF6B6B]">Qualidade Premium</h3>
                  <p className="text-gray-300">
                    Materiais de alta qualidade e acabamentos profissionais.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  );
}