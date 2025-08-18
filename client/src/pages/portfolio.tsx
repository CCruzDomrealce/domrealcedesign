import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { DynamicGallery } from "@/components/dynamic-gallery";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-yellow/10 via-brand-turquoise/5 to-brand-coral/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              O Nosso
              <span className="text-brand-yellow"> Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Explore os nossos projetos mais recentes e veja como transformamos ideias em comunicação visual impactante. 
              Cada projeto é uma demonstração do nosso compromisso com a qualidade e inovação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contactos">
                <Button size="lg" className="bg-brand-yellow text-black hover:bg-yellow-400">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Solicitar Orçamento
                </Button>
              </Link>
              <Link href="/servicos">
                <Button size="lg" variant="outline">
                  Ver Todos os Serviços
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria Dinâmica */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trabalhos Realizados
            </h2>
            <p className="text-muted-foreground text-lg">
              Cada projeto conta uma história única. Navegue pela nossa galeria organizada por categorias 
              e veja exemplos reais do nosso trabalho.
            </p>
          </div>
          
          {/* Componente de Galeria Dinâmica */}
          <DynamicGallery showCategories={true} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-brand-turquoise/10 to-brand-yellow/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para o Seu Próximo Projeto?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Entre em contacto connosco e vamos transformar a sua ideia em realidade. 
              Oferecemos orçamentos gratuitos e consultoria personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contactos">
                <Button size="lg" className="bg-brand-yellow text-black hover:bg-yellow-400">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar Agora
                </Button>
              </Link>
              <Link href="/servicos">
                <Button size="lg" variant="outline">
                  Conhecer Serviços
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}