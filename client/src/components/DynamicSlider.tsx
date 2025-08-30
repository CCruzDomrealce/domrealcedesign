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

  let activeSlides = data?.slides?.filter((slide: Slide) => slide.active) || [];

  // 👉 Forçar que o 2º slide (index 1) fique sempre em 1º
  if (activeSlides.length > 1) {
    const second = activeSlides.splice(1, 1)[0];
    activeSlides.unshift(second);
  }

  // Auto-advance slides every 3.5s
  useEffect(() => {
    if (activeSlides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [activeSlides.length]);

  // Loading state
  if (isLoading) {
    return (
      <div className="slider">
        <div className="slide active loading">
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
        <div className="slide active fallback">
          <div className="text-overlay">
            <h1>Realce sua marca com criatividade e alta definição</h1>
            <p>
              Transformamos as suas ideias em comunicação visual de excelência.
              Design gráfico, impressão digital, papel de parede e soluções
              personalizadas para empresas e particulares.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Sem slides
  if (activeSlides.length === 0) {
    return (
      <div className="slider">
        <div className="slide active fallback">
          <div className="text-overlay">
            <h1>Realce sua marca com criatividade e alta definição</h1>
            <p>
              Transformamos as suas ideias em comunicação visual de excelência.
              Design gráfico, impressão digital, papel de parede e soluções
              personalizadas para empresas e particulares.
            </p>
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
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{
            backgroundImage: `url('${slide.image}')`
          }}
        >
          <div className="text-overlay">
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>

            {/* ✅ Só mostra botões se NÃO for o primeiro slide */}
            {index !== 0 && (
              <div className="buttons">
                <a href="#servicos" className="btn">
                  Explorar Serviços
                </a>
                <a href="#portfolio" className="btn btn-outline">
                  Ver Portfólio
                </a>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      {activeSlides.length > 1 && (
        <div className="slider-dots">
          {activeSlides.map((_: Slide, index: number) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              data-testid={`slider-dot-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}