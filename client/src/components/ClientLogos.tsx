export default function ClientLogos() {
  return (
    <section className="py-16 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-white">Clientes que confiam em nós</h2>
        <p className="text-gray-400 mb-12">
          Uma seleção de marcas fictícias que representam a confiança e qualidade do nosso trabalho.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">

          {/* 🔧 QUADRO 1 - COLE AQUI O LOGÓTIPO SVG DO CLIENTE */}
          <div className="flex flex-col items-center">
            <img
              src="/inicio/logos-clientes/logo1.svg"
              alt="Logótipo do cliente 1"
              className="h-16 object-contain"
            />
          </div>

          {/* 🔧 QUADRO 2 - COLE AQUI O LOGÓTIPO SVG DO CLIENTE */}
          <div className="flex flex-col items-center">
            <img
              src="/inicio/logos-clientes/logo2.svg"
              alt="Logótipo do cliente 2"
              className="h-16 object-contain"
            />
          </div>

          {/* 🔧 QUADRO 3 - COLE AQUI O LOGÓTIPO SVG DO CLIENTE */}
          <div className="flex flex-col items-center">
            <img
              src="/inicio/logos-clientes/logo3.svg"
              alt="Logótipo do cliente 3"
              className="h-16 object-contain"
            />
          </div>

          {/* 🔧 QUADRO 4 - COLE AQUI O LOGÓTIPO SVG DO CLIENTE */}
          <div className="flex flex-col items-center">
            <img
              src="/inicio/logos-clientes/logo4.svg"
              alt="Logótipo do cliente 4"
              className="h-16 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}