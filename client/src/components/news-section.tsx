import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const newsArticles = [
  {
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Lançamento",
    categoryColor: "bg-brand-yellow text-black",
    date: "22 Ago 2025",
    title: "DOMREALCE Lança Loja Online de Papel de Parede",
    description: "Revolutionamos a forma como escolhe e compra papel de parede com a nossa nova plataforma digital. Mais de 3000 texturas agora disponíveis online.",
    titleHoverColor: "hover:text-brand-yellow"
  }
];

export default function NewsSection() {
  return (
    <section id="noticias" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-animate">
          <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="text-brand-coral animate-pulse-brand">Notícias</span> <span className="text-white">Mais Recentes</span>
          </h3>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Fique por dentro das últimas novidades e tendências em comunicação visual
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <article 
              key={index} 
              className="bg-black rounded-2xl overflow-hidden hover-lift transform-3d scroll-animate hover-tilt cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className={`${article.categoryColor} px-3 py-1 rounded-full text-sm font-semibold animate-bounce-subtle`}>
                    {article.category}
                  </span>
                  <span className="text-white/60 text-sm ml-3">{article.date}</span>
                </div>
                <h4 className={`text-xl font-heading font-semibold mb-3 text-white ${article.titleHoverColor} transition-colors cursor-pointer hover:animate-pulse-brand`}>
                  {article.title}
                </h4>
                <p className="text-white/80 mb-4">
                  {article.description}
                </p>
                <Button 
                  variant="link" 
                  className="text-brand-turquoise hover:text-brand-turquoise font-semibold transition-colors p-0 hover-lift group"
                >
                  Ler mais <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 scroll-animate">
          <Button 
            asChild
            variant="outline" 
            className="px-8 py-3 border-2 border-brand-coral text-brand-coral font-heading font-semibold rounded-lg hover:bg-brand-coral hover:text-white hover-lift transition-all duration-300 animate-bounce-subtle"
          >
            <Link href="/">Ver Todas as Notícias</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
