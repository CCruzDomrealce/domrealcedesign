import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Contactos() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-6 bg-black">
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
      <section className="py-6 bg-black/90">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="text-center p-4">
              <h3 className="text-xl font-semibold mb-3 text-brand-yellow">Telefone</h3>
              <p className="text-white/80">+351 930 682 725</p>
            </div>

            <div className="text-center p-4">
              <h3 className="text-xl font-semibold mb-3 text-brand-turquoise">Email</h3>
              <p className="text-white/80">carloscruz@domrealce.com</p>
            </div>

            <div className="text-center p-4">
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
      <section className="py-6 bg-black">
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

      {/* Location Info with Map */}
      <section className="py-10 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold mb-4">
              <span className="text-brand-coral">Como</span> <span className="text-white">Chegar</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mapa Google Maps */}
            <div className="order-2 lg:order-1">
              <div className="bg-black/30 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.2345678901234!2d-8.5591234567891!3d41.2234567891234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDEzJzI0LjQiTiA4wrAzMycyOC44Ilc!5e0!3m2!1spt!2spt!4v1234567890123"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização DOMREALCE - Rua de Rebolido, 42, Gondalães, Paredes"
                ></iframe>
              </div>
              <p className="text-center text-white/60 text-sm mt-2">
                Clique no mapa para abrir no Google Maps
              </p>
            </div>
            
            {/* Informações de Contacto */}
            <div className="order-1 lg:order-2">
              <div className="bg-black/30 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-brand-turquoise mb-6">DOMREALCE</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-white font-semibold mb-1">📍 Morada:</h4>
                    <p className="text-white/80">
                      Rua de Rebolido, 42<br />
                      4580-264 Gondalães, Paredes
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-1">📞 Telefone:</h4>
                    <p className="text-white/80">+351 930 682 725</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-1">✉️ Email:</h4>
                    <p className="text-white/80">carloscruz@domrealce.com</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-1">🕒 Horário:</h4>
                    <p className="text-white/80">
                      Segunda-Sexta: 9h00-18h00<br />
                      Sábado: 9h00-13h00<br />
                      Domingo: Encerrado
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/351930682725?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20serviços."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-center"
                  >
                    💬 Contactar via WhatsApp
                  </a>
                  
                  <a 
                    href="https://www.google.com/maps/dir//Rua+de+Rebolido,+42,+4580-264+Gondalães,+Paredes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-3 bg-brand-blue hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-center"
                  >
                    🗺️ Abrir no Google Maps
                  </a>
                </div>
              </div>
            </div>
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