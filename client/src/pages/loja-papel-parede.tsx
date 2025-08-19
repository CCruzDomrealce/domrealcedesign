import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { Link } from "wouter";



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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">A carregar texturas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/loja">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar à Loja
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Papel de Parede
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
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
          <div className="grid grid-cols-4 gap-6">
            {textureCovers.map((texture: TextureCover) => (
              <div key={texture.fileName} className="group">
                {/* Nome da textura em cima */}
                <div className="mb-3 text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                    {texture.name}
                  </h3>
                  <Button size="sm" className="gap-2 mb-2" variant="outline">
                    <Eye className="h-4 w-4" />
                    Ver Mais
                  </Button>
                </div>
                
                {/* Imagem sem card, fundo ou overlay */}
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={texture.path}
                    alt={texture.name}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Sobre o Nosso Papel de Parede
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Características
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Alta qualidade de impressão</li>
                <li>• Resistente à humidade</li>
                <li>• Fácil aplicação</li>
                <li>• Personalização completa</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Informações Importantes
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Produtos personalizados</li>
                <li>• Sem trocas ou devoluções</li>
                <li>• Orçamento personalizado</li>
                <li>• Instalação disponível</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}