import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Contactos from "@/pages/contactos";
import Sobre from "@/pages/sobre";
import Loja from "@/pages/loja";
import Portfolio from "@/pages/portfolio";
import Servicos from "@/pages/servicos";
import ServicoDesignGrafico from "@/pages/servico-design-grafico";
import ServicoImpressaoDigital from "@/pages/servico-impressao-digital";
import ServicoPapelParede from "@/pages/servico-papel-parede";
import ServicoTelasArtisticas from "@/pages/servico-telas-artisticas";
import ServicoAutocolantes from "@/pages/servico-autocolantes";
import ServicoDecoracaoViaturas from "@/pages/servico-decoracao-viaturas";
import ServicoEspacosComerciais from "@/pages/servico-espacos-comerciais";
import Noticias from "@/pages/noticias";
import PoliticaPrivacidade from "@/pages/politica-privacidade";
import TermosCondicoes from "@/pages/termos-condicoes";
import PoliticaCookies from "@/pages/politica-cookies";
import AvisoLegal from "@/pages/aviso-legal";
// import CustomCursor from "@/components/custom-cursor";
// import ScrollAnimations from "@/components/scroll-animations";

function Router() {
  useScrollToTop();
  
  return (
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
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/loja" component={Loja} />
      <Route path="/noticias" component={Noticias} />
      <Route path="/contactos" component={Contactos} />
      <Route path="/politica-privacidade" component={PoliticaPrivacidade} />
      <Route path="/termos-condicoes" component={TermosCondicoes} />
      <Route path="/politica-cookies" component={PoliticaCookies} />
      <Route path="/aviso-legal" component={AvisoLegal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* <CustomCursor />
        <ScrollAnimations /> */}
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
