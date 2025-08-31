import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "./ClientLogos.css";

interface ClientLogo {
  id: string;
  url: string;
  clientName: string;
  fileName: string;
}

interface LogosResponse {
  logos: ClientLogo[];
}

// 🎯 PLACEHOLDER DATA - usado apenas quando não há logótipos na storage
const fallbackLogos: ClientLogo[] = [
  { id: "placeholder-1", url: "", clientName: "COLE O NOME DO CLIENTE AQUI", fileName: "placeholder-1" },
  { id: "placeholder-2", url: "", clientName: "COLE O NOME DO CLIENTE AQUI", fileName: "placeholder-2" },
  { id: "placeholder-3", url: "", clientName: "COLE O NOME DO CLIENTE AQUI", fileName: "placeholder-3" },
  { id: "placeholder-4", url: "", clientName: "COLE O NOME DO CLIENTE AQUI", fileName: "placeholder-4" },
  { id: "placeholder-5", url: "", clientName: "COLE O NOME DO CLIENTE AQUI", fileName: "placeholder-5" },
  { id: "placeholder-6", url: "", clientName: "COLE O NOME DO CLIENTE AQUI", fileName: "placeholder-6" },
];

export default function ClientLogos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleLogos, setVisibleLogos] = useState<ClientLogo[]>([]);

  // Carregar logótipos da API (object storage)
  const { data: logosData, isLoading, error } = useQuery<LogosResponse>({
    queryKey: ['/api/client-logos'],
    refetchInterval: 10000, // Atualizar a cada 10 segundos para novos logótipos
  });

  // Usar logótipos reais ou fallback
  const clientLogos = (logosData?.logos && logosData.logos.length > 0) ? logosData.logos : fallbackLogos;

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
  }, [isHovered, logosPerView, clientLogos.length]);

  // Calcular logótipos visíveis
  useEffect(() => {
    const visible = [];
    for (let i = 0; i < logosPerView; i++) {
      const index = (currentIndex + i) % clientLogos.length;
      visible.push(clientLogos[index]);
    }
    setVisibleLogos(visible);
  }, [currentIndex, logosPerView, clientLogos]);

  // Mostrar loading enquanto carrega
  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-96 mx-auto mb-12"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg h-32 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                className={`flex-none w-1/2 md:w-1/3 lg:w-1/4 px-2 animate-fade-in-scale`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Container do Logótipo */}
                <div className="flex items-center justify-center group">
                  {/* IMAGEM DO LOGÓTIPO */}
                  {logo.url ? (
                    <div className="flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <img 
                        src={logo.url} 
                        alt={`Logótipo ${logo.clientName}`}
                        className="max-h-32 w-auto object-contain transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          console.log('Erro ao carregar logótipo:', logo.url);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.classList.remove('hidden');
                          }
                        }}
                      />
                      {/* Fallback para erro de imagem */}
                      <div className="hidden bg-gray-800 rounded-lg p-4 border-2 border-dashed border-gray-600">
                        <span className="text-gray-400 text-sm font-medium text-center">
                          COLE LOGO AQUI
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-800 rounded-lg p-6 border-2 border-dashed border-gray-600 group-hover:border-brand-yellow transition-colors">
                      <span className="text-gray-400 text-sm font-medium text-center">
                        COLE LOGO AQUI
                      </span>
                    </div>
                  )}
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

      </div>
    </section>
  );
}