<section
  className="h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/inicio/Imagem-1.jpg')",
  }}
>
  <div className="container mx-auto px-4 relative z-10 text-center mt-10 md:mt-20">
    <div className="max-w-4xl mx-auto p-8 md:p-12">
      <h1 className="text-4xl md:text-7xl font-heading font-bold mb-6 leading-tight text-shadow">
        <span className="text-brand-yellow">Realce</span> sua marca com<br />
        <span className="text-brand-yellow">criatividade</span><br />
        <span className="text-white">e alta definição</span>
      </h1>

      <p className="text-lg md:text-2xl text-white mb-8 max-w-3xl mx-auto text-shadow">
        {siteConfig.homepage.heroDescricao}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="px-8 py-4 bg-brand-yellow text-black font-heading font-semibold rounded-lg">
          <Link href="/contactos#formulario">
            {siteConfig.homepage.botaoPrincipal}
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="px-8 py-4 border-2 border-brand-turquoise text-brand-turquoise font-heading font-semibold rounded-lg hover:bg-brand-turquoise hover:text-black"
        >
          <Link href="/portfolio">
            {siteConfig.homepage.botaoSecundario}
          </Link>
        </Button>
      </div>
    </div>
  </div>
</section>
<h1 className="text-4xl md:text-7xl font-heading font-bold mb-6 leading-tight text-shadow">
  <span className="text-brand-yellow">Realce</span> sua marca com<br />
  <span className="text-brand-yellow">criatividade</span><br />
  <span className="text-white">e alta definição</span>
</h1>

<p className="text-lg md:text-2xl text-white mb-8 max-w-3xl mx-auto text-shadow">
  {siteConfig.homepage.heroDescricao}
</p>

