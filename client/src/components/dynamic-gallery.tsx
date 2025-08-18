import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";

interface GalleryImage {
  filename: string;
  url: string;
  category?: string;
  title?: string;
  description?: string;
}

interface DynamicGalleryProps {
  category?: string;
  showCategories?: boolean;
  className?: string;
}

// Função para categorizar imagens baseado no caminho/nome do arquivo
function categorizeImage(filename: string): string {
  // Normaliza acentos e converte para minúsculas
  const lower = filename.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove acentos
  
  // Deteta automaticamente a categoria a partir do primeiro nível de pasta
  const pathParts = filename.split('/');
  if (pathParts.length > 1) {
    // Usa o nome da primeira pasta como categoria
    const folderName = pathParts[0].toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Remove acentos
    
    return folderName;
  }
  
  // Fallback: categorização por nome do arquivo (apenas para camiões por agora)
  if (lower.includes('camiao') || lower.includes('camião') || lower.includes('truck') || lower.includes('viatura')) {
    return 'camioes';
  }
  
  return 'outros';
}

// Função para gerar título baseado no caminho/nome do arquivo
function generateTitle(filename: string): string {
  // Remove extensão e possível caminho de pasta
  const name = filename.replace(/\.[^/.]+$/, "").split('/').pop() || filename;
  // Suporte para acentos e caracteres especiais
  const words = name.split(/[-_\s]+/).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return words.join(' ');
}

// Função para gerar categorias dinamicamente baseado nas imagens existentes
function getDynamicCategories(images: GalleryImage[]): Array<{id: string, name: string}> {
  const foundCategories = new Set<string>();
  
  images.forEach(image => {
    if (image.category && image.category !== 'outros') {
      foundCategories.add(image.category);
    }
  });

  const categories = [{ id: 'todos', name: 'Todos' }];
  
  // Adiciona categorias encontradas nas imagens
  foundCategories.forEach(categoryId => {
    const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
    categories.push({ id: categoryId, name: categoryName });
  });
  
  return categories;
}

export function DynamicGallery({ category, showCategories = true, className = "" }: DynamicGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState(category || 'todos');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Buscar imagens do Object Storage
  const { data: imagesData, isLoading, error } = useQuery({
    queryKey: ['/api/gallery/images'],
    retry: false,
  });

  const images: GalleryImage[] = ((imagesData as any)?.images || []).map((filename: string) => ({
    filename,
    url: `/public-objects/${filename}`,
    category: categorizeImage(filename),
    title: generateTitle(filename),
    description: `Projeto realizado pela DOMREALCE - ${generateTitle(filename)}`
  }));

  // Gerar categorias dinamicamente
  const categories = getDynamicCategories(images);
  
  // Filtrar imagens por categoria
  const filteredImages = selectedCategory === 'todos' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  if (isLoading) {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto"></div>
          <p className="mt-4 text-muted-foreground">A carregar galeria...</p>
        </div>
      </div>
    );
  }

  if (error || images.length === 0) {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Galeria em Preparação</h3>
          <p className="text-muted-foreground mb-4">
            Estamos a organizar as nossas melhores imagens de projetos.
          </p>
          <p className="text-sm text-muted-foreground">
            Para adicionar fotos, carregue as imagens na pasta 'public' do Object Storage.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Filtros de Categoria */}
      {showCategories && (
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className={selectedCategory === cat.id ? "bg-brand-yellow text-black hover:bg-yellow-400" : ""}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      )}

      {/* Grade de Imagens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <Card key={image.filename} className="group overflow-hidden hover:shadow-lg transition-all">
            <CardContent className="p-0">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => openLightbox(image, index)}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openLightbox(image, index)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum projeto encontrado nesta categoria.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-4xl w-full p-0">
            <DialogTitle className="sr-only">{selectedImage.title}</DialogTitle>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={closeLightbox}
              >
                <X className="w-4 h-4" />
              </Button>
              
              {filteredImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
                    onClick={goToNext}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
              
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain"
              />
              
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-brand-yellow/10 text-brand-yellow">
                    {categories.find(c => c.id === selectedImage.category)?.name || 'Projeto'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {currentImageIndex + 1} de {filteredImages.length}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-muted-foreground">{selectedImage.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}