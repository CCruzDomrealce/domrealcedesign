import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import GoogleMap from "@/components/GoogleMap";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { ObjectUploader } from "@/components/ObjectUploader";
import { Button } from "@/components/ui/button";
import { Shield, Upload, FileText, X } from "lucide-react";

export default function Contactos() {
  const { toast } = useToast();
  
  // Fetch Google Maps API key
  const { data: mapsConfig } = useQuery<{ apiKey: string }>({
    queryKey: ['/api/config/google-maps-key'],
  });
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
    anexos: [] as any[]
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest('/api/contact', 'POST', data);
    },
    onSuccess: (data: any) => {
      toast({
        title: "Sucesso!",
        description: data.message || "Mensagem enviada com sucesso!",
        variant: "default",
      });
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: '',
        anexos: []
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataToSubmit = {
        ...formData,
        ficheiros: formData.anexos?.map(file => file.uploadURL) || []
      };

      const validatedData = insertContactSchema.parse(dataToSubmit);
      submitMutation.mutate(validatedData);
    } catch (error) {
      toast({
        title: "Erro de validação",
        description: "Por favor, verifique os dados inseridos.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section className="relative h-96 bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJkb3RzIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LCAyMzQsIDc3LCAwLjEpIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZG90cykiLz4KPC9zdmc+')] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Contacto
          </h1>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="bg-black">
        <div className="container mx-auto px-0">
          {/* Interactive Google Map */}
          {mapsConfig?.apiKey ? (
            <GoogleMap
              apiKey={mapsConfig.apiKey}
              center={{
                lat: 41.1971,
                lng: -8.3289
              }}
              zoom={17}
              className="w-full h-96"
              address="Rua de Rebolido, 42, 4580-402 Gondalães, Paredes, Portugal"
              companyName="DOMREALCE"
            />
          ) : (
            <div className="w-full h-96 bg-gray-900 flex items-center justify-center">
              <div className="text-center text-brand-yellow">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto mb-4"></div>
                <p>A carregar mapa...</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section className="py-12 bg-black/90">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Address and Contact Info - Left Side */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-yellow/30 h-full">
                <h3 className="text-xl font-bold text-brand-yellow mb-6">Morada</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg text-white font-semibold mb-2">
                      D. M Realce
                    </h4>
                    <div className="text-white/80">
                      Rua de Rebolido, 42<br />
                      4580-402 Gondalães, Paredes<br />
                      Portugal
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-brand-yellow">📞</span>
                        <div>
                          <p className="text-white/60 text-sm">Telefone</p>
                          <p className="text-white font-medium">+351 930 682 725</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-brand-turquoise">✉️</span>
                        <div>
                          <p className="text-white/60 text-sm">Email</p>
                          <p className="text-white font-medium">carloscruz@domrealce.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-brand-coral">🕰️</span>
                        <div>
                          <p className="text-white/60 text-sm">Horário</p>
                          <p className="text-white font-medium">Segunda a Sexta<br />9h00 - 18h00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('Rua de Rebolido 42, 4580-402 Gondalães, Paredes');
                        toast({ title: 'Morada copiada!', description: 'A morada foi copiada para a área de transferência.' });
                      }}
                      className="w-full px-4 py-2 bg-brand-turquoise/20 text-brand-turquoise rounded-lg hover:bg-brand-turquoise/30 transition-all duration-300 text-sm font-medium"
                    >
                      📋 Copiar Morada
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form - Right Side */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-brand-yellow/30">
                <h3 className="text-2xl font-bold text-brand-yellow mb-6">Formulário de Contacto</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 mb-2 font-medium">Nome *</label>
                      <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        className="w-full p-3 bg-gray-800/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all duration-300"
                        placeholder="O seu nome"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2 font-medium">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 bg-gray-800/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all duration-300"
                        placeholder="o.seu.email@exemplo.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2 font-medium">Telefone</label>
                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      className="w-full p-3 bg-gray-800/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all duration-300"
                      placeholder="+351 900 000 000 (opcional)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2 font-medium">Assunto *</label>
                    <input
                      type="text"
                      value={formData.assunto}
                      onChange={(e) => setFormData({...formData, assunto: e.target.value})}
                      className="w-full p-3 bg-gray-800/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all duration-300"
                      placeholder="Qual é o assunto da sua mensagem?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2 font-medium">Mensagem *</label>
                    <textarea
                      value={formData.mensagem}
                      onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                      rows={4}
                      className="w-full p-3 bg-gray-800/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all duration-300 resize-none"
                      placeholder="Descreva o seu projeto ou dúvida em detalhe..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2 font-medium">Anexos (opcional)</label>
                    <ObjectUploader
                      onUpload={(files) => setFormData({...formData, anexos: files})}
                      maxFiles={3}
                      acceptedTypes={['image/*', '.pdf', '.doc', '.docx']}
                      className="w-full"
                    />
                    
                    {formData.anexos && formData.anexos.length > 0 && (
                      <div className="mt-3">
                        <p className="text-white/60 mb-2 text-sm">Ficheiros anexados:</p>
                        <div className="space-y-2">
                          {formData.anexos.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-800/30 p-2 rounded border border-white/10">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-brand-turquoise" />
                                <span className="text-white/80 text-sm">{file.originalName}</span>
                                <span className="text-white/40 text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    anexos: formData.anexos?.filter((_, i) => i !== index)
                                  });
                                }}
                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="flex-1 bg-gradient-to-r from-brand-yellow to-brand-coral text-black font-semibold py-3 px-6 rounded-lg hover:from-brand-yellow/90 hover:to-brand-coral/90 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-black/30 border-t-black"></div>
                          A enviar...
                        </>
                      ) : (
                        'Enviar Mensagem'
                      )}
                    </button>
                    
                    <Link href={`https://wa.me/351930682725?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os vossos serviços.')}`}>
                      <button
                        type="button"
                        className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                      >
                        📱 WhatsApp
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Quote Section */}
      <section className="py-12 bg-gradient-to-b from-black/90 to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl font-italic text-white/90 mb-6">
              "Estamos prontos para fazer seu projeto brilhar! 
              <span className="text-brand-yellow font-semibold"> Juntos, vamos mais longe.</span>"
            </p>
            <button
              onClick={() => window.location.href = 'mailto:carloscruz@domrealce.com'}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-coral text-black font-bold text-lg rounded-lg hover:from-brand-yellow/90 hover:to-brand-coral/90 transition-all duration-300 transform hover:scale-[1.05] shadow-lg hover:shadow-xl"
            >
              ✉️ Entrar em contacto
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}