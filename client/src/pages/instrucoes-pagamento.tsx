import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, CheckCircle, Clock, MapPin, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function InstrucoesPagamento() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Recuperar dados do pedido
    const pendingOrder = localStorage.getItem("pendingOrder");
    if (pendingOrder) {
      setOrderData(JSON.parse(pendingOrder));
    }
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const method = urlParams.get("method");
  const orderId = urlParams.get("orderId");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${label} copiado para a área de transferência`,
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("pt-PT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (!orderData || !method) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">
              Dados do pagamento não encontrados.
            </p>
            <Button
              onClick={() => setLocation("/checkout")}
              className="w-full mt-4"
            >
              Voltar ao Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pagamento Pendente
          </h1>
          <p className="text-gray-600">
            Siga as instruções abaixo para completar o seu pagamento
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Resumo do Pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Resumo do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Número do Pedido:</span>
                <span className="font-mono font-semibold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valor Total:</span>
                <span className="font-semibold text-xl text-green-600">
                  {formatCurrency(orderData.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Método de Pagamento:</span>
                <span className="font-semibold">
                  {method === "multibanco" ? "Multibanco" : "Payshop"}
                </span>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  <strong>Cliente:</strong> {orderData.customerData.nome}
                  <br />
                  <strong>Email:</strong> {orderData.customerData.email}
                  <br />
                  <strong>Telefone:</strong> {orderData.customerData.telefone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Instruções de Pagamento */}
          {method === "multibanco" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Pagamento Multibanco
                </CardTitle>
                <CardDescription>
                  Use os dados abaixo em qualquer ATM, homebanking ou app
                  bancária
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">🏦 Entidade</p>
                        <p className="text-4xl font-mono font-black text-yellow-900 mt-1">
                          {orderData.data.entity}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(orderData.data.entity, "Entidade")
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">🔢 Referência</p>
                        <p className="text-4xl font-mono font-black text-blue-900 mt-1">
                          {orderData.data.reference}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            orderData.data.reference,
                            "Referência",
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">💰 Valor a Pagar</p>
                        <p className="text-4xl font-black text-green-800 mt-1">
                          {formatCurrency(orderData.amount)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(orderData.amount.toFixed(2), "Valor")
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Como Pagar:
                  </h4>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Aceda ao seu homebanking ou dirija-se ao ATM</li>
                    <li>2. Escolha "Pagamentos" ou "Pagar Serviços"</li>
                    <li>
                      3. Introduza a Entidade:{" "}
                      <strong>{orderData.data.entity}</strong>
                    </li>
                    <li>
                      4. Introduza a Referência:{" "}
                      <strong>{orderData.data.reference}</strong>
                    </li>
                    <li>
                      5. Confirme o valor:{" "}
                      <strong>{formatCurrency(orderData.amount)}</strong>
                    </li>
                    <li>6. Confirme o pagamento</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          )}

          {method === "payshop" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  Pagamento Payshop
                </CardTitle>
                <CardDescription>
                  Dirija-se a um agente Payshop com os dados abaixo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                          🔢 Referência Payshop
                        </p>
                        <p className="text-4xl font-mono font-black text-orange-900 mt-1">
                          {orderData.data.reference}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            orderData.data.reference,
                            "Referência Payshop",
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">💰 Valor a Pagar</p>
                        <p className="text-4xl font-black text-green-800 mt-1">
                          {formatCurrency(orderData.amount)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(orderData.amount.toFixed(2), "Valor")
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {orderData.data.validUntil && (
                    <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                      <p className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">📅 Válido até</p>
                      <p className="text-2xl font-bold text-yellow-900 mt-1">
                        {new Date(orderData.data.validUntil).toLocaleDateString("pt-PT")}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    Como Pagar:
                  </h4>
                  <ol className="text-sm text-orange-800 space-y-1">
                    <li>
                      1. Dirija-se a um agente Payshop (CTT, tabacarias, etc.)
                    </li>
                    <li>2. Informe que quer fazer um pagamento Payshop</li>
                    <li>
                      3. Forneça a referência:{" "}
                      <strong>{orderData.data.reference}</strong>
                    </li>
                    <li>
                      4. Confirme o valor:{" "}
                      <strong>{formatCurrency(orderData.amount)}</strong>
                    </li>
                    <li>5. Efetue o pagamento em dinheiro</li>
                    <li>6. Guarde o comprovativo</li>
                  </ol>
                </div>

                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(
                        "https://www.payshop.pt/fepsagents/",
                        "_blank",
                      )
                    }
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Encontrar Agente Payshop
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Informações Importantes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Informações Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Após o Pagamento
                </h4>
                <p className="text-sm text-green-800">
                  Receberá uma confirmação por email assim que o pagamento for
                  processado. O processamento pode demorar até 24 horas.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Dúvidas?</h4>
                <p className="text-sm text-blue-800">
                  Se tiver alguma dúvida sobre o pagamento, contacte-nos através
                  do nosso formulário de contacto ou telefone.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex gap-4 justify-center mt-8">
          <Button variant="outline" onClick={() => setLocation("/checkout")}>
            Voltar ao Checkout
          </Button>
          <Button
            onClick={() => setLocation("/pedido-confirmado?orderId=" + orderId)}
          >
            Já Paguei
          </Button>
        </div>
      </div>
    </div>
  );
}
