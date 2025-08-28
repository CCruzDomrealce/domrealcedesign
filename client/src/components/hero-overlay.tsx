import { useEffect } from "react";

interface HeroOverlayProps {
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: "none" | "light" | "medium" | "dark";
  style?: React.CSSProperties;
}

export default function HeroOverlay({
  children,
  className = "",
  overlayOpacity = "medium",
  style = {},
}: HeroOverlayProps) {
  const overlayClasses = {
    none: "",
    light: "after:bg-gradient-to-b after:from-black/20 after:to-black/10",
    medium: "after:bg-gradient-to-b after:from-black/40 after:to-black/20",
    dark: "after:bg-gradient-to-b after:from-black/60 after:to-black/30",
  };

  return (
    <section
      className={`
        relative isolate bg-cover bg-center
        ${overlayOpacity !== "none" ? "after:content-[''] after:absolute after:inset-0 after:z-[-1] " + overlayClasses[overlayOpacity] : ""}
        ${className}
      `}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style, // <- a tua imagem passada em HeroSection vai sobrescrever
      }}
    >
      {children}
    </section>
  );
}
