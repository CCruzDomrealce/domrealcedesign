import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Eye, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Settings,
  CheckCircle,
  Package,
  Palette
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";
import img3D from '@/assets/3D_1755538105413.webp';

interface Texture3D {
  id: number;
  nome: string;
  fileName: string;
  preco: number;
}

interface CartItem {
  textureId: number;
  nome: string;
  fileName: string;
  quantidade: number;
  acabamento: 'mate' | 'brilho';
  laminacao: boolean;
  precoBase: number;
  precoTotal: number;
}

export default function Produto3D() {
  const [texturas, setTexturas] = useState<Texture3D[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [texturaVisualizacao, setTexturaVisualizacao] = useState<Texture3D | null>(null);
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [texturaSelecionada, setTexturaSelecionada] = useState<Texture3D | null>(null);
  const [modalConfiguracao, setModalConfiguracao] = useState(false);
  const [configuracao, setConfiguracao] = useState({
    quantidade: 1,
    acabamento: 'mate' as 'mate' | 'brilho',
    laminacao: false
  });

  const texturasPorPagina = 20;
  const precoBase = 20.0;
  const precoLaminacao = 5.0;

  // Carregamento das texturas 3D do backend
  useEffect(() => {
    const carregarTexturas3D = async () => {
      try {
        console.log('🔄 Carregando texturas 3D da API...');
        const response = await fetch('/api/texturas-3d');
        
        if (response.ok) {
          const texturas3DReais = await response.json();
          console.log('✅ Texturas carregadas:', texturas3DReais);
          setTexturas(texturas3DReais);
        } else {
          console.error('❌ Erro na resposta da API:', response.status, response.statusText);
          throw new Error(`Erro HTTP: ${response.status}`);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar texturas 3D:', error);
        
        // Fallback básico apenas para desenvolvimento
        const texturasFallback: Texture3D[] = [
          { id: 1, nome: "Textura 3D (Carregamento)", fileName: "placeholder.jpg", preco: precoBase }
        ];
        setTexturas(texturasFallback);
      }
    };

    carregarTexturas3D();
  }, []);



  const texturasPagina = texturas.slice(
    (paginaAtual - 1) * texturasPorPagina,
    paginaAtual * texturasPorPagina
  );

  const totalPaginas = Math.ceil(texturas.length / texturasPorPagina);

  const calcularPrecoTotal = () => {
    let total = precoBase * configuracao.quantidade;
    if (configuracao.laminacao) {
      total += precoLaminacao * configuracao.quantidade;
    }
    return total;
  };

  const adicionarAoCarrinho = () => {
    if (!texturaSelecionada) return;

    const itemCarrinho: CartItem = {
      textureId: texturaSelecionada.id,
      nome: texturaSelecionada.nome,
      fileName: texturaSelecionada.fileName,
      quantidade: configuracao.quantidade,
      acabamento: configuracao.acabamento,
      laminacao: configuracao.laminacao,
      precoBase: precoBase,
      precoTotal: calcularPrecoTotal()
    };

    setCarrinho(prev => [...prev, itemCarrinho]);
    setModalConfiguracao(false);
    setTexturaSelecionada(null);
    setConfiguracao({
      quantidade: 1,
      acabamento: 'mate',
      laminacao: false
    });
  };

  const removerDoCarrinho = (index: number) => {
    setCarrinho(prev => prev.filter((_, i) => i !== index));
  };

  const totalCarrinho = carrinho.reduce((sum, item) => sum + item.precoTotal, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/loja">
              <Button variant="ghost" size="sm" className="text-white hover:text-brand-yellow">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar à Loja
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Texturas 3D</h1>
              <p className="text-gray-400">Papel de parede com efeito tridimensional</p>
            </div>
          </div>

          {/* Carrinho resumo */}
          {carrinho.length > 0 && (
            <Card className="mb-8 bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5 text-brand-yellow" />
                    <span className="text-white font-medium">
                      {carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'} no carrinho
                    </span>
                  </div>
                  <div className="text-brand-yellow font-bold text-xl">
                    €{totalCarrinho.toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grid de texturas */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {texturasPagina.map((textura) => (
              <Card key={textura.id} className="bg-gray-800/50 border-gray-700 hover:border-brand-yellow/50 transition-all group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="w-full aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-t-lg flex items-center justify-center overflow-hidden">
                      <img 
                        src={img3D}
                        alt={textura.nome}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay com botões */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setTexturaVisualizacao(textura)}
                          className="bg-white/20 hover:bg-white/30"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-brand-yellow hover:bg-brand-yellow/80 text-black"
                          onClick={() => {
                            setTexturaSelecionada(textura);
                            setModalConfiguracao(true);
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h3 className="text-white font-medium text-sm mb-1">{textura.nome}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-yellow font-bold">€{textura.preco.toFixed(2)}</span>
                        <Badge variant="outline" className="text-xs border-brand-turquoise text-brand-turquoise">
                          3D
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={paginaAtual === 1}
                onClick={() => setPaginaAtual(prev => prev - 1)}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Anterior
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={paginaAtual === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPaginaAtual(pageNum)}
                      className={paginaAtual === pageNum 
                        ? "bg-brand-yellow text-black hover:bg-brand-yellow/80" 
                        : "border-gray-700 text-white hover:bg-gray-800"
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                disabled={paginaAtual === totalPaginas}
                onClick={() => setPaginaAtual(prev => prev + 1)}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Próxima
              </Button>
            </div>
          )}
        </div>

        {/* Modal de visualização */}
        <Dialog open={!!texturaVisualizacao} onOpenChange={() => setTexturaVisualizacao(null)}>
          <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">{texturaVisualizacao?.nome}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Visualização em tamanho grande da textura selecionada
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
              {texturaVisualizacao && (
                <>
                  <img 
                    src={img3D}
                    alt={texturaVisualizacao.nome}
                    className="w-full h-full object-cover"
                  />
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de configuração do produto */}
        <Dialog open={modalConfiguracao} onOpenChange={setModalConfiguracao}>
          <DialogContent className="max-w-md bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Configurar Produto</DialogTitle>
              <DialogDescription className="text-gray-400">
                Escolha a quantidade, acabamento e opções de laminação
              </DialogDescription>
            </DialogHeader>
            
            {texturaSelecionada && (
              <div className="space-y-6">
                {/* Preview da textura */}
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                  <img 
                    src={img3D}
                    alt={texturaSelecionada.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-white font-medium">{texturaSelecionada.nome}</h3>

                {/* Quantidade */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">Quantidade</label>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setConfiguracao(prev => ({ ...prev, quantidade: Math.max(1, prev.quantidade - 1) }))}
                      className="border-gray-700 text-white hover:bg-gray-800"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-white font-medium w-12 text-center">{configuracao.quantidade}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setConfiguracao(prev => ({ ...prev, quantidade: prev.quantidade + 1 }))}
                      className="border-gray-700 text-white hover:bg-gray-800"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Acabamento */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">Acabamento</label>
                  <Select value={configuracao.acabamento} onValueChange={(value: 'mate' | 'brilho') => 
                    setConfiguracao(prev => ({ ...prev, acabamento: value }))
                  }>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="mate" className="text-white hover:bg-gray-700">Mate</SelectItem>
                      <SelectItem value="brilho" className="text-white hover:bg-gray-700">Brilho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Laminação */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={configuracao.laminacao}
                      onChange={(e) => setConfiguracao(prev => ({ ...prev, laminacao: e.target.checked }))}
                      className="w-4 h-4 text-brand-yellow bg-gray-800 border-gray-700 rounded focus:ring-brand-yellow"
                    />
                    <span className="text-gray-300">
                      Laminação (+€{precoLaminacao.toFixed(2)})
                    </span>
                  </label>
                </div>

                {/* Preço total */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total:</span>
                    <span className="text-brand-yellow font-bold text-xl">
                      €{calcularPrecoTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setModalConfiguracao(false)}
                    className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={adicionarAoCarrinho}
                    className="flex-1 bg-brand-yellow hover:bg-brand-yellow/80 text-black"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Carrinho detalhado */}
        {carrinho.length > 0 && (
          <div className="container mx-auto px-4 pb-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-white text-xl font-bold mb-4">Carrinho de Compras</h2>
                
                <div className="space-y-4">
                  {carrinho.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded overflow-hidden flex items-center justify-center">
                        <img 
                          src={getTextura3DUrl(item.fileName)}
                          alt={item.nome}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            const fallback = img.nextElementSibling as HTMLElement;
                            img.style.display = 'none';
                            fallback.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full hidden items-center justify-center">
                          <Package className="w-6 h-6 text-gray-500" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.nome}</h3>
                        <div className="text-gray-400 text-sm space-y-1">
                          <p>Quantidade: {item.quantidade}</p>
                          <p>Acabamento: {item.acabamento}</p>
                          {item.laminacao && <p>Com laminação</p>}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-brand-yellow font-bold">€{item.precoTotal.toFixed(2)}</div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removerDoCarrinho(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 mt-6 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white text-lg font-medium">Total:</span>
                    <span className="text-brand-yellow text-2xl font-bold">€{totalCarrinho.toFixed(2)}</span>
                  </div>
                  
                  <Link href="/contactos">
                    <Button className="w-full bg-brand-yellow hover:bg-brand-yellow/80 text-black font-medium">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Finalizar Pedido
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}