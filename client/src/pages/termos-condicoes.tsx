import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function TermosCondicoes() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />
      
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Termos e Condições
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-300 mb-8 text-center">
              Última atualização: Agosto de 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">1. Âmbito de Aplicação</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Os presentes termos e condições aplicam-se a todos os serviços prestados pela 
                DOMREALCE, incluindo design gráfico, impressão digital, decoração de viaturas, 
                papel de parede personalizado e outros serviços de comunicação visual.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">2. Serviços Prestados</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                A DOMREALCE presta serviços nas seguintes áreas:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Design gráfico e criação de identidade visual</li>
                <li>• Impressão digital em diversos materiais</li>
                <li>• Decoração de viaturas e frotas comerciais</li>
                <li>• Papel de parede personalizado</li>
                <li>• Telas artísticas e canvas</li>
                <li>• Autocolantes e etiquetas</li>
                <li>• Decoração de espaços comerciais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">3. Orçamentos e Contratação</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Todos os orçamentos são gratuitos e válidos por 30 dias. A contratação dos 
                serviços implica a aceitação expressa destes termos e condições. Os preços 
                apresentados incluem IVA à taxa legal em vigor.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">4. Pagamento</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                As condições de pagamento são acordadas caso a caso, podendo incluir:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Pagamento antecipado de 50% para projetos de grande dimensão</li>
                <li>• Pagamento à entrega para projetos standard</li>
                <li>• Pagamento a 30 dias para clientes corporativos (sujeito a aprovação)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">5. Prazos de Execução</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Os prazos de execução variam conforme o tipo de serviço e são sempre acordados 
                previamente com o cliente. A DOMREALCE compromete-se a cumprir os prazos estabelecidos, 
                salvo circunstâncias excecionais ou casos de força maior.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">6. Propriedade Intelectual</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                A propriedade intelectual dos trabalhos criados é transferida para o cliente 
                mediante o pagamento integral do serviço. A DOMREALCE reserva o direito de 
                utilizar os trabalhos realizados no seu portfólio, salvo acordo em contrário.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">7. Garantias</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                A DOMREALCE garante a qualidade dos materiais utilizados e da execução dos trabalhos. 
                Defeitos de fabrico são corrigidos gratuitamente no prazo de 30 dias após a entrega.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">8. Responsabilidades</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                O cliente é responsável por fornecer informações precisas e completas. 
                A DOMREALCE não se responsabiliza por erros resultantes de informações 
                incorretas fornecidas pelo cliente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">9. Lei Aplicável</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Os presentes termos e condições regem-se pela lei portuguesa. 
                Qualquer litígio será resolvido pelos tribunais competentes de Portugal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">10. Contactos</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Para esclarecimentos sobre estes termos e condições:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Email: info@domrealce.com</li>
                <li>• Telefone: +351 930 682 725</li>
                <li>• Website: www.domrealce.com</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}