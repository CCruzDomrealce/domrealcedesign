import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { ObjectUploader } from "@/components/ObjectUploader";
import { Button } from "@/components/ui/button";
import { Shield, Upload, FileText, X } from "lucide-react";
// DOMREALCE: GA4 tracking
import { trackFormSubmit } from "@/lib/analytics";

export default function Contactos() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    mensagem: '',
    ficheiros: [] as string[]
  });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest('/api/contact', 'POST', data);
    },
    onSuccess: (data: any) => {
      // DOMREALCE: GA4 form submit tracking on success
      trackFormSubmit('orcamento_contactos', {
        form_type: 'contact_form',
        has_files: uploadedFiles.length > 0,
        company_provided: Boolean(formData.empresa)
      });
      
      toast({
        title: "Sucesso!",
        description: data.message || "Mensagem enviada com sucesso!",
        variant: "default",
      });
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        mensagem: '',
        ficheiros: []
      });
      setUploadedFiles([]);
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        ficheiros: uploadedFiles
      };
      
      const validatedData = insertContactSchema.parse(dataToSubmit);
      mutation.mutate(validatedData);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Erro de validação",
        description: "Por favor, verifique os dados inseridos.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async () => {
    try {
      const response = await apiRequest('/api/objects/upload', 'POST');
      return {
        method: 'PUT' as const,
        url: (response as any).uploadURL,
      };
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao preparar upload. Tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleUploadComplete = (result: any) => {
    const newFiles = result.successful.map((file: any) => file.uploadURL);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast({
      title: "Ficheiros enviados",
      description: `${result.successful.length} ficheiro(s) enviado(s) com sucesso.`,
      variant: "default",
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-4 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="text-brand-yellow">Contacto</span>
          </h1>
          <p className="text-lg text-white/90 mb-4 max-w-2xl mx-auto">
            Entre em contacto connosco. Estamos aqui para ajudar com o seu projeto de comunicação visual.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-4 bg-black/90">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-2">
              <h3 className="text-lg font-semibold mb-2 text-brand-yellow">Telefone</h3>
              <p className="text-white/80 text-sm">+351 930 682 725</p>
            </div>

            <div className="text-center p-2">
              <h3 className="text-lg font-semibold mb-2 text-brand-turquoise">Email</h3>
              <p className="text-white/80 text-sm">carloscruz@domrealce.com</p>
            </div>

            <div className="text-center p-2">
              <h3 className="text-lg font-semibold mb-2 text-brand-coral">Morada</h3>
              <p className="text-white/80 text-sm">
                Rua de Rebolido, 42<br />
                4580-264 Gondalães, Paredes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form */}
      <section className="py-6 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-brand-yellow/20">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-brand-yellow" />
                <h2 className="text-2xl font-heading font-bold">
                  <span className="text-brand-turquoise">Formulário</span> <span className="text-white">Seguro</span>
                </h2>
              </div>
              
              <p className="text-white/80 mb-6 text-sm">
                Todos os dados são protegidos e processados de forma segura. Máximo 5 tentativas por 15 minutos.
              </p>
              
              <form id="formulario" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/80 mb-2 block text-sm font-medium">
                      Nome Completo *
                    </label>
                    <input 
                      type="text" 
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-black/50 border border-brand-yellow text-white rounded-lg text-sm focus:border-brand-turquoise focus:outline-none transition-colors"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/80 mb-2 block text-sm font-medium">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-black/50 border border-brand-yellow text-white rounded-lg text-sm focus:border-brand-turquoise focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/80 mb-2 block text-sm font-medium">
                      Telefone
                    </label>
                    <input 
                      type="tel" 
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-black/50 border border-brand-yellow text-white rounded-lg text-sm focus:border-brand-turquoise focus:outline-none transition-colors"
                      placeholder="+351 xxx xxx xxx"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/80 mb-2 block text-sm font-medium">
                      Empresa
                    </label>
                    <input 
                      type="text" 
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-black/50 border border-brand-yellow text-white rounded-lg text-sm focus:border-brand-turquoise focus:outline-none transition-colors"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-white/80 mb-2 block text-sm font-medium">
                    Mensagem *
                  </label>
                  <textarea 
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-black/50 border border-brand-yellow text-white rounded-lg h-32 text-sm focus:border-brand-turquoise focus:outline-none transition-colors resize-none"
                    placeholder="Descreva detalhadamente o seu projeto..."
                    required
                  />
                </div>

                {/* File Upload Section */}
                <div>
                  <label className="text-white/80 mb-2 block text-sm font-medium">
                    Anexar Ficheiros (Opcional)
                  </label>
                  <p className="text-white/60 text-xs mb-3">
                    Formatos aceites: PDF, DOC, DOCX, JPG, PNG, GIF, AI, PSD, EPS. Máximo 10MB por ficheiro.
                  </p>
                  
                  <ObjectUploader
                    maxNumberOfFiles={5}
                    maxFileSize={10485760}
                    onGetUploadParameters={handleFileUpload}
                    onComplete={handleUploadComplete}
                    buttonClassName="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Anexar Ficheiros do Projeto
                  </ObjectUploader>

                  {/* Display uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-white/80 text-sm font-medium">Ficheiros anexados:</p>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-black/30 p-3 rounded-lg border border-brand-yellow/30">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-brand-turquoise" />
                            <span className="text-white/80 text-sm">Ficheiro {index + 1}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting || mutation.isPending}
                  className="w-full px-6 py-4 bg-gradient-to-r from-brand-yellow to-brand-coral text-black font-semibold rounded-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || mutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      A enviar...
                    </>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </Button>

                <p className="text-white/60 text-xs text-center mt-4">
                  Ao enviar este formulário, concorda com o processamento dos seus dados pessoais de acordo com a nossa{' '}
                  <Link href="/politica-privacidade" className="text-brand-turquoise hover:underline">
                    Política de Privacidade
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Options */}
      <section className="py-6 bg-gray-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-black/50 rounded-xl p-6 border border-brand-turquoise/20">
              <h3 className="text-xl font-semibold text-brand-yellow mb-3">Atendimento Personalizado</h3>
              <p className="text-white/80 mb-4 text-sm">
                Com 40 anos de experiência, oferecemos um atendimento personalizado focado na qualidade, pontualidade e honestidade.
              </p>
              <Link href="/sobre" className="text-brand-turquoise hover:text-brand-turquoise transition-colors text-sm">
                Conhecer a Nossa História
              </Link>
            </div>
            
            <div className="bg-black/50 rounded-xl p-6 border border-brand-coral/20">
              <h3 className="text-xl font-semibold text-brand-coral mb-3">Orçamentos Gratuitos</h3>
              <p className="text-white/80 mb-4 text-sm">
                Solicite um orçamento sem compromisso. Analisamos cada projeto individualmente para oferecer a melhor solução.
              </p>
              <a 
                href="https://wa.me/351930682725?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento." 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-yellow hover:text-brand-yellow transition-colors text-sm"
              >
                WhatsApp Direto
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}