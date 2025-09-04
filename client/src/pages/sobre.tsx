import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { usePageConfig } from "@/hooks/use-page-config";
import sobreImage from "@assets/Create a colorful im_1755881158641.png";
import carlosCruzImage from "@/assets/carlos-cruz.webp";

export default function Sobre() {
  const { getConfig, isLoading } = usePageConfig('about');

  // Get content from config or use defaults
  const pageTitle = getConfig('hero', 'title', 'Sobre Nós');
  const heroDescription = getConfig('hero', 'description', 'Conhece a história por trás da Domrealce e a experiência de Carlos Cruz em 40 anos dedicados à comunicação visual e publicidade.');
  const carlosTitle = getConfig('carlos', 'title', 'Carlos Cruz');
  const carlosSubtitle = getConfig('carlos', 'subtitle', 'Fundador & Diretor Criativo');
  const carlosStoryTitle = getConfig('carlos', 'story_title', 'A História do Carlos Cruz');
  const carlosStory1 = getConfig('carlos', 'story_1', 'Com Experiência no setor da publicidade e comunicação visual, Carlos Cruz é o fundador e alma da Domrealce. A sua jornada começou numa época em que a criatividade e o trabalho manual eram a base de tudo.');
  const carlosStory2 = getConfig('carlos', 'story_2', 'Ao longo dos anos, Carlos especializou-se em várias áreas da publicidade, incluindo decoração de espaços comerciais, serigrafia, tampografia e decoração de viaturas de competição. Esta vasta experiência permite-lhe compreender as necessidades específicas de cada cliente.');
  const carlosStory3 = getConfig('carlos', 'story_3', 'Atualmente, a Domrealce foca-se na área de impressão digital e decoração, mantendo sempre os valores fundamentais de qualidade, pontualidade e honestidade que sempre caracterizaram o trabalho de Carlos Cruz.');
  const companyText1 = getConfig('company', 'text_1', 'A Domrealce é uma empresa pequena, com um atelier que privilegia o atendimento personalizado. Esta abordagem permite-nos dedicar toda a atenção necessária a cada projeto, garantindo resultados únicos e adaptados às necessidades específicas de cada cliente.');
  const companyText2 = getConfig('company', 'text_2', 'Ao contrário das grandes empresas, oferecemos um serviço próximo e humano, onde cada cliente é tratado de forma individual. Esta proximidade permite-nos compreender melhor as suas necessidades e entregar soluções verdadeiramente personalizadas.');
  const companyQuote = getConfig('company', 'quote', 'Na Domrealce, não somos apenas um fornecedor, somos um parceiro criativo.');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SEOHead 
        title="Sobre Nós - Carlos Cruz e 40 Anos de Comunicação Visual"
        description="Conheça a história da DOMREALCE e Carlos Cruz, com 40 anos de experiência em comunicação visual, impressão digital e publicidade em Lisboa."
        keywords="Carlos Cruz, DOMREALCE história, comunicação visual, 40 anos experiência, empresa publicidade"
        canonicalUrl="https://www.domrealce.com/sobre"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {pageTitle}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Carlos Cruz Section */}
      <section className="pt-0 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#FFD700]">{carlosTitle}</h2>
              <p className="text-lg text-gray-300 mb-6">{carlosSubtitle}</p>

              <h3 className="text-2xl font-bold mb-4">{carlosStoryTitle}</h3>

              <div className="space-y-4 text-gray-300">
                <p>{carlosStory1}</p>
                <p>{carlosStory2}</p>
                <p>{carlosStory3}</p>
              </div>
            </div>

            {/* Imagem Ajustada sem caixilho preto */}
            <div className="relative">
              <img 
                src={carlosCruzImage} 
                alt="Carlos Cruz - Fundador da DOMREALCE"
                className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-2xl"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <h4 className="text-xl font-bold mb-1">Carlos Cruz</h4>
                <p className="text-sm opacity-90">Responsável de produção</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Values Section */}
      <section className="pt-14 pb-8 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-gray-300">Os princípios que guiam o nosso trabalho.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#0a0a0a] border-[#333] hover:border-[#FFD700] transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#20B2AA] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#FFD700]">Qualidade</h3>
                <p className="text-gray-300">
                  Compromisso com a excelência em cada projeto, utilizando os melhores materiais e técnicas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#0a0a0a] border-[#333] hover:border-[#20B2AA] transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#20B2AA] to-[#4169E1] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#20B2AA]">Pontualidade</h3>
                <p className="text-gray-300">
                  Respeitamos os prazos estabelecidos e entregamos sempre dentro do tempo combinado.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#0a0a0a] border-[#333] hover:border-[#FF6347] transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6347] to-[#FFD700] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#FF6347]">Honestidade</h3>
                <p className="text-gray-300">
                  Transparência total nos orçamentos e processos, construindo relações de confiança duradouras.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Approach Section */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">{companyText1}</p>
              <p className="text-lg">{companyText2}</p>
            </div>

            <div className="bg-gradient-to-r from-[#FFD700] to-[#20B2AA] p-8 rounded-lg mt-12">
              <blockquote className="text-xl font-bold text-black italic">
                "{companyQuote}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para trabalhar connosco?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Descubra como a nossa experiência e dedicação podem transformar o seu projeto em realidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold hover:opacity-90 transition-opacity">
              <Link href="/contactos">Contactar-nos</Link>
            </Button>
            <Button asChild variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
              <Link href="/contactos">Pedir Orçamento</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}