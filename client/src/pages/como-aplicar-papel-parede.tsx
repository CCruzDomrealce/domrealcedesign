import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function ComoAplicarPapelParede() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />
      
      {/* Header */}
      <div className="bg-[#111111] border-b border-[#333] mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/loja/papel-parede">
              <Button variant="outline" size="sm" className="gap-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Papel de Parede
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Como Aplicar <span className="text-[#FFD700]">Papel de Parede</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Guia completo para aplicação profissional de papel de parede
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Tipos de Papel de Parede */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-6">
            Tipos de Papel de Parede Disponíveis
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-[#111111] border-[#333]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-[#20B2AA]" />
                  <h3 className="text-xl font-bold text-[#20B2AA]">Com Cola</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Papel de parede pré-colado, pronto a aplicar. Apenas necessita ativar a cola com água.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Aplicação mais rápida</li>
                  <li>• Menos materiais necessários</li>
                  <li>• Ideal para principiantes</li>
                  <li>• Ativação com água morna</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#111111] border-[#333]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-[#FFD700]" />
                  <h3 className="text-xl font-bold text-[#FFD700]">Sem Cola</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Papel de parede tradicional que requer aplicação de cola separadamente.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Maior controlo da aplicação</li>
                  <li>• Necessita cola específica</li>
                  <li>• Mais económico</li>
                  <li>• Aplicação profissional recomendada</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Guia para Papel COM Cola */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#20B2AA] mb-6">
            Aplicação - Papel de Parede COM Cola
          </h2>
          
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Preparação da Parede",
                description: "Limpe bem a parede, remova papéis antigos e certifique-se que está lisa e seca.",
                details: ["Parede limpa e seca", "Sem buracos ou imperfeições", "Tinta em bom estado"]
              },
              {
                step: "2", 
                title: "Medição e Corte",
                description: "Meça a altura da parede e corte o papel com 10cm extra (5cm em cima e 5cm em baixo).",
                details: ["Medir altura + 10cm", "Cortar com estilete afiado", "Numerar as tiras por ordem"]
              },
              {
                step: "3",
                title: "Ativação da Cola",
                description: "Mergulhe o papel em água morna por 30 segundos ou use esponja húmida no verso.",
                details: ["Água morna (não quente)", "30 segundos de imersão", "Dobrar em acordeão por 5 min"]
              },
              {
                step: "4",
                title: "Aplicação na Parede", 
                description: "Cole de cima para baixo, alisando com escova macia para remover bolhas de ar.",
                details: ["Começar pelo topo", "Alisar do centro para fora", "Remover excesso de água"]
              },
              {
                step: "5",
                title: "Acabamentos",
                description: "Corte os excessos e alise as juntas com rolo de costura.",
                details: ["Cortar excessos com estilete", "Alisar juntas", "Limpar restos de cola"]
              }
            ].map((item, index) => (
              <Card key={index} className="bg-[#111111] border-[#333]">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#20B2AA] rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-lg">{item.step}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 mb-3">{item.description}</p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {item.details.map((detail, idx) => (
                          <li key={idx}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Guia para Papel SEM Cola */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-6">
            Aplicação - Papel de Parede SEM Cola
          </h2>
          
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Materiais Necessários",
                description: "Além do papel, necessita de cola específica para papel de parede, pincel e rolo.",
                details: ["Cola para papel de parede", "Pincel largo", "Rolo de alisamento", "Balde para cola"]
              },
              {
                step: "2",
                title: "Preparação da Cola",
                description: "Misture a cola conforme instruções do fabricante até obter consistência homogénea.",
                details: ["Seguir proporções indicadas", "Misturar bem", "Deixar repousar se necessário"]
              },
              {
                step: "3",
                title: "Aplicação da Cola",
                description: "Aplique cola uniformemente no verso do papel com pincel, das bordas para o centro.",
                details: ["Cola uniforme no papel", "Das bordas para o centro", "Dobrar em acordeão por 10 min"]
              },
              {
                step: "4",
                title: "Colagem na Parede",
                description: "Posicione cuidadosamente e alise com rolo, removendo bolhas de ar.",
                details: ["Posicionar com cuidado", "Alisar com rolo", "Remover bolhas de ar"]
              },
              {
                step: "5",
                title: "Limpeza Final",
                description: "Remova excesso de cola imediatamente com pano húmido e corte sobras.",
                details: ["Limpar cola imediatamente", "Pano húmido limpo", "Cortar sobras com precisão"]
              }
            ].map((item, index) => (
              <Card key={index} className="bg-[#111111] border-[#333]">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-lg">{item.step}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 mb-3">{item.description}</p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {item.details.map((detail, idx) => (
                          <li key={idx}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dicas Importantes */}
        <Card className="bg-[#111111] border-[#FF6347] mb-12">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-[#FF6347] mb-4">
              Dicas Importantes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-white mb-3">Antes de Começar</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Teste sempre numa área pequena primeiro</li>
                  <li>• Trabalhe com boa iluminação</li>
                  <li>• Mantenha temperatura ambiente estável</li>
                  <li>• Tenha todas as ferramentas preparadas</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-3">Problemas Comuns</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Bolhas: alisar imediatamente</li>
                  <li>• Juntas visíveis: pressionar bem</li>
                  <li>• Papel a descolar: verificar cola</li>
                  <li>• Padrão desalinhado: medir bem</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-[#FFD700]/10 to-[#20B2AA]/10 border-[#FFD700]">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-[#FFD700] mb-4">
                Precisa de Ajuda Profissional?
              </h2>
              <p className="text-gray-300 mb-6">
                Oferecemos serviço de instalação profissional. Solicite um orçamento sem compromisso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/loja/papel-parede">
                  <Button className="bg-gradient-to-r from-[#FFD700] to-[#20B2AA] text-black font-bold hover:opacity-90">
                    Escolher Textura
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                    Solicitar Instalação
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}