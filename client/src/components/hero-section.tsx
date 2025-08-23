import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { siteConfig } from "@/config/site-config";

export default function HeroSection() {
  return (
    <section 
      className="min-h-screen flex items-center justify-center relative pt-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/attached_assets/AdobeStock_756714315_1755959760920.webp')"
      }}
    >
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto p-8 md:p-12">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            <span className="text-brand-yellow">Realce</span> sua marca com<br />
            <span className="text-brand-yellow">criatividade</span><br />
            <span className="text-white">e alta definição</span>
          </h2>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            {siteConfig.homepage.heroDescricao}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="px-8 py-4 bg-brand-yellow text-black font-heading font-semibold rounded-lg">
              <Link href="/contactos#formulario">{siteConfig.homepage.botaoPrincipal}</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="px-8 py-4 border-2 border-brand-turquoise text-brand-turquoise font-heading font-semibold rounded-lg hover:bg-brand-turquoise hover:text-black"
            >
              <Link href="/portfolio">{siteConfig.homepage.botaoSecundario}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
