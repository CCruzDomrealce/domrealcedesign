// DOMREALCE: Skip link for accessibility

export default function SkipLink() {
  return (
    <a 
      href="#conteudo" 
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded"
    >
      Saltar para o conteúdo
    </a>
  );
}