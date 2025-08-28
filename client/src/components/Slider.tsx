import "./Slider.css";
import cityImage from "@assets/AdobeStock_756714315_1756374993312.webp";

export default function Slider() {
  return (
    <div className="slider">
      <div className="slide active">
        <img src={cityImage} alt="Realce sua marca com criatividade" />
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