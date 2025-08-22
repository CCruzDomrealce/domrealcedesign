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
                  Papel de parede em vinil autocolante. Aplicação a seco, recomendada instalação por profissional.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Material: Vinil autocolante</li>
                  <li>• Aplicação a seco (sem água)</li>
                  <li>• Requer sobreposição de 5mm</li>
                  <li>• Recomendada aplicação profissional</li>
                  <li>• Maior precisão necessária</li>
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
                  Papel de parede tradicional que requer cola comprada separadamente e aplicada com rolo.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Cola comprada separadamente</li>
                  <li>• Aplicação com rolo</li>
                  <li>• Maior controlo da aplicação</li>
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
            Aplicação - Vinil Autocolante (Aplicação a Seco)
          </h2>
          
          <div className="mb-6 p-4 bg-[#FF6347]/10 border border-[#FF6347] rounded-lg">
            <p className="text-[#FF6347] font-semibold mb-2">⚠️ Recomendação Importante</p>
            <p className="text-gray-300 text-sm">
              A aplicação de vinil autocolante requer técnica específica e é fortemente recomendada a instalação por profissional qualificado para garantir resultado perfeito.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Preparação da Parede",
                description: "Parede deve estar perfeitamente lisa, limpa e seca. Qualquer imperfeição será visível.",
                details: ["Parede completamente lisa", "Sem buracos ou riscos", "Superfície seca", "Tinta em perfeito estado"]
              },
              {
                step: "2", 
                title: "Medição e Corte Preciso",
                description: "Meça com precisão e corte considerando sobreposição de 5mm entre tiras.",
                details: ["Medir altura exata + 5cm extra", "Sobreposição de 5mm obrigatória", "Corte preciso com estilete profissional", "Marcar sequência das tiras"]
              },
              {
                step: "3",
                title: "Aplicação a Seco",
                description: "Aplicação direta sem água. Remover proteção adesiva gradualmente durante a colagem.",
                details: ["SEM água - aplicação a seco", "Remover proteção gradualmente", "Trabalhar devagar e com precisão", "Temperatura ambiente ideal"]
              },
              {
                step: "4",
                title: "Colagem e Alisamento", 
                description: "Cole de cima para baixo, alisando constantemente para evitar bolhas de ar.",
                details: ["Começar pelo topo", "Alisar continuamente", "Evitar bolhas de ar", "Pressão uniforme"]
              },
              {
                step: "5",
                title: "Sobreposição e Acabamentos",
                description: "Garantir sobreposição de 5mm e fazer corte duplo para juntas invisíveis.",
                details: ["Sobreposição exata de 5mm", "Corte duplo nas juntas", "Acabamento profissional", "Verificar aderência"]
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
                title: "Aplicação da Cola com Rolo",
                description: "Aplique a cola comprada separadamente uniformemente no verso do papel com rolo, das bordas para o centro.",
                details: ["Cola comprada aplicada com rolo", "Das bordas para o centro", "Dobrar em acordeão por 10 min"]
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
                  <li>• <strong>Vinil:</strong> Aplicação a seco, sem água</li>
                  <li>• <strong>Papel tradicional:</strong> Teste área pequena primeiro</li>
                  <li>• Trabalhe com boa iluminação</li>
                  <li>• Mantenha temperatura ambiente estável</li>
                  <li>• Tenha todas as ferramentas preparadas</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-3">Problemas Comuns</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>Vinil:</strong> Sobreposição inadequada (mín. 5mm)</li>
                  <li>• <strong>Papel:</strong> Bolhas - alisar imediatamente</li>
                  <li>• Juntas visíveis: pressionar bem</li>
                  <li>• Padrão desalinhado: medir com precisão</li>
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
                Oferecemos serviço de instalação profissional. Especialmente recomendado para vinil autocolante. A laminação adiciona proteção contra riscos e raios UV. Solicite um orçamento sem compromisso.
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