import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Share2, Facebook, Instagram, Linkedin, Search, Filter, Eye, Heart, MessageCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dados das notícias (em produção viria de uma base de dados)
const noticias = [
  {
    id: 1,
    titulo: "Novo Projeto de Fachada Comercial no Centro de Lisboa",
    resumo: "Completámos um projeto de sinalização moderna para uma loja de tecnologia no Chiado, com letras em LED e painel digital.",
    conteudo: "Este projeto desafiante envolveu a criação de uma fachada completamente nova para uma loja de tecnologia no coração de Lisboa. Utilizámos letras em LED de alta qualidade, painéis digitais interativos e materiais resistentes às condições meteorológicas.",
    categoria: "Trabalhos Recentes",
    imagem: "/placeholder-project-1.jpg",
    data: "2024-01-15",
    autor: "Equipa DOMREALCE",
    tags: ["fachadas", "led", "comercial"],
    visualizacoes: 245,
    likes: 18,
    comentarios: 5
  },
  {
    id: 2,
    titulo: "Adesivação Completa de Frota de Veículos Empresariais",
    resumo: "Transformámos 15 veículos comerciais numa poderosa ferramenta de marketing móvel para uma empresa de logística.",
    conteudo: "Projeto completo de branding móvel que incluiu design personalizado, impressão em vinil de alta qualidade e aplicação profissional em toda a frota de veículos.",
    categoria: "Trabalhos Recentes", 
    imagem: "/placeholder-project-2.jpg",
    data: "2024-01-10",
    autor: "Equipa DOMREALCE",
    tags: ["veículos", "frota", "branding"],
    visualizacoes: 189,
    likes: 12,
    comentarios: 3
  },
  {
    id: 3,
    titulo: "Tendências de Design Gráfico para 2024",
    resumo: "Exploramos as principais tendências visuais que estão a moldar o mundo do design gráfico este ano.",
    conteudo: "O design gráfico continua a evoluir rapidamente. Este ano vemos o retorno de gradientes vibrantes, tipografias experimentais e uma abordagem mais sustentável ao design impresso.",
    categoria: "Notícias do Sector",
    imagem: "/placeholder-trends.jpg", 
    data: "2024-01-08",
    autor: "Equipa DOMREALCE",
    tags: ["design", "tendências", "2024"],
    visualizacoes: 567,
    likes: 45,
    comentarios: 12
  },
  {
    id: 4,
    titulo: "Restauro de Letreiro Histórico no Porto",
    resumo: "Participámos no restauro de um letreiro icónico dos anos 50, preservando a história enquanto modernizámos a estrutura.",
    conteudo: "Um projeto especial que combinou técnicas tradicionais com tecnologia moderna para preservar um marco histórico da cidade do Porto.",
    categoria: "Trabalhos Antigos",
    imagem: "/placeholder-restoration.jpg",
    data: "2023-11-20",
    autor: "Equipa DOMREALCE", 
    tags: ["restauro", "história", "património"],
    visualizacoes: 334,
    likes: 28,
    comentarios: 8
  },
  {
    id: 5,
    titulo: "Inovações em Impressão Digital Sustentável",
    resumo: "Como a indústria gráfica está a adoptar práticas mais ecológicas sem comprometer a qualidade.",
    conteudo: "A sustentabilidade tornou-se uma prioridade na impressão digital. Novos materiais eco-friendly e tintas à base de água estão a revolucionar o sector.",
    categoria: "Notícias do Sector",
    imagem: "/placeholder-sustainability.jpg",
    data: "2023-12-15",
    autor: "Equipa DOMREALCE",
    tags: ["sustentabilidade", "impressão", "eco-friendly"],
    visualizacoes: 423,
    likes: 31,
    comentarios: 15
  },
  {
    id: 6,
    titulo: "Projeto de Decoração para Centro Comercial",
    resumo: "Criámos a decoração temática completa para as festividades de Natal num grande centro comercial em Coimbra.",
    conteudo: "Um projeto sazonal ambicioso que incluiu elementos decorativos de grande escala, sinalização direccional e ambientação festiva em todo o espaço comercial.",
    categoria: "Trabalhos Antigos",
    imagem: "/placeholder-mall.jpg", 
    data: "2023-11-01",
    autor: "Equipa DOMREALCE",
    tags: ["decoração", "natal", "comercial"],
    visualizacoes: 678,
    likes: 52,
    comentarios: 19
  }
];

const categorias = ["Todas", "Trabalhos Recentes", "Trabalhos Antigos", "Notícias do Sector"];

export default function Noticias() {
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [noticiasFiltradas, setNoticiasFiltradas] = useState(noticias);

  // Filtrar notícias
  const filtrarNoticias = () => {
    let resultado = noticias;

    // Filtro por categoria
    if (filtroCategoria !== "Todas") {
      resultado = resultado.filter(noticia => noticia.categoria === filtroCategoria);
    }

    // Filtro por termo de pesquisa
    if (termoPesquisa) {
      resultado = resultado.filter(noticia => 
        noticia.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        noticia.resumo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        noticia.tags.some(tag => tag.toLowerCase().includes(termoPesquisa.toLowerCase()))
      );
    }

    setNoticiasFiltradas(resultado);
  };

  // Partilhar nas redes sociais
  const partilharFacebook = (noticia: typeof noticias[0]) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href + '#' + noticia.id)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const partilharInstagram = () => {
    // Instagram não permite partilha directa por URL, mostra instrução
    alert('Para partilhar no Instagram, tire uma captura de ecrã desta página e publique na sua conta @domrealce');
  };

  const partilharLinkedin = (noticia: typeof noticias[0]) => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href + '#' + noticia.id)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };



  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  // Aplicar filtros quando mudarem
  useEffect(() => {
    filtrarNoticias();
  }, [filtroCategoria, termoPesquisa]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-yellow/10 via-brand-turquoise/5 to-brand-coral/10 py-20 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              <span className="text-brand-yellow">Notícias</span> & <span className="text-brand-turquoise">Projectos</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Descubra os nossos trabalhos mais recentes, projetos históricos e as últimas tendências em comunicação visual
            </p>
          </div>
        </div>
      </section>

      {/* Filtros e Pesquisa */}
      <section className="pt-0 pb-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Pesquisar notícias..."
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>
              
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              {noticiasFiltradas.length} {noticiasFiltradas.length === 1 ? 'resultado' : 'resultados'}
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Notícias */}
      <section className="pt-0 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
            {noticiasFiltradas.map((noticia) => (
              <Card key={noticia.id} className="overflow-hidden hover-lift border-border bg-card">
                <div className="md:flex">
                  {/* Imagem */}
                  <div className="md:w-1/3">
                    <div className="aspect-video md:aspect-square bg-muted relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-brand-turquoise/20 flex items-center justify-center">
                        <span className="text-6xl text-muted-foreground/50">📰</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="md:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20">
                          {noticia.categoria}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye size={14} />
                            {noticia.visualizacoes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart size={14} />
                            {noticia.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={14} />
                            {noticia.comentarios}
                          </div>
                        </div>
                      </div>
                      
                      <CardTitle className="text-2xl mb-2 hover:text-brand-turquoise transition-colors cursor-pointer">
                        {noticia.titulo}
                      </CardTitle>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatarData(noticia.data)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {noticia.autor}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0">
                      <CardDescription className="text-base mb-4 leading-relaxed">
                        {noticia.resumo}
                      </CardDescription>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {noticia.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Acções */}
                      <div className="flex items-center justify-between">
                        <Button variant="outline" className="border-brand-turquoise text-brand-turquoise hover:bg-brand-turquoise hover:text-white">
                          Ler Mais
                        </Button>
                        
                        {/* Partilha Social */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground mr-2">Partilhar:</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => partilharFacebook(noticia)}
                            className="text-blue-600 hover:bg-blue-600/10"
                          >
                            <Facebook size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={partilharInstagram}
                            className="text-pink-600 hover:bg-pink-600/10"
                          >
                            <Instagram size={16} />
                          </Button>
                          <Button
                            variant="ghost" 
                            size="sm"
                            onClick={() => partilharLinkedin(noticia)}
                            className="text-blue-700 hover:bg-blue-700/10"
                          >
                            <Linkedin size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.share?.({
                              title: noticia.titulo,
                              text: noticia.resumo,
                              url: window.location.href + '#' + noticia.id
                            })}
                            className="text-muted-foreground hover:bg-muted"
                          >
                            <Share2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Mensagem quando não há resultados */}
          {noticiasFiltradas.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-heading font-semibold mb-2">Nenhum resultado encontrado</h3>
              <p className="text-muted-foreground mb-6">
                Tente ajustar os filtros ou termo de pesquisa
              </p>
              <Button 
                onClick={() => {
                  setFiltroCategoria("Todas");
                  setTermoPesquisa("");
                }}
                className="bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90"
              >
                Limpar Filtros
              </Button>
            </div>
          )}

          {/* Paginação (simulada) */}
          {noticiasFiltradas.length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-16">
              <Button variant="outline" disabled>Anterior</Button>
              <div className="flex gap-2">
                <Button variant="default" className="bg-brand-yellow text-brand-dark">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
              </div>
              <Button variant="outline">Próxima</Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Tem um projeto em mente?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Vamos criar algo extraordinário juntos. Contacte-nos para discutir o seu próximo projeto.
          </p>
          <Button 
            size="lg" 
            className="bg-brand-turquoise text-white hover:bg-brand-turquoise/90"
            onClick={() => window.location.href = '/contactos#formulario'}
          >
            Pedir Orçamento
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}