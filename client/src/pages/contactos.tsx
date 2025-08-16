import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Contactos() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-10 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-brand-yellow">Contacto</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Entre em contacto connosco. Estamos aqui para ajudar com o seu projeto de comunicação visual.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-10 bg-black/90">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3 text-brand-yellow">Telefone</h3>
              <p className="text-white/80">+351 930 682 725</p>
            </div>

            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3 text-brand-turquoise">Email</h3>
              <p className="text-white/80">carloscruz@domrealce.com</p>
            </div>

            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3 text-brand-coral">Horário</h3>
              <p className="text-white/80">
                Segunda-Sexta: 9h00-18h00<br />
                Sábado: 9h00-13h00<br />
                Domingo: Encerrado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Contact Form */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6 text-center">
              <span className="text-brand-turquoise">Envie-nos</span> <span className="text-white">uma Mensagem</span>
            </h2>
            <p className="text-white/80 mb-6 text-center">Preencha o formulário e entraremos em contacto brevemente.</p>
            
            <form className="space-y-6">
              <div>
                <label className="text-white/80 mb-2 block">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-black/50 border border-brand-yellow text-white rounded-lg"
                  placeholder="Nome Completo"
                />
              </div>
              
              <div>
                <label className="text-white/80 mb-2 block">Email</label>
                <input 
                  type="email" 
                  className="w-full p-3 bg-black/50 border border-brand-yellow text-white rounded-lg"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="text-white/80 mb-2 block">Mensagem</label>
                <textarea 
                  className="w-full p-3 bg-black/50 border border-brand-yellow text-white rounded-lg h-32"
                  placeholder="Descreva o seu projeto..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-coral text-black font-semibold rounded-lg hover:shadow-xl transition-all duration-300"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-10 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold mb-4">
              <span className="text-brand-coral">Como</span> <span className="text-white">Chegar</span>
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-brand-turquoise mb-4">DOMREALCE</h3>
            <p className="text-white/80 mb-4">
              Rua de Rebolido, 42<br />
              4580-264 Gondalães, Paredes
            </p>
            <p className="text-white/80 mb-6">
              Telefone: +351 930 682 725<br />
              Email: carloscruz@domrealce.com
            </p>
            
            <a 
              href="https://wa.me/351930682725?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20serviços."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Contactar via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-brand-yellow mb-4">Atendimento Personalizado</h3>
            <p className="text-white/80 mb-6">
              Com 40 anos de experiência, oferecemos um atendimento personalizado focado na qualidade, pontualidade e honestidade.
            </p>
            <a href="#" className="text-brand-turquoise hover:text-brand-turquoise transition-colors">
              Conhecer a Nossa História
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}