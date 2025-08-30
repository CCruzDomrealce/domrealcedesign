import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const nav = document.querySelector('nav');
      if (isMenuOpen && nav && !nav.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed w-full top-0 z-50 bg-black bg-opacity-70 backdrop-blur-md border-b border-yellow-500/30">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
            Domrealce
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/servicos" 
              className={`font-medium transition-colors ${
                location === "/servicos" || location.startsWith("/servico-")
                  ? "text-yellow-500" 
                  : "text-white hover:text-yellow-500"
              }`}
            >
              Serviços
            </Link>
            <Link 
              href="/portfolio" 
              className={`font-medium transition-colors ${
                location === "/portfolio" 
                  ? "text-yellow-500" 
                  : "text-white hover:text-yellow-500"
              }`}
            >
              Portfólio
            </Link>
            <Link 
              href="/contactos" 
              className={`font-medium transition-colors ${
                location === "/contactos" 
                  ? "text-yellow-500" 
                  : "text-white hover:text-yellow-500"
              }`}
            >
              Contactos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-yellow-500 transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-black bg-opacity-90 rounded-lg backdrop-blur-sm">
            <div className="flex flex-col space-y-1 px-4 py-2">
              <Link 
                href="/servicos" 
                className={`py-3 px-4 rounded-md font-medium transition-colors ${
                  location === "/servicos" || location.startsWith("/servico-")
                    ? "text-yellow-500 bg-yellow-500/10" 
                    : "text-white hover:text-yellow-500 hover:bg-yellow-500/5"
                }`}
              >
                Serviços
              </Link>
              <Link 
                href="/portfolio" 
                className={`py-3 px-4 rounded-md font-medium transition-colors ${
                  location === "/portfolio" 
                    ? "text-yellow-500 bg-yellow-500/10" 
                    : "text-white hover:text-yellow-500 hover:bg-yellow-500/5"
                }`}
              >
                Portfólio
              </Link>
              <Link 
                href="/contactos" 
                className={`py-3 px-4 rounded-md font-medium transition-colors ${
                  location === "/contactos" 
                    ? "text-yellow-500 bg-yellow-500/10" 
                    : "text-white hover:text-yellow-500 hover:bg-yellow-500/5"
                }`}
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