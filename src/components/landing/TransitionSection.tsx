import paiFilhoQuintal from "@/assets/pai-filho-quintal.png";
import paiFilhoQuintalWebp from "@/assets/pai-filho-quintal.webp";

const nightThoughts = [
  "Ele tem talento... mas e se eu estiver errado?",
  "Amanhã tem jogo. Vai ser igual da última vez?",
];

const TransitionSection = () => {
  return (
    <section className="py-20 lg:py-28 section-green-gradient relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/15 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container max-w-5xl relative z-10">
        {/* Bloco de pensamentos noturnos - antes da solução */}
        <div className="mb-16">
          <p className="text-center text-muted-foreground mb-6 text-sm uppercase tracking-wider">
            Pensamentos que não te deixam dormir
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {nightThoughts.map((thought, index) => (
              <div
                key={index}
                className="relative px-6 py-4 rounded-xl bg-card/40 border border-border/50 backdrop-blur-sm"
              >
                <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-muted/80 flex items-center justify-center">
                  <svg className="w-3 h-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <p className="text-foreground/80 italic text-center">"{thought}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Layout principal: Texto + Imagem */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          {/* Coluna do texto */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-8 leading-tight">
              E se o quintal virasse o lugar onde ele{" "}
              <span className="text-gradient-green">descobre o próprio potencial?</span>
            </h2>
            
            <div className="text-lg lg:text-xl text-muted-foreground leading-relaxed space-y-6 mb-10">
              <p>
                Não precisa de campo oficial, não precisa de treinador caro, não precisa de mil horas livres.
              </p>
              <p>
                Com treinos certos, objetivos e adaptados à idade da criança, <strong className="text-foreground">15 a 30 minutos</strong> algumas vezes na semana já começam a mudar a confiança, a coordenação e a forma como ele entra em campo.
              </p>
              <p className="text-foreground">
                O <strong>Pequeno Craque em Casa</strong> foi criado justamente pra isso:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-center lg:justify-start gap-4 text-left">
              {[
                "Te dar o passo a passo",
                "Em linguagem de pai",
                "Transformar momentos comuns em treinos que constroem um futuro diferente"
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-card/60 border border-primary/20 rounded-xl px-5 py-4"
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna da imagem */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden glow-green">
              <picture>
                <source
                  srcSet={paiFilhoQuintalWebp}
                  type="image/webp"
                />
                <img
                  src={paiFilhoQuintal}
                  alt="Pai e filho treinando futebol juntos no quintal"
                  className="w-full h-auto rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="1024"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent rounded-2xl" />
              
              {/* Floating quote */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm text-foreground/90 italic bg-card/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-primary/30">
                  O quintal vira o campo onde tudo muda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransitionSection;
