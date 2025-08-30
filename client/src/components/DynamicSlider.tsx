import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/inicio/slider/bem-vindo-domrealce.webp",
    title: "Impacto na Pista",
    description:
      "Personalizações dinâmicas que destacam marcas e patrocinadores em cada corrida.",
    buttons: [
      { text: "Explorar Serviços", href: "/servicos", primary: true },
      { text: "Ver Portfólio", href: "/portfolio", primary: false },
    ],
  },
  {
    id: 2,
    image: "/inicio/slider/Camiao-corrida-reboconorte.webp",
    title: "Design Inovador",
    description: "Transforme sua ideia em realidade com nossa criatividade.",
    buttons: [
      { text: "Conheça Mais", href: "/sobre", primary: true },
      { text: "Fale Conosco", href: "/contactos", primary: false },
    ],
  },
  {
    id: 3,
    image: "/inicio/slider/Honda.webp",
    title: "Alta Definição",
    description: "Impressões de qualidade para destacar sua marca.",
    buttons: [{ text: "Ver Serviços", href: "/servicos", primary: true }],
  },
  {
    id: 4,
    image: "/inicio/slider/viatura-pao-de-lo-forno.webp",
    title: "Soluções Criativas",
    description: "Do conceito à execução, nós damos vida às suas ideias.",
    buttons: [{ text: "Explorar Mais", href: "/portfolio", primary: true }],
  },
];

export default function DynamicSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Imagem de fundo */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === current}
          />

          {/* Conteúdo do Slide */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-yellow drop-shadow-lg">
              {slide.title}
            </h2>

            <p className="mt-3 text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-2xl mx-auto drop-shadow-md">
              {slide.description}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {slide.buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.href}
                  className={`px-5 py-2 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition ${
                    btn.primary
                      ? "bg-brand-yellow text-black hover:bg-yellow-500"
                      : "border border-white text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Indicadores (bolinhas) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-brand-yellow" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}