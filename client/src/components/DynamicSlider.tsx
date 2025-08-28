import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { Slide } from "@shared/schema";
import "./Slider.css";

interface SliderResponse {
  slides: Slide[];
}

export default function DynamicSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, isLoading, error } = useQuery<SliderResponse>({
    queryKey: ["/api/admin/slider"]
  });

  const activeSlides = data?.slides?.filter((slide: Slide) => slide.active) || [];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (activeSlides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeSlides.length]);

  // Loading state
  if (isLoading) {
    return (
      <div className="slider">
        <div className="slide active" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
          <div className="text-overlay">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded mb-4"></div>
              <div className="h-6 bg-gray-700 rounded mb-6"></div>
              <div className="flex justify-center gap-4">
                <div className="h-12 w-32 bg-gray-700 rounded"></div>
                <div className="h-12 w-32 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="slider">
        <div className="slide active" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
          <div className="text-overlay">
            <h1>Realce sua marca com criatividade e alta definição</h1>
            <p>
              Transformamos as suas ideias em comunicação visual de excelência.
              Design gráfico, impressão digital, papel de parede e soluções
              personalizadas para empresas e particulares.
            </p>
            <div className="buttons">
              <a href="#servicos" className="btn">Explorar Serviços</a>
              <a href="#portfolio" className="btn btn-outline">Ver Portfólio</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no slides, show default content
  if (activeSlides.length === 0) {
    return (
      <div className="slider">
        <div className="slide active" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
          <div className="text-overlay">
            <h1>Realce sua marca com criatividade e alta definição</h1>
            <p>
              Transformamos as suas ideias em comunicação visual de excelência.
              Design gráfico, impressão digital, papel de parede e soluções
              personalizadas para empresas e particulares.
            </p>
            <div className="buttons">
              <a href="#servicos" className="btn">Explorar Serviços</a>
              <a href="#portfolio" className="btn btn-outline">Ver Portfólio</a>
            </div>
            <div className="mt-8 text-sm text-yellow-300 bg-black/50 px-4 py-2 rounded">
              💡 Para adicionar imagens ao slider, carregue ficheiros na pasta "inicio/slider/" no Object Storage
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="slider">
      {activeSlides.map((slide: Slide, index: number) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="text-overlay">
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
            <div className="buttons">
              <a href="#servicos" className="btn">Explorar Serviços</a>
              <a href="#portfolio" className="btn btn-outline">Ver Portfólio</a>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation dots */}
      {activeSlides.length > 1 && (
        <div className="slider-dots">
          {activeSlides.map((_: Slide, index: number) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              data-testid={`slider-dot-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}