import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";



interface TextureCover {
  name: string;
  path: string;
  fileName: string;
  textureCount?: number;
}

export default function LojaPapelParede() {
  const { data: images, isLoading } = useQuery({
    queryKey: ["/api/loja/images"],
  });

  // Filter and format texture cover images
  const actualCovers: TextureCover[] = (images as { images: string[] })?.images
    ?.filter((path: string) => path.includes('capas-texturas'))
    ?.map((path: string) => {
      const fileName = path.split('/').pop()?.replace('.webp', '') || '';
      const displayName = fileName
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l: string) => l.toUpperCase());
      
      // Count textures in this category
      const categoryImages = (images as { images: string[] })?.images
        ?.filter((imgPath: string) => 
          imgPath.includes(`texturas/${fileName}/`) &&
          /\.(jpg|jpeg|png|gif|webp)$/i.test(imgPath)
        ) || [];
      
      return {
        name: displayName,
        path: `/public-objects/${path}`,
        fileName: fileName,
        textureCount: categoryImages.length
      };
    })
    // Only show categories that have at least 1 texture
    ?.filter((texture: TextureCover & { textureCount: number }) => texture.textureCount > 0) || [];

  // Create grid with 4 columns per row, filling empty slots with "Em breve mais produtos"
  const textureCovers: (TextureCover | { placeholder: true })[] = [];
  const itemsPerRow = 4;
  
  for (let i = 0; i < actualCovers.length; i += itemsPerRow) {
    const rowItems = actualCovers.slice(i, i + itemsPerRow);
    textureCovers.push(...rowItems);
    
    // Fill remaining slots in the row with placeholders
    while (textureCovers.length % itemsPerRow !== 0) {
      textureCovers.push({ placeholder: true });
    }
  }
  
  // If no actual covers, show at least one row of placeholders
  if (actualCovers.length === 0) {
    for (let i = 0; i < itemsPerRow; i++) {
      textureCovers.push({ placeholder: true });
    }
  }

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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/loja">
              <Button variant="outline" size="sm" className="gap-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                <ArrowLeft className="h-4 w-4" />
                Voltar à Loja
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Papel de <span className="text-[#FFD700]">Parede</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Escolha entre as nossas texturas disponíveis para personalizar o seu espaço
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-4">
        {textureCovers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">
              Nenhuma textura disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 md:gap-6">
            {textureCovers.map((item, index) => {
              if ('placeholder' in item) {
                // Placeholder item
                return (
                  <div key={`placeholder-${index}`} className="text-center">
                    <div className="bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg aspect-square flex items-center justify-center mb-3">
                      <div className="text-center p-4">
                        <div className="text-gray-500 text-2xl mb-2">📦</div>
                        <p className="text-gray-400 text-xs leading-tight">Em breve mais produtos</p>
                      </div>
                    </div>
                    <h3 className="text-xs font-bold text-gray-400">Em Breve</h3>
                  </div>
                );
              } else {
                // Actual texture category
                const texture = item as TextureCover;
                return (
                  <Link key={texture.fileName} href={`/loja/papel-parede/textura/${texture.fileName.toLowerCase().replace(/_/g, '-')}`}>
                    <div className="group text-center cursor-pointer">
                      {/* Imagem sem overlay */}
                      <div className="relative overflow-hidden rounded-lg mb-3">
                        <img
                          src={texture.path}
                          alt={texture.name}
                          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Nome por baixo da imagem */}
                      <div>
                        <h3 className="text-sm font-bold text-[#FFD700] group-hover:text-[#20B2AA] transition-colors leading-tight">
                          {texture.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-[#111111] rounded-lg p-8 border border-[#333]">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-6">
            Sobre o Nosso Papel de Parede
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4 text-lg">
                Características
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Alta qualidade de impressão</li>
                <li>• Resistente à humidade</li>
                <li>• Laminação opcional (proteção UV e anti-risco)</li>
                <li>• <Link href="/como-aplicar-papel-parede" className="text-[#FFD700] hover:text-[#20B2AA] underline">Aplicação (como aplicar)</Link></li>
                <li>• Personalização completa</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4 text-lg">
                Informações Importantes
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Produtos personalizados</li>
                <li>• Sem trocas ou devoluções</li>
                <li>• Orçamento personalizado</li>
                <li>• <a href="#orcamento-colocacao" className="text-[#FFD700] hover:text-[#20B2AA] underline">Solicitar orçamento para colocação</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}