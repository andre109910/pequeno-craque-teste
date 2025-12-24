import authorAndre from "@/assets/author-andre.png";
import authorAndreWebp from "@/assets/author-andre.webp";

const AuthoritySection = () => {
  return (
    <section className="py-20 lg:py-28 section-gradient section-divider">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">
            Quem criou o{" "}
            <span className="text-gradient-green">Pequeno Craque em Casa</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden max-w-sm mx-auto">
              <picture>
                <source
                  srcSet={authorAndreWebp}
                  type="image/webp"
                />
                <img
                  src={authorAndre}
                  alt="André Alves, criador do Pequeno Craque em Casa"
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="800"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-xl text-foreground">André Alves</p>
                <p className="text-sm text-muted-foreground">Pai e criador do método</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-3 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Meu nome é <strong className="text-foreground">André Alves</strong>, sou pai e apaixonado por futebol.
            </p>

            <p>
              Depois de ver de perto como muitas crianças perdiam a vontade de jogar por falta de estímulo certo, comecei a montar treinos simples para fazer em casa com meu próprio filho.
            </p>

            <p>
              Percebi que o problema não era falta de talento – era <strong className="text-foreground">falta de orientação prática para os pais</strong>.
            </p>

            <p>
              Peguei tudo o que funcionou com ele e com outras crianças, organizei em módulos claros e transformei num método que qualquer pai consegue aplicar, mesmo sem experiência com treino.
            </p>

            <p className="text-foreground">
              O <strong>Pequeno Craque em Casa</strong> nasceu dessa vontade: dar aos pais uma ferramenta simples, objetiva e eficiente pra ajudar seus filhos a crescerem dentro e fora de campo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
