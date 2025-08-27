// DOMREALCE: Social proof section below hero

export default function SocialProof() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Years of experience */}
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-yellow mb-2">
              40+
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
              Anos de Experiência
            </div>
          </div>
          
          {/* Separator */}
          <div className="hidden md:block w-px h-16 bg-gray-300 dark:bg-gray-600"></div>
          
          {/* Projects completed */}
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-turquoise mb-2">
              1000+
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
              Projetos Realizados
            </div>
          </div>
          
          {/* Separator */}
          <div className="hidden md:block w-px h-16 bg-gray-300 dark:bg-gray-600"></div>
          
          {/* Trust badge */}
          <div className="text-center">
            <div className="text-2xl md:text-3xl mb-2">🏆</div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
              Qualidade Garantida
            </div>
          </div>
          
          {/* Separator */}
          <div className="hidden md:block w-px h-16 bg-gray-300 dark:bg-gray-600"></div>
          
          {/* Location */}
          <div className="text-center">
            <div className="text-2xl md:text-3xl mb-2">📍</div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
              Lisboa, Portugal
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}