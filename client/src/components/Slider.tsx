import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import "./Slider.css";

interface Slide {
  id: string;
  image: string;
  title: string;
  text: string;
}

const defaultSlides = [
  {
    id: "default-1",
    image: "https://picsum.photos/1600/900?random=1",
    title: "Realce sua marca",
    text: "Com criatividade e alta definição",
  },
  {
    id: "default-2",
    image: "https://picsum.photos/1600/900?random=2",
    title: "Impressão Digital",
    text: "Qualidade premium para o seu negócio",
  },
  {
    id: "default-3",
    image: "https://picsum.photos/1600/900?random=3",
    title: "Decoração Criativa",
    text: "Papel de parede e soluções personalizadas",
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  // Fetch slides from database
  const { data: slidesData, isLoading } = useQuery({
    queryKey: ["/api/admin/slider"],
  });

  const slides: Slide[] = (slidesData as any)?.slides?.length > 0 ? (slidesData as any).slides : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const getButtonsForSlide = (slide: Slide) => {
    // Check if this is the solar film slide
    if (slide.title.toLowerCase().includes("película") && slide.title.toLowerCase().includes("solar")) {
      return (
        <div className="buttons">
          <Link href="/servico-pelicula-solar" className="btn">
            Ver Serviços Película Solar
          </Link>
          <Link href="/contactos" className="btn btn-outline">
            Pedir Orçamento
          </Link>
        </div>
      );
    }
    
    // Default buttons for other slides
    return (
      <div className="buttons">
        <a href="#servicos" className="btn">Explorar Serviços</a>
        <a href="#portfolio" className="btn btn-outline">Ver Portfólio</a>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="slider">
        <div className="slide active">
          <div style={{ background: 'linear-gradient(135deg, #FFD700 0%, #00d4aa 100%)', height: '100vh' }}>
            <div className="text-overlay">
              <h1>DOMREALCE</h1>
              <p>A carregar...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="slider">
      {slides.map((slide, i) => (
        <div key={slide.id || i} className={`slide ${i === index ? "active" : ""}`}>
          <img src={slide.image} alt={slide.title} />
          <div className="text-overlay">
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
            {getButtonsForSlide(slide)}
          </div>
        </div>
      ))}
    </div>
  );
}