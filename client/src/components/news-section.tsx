import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsArticles = [
  {
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Tendências",
    categoryColor: "bg-brand-yellow text-black",
    date: "15 Jan 2024",
    title: "Novas Tendências em Comunicação Visual 2024",
    description: "Descubra as tendências mais recentes em design e comunicação visual que estão moldando o mercado.",
    titleHoverColor: "hover:text-brand-yellow"
  },
  {
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Tecnologia",
    categoryColor: "bg-brand-turquoise text-black",
    date: "10 Jan 2024",
    title: "Impressão Digital: Tecnologia Ricoh Pro L5160",
    description: "Conheça a nossa nova impressora de alta definição que revoluciona a qualidade dos nossos trabalhos.",
    titleHoverColor: "hover:text-brand-turquoise"
  },
  {
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    category: "Inovação",
    categoryColor: "bg-brand-coral text-white",
    date: "5 Jan 2024",
    title: "Fachadas LED: O Futuro da Sinalização",
    description: "Como as fachadas LED estão transformando a comunicação visual das empresas.",
    titleHoverColor: "hover:text-brand-coral"
  }
];

export default function NewsSection() {
  return (
    <section id="noticias" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="text-brand-coral">Notícias</span> <span className="text-white">Mais Recentes</span>
          </h3>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Fique por dentro das últimas novidades e tendências em comunicação visual
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <article key={index} className="bg-black rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className={`${article.categoryColor} px-3 py-1 rounded-full text-sm font-semibold`}>
                    {article.category}
                  </span>
                  <span className="text-white/60 text-sm ml-3">{article.date}</span>
                </div>
                <h4 className={`text-xl font-heading font-semibold mb-3 text-white ${article.titleHoverColor} transition-colors cursor-pointer`}>
                  {article.title}
                </h4>
                <p className="text-white/80 mb-4">
                  {article.description}
                </p>
                <Button 
                  variant="link" 
                  className="text-brand-turquoise hover:text-brand-turquoise font-semibold transition-colors p-0"
                >
                  Ler mais <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="px-8 py-3 border-2 border-brand-coral text-brand-coral font-heading font-semibold rounded-lg hover:bg-brand-coral hover:text-white transition-all duration-300"
          >
            Ver Todas as Notícias
          </Button>
        </div>
      </div>
    </section>
  );
}
