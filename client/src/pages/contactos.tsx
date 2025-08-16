import { MapPin, Phone, Mail, Clock, MessageSquare, Send, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";

export default function Contactos() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui será implementada a lógica de envio
    console.log('Formulário enviado:', formData);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black/80"></div>
        
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-slow" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px) scale(1.1)`
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div 
            className="max-w-4xl mx-auto bg-black/30 rounded-2xl p-8 md:p-12 hover-tilt transform-3d scroll-animate"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`
            }}
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              <span className="text-brand-yellow animate-pulse-brand">Contacto</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Entre em contacto connosco. Estamos aqui para ajudar com o seu projeto de comunicação visual.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-black/90">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="gradient-border hover-tilt transform-3d scroll-animate">
              <div className="gradient-border-inner p-6 text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-yellow to-brand-coral rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce-subtle">
                  <MapPin className="text-black text-2xl" size={24} />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-brand-yellow">Localização</h3>
                <p className="text-white/80">
                  Rua de Rebolido 42<br />
                  4580-402 Gondalães<br />
                  Paredes
                </p>
              </div>
            </div>

            <div className="gradient-border hover-tilt transform-3d scroll-animate">
              <div className="gradient-border-inner p-6 text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-turquoise to-brand-blue rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce-subtle">
                  <Phone className="text-black text-2xl" size={24} />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-brand-turquoise">Telefone</h3>
                <p className="text-white/80">+351 930 682 725</p>
                <p className="text-white/60 text-sm mt-2">Resposta rápida<br />via WhatsApp</p>
              </div>
            </div>

            <div className="gradient-border hover-tilt transform-3d scroll-animate">
              <div className="gradient-border-inner p-6 text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-blue to-brand-coral rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce-subtle">
                  <Mail className="text-black text-2xl" size={24} />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-brand-blue">Email</h3>
                <p className="text-white/80">carloscruz@domrealce.com</p>
                <p className="text-white/60 text-sm mt-2">Resposta em<br />24 horas</p>
              </div>
            </div>

            <div className="gradient-border hover-tilt transform-3d scroll-animate">
              <div className="gradient-border-inner p-6 text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-coral to-brand-yellow rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce-subtle">
                  <Clock className="text-black text-2xl" size={24} />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-brand-coral">Horário</h3>
                <p className="text-white/80">
                  Segunda - Sexta: 9h00 - 18h00<br />
                  Sábado: 9h00 - 13h00<br />
                  Domingo: Encerrado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="scroll-animate-left">
              <div className="bg-black/50 rounded-2xl p-8 gradient-border">
                <div className="gradient-border-inner p-6">
                  <h2 className="text-3xl font-heading font-bold mb-6">
                    <span className="text-brand-turquoise">Envie-nos</span> <span className="text-white">uma Mensagem</span>
                  </h2>
                  <p className="text-white/80 mb-6">Preencha o formulário e entraremos em contacto brevemente.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome" className="text-white/80 mb-2 block">
                          <User className="inline mr-2" size={16} />
                          Nome *
                        </Label>
                        <Input
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          className="bg-black/50 border-brand-yellow text-white placeholder:text-white/50 focus:border-brand-turquoise"
                          placeholder="Nome Completo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white/80 mb-2 block">
                          <Mail className="inline mr-2" size={16} />
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-black/50 border-brand-yellow text-white placeholder:text-white/50 focus:border-brand-turquoise"
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="telefone" className="text-white/80 mb-2 block">
                          <Phone className="inline mr-2" size={16} />
                          Telefone
                        </Label>
                        <Input
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          className="bg-black/50 border-brand-yellow text-white placeholder:text-white/50 focus:border-brand-turquoise"
                          placeholder="+351 xxx xxx xxx"
                        />
                      </div>
                      <div>
                        <Label htmlFor="assunto" className="text-white/80 mb-2 block">
                          <FileText className="inline mr-2" size={16} />
                          Assunto *
                        </Label>
                        <Input
                          id="assunto"
                          name="assunto"
                          value={formData.assunto}
                          onChange={handleInputChange}
                          className="bg-black/50 border-brand-yellow text-white placeholder:text-white/50 focus:border-brand-turquoise"
                          placeholder="Assunto da mensagem"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="mensagem" className="text-white/80 mb-2 block">
                        <MessageSquare className="inline mr-2" size={16} />
                        Mensagem *
                      </Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        className="bg-black/50 border-brand-yellow text-white placeholder:text-white/50 focus:border-brand-turquoise min-h-[120px]"
                        placeholder="Descreva o seu projeto..."
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-coral gradient-animate text-black font-heading font-semibold rounded-lg hover:shadow-xl hover:shadow-yellow-500/25 hover-lift transition-all duration-300"
                    >
                      <Send className="mr-2" size={20} />
                      Enviar Mensagem
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="scroll-animate-right">
              <div className="bg-black/50 rounded-2xl p-8 gradient-border">
                <div className="gradient-border-inner p-6">
                  <h2 className="text-3xl font-heading font-bold mb-6">
                    <span className="text-brand-coral">Informações</span> <span className="text-white">de Contacto</span>
                  </h2>
                  <p className="text-white/80 mb-6">Pode contactar-nos através dos seguintes meios.</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 bg-black/30 rounded-lg hover-lift">
                      <MapPin className="text-brand-yellow mt-1 flex-shrink-0 animate-pulse-brand" size={24} />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Endereço</h3>
                        <p className="text-white/80">
                          Rua de Rebolido, 42<br />
                          4580-402 Gondalães, Paredes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-black/30 rounded-lg hover-lift">
                      <Clock className="text-brand-turquoise mt-1 flex-shrink-0 animate-pulse-brand" size={24} />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Horário de Funcionamento</h3>
                        <div className="text-white/80 space-y-1">
                          <p><strong>Segunda a Sexta:</strong> 9h00 - 18h00</p>
                          <p><strong>Sábado:</strong> 9h00 - 13h00</p>
                          <p><strong>Domingo:</strong> Encerrado</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-black/30 rounded-lg hover-lift">
                      <MessageSquare className="text-brand-coral mt-1 flex-shrink-0 animate-pulse-brand" size={24} />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Atendimento Personalizado</h3>
                        <p className="text-white/80 mb-3">
                          Com 40 anos de experiência, oferecemos um atendimento personalizado focado na qualidade, pontualidade e honestidade.
                        </p>
                        <Button 
                          variant="link" 
                          className="text-brand-turquoise hover:text-brand-turquoise transition-colors p-0 hover-lift"
                        >
                          Conhecer a Nossa História
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Direto Section */}
      <section className="py-16 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-animate">
            <h2 className="text-4xl font-heading font-bold mb-6">
              <span className="text-brand-yellow">Contacto</span> <span className="text-white">Direto</span>
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Contacte-nos diretamente via WhatsApp para respostas mais rápidas.
            </p>
            <a 
              href="https://wa.me/351930682725?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20serviços."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-heading font-semibold rounded-lg hover-lift transition-all duration-300 text-lg">
                <MessageSquare className="mr-3" size={20} />
                Contactar Agora
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Como Chegar Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl font-heading font-bold mb-6">
              <span className="text-brand-coral">Como</span> <span className="text-white">Chegar</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mapa */}
            <div className="scroll-animate-left">
              <div className="bg-black/50 rounded-2xl overflow-hidden gradient-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.8567891234567!2d-8.3591234567891!3d41.2034567891234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua%20de%20Rebolido%2C%2042%2C%204580-402%20Gondalães%2C%20Paredes!5e0!3m2!1spt!2spt!4v1234567890123"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                ></iframe>
              </div>
            </div>
            
            {/* Informações de Localização */}
            <div className="scroll-animate-right">
              <div className="bg-black/50 rounded-2xl p-8 gradient-border">
                <div className="gradient-border-inner p-6">
                  <h3 className="text-2xl font-heading font-bold text-brand-turquoise mb-4">DOMREALCE</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-brand-yellow mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-white font-semibold mb-1">Morada:</p>
                        <p className="text-white/80">
                          Rua de Rebolido, 42<br />
                          4580-264 Gondalães, Paredes
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="text-brand-turquoise mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-white font-semibold mb-1">Telefone:</p>
                        <p className="text-white/80">+351 930 682 725</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Mail className="text-brand-coral mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-white font-semibold mb-1">Email:</p>
                        <p className="text-white/80">carloscruz@domrealce.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href="https://wa.me/351930682725?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20serviços."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full"
                    >
                      <Button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg hover-lift transition-all duration-300">
                        <MessageSquare className="mr-2" size={16} />
                        Contactar via WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}