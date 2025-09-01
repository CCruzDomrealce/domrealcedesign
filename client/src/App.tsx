import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import SEO from "@/components/seo";
import StructuredData from "@/components/structured-data";
import WhatsAppFAB from "@/components/whatsapp-fab";
import PerformanceOptimizer from "@/components/performance-optimizer";
import PerformancePreloader from "@/components/performance-preloader";
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
import AdminLoja from "@/pages/admin-loja";
import AdminPages from "@/pages/admin-pages";
import ServicoPeliculaSolar from "@/pages/servico-pelicula-solar";
// import CustomCursor from "@/components/custom-cursor";
// import ScrollAnimations from "@/components/scroll-animations";

import React, { useEffect } from "react";

// Declaração global para o Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

function Router() {
  useScrollToTop();
  const [location] = useLocation();

  // Track page views when routes change
  useEffect(() => {
    console.log('📍 Mudança de página para:', location);
    if (typeof window !== 'undefined' && window.gtag) {
      console.log('📊 Enviando pageview para GA4:', location);
      window.gtag('config', 'G-S51RFB39HK', {
        page_path: location
      });
      // Enviar evento adicional de page_view
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location
      });
    } else {
      console.warn('⚠️ window.gtag não disponível ainda');
    }
  }, [location]);

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
        <Route path="/servico-pelicula-solar" component={ServicoPeliculaSolar} />
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
        <Route path="/admin/pages" component={AdminPages} />
        <Route path="/admin/produtos" component={AdminProdutos} />
        <Route path="/admin/noticias" component={AdminNoticias} />
        <Route path="/admin/loja" component={AdminLoja} />
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
  useLazyImages();

  // Initialize Google Analytics when app loads
  useEffect(() => {
    console.log('🔍 Inicializando Google Analytics...');
    
    // Add Google Analytics script to the head
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-S51RFB39HK';
    script1.onload = () => {
      console.log('✅ Script GA4 carregado com sucesso');
    };
    script1.onerror = () => {
      console.error('❌ Erro ao carregar script GA4');
    };
    document.head.appendChild(script1);

    // Initialize gtag with debug
    const script2 = document.createElement('script');
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){
        console.log('📊 GA4 Event:', arguments);
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-S51RFB39HK', {
        'debug_mode': true,
        'send_page_view': true
      });
      console.log('🎯 GA4 configurado para G-S51RFB39HK');
    `;
    document.head.appendChild(script2);
    
    // Make gtag globally available
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      console.log('📊 GA4 Global Event:', arguments);
      window.dataLayer.push(arguments);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PerformanceOptimizer />
        <PerformancePreloader />
        <Toaster />
        <Router />
        <WhatsAppFAB />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;