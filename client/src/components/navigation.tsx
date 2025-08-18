import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import domrealceLogo from "@/assets/domrealce-logo.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 border-b border-brand-yellow ${
      isScrolled ? "bg-black" : "bg-black/90 backdrop-blur-md"
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src={domrealceLogo} 
              alt="DOMREALCE Logo" 
              className="h-14 w-auto"
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-3">
            <Link 
              href="/" 
              className={`transition-all duration-300 font-medium px-3 py-2 rounded-md ${
                location === "/" 
                  ? "bg-brand-yellow text-brand-dark" 
                  : "text-white hover:text-brand-yellow"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              href="/sobre" 
              className={`transition-all duration-300 font-medium px-3 py-2 rounded-md ${
                location === "/sobre" 
                  ? "bg-brand-yellow text-brand-dark" 
                  : "text-white hover:text-brand-turquoise"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              href="/servicos" 
              className={`transition-all duration-300 font-medium px-3 py-2 rounded-md ${
                location === "/servicos" || location.startsWith("/servico-")
                  ? "bg-brand-yellow text-brand-dark" 
                  : "text-white hover:text-brand-coral"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link 
              href="/portfolio" 
              className={`transition-all duration-300 font-medium px-3 py-2 rounded-md ${
                location === "/portfolio" 
                  ? "bg-brand-yellow text-brand-dark" 
                  : "text-white hover:text-brand-yellow"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Portfólio
            </Link>
            <Link 
              href="/loja" 
              className={`transition-all duration-300 font-medium px-3 py-2 rounded-md ${
                location === "/loja" 
                  ? "bg-brand-yellow text-brand-dark" 
                  : "text-white hover:text-brand-turquoise"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Loja
            </Link>
            <Link 
              href="/noticias" 
              className={`transition-all duration-300 font-medium px-3 py-2 rounded-md ${
                location === "/noticias" 
                  ? "bg-brand-yellow text-brand-dark" 
                  : "text-white hover:text-brand-green"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Notícias
            </Link>
            <Link 
              href="/contactos" 
              className={`transition-all duration-300 font-medium px-3 py-2 rounded-md ${
                location === "/contactos" 
                  ? "bg-brand-yellow text-brand-dark" 
                  : "text-white hover:text-brand-coral"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contactos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-brand-coral/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className={`transition-all duration-300 font-medium py-3 px-4 rounded-md text-left ${
                  location === "/" 
                    ? "bg-brand-yellow text-brand-dark" 
                    : "text-white hover:text-brand-yellow"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                href="/sobre" 
                className={`transition-all duration-300 font-medium py-3 px-4 rounded-md text-left ${
                  location === "/sobre" 
                    ? "bg-brand-yellow text-brand-dark" 
                    : "text-white hover:text-brand-turquoise"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                href="/servicos" 
                className={`transition-all duration-300 font-medium py-3 px-4 rounded-md text-left ${
                  location === "/servicos" || location.startsWith("/servico-")
                    ? "bg-brand-yellow text-brand-dark" 
                    : "text-white hover:text-brand-coral"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link 
                href="/portfolio" 
                className={`transition-all duration-300 font-medium py-3 px-4 rounded-md text-left ${
                  location === "/portfolio" 
                    ? "bg-brand-yellow text-brand-dark" 
                    : "text-white hover:text-brand-yellow"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Portfólio
              </Link>
              <Link 
                href="/loja" 
                className={`transition-all duration-300 font-medium py-3 px-4 rounded-md text-left ${
                  location === "/loja" 
                    ? "bg-brand-yellow text-brand-dark" 
                    : "text-white hover:text-brand-turquoise"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Loja
              </Link>
              <Link 
                href="/noticias" 
                className={`transition-all duration-300 font-medium py-3 px-4 rounded-md text-left ${
                  location === "/noticias" 
                    ? "bg-brand-yellow text-brand-dark" 
                    : "text-white hover:text-brand-green"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Notícias
              </Link>
              <Link 
                href="/contactos" 
                className={`transition-all duration-300 font-medium py-3 px-4 rounded-md text-left ${
                  location === "/contactos" 
                    ? "bg-brand-yellow text-brand-dark" 
                    : "text-white hover:text-brand-coral"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contactos
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
