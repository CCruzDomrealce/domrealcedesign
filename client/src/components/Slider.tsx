import "./Slider.css";

export default function Slider() {
  return (
    <div className="slider">
      <div className="slide active" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', minHeight: '100vh' }}>
        <div className="text-overlay">
          <h1>Realce sua marca com criatividade e alta definição</h1>
          <p>Transformamos as suas ideias em comunicação visual de excelência. Design gráfico, impressão digital, papel de parede e soluções personalizadas para empresas e particulares.</p>
          <div className="buttons">
            <a href="#servicos" className="btn">Explorar Serviços</a>
            <a href="#portfolio" className="btn btn-outline">Ver Portfólio</a>
          </div>
        </div>
      </div>
    </div>
  );
}