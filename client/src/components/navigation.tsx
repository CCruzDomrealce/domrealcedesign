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
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-brand-yellow transition-colors duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <button 
              onClick={() => handleNavClick("#sobre")} 
              className="text-white hover:text-brand-turquoise transition-colors duration-300 font-medium"
            >
              Sobre
            </button>
            <button 
              onClick={() => handleNavClick("#servicos")} 
              className="text-white hover:text-brand-coral transition-colors duration-300 font-medium"
            >
              Serviços
            </button>
            <button 
              onClick={() => handleNavClick("#portfolio")} 
              className="text-white hover:text-brand-yellow transition-colors duration-300 font-medium"
            >
              Portfólio
            </button>
            <button 
              onClick={() => handleNavClick("#loja")} 
              className="text-white hover:text-brand-turquoise transition-colors duration-300 font-medium"
            >
              Loja
            </button>
            <Link 
              href="/contactos" 
              className="text-white hover:text-brand-coral transition-colors duration-300 font-medium"
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
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-white hover:text-brand-yellow transition-colors duration-300 font-medium py-2 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <button 
                onClick={() => handleNavClick("#sobre")} 
                className="text-white hover:text-brand-turquoise transition-colors duration-300 font-medium py-2 text-left"
              >
                Sobre
              </button>
              <button 
                onClick={() => handleNavClick("#servicos")} 
                className="text-white hover:text-brand-coral transition-colors duration-300 font-medium py-2 text-left"
              >
                Serviços
              </button>
              <button 
                onClick={() => handleNavClick("#portfolio")} 
                className="text-white hover:text-brand-yellow transition-colors duration-300 font-medium py-2 text-left"
              >
                Portfólio
              </button>
              <button 
                onClick={() => handleNavClick("#loja")} 
                className="text-white hover:text-brand-turquoise transition-colors duration-300 font-medium py-2 text-left"
              >
                Loja
              </button>
              <Link 
                href="/contactos" 
                className="text-white hover:text-brand-coral transition-colors duration-300 font-medium py-2 text-left"
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
