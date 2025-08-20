import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Package, Sparkles } from "lucide-react";
import { Link, useParams } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useToast } from "@/hooks/use-toast";

interface TextureImage {
  name: string;
  path: string;
}

interface CartItem {
  textureName: string;
  textureImage: string;
  acabamento: 'brilho' | 'mate';
  laminacao: boolean;
  preco: number;
  precoTotal: number;
}

export default function LojaTexturaDetalhes() {
  const { textura } = useParams();
  const { toast } = useToast();
  
  const [selectedTexture, setSelectedTexture] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const { data: images, isLoading } = useQuery({
    queryKey: ["/api/loja/images"],
  });

  // Filter textures for the specific category
  // Convert textura param to match folder structure (3d -> 3D)
  const categoryName = textura === '3d' ? '3D' : 
                      textura === 'baby-2.0' ? 'Baby-2.0' :
                      textura === 'baby-colors' ? 'Baby-Colors' :
                      textura === 'baby-paineis' ? 'Baby-Paineis' :
                      textura === 'baby-pantone' ? 'Baby-Pantone' :
                      textura ? textura.charAt(0).toUpperCase() + textura.slice(1) : '';
  
  const textureImages: TextureImage[] = (images as { images: string[] })?.images
    ?.filter((path: string) => 
      path.includes(`loja/papel-de-parede/texturas/${categoryName}/`) &&
      /\.(jpg|jpeg|png|gif|webp)$/i.test(path)
    )
    ?.map((path: string) => ({
      name: path.split('/').pop()?.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '') || '',
      path: `/public-objects/${path}`
    })) || [];
  
  const basePrice = 20;

  const handleAddToCart = () => {
    if (!selectedTexture) {
      toast({
        title: "Selecione uma textura",
        description: "Por favor, escolha uma textura antes de adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    const cartItem = {
      id: Date.now().toString(),
      textureName: `${textura?.toUpperCase()} - ${selectedTexture.split('/').pop()?.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '') || ''}`,
      textureImage: selectedTexture,
      category: textura || '',
      preco: basePrice,
      acabamento: 'brilho' as const,
      laminacao: false,
      precoTotal: basePrice,
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    toast({
      title: "Produto adicionado!",
      description: "Textura adicionada ao carrinho. Personalize no carrinho!",
    });
  };

  const handlePreview = () => {
    if (!selectedTexture) {
      toast({
        title: "Selecione uma textura",
        description: "Por favor, escolha uma textura para ver a pré-visualização.",
        variant: "destructive",
      });
      return;
    }
    setShowPreview(true);
  };

  const textureName = textura?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || '';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto"></div>
            <p className="mt-4 text-gray-300">A carregar texturas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />
      
      {/* Header */}
      <div className="bg-[#111111] border-b border-[#333] mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/loja/papel-parede">
              <Button variant="outline" size="sm" className="gap-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                <ArrowLeft className="h-4 w-4" />
                Voltar às Texturas
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Texturas <span className="text-[#FFD700]">{textureName}</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Escolha a sua textura favorita e personalize o acabamento
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Texture Gallery */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-6">
              Texturas Disponíveis
            </h2>
            
            {textureImages.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">
                  Nenhuma textura disponível para {textureName} no momento.
                </p>
                <p className="text-gray-500 mt-2">
                  Entre em contacto connosco para mais opções.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {textureImages.map((texture) => (
                  <div
                    key={texture.name}
                    className={`cursor-pointer group ${
                      selectedTexture === texture.path ? 'ring-2 ring-[#FFD700]' : ''
                    }`}
                    onClick={() => setSelectedTexture(texture.path)}
                  >
                    <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200">
                      <img
                        src={texture.path}
                        alt={texture.name}
                        className="w-full aspect-square object-cover rounded group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-center mt-2 text-xs text-gray-300 group-hover:text-[#FFD700] transition-colors">
                      {texture.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Options Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-[#111111] border-[#333] sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#FFD700] mb-6">
                  Ações
                </h3>

                {/* Selected Texture Preview */}
                {selectedTexture && (
                  <div className="mb-6 p-4 bg-[#0a0a0a] rounded-lg border border-[#333]">
                    <h4 className="text-sm font-semibold text-[#FFD700] mb-3">Textura Selecionada:</h4>
                    <img
                      src={selectedTexture}
                      alt="Textura selecionada"
                      className="w-full aspect-square object-cover rounded mb-3"
                    />
                    <p className="text-xs text-gray-300 text-center">
                      {selectedTexture.split('/').pop()?.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')}
                    </p>
                  </div>
                )}

                {/* Price Display */}
                <div className="mb-6 p-4 bg-[#0a0a0a] rounded-lg border border-[#333]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#FFD700] font-bold">Preço base:</span>
                    <span className="text-[#FFD700] font-bold text-xl">€{basePrice}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    *Personalização disponível no carrinho
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={handlePreview}
                    disabled={!selectedTexture}
                    variant="outline"
                    className="w-full border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black"
                  >
                    Ver Maior
                  </Button>
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!selectedTexture}
                    className="w-full bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold py-3 hover:opacity-90 disabled:opacity-50"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>

                {/* Continue Shopping Message */}
                <div className="mt-6 p-4 bg-[#0a0a0a] rounded-lg border border-[#333]">
                  <p className="text-sm text-gray-300 text-center">
                    💡 Adicione mais produtos ao carrinho para otimizar o envio!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTexture && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#FFD700]">
                  Pré-visualização da Textura
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                  className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black"
                >
                  Fechar
                </Button>
              </div>
              <img
                src={selectedTexture}
                alt="Pré-visualização da textura"
                className="w-full max-w-2xl mx-auto rounded-lg"
              />
              <p className="text-center mt-4 text-gray-300">
                {selectedTexture.split('/').pop()?.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}