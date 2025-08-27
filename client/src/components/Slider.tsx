import { useEffect, useState } from "react";
import "./Slider.css";

const slides = [
  {
    image: "https://picsum.photos/1600/900?random=1",
    title: "Realce sua marca",
    text: "Com criatividade e alta definição",
  },
  {
    image: "https://picsum.photos/1600/900?random=2",
    title: "Impressão Digital",
    text: "Qualidade premium para o seu negócio",
  },
  {
    image: "https://picsum.photos/1600/900?random=3",
    title: "Decoração Criativa",
    text: "Papel de parede e soluções personalizadas",
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
          </div>
        </div>
      ))}
    </div>
  );
}