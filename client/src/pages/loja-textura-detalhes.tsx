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
  
  const [acabamento, setAcabamento] = useState<'brilho' | 'mate'>('brilho');
  const [laminacao, setLaminacao] = useState(false);
  const [selectedTexture, setSelectedTexture] = useState<string>('');

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
  const laminacaoPrice = 5;
  const totalPrice = basePrice + (laminacao ? laminacaoPrice : 0);

  const handleAddToCart = () => {
    if (!selectedTexture) {
      toast({
        title: "Selecione uma textura",
        description: "Por favor, escolha uma textura antes de adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    const cartItem: CartItem = {
      textureName: `${textura} - ${selectedTexture}`,
      textureImage: selectedTexture,
      acabamento,
      laminacao,
      preco: basePrice,
      precoTotal: totalPrice
    };

    // Here you would typically add to a cart state/context
    console.log('Adding to cart:', cartItem);
    
    toast({
      title: "Adicionado ao carrinho!",
      description: `${cartItem.textureName} foi adicionado ao carrinho por €${totalPrice}.`,
    });
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                        className="w-full h-32 object-cover rounded group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-center mt-2 text-sm text-gray-300 group-hover:text-[#FFD700] transition-colors">
                      {texture.name}
                    </p>
                    {selectedTexture === texture.path && (
                      <div className="text-center mt-1">
                        <Badge className="bg-[#FFD700] text-black">Selecionada</Badge>
                      </div>
                    )}
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
                  Personalizar Produto
                </h3>

                {/* Price Display */}
                <div className="mb-6 p-4 bg-[#0a0a0a] rounded-lg border border-[#333]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Preço base:</span>
                    <span className="text-white font-semibold">€{basePrice}</span>
                  </div>
                  {laminacao && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Laminação:</span>
                      <span className="text-white font-semibold">+€{laminacaoPrice}</span>
                    </div>
                  )}
                  <hr className="border-[#333] my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-[#FFD700] font-bold">Total:</span>
                    <span className="text-[#FFD700] font-bold text-xl">€{totalPrice}</span>
                  </div>
                </div>

                {/* Acabamento Selection */}
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">
                    Tipo de Acabamento
                  </label>
                  <Select value={acabamento} onValueChange={(value: 'brilho' | 'mate') => setAcabamento(value)}>
                    <SelectTrigger className="bg-[#0a0a0a] border-[#333] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brilho">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Brilho
                        </div>
                      </SelectItem>
                      <SelectItem value="mate">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
                          Mate
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Laminação Option */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={laminacao}
                      onChange={(e) => setLaminacao(e.target.checked)}
                      className="w-4 h-4 text-[#FFD700] bg-[#0a0a0a] border-[#333] rounded focus:ring-[#FFD700]"
                    />
                    <div>
                      <span className="text-white font-semibold">Com Laminação</span>
                      <p className="text-gray-400 text-sm">
                        Proteção extra (+€{laminacaoPrice})
                      </p>
                    </div>
                  </label>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full gap-2 bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold hover:opacity-90 py-3"
                  disabled={!selectedTexture}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>

                {!selectedTexture && (
                  <p className="text-gray-400 text-sm text-center mt-2">
                    Selecione uma textura para continuar
                  </p>
                )}

                {/* Product Info */}
                <div className="mt-6 pt-6 border-t border-[#333]">
                  <h4 className="text-white font-semibold mb-3">Informações do Produto</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Produto personalizado</li>
                    <li>• Sem trocas ou devoluções</li>
                    <li>• Prazo de entrega: 5-7 dias úteis</li>
                    <li>• Instalação disponível</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}