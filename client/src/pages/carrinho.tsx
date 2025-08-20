import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Trash2, Sparkles, Plus, Minus } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  textureName: string;
  textureImage: string;
  category: string;
  preco: number;
  acabamento: 'brilho' | 'mate';
  laminacao: boolean;
  precoTotal: number;
  quantidade?: number;
}

export default function Carrinho() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      // Add quantity if not exists
      const itemsWithQuantity = items.map((item: CartItem) => ({
        ...item,
        quantidade: item.quantidade || 1
      }));
      setCartItems(itemsWithQuantity);
    }
    setIsLoading(false);
  }, []);

  const updateCartInStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  const updateItem = (id: string, updates: Partial<CartItem>) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, ...updates };
        // Recalculate total price
        updatedItem.precoTotal = updatedItem.preco + (updatedItem.laminacao ? 5 : 0);
        return updatedItem;
      }
      return item;
    });
    updateCartInStorage(updatedItems);
  };

  const updateQuantity = (id: string, quantidade: number) => {
    if (quantidade < 1) return;
    updateItem(id, { quantidade });
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    updateCartInStorage(updatedItems);
    toast({
      title: "Item removido",
      description: "Produto removido do carrinho.",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    toast({
      title: "Carrinho limpo",
      description: "Todos os produtos foram removidos do carrinho.",
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.precoTotal * (item.quantidade || 1));
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto"></div>
            <p className="mt-4 text-gray-300">A carregar carrinho...</p>
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
            <Link href="/loja">
              <Button variant="outline" size="sm" className="gap-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                <ArrowLeft className="h-4 w-4" />
                Continuar a Comprar
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Carrinho de <span className="text-[#FFD700]">Compras</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Personalize os seus produtos e finalize a compra
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-4">
              O seu carrinho está vazio
            </h2>
            <p className="text-gray-500 mb-8">
              Adicione algumas texturas fantásticas ao seu carrinho!
            </p>
            <Link href="/loja/papel-parede">
              <Button className="bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold">
                Ver Texturas
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#FFD700]">
                  Produtos no Carrinho ({cartItems.length})
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Limpar Carrinho
                </Button>
              </div>

              {cartItems.map((item) => (
                <Card key={item.id} className="bg-[#111111] border-[#333]">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6">
                      {/* Product Image */}
                      <div className="md:col-span-1">
                        <img
                          src={item.textureImage}
                          alt={item.textureName}
                          className="w-full aspect-square object-cover rounded-lg border border-[#333]"
                        />
                      </div>

                      {/* Product Info & Customization */}
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-[#FFD700] mb-2">
                            {item.textureName}
                          </h3>
                          <Badge className="bg-[#20B2AA] text-black">
                            {item.category.toUpperCase()}
                          </Badge>
                        </div>

                        {/* Customization Options */}
                        <div className="space-y-4">
                          {/* Acabamento */}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Acabamento
                            </label>
                            <Select 
                              value={item.acabamento} 
                              onValueChange={(value: 'brilho' | 'mate') => updateItem(item.id, { acabamento: value })}
                            >
                              <SelectTrigger className="bg-[#0a0a0a] border-[#333] text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[#111111] border-[#333]">
                                <SelectItem value="brilho" className="text-white hover:bg-[#333]">
                                  <div className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Brilho
                                  </div>
                                </SelectItem>
                                <SelectItem value="mate" className="text-white hover:bg-[#333]">
                                  <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
                                    Mate
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Laminação */}
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`laminacao-${item.id}`}
                              checked={item.laminacao}
                              onChange={(e) => updateItem(item.id, { laminacao: e.target.checked })}
                              className="rounded border-[#333] bg-[#0a0a0a] text-[#FFD700] focus:ring-[#FFD700]"
                            />
                            <label htmlFor={`laminacao-${item.id}`} className="text-sm text-gray-300">
                              Laminação (+€5)
                            </label>
                            <Sparkles className="h-4 w-4 text-[#FFD700]" />
                          </div>

                          {/* Quantity */}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Quantidade
                            </label>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, (item.quantidade || 1) - 1)}
                                disabled={(item.quantidade || 1) <= 1}
                                className="border-[#333] text-white hover:bg-[#333]"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-semibold">
                                {item.quantidade || 1}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, (item.quantidade || 1) + 1)}
                                className="border-[#333] text-white hover:bg-[#333]"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="md:col-span-1 text-right space-y-4">
                        <div>
                          <p className="text-sm text-gray-400">Preço unitário:</p>
                          <p className="text-lg font-semibold text-white">€{item.precoTotal}</p>
                          <p className="text-sm text-gray-400">
                            Total: €{(item.precoTotal * (item.quantidade || 1)).toFixed(2)}
                          </p>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-[#111111] border-[#333] sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#FFD700] mb-6">
                    Resumo do Pedido
                  </h3>

                  {/* Order Details */}
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          {item.textureName.substring(0, 25)}... x{item.quantidade || 1}
                        </span>
                        <span className="text-white font-semibold">
                          €{(item.precoTotal * (item.quantidade || 1)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <hr className="border-[#333] my-4" />

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[#FFD700] font-bold text-lg">Total:</span>
                    <span className="text-[#FFD700] font-bold text-2xl">
                      €{calculateTotal().toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Button className="w-full bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold py-3 hover:opacity-90 mb-4">
                    Finalizar Compra
                  </Button>

                  {/* Continue Shopping */}
                  <Link href="/loja/papel-parede">
                    <Button variant="outline" className="w-full border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                      Continuar a Comprar
                    </Button>
                  </Link>

                  {/* Info */}
                  <div className="mt-6 p-4 bg-[#0a0a0a] rounded-lg border border-[#333]">
                    <h4 className="text-sm font-semibold text-[#FFD700] mb-2">Informações:</h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Produtos personalizados</li>
                      <li>• Sem trocas ou devoluções</li>
                      <li>• Prazo: 5-7 dias úteis</li>
                      <li>• Instalação disponível</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}