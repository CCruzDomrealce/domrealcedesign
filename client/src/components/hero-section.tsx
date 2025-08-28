import HeroOverlay from './hero-overlay';

export default function HeroSection() {
  return (
    <HeroOverlay
      className="min-h-screen flex items-center justify-center relative pt-20 bg-no-repeat"
      style={{
        backgroundImage: "url('/inicio/Imagem-1.jpg')",
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">Hero Content</h1>
        <p className="text-xl">Your image background without overlay</p>
      </div>
    </HeroOverlay>
  );
}
