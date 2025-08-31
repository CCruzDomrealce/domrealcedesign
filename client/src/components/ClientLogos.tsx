import { useState, useEffect } from "react";
import "./ClientLogos.css";

interface ClientLogo {
  id: number;
  placeholder: string;
  clientName: string;
}

// 🎯 PLACEHOLDER DATA - Substitua pelos logótipos e nomes reais dos clientes
const clientLogos: ClientLogo[] = [
  { id: 1, placeholder: "COLE LOGO AQUI", clientName: "COLE O NOME DO CLIENTE AQUI" },
  { id: 2, placeholder: "COLE LOGO AQUI", clientName: "COLE O NOME DO CLIENTE AQUI" },
  { id: 3, placeholder: "COLE LOGO AQUI", clientName: "COLE O NOME DO CLIENTE AQUI" },
  { id: 4, placeholder: "COLE LOGO AQUI", clientName: "COLE O NOME DO CLIENTE AQUI" },
  { id: 5, placeholder: "COLE LOGO AQUI", clientName: "COLE O NOME DO CLIENTE AQUI" },
  { id: 6, placeholder: "COLE LOGO AQUI", clientName: "COLE O NOME DO CLIENTE AQUI" },
  { id: 7, placeholder: "COLE LOGO AQUI", clientName: "COLE O NOME DO CLIENTE AQUI" },
  { id: 8, placeholder: "COLE LOGO AQUI", clientName: "COLE O NOME DO CLIENTE AQUI" },
];

export default function ClientLogos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleLogos, setVisibleLogos] = useState<ClientLogo[]>([]);

  // Configuração responsiva: quantos logótipos mostrar por vez
  const getLogosPerView = () => {
    if (window.innerWidth >= 1024) return 4; // Desktop: 4 logótipos
    if (window.innerWidth >= 768) return 3;  // Tablet: 3 logótipos
    return 2; // Mobile: 2 logótipos
  };

  const [logosPerView, setLogosPerView] = useState(2);

  // Atualizar responsividade no resize
  useEffect(() => {
    const handleResize = () => {
      setLogosPerView(getLogosPerView());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carrossel automático com pausa no hover
  useEffect(() => {
    if (!isHovered && clientLogos.length > logosPerView) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => 
          prev + logosPerView >= clientLogos.length ? 0 : prev + 1
        );
      }, 3000); // 3 segundos

      return () => clearInterval(interval);
    }
  }, [isHovered, logosPerView]);

  // Calcular logótipos visíveis
  useEffect(() => {
    const visible = [];
    for (let i = 0; i < logosPerView; i++) {
      const index = (currentIndex + i) % clientLogos.length;
      visible.push(clientLogos[index]);
    }
    setVisibleLogos(visible);
  }, [currentIndex, logosPerView]);

  return (
    <section className="py-16 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Título da Secção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Clientes que Confiam em Nós
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Orgulhamo-nos de trabalhar com empresas e particulares que valorizam a qualidade e criatividade.
          </p>
        </div>

        {/* Carrossel de Logótipos */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex transition-transform duration-700 ease-in-out">
            {visibleLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${currentIndex}-${index}`}
                className={`flex-none w-1/2 md:w-1/3 lg:w-1/4 px-4 animate-fade-in-scale`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Quadro do Logótipo */}
                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  {/* 📝 PLACEHOLDER PARA IMAGEM DO LOGÓTIPO */}
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-brand-yellow transition-colors">
                    <span className="text-gray-400 text-sm font-medium text-center px-2">
                      {logo.placeholder}
                    </span>
                  </div>
                  
                  {/* 📝 PLACEHOLDER PARA NOME DO CLIENTE */}
                  <div className="text-center">
                    <p className="text-gray-600 font-medium text-sm group-hover:text-brand-yellow transition-colors">
                      {logo.clientName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Progresso */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(clientLogos.length / logosPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * logosPerView)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / logosPerView) === index
                  ? 'bg-brand-yellow shadow-lg'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              data-testid={`client-logos-indicator-${index}`}
            />
          ))}
        </div>

        {/* Status do Carrossel */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            {isHovered ? '⏸️ Pausado' : '▶️ A deslizar automaticamente'}
          </p>
        </div>
      </div>
    </section>
  );
}