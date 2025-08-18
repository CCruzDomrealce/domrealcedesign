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
      
      {/* Header Completo */}
      <section className="bg-gradient-to-br from-brand-yellow/10 via-brand-turquoise/5 to-brand-coral/10 py-20 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nosso <span className="text-brand-yellow">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Conheça os nossos trabalhos mais marcantes em comunicação visual. 
              Cada projeto reflete o nosso compromisso com a qualidade e criatividade.
            </p>
          </div>
        </div>
      </section>

      {/* Galeria Dinâmica */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <DynamicGallery showCategories={true} />
        </div>
      </section>

      {/* Contacto Rápido */}
      <section className="bg-gradient-to-r from-brand-turquoise/10 to-brand-yellow/10 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contactos">
                <Button size="lg" className="bg-brand-yellow text-black hover:bg-yellow-400">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar
                </Button>
              </Link>
              <Link href="/servicos">
                <Button size="lg" variant="outline">
                  Serviços
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