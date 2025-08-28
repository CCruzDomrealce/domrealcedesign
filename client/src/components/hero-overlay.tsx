interface HeroOverlayProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function HeroOverlay({
  children,
  className = "",
  style = {},
}: HeroOverlayProps) {
  return (
    <section
      className={`relative bg-cover bg-center ${className}`}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
