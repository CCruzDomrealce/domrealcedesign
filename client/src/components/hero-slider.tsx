import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  '/hero-background.webp',
  '/hero-2.jpg',
  '/hero-3.jpg'
];

const heroAltTexts = [
  'DOMREALCE - Comunicação visual e impressão digital profissional',
  'Equipamentos modernos de impressão digital de alta qualidade',
  'Serviço profissional de decoração e personalização de viaturas'
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0, 1, 2])); // Carregar todas as imagens

  const totalSlides = heroImages.length;
  const AUTOPLAY_MS = 5500;

  // Função para carregar imagem lazy
  const ensureImageLoaded = useCallback((index: number) => {
    if (!loadedImages.has(index)) {
      setLoadedImages(prev => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });
    }
  }, [loadedImages]);

  // Navegação
  const goToSlide = useCallback((index: number) => {
    const newIndex = (index + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
    
    // Pré-carregar próxima imagem
    const nextIndex = (newIndex + 1) % totalSlides;
    ensureImageLoaded(nextIndex);
  }, [totalSlides, ensureImageLoaded]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Pré-carregar segunda imagem ao montar
  useEffect(() => {
    ensureImageLoaded(1);
  }, [ensureImageLoaded]);

  return (
    <>
      {/* DOMREALCE: HERO SLIDER (background layer) */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        aria-label="Galeria de destaque"
        aria-live="polite"
      >
        {heroImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={heroAltTexts[index]}
            className={`
              absolute inset-0 w-full h-full object-cover hero-slider-img
              transition-opacity duration-700 ease-in-out will-change-opacity
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
            `}
            {...(index === 0 && { fetchPriority: 'high' })}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            width={1920}
            height={1080}
          />
        ))}
      </div>

      {/* DOMREALCE: HERO CONTROLS */}
      <div 
        className="absolute left-0 right-0 bottom-4 md:bottom-6 z-20 flex items-center justify-center gap-3"
        role="group"
        aria-label="Controlo do carrossel"
      >
        {/* Botão Anterior */}
        <button
          type="button"
          onClick={prevSlide}
          className="
            bg-black/45 hover:bg-black/60 text-white
            w-9 h-9 rounded-full slider-control
            flex items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-white/50
          "
          aria-label="Imagem anterior"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Indicadores (bolinhas) */}
        <div 
          className="flex gap-2"
          role="tablist"
          aria-label="Selecionar imagem"
        >
          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`
                w-2.5 h-2.5 rounded-full border-0 cursor-pointer transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-white/50
                ${index === currentIndex 
                  ? 'bg-brand-yellow shadow-lg' 
                  : 'bg-white/45 hover:bg-white/60'
                }
              `}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Imagem ${index + 1}`}
            />
          ))}
        </div>

        {/* Botão Próximo */}
        <button
          type="button"
          onClick={nextSlide}
          className="
            bg-black/45 hover:bg-black/60 text-white
            w-9 h-9 rounded-full slider-control
            flex items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-white/50
          "
          aria-label="Próxima imagem"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  );
}