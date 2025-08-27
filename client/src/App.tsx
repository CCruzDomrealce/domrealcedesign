import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import SEO from "@/components/seo";
import StructuredData from "@/components/structured-data";
import WhatsAppFAB from "@/components/whatsapp-fab";
import PerformanceOptimizer from "@/components/performance-optimizer";
import { useLazyImages } from "@/hooks/use-lazy-images";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Contactos from "@/pages/contactos";
import Sobre from "@/pages/sobre";
import Loja from "@/pages/loja";
import LojaPapelParede from "@/pages/loja-papel-parede";
import LojaTexturaDetalhes from "@/pages/loja-textura-detalhes";
import Carrinho from "@/pages/carrinho";
import AdminTexturas from "@/pages/admin-texturas";
import Portfolio from "@/pages/portfolio";
import Servicos from "@/pages/servicos";
import ServicoDesignGrafico from "@/pages/servico-design-grafico";
import ServicoImpressaoDigital from "@/pages/servico-impressao-digital";
import ServicoPapelParede from "@/pages/servico-papel-parede";
import ServicoTelasArtisticas from "@/pages/servico-telas-artisticas";
import ServicoAutocolantes from "@/pages/servico-autocolantes";
import ServicoDecoracaoViaturas from "@/pages/servico-decoracao-viaturas";
import ServicoEspacosComerciais from "@/pages/servico-espacos-comerciais";
import ServicoPeliculasProtecaoSolar from "@/pages/servico-peliculas-protecao-solar";
import Checkout from "@/pages/checkout";
import PedidoConfirmado from "@/pages/pedido-confirmado";
import InstrucoesPagamento from "@/pages/instrucoes-pagamento";
import TesteCores from "@/pages/teste-cores";
import Noticias from "@/pages/noticias";
import PoliticaPrivacidade from "@/pages/politica-privacidade";
import TermosCondicoes from "@/pages/termos-condicoes";
import PoliticaCookies from "@/pages/politica-cookies";
import AvisoLegal from "@/pages/aviso-legal";
import ComoAplicarPapelParede from "@/pages/como-aplicar-papel-parede";
import AdminContactos from "@/pages/admin-contactos";
import AdminPortfolio from "@/pages/admin-portfolio";
import AdminSlider from "@/pages/admin-slider";
import AdminProdutos from "@/pages/admin-produtos";
import AdminNoticias from "@/pages/admin-noticias";
import AdminDashboard from "@/pages/admin-dashboard";
// import CustomCursor from "@/components/custom-cursor";
// import ScrollAnimations from "@/components/scroll-animations";

function Router() {
  useScrollToTop();
  
  return (
    <>
      <SEO />
      <StructuredData />
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/servicos" component={Servicos} />
      <Route path="/servico-design-grafico" component={ServicoDesignGrafico} />
      <Route path="/servico-impressao-digital" component={ServicoImpressaoDigital} />
      <Route path="/servico-papel-parede" component={ServicoPapelParede} />
      <Route path="/servico-telas-artisticas" component={ServicoTelasArtisticas} />
      <Route path="/servico-autocolantes" component={ServicoAutocolantes} />
      <Route path="/servico-decoracao-viaturas" component={ServicoDecoracaoViaturas} />
      <Route path="/servico-espacos-comerciais" component={ServicoEspacosComerciais} />
      <Route path="/servico-peliculas-protecao-solar" component={ServicoPeliculasProtecaoSolar} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/pedido-confirmado" component={PedidoConfirmado} />
      <Route path="/instrucoes-pagamento" component={InstrucoesPagamento} />
      <Route path="/teste-cores" component={TesteCores} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/loja" component={Loja} />
      <Route path="/loja/papel-parede" component={LojaPapelParede} />
      <Route path="/loja/papel-parede/textura/:textura" component={LojaTexturaDetalhes} />
      <Route path="/como-aplicar-papel-parede" component={ComoAplicarPapelParede} />
      <Route path="/carrinho" component={Carrinho} />
      <Route path="/admin/texturas" component={AdminTexturas} />
      <Route path="/admin/contactos" component={AdminContactos} />
      <Route path="/admin/portfolio" component={AdminPortfolio} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/slider" component={AdminSlider} />
      <Route path="/admin/produtos" component={AdminProdutos} />
      <Route path="/admin/noticias" component={AdminNoticias} />
      <Route path="/noticias" component={Noticias} />
      <Route path="/contactos" component={Contactos} />
      <Route path="/politica-privacidade" component={PoliticaPrivacidade} />
      <Route path="/termos-condicoes" component={TermosCondicoes} />
      <Route path="/politica-cookies" component={PoliticaCookies} />
      <Route path="/aviso-legal" component={AvisoLegal} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  // Initialize performance optimizations
  useLazyImages();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PerformanceOptimizer />
        {/* <CustomCursor />
        <ScrollAnimations /> */}
        <Toaster />
        <Router />
        <WhatsAppFAB />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
