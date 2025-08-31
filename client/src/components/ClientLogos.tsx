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

  const { data: logosData, isLoading } = useQuery<LogosResponse>({
    queryKey: ['/api/client-logos'],
    refetchInterval: 30000,
  });

  const clientLogos = (logosData?.logos && logosData.logos.length > 0) ? logosData.logos : fallbackLogos;

  const getLogosPerView = () => {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768) return 3;
    return 2;
  };

  const [logosPerView, setLogosPerView] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setLogosPerView(getLogosPerView());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isHovered && clientLogos.length > logosPerView) {
      const interval = setInterval(() => {
        setCurrentIndex(prev =>
          prev + logosPerView >= clientLogos.length ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, logosPerView, clientLogos.length]);

  useEffect(() => {
    const visible = [];
    for (let i = 0; i < logosPerView; i++) {
      const index = (currentIndex + i) % clientLogos.length;
      visible.push(clientLogos[index]);
    }
    setVisibleLogos(visible);
  }, [currentIndex, logosPerView, clientLogos]);

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Clientes que Confiam em Nós
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Orgulhamo-nos de trabalhar com empresas e particulares que valorizam a qualidade e criatividade.
          </p>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex">
            {visibleLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${currentIndex}-${index}`}
                className="flex-none w-1/2 md:w-1/3 lg:w-1/4 px-4"
              >
                <div className="flex items-center justify-center">
                  {logo.url ? (
                    <img
                      src={logo.url}
                      alt={`Logótipo ${logo.clientName}`}
                      className="max-h-16 w-auto object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.classList.remove('hidden');
                        }
                      }}
                    />
                  ) : (
                    <div className="bg-gray-800 rounded-lg p-6 border-2 border-dashed border-gray-600">
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
      </div>
    </section>
  );
}