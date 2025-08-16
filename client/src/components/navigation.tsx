import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          <div className="flex items-center space-x-3">
            <img 
              src="@assets/icon DOMREALCE_1755337082794.png" 
              alt="DOMREALCE Logo" 
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-heading font-bold text-brand-yellow">DOMREALCE</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavClick("#servicos")} 
              className="text-white hover:text-brand-yellow transition-colors duration-300 font-medium"
            >
              Serviços
            </button>
            <button 
              onClick={() => handleNavClick("#portfolio")} 
              className="text-white hover:text-brand-turquoise transition-colors duration-300 font-medium"
            >
              Portfólio
            </button>
            <button 
              onClick={() => handleNavClick("#noticias")} 
              className="text-white hover:text-brand-blue transition-colors duration-300 font-medium"
            >
              Notícias
            </button>
            <button 
              onClick={() => handleNavClick("#contactos")} 
              className="text-white hover:text-brand-coral transition-colors duration-300 font-medium"
            >
              Contactos
            </button>
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
              <button 
                onClick={() => handleNavClick("#servicos")} 
                className="text-white hover:text-brand-yellow transition-colors duration-300 font-medium py-2 text-left"
              >
                Serviços
              </button>
              <button 
                onClick={() => handleNavClick("#portfolio")} 
                className="text-white hover:text-brand-turquoise transition-colors duration-300 font-medium py-2 text-left"
              >
                Portfólio
              </button>
              <button 
                onClick={() => handleNavClick("#noticias")} 
                className="text-white hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left"
              >
                Notícias
              </button>
              <button 
                onClick={() => handleNavClick("#contactos")} 
                className="text-white hover:text-brand-coral transition-colors duration-300 font-medium py-2 text-left"
              >
                Contactos
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
