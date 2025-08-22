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
}

export default function LojaPapelParede() {
  const { data: images, isLoading } = useQuery({
    queryKey: ["/api/loja/images"],
  });

  // Filter and format texture cover images
  const textureCovers: TextureCover[] = (images as { images: string[] })?.images
    ?.filter((path: string) => path.includes('capas-texturas'))
    ?.map((path: string) => {
      const fileName = path.split('/').pop()?.replace('.webp', '') || '';
      const displayName = fileName
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l: string) => l.toUpperCase());
      
      return {
        name: displayName,
        path: `/public-objects/${path}`,
        fileName: fileName
      };
    }) || [];

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
      <div className="container mx-auto px-4 py-8">
        {textureCovers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">
              Nenhuma textura disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {textureCovers.map((texture: TextureCover) => (
              <Link key={texture.fileName} href={`/loja/papel-parede/textura/${texture.fileName.toLowerCase().replace('_', '-')}`}>
                <div className="group text-center cursor-pointer">
                  {/* Imagem com overlay "Ver Mais" no hover */}
                  <div className="relative overflow-hidden rounded-lg mb-2 md:mb-3">
                    <img
                      src={texture.path}
                      alt={texture.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay com texto "Ver Mais" que aparece no hover */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                      <div className="text-center">
                        <Eye className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700] mx-auto mb-1 md:mb-2" />
                        <span className="text-[#FFD700] font-bold text-xs md:text-sm">Ver Mais</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Nome por baixo */}
                  <div className="space-y-1">
                    <h3 className="text-xs md:text-sm lg:text-base font-bold text-[#FFD700] group-hover:text-[#20B2AA] transition-colors">
                      {texture.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
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
                <li>• Fácil aplicação</li>
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
                <li>• Instalação disponível</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}