import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppFAB() {
  const whatsappUrl = "https://wa.me/351930682725?text=Olá!%20Quero%20um%20orçamento%20DOMREALCE";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-50 md:right-6 md:bottom-6"
      aria-label="Fale connosco no WhatsApp"
      data-testid="whatsapp-fab"
    >
      <Button
        size="lg"
        className="
          w-14 h-14 rounded-full
          bg-[#25D366] hover:bg-[#20B955] 
          text-white shadow-lg hover:shadow-xl
          transform transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          animate-whatsapp-pulse hover:animate-none
          ring-2 ring-[#25D366]/20 hover:ring-[#25D366]/40
          backdrop-blur-sm will-change-transform
          focus:outline-none focus:ring-4 focus:ring-[#25D366]/30
        "
      >
        <MessageCircle size={24} />
        <span className="sr-only">WhatsApp</span>
      </Button>
    </a>
  );
}