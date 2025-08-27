import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import "./Slider.css";

const slides = [
  {
    image: "https://picsum.photos/1600/900?random=1",
    title: "Realce sua marca",
    text: "Com criatividade e alta definição",
    buttonText: "Contacte-nos",
    buttonHref: "/contactos#formulario"
  },
  {
    image: "https://picsum.photos/1600/900?random=2",
    title: "Impressão Digital",
    text: "Qualidade premium para o seu negócio",
    buttonText: "Ver Serviços",
    buttonHref: "/servicos"
  },
  {
    image: "https://picsum.photos/1600/900?random=3",
    title: "Decoração Criativa",
    text: "Papel de parede e soluções personalizadas",
    buttonText: "Ver Portfolio",
    buttonHref: "/portfolio"
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      {slides.map((slide, i) => (
        <div key={i} className={`slide ${i === index ? "active" : ""}`}>
          <img src={slide.image} alt={slide.title} />
          <div className="text-overlay">
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
            <div className="slider-buttons">
              <Button asChild className="px-8 py-4 bg-brand-yellow text-black font-heading font-semibold rounded-lg hover:bg-brand-yellow/90">
                <Link href={slide.buttonHref}>{slide.buttonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        className="prev" 
        onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
        aria-label="Slide anterior"
      >
        &#10094;
      </button>
      <button 
        className="next" 
        onClick={() => setIndex((index + 1) % slides.length)}
        aria-label="Próximo slide"
      >
        &#10095;
      </button>

      {/* Navigation Dots */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
            aria-label={`Ir para slide ${i + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
