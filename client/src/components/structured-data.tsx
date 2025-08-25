import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface ProductStructuredData {
  name: string;
  description: string;
  price?: number;
  currency?: string;
  image?: string;
  category?: string;
  brand?: string;
}

interface ServiceStructuredData {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  serviceType: string;
}

export default function StructuredData() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[data-structured-data="page"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add page-specific structured data
    const structuredData = getStructuredDataForPage(location);
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured-data', 'page');
      script.textContent = JSON.stringify(structuredData, null, 2);
      document.head.appendChild(script);
    }
  }, [location]);
  
  return null;
}

function getStructuredDataForPage(path: string): any {
  const baseUrl = 'https://www.domrealce.com';
  
  switch (path) {
    case '/':
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "DOMREALCE",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+351930682725",
          "contactType": "Customer Service",
          "areaServed": "PT",
          "availableLanguage": "Portuguese"
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "PT",
          "addressLocality": "Lisboa",
          "addressRegion": "Lisboa"
        },
        "sameAs": [
          "https://www.facebook.com/domrealce",
          "https://www.instagram.com/domrealce"
        ],
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/loja?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      };
      
    case '/servico-design-grafico':
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Design Gráfico",
        "name": "Serviços de Design Gráfico Profissional",
        "description": "Criação de logótipos, material publicitário, branding e identidade visual profissional",
        "provider": {
          "@type": "Organization",
          "name": "DOMREALCE",
          "url": baseUrl
        },
        "areaServed": {
          "@type": "Place",
          "name": "Lisboa, Portugal"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Serviços de Design Gráfico",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Criação de Logótipos"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Material Publicitário"
              }
            }
          ]
        }
      };
      
    case '/servico-papel-parede':
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Papel de Parede Personalizado",
        "name": "Papel de Parede Personalizado",
        "description": "Papel de parede personalizado com as suas imagens, texturas exclusivas e aplicação profissional",
        "provider": {
          "@type": "Organization",
          "name": "DOMREALCE",
          "url": baseUrl
        },
        "areaServed": {
          "@type": "Place",
          "name": "Lisboa, Portugal"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": 25.00,
            "priceCurrency": "EUR",
            "unitText": "m²"
          }
        }
      };
      
    case '/loja/papel-parede':
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Papel de Parede Personalizado",
        "description": "Papel de parede personalizado com centenas de texturas disponíveis. Medidas e designs personalizados.",
        "brand": {
          "@type": "Brand",
          "name": "DOMREALCE"
        },
        "category": "Decoração Interior",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "EUR",
          "lowPrice": 25.00,
          "highPrice": 45.00,
          "offerCount": 50,
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "DOMREALCE"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "127",
          "bestRating": "5"
        }
      };
      
    case '/contactos':
      return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "mainEntity": {
          "@type": "Organization",
          "name": "DOMREALCE",
          "telephone": "+351930682725",
          "email": "info@domrealce.com",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "PT",
            "addressLocality": "Lisboa"
          },
          "openingHours": [
            "Mo-Fr 09:00-18:00"
          ],
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+351930682725",
              "contactType": "Customer Service"
            },
            {
              "@type": "ContactPoint",
              "email": "info@domrealce.com",
              "contactType": "Customer Service"
            }
          ]
        }
      };
      
    case '/noticias':
      return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Notícias DOMREALCE",
        "description": "Últimas notícias, projetos e inovações da DOMREALCE",
        "url": `${baseUrl}/noticias`,
        "publisher": {
          "@type": "Organization",
          "name": "DOMREALCE",
          "url": baseUrl
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/noticias`
        }
      };
      
    default:
      return null;
  }
}