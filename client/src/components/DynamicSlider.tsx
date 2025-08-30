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
    queryKey: ["/api/admin/slider"],
  });

  // 👉 altura real da viewport (corrige 100vh no mobile)
  useEffect(() => {
    const setVh = () => {
      const h =
        (window as any).visualViewport?.height ??
        window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  let activeSlides = data?.slides?.filter((s: Slide) => s.active) || [];

  // 👉 força o 3º slide para 1º
  if (activeSlides.length > 2) {
    const third = activeSlides.splice(2, 1)[0];
    activeSlides.unshift(third);
  }

  // autoplay
  useEffect(() => {
    if (activeSlides.length > 1) {
      const i = setInterval(
        () => setCurrentSlide((p) => (p + 1) % activeSlides.length),
        3500
      );
      return () => clearInterval(i);
    }
  }, [activeSlides.length]);

  // loading
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

  // erro
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

  // sem slides
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
          style={{ backgroundImage: `url('${slide.image}')` }}
        >
          {index !== 0 && (
            <div className="text-overlay">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <div className="buttons">
                <a href="#servicos" className="btn">Explorar Serviços</a>
                <a href="#portfolio" className="btn btn-outline">Ver Portfólio</a>
              </div>
            </div>
          )}
        </div>
      ))}

      {activeSlides.length > 1 && (
        <div className="slider-dots">
          {activeSlides.map((_: Slide, i: number) => (
            <button
              key={i}
              className={`dot ${i === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(i)}
              data-testid={`slider-dot-${i}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}