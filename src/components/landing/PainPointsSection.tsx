import paiArquibancada from "@/assets/pai-arquibancada.png";
import paiArquibancadaWebp from "@/assets/pai-arquibancada.webp";

const painPoints = [
  "Eu vejo meu filho jogar e sinto que ele tem jeito… mas falta alguém pra mostrar o caminho.",
  "Eu não quero que ele seja o menino que ninguém passa a bola.",
  "Me dói ver ele empolgado pra jogar e voltar cabisbaixo porque quase não encostou na bola.",
  "Eu queria poder ajudar, mas não sei montar treino, não sei por onde começar.",
  "Eu tenho medo de, lá na frente, ele olhar pra trás e sentir que poderia ter ido muito além se tivesse sido melhor estimulado.",
];

const ruminatingThoughts = [
  "E se ele desistir do futebol por minha culpa?",
  "Será que eu devia ter começado antes?",
  "Todo mundo parece saber o que fazer, menos eu.",
];

const PainPointsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight">
            Você não quer que seu filho cresça achando que ele era{" "}
            <span className="text-gradient-green">"o pior do time"</span>, né?
          </h2>
          <p className="text-xl text-muted-foreground">
            Talvez você já tenha se pego pensando coisas assim, sem nunca falar pra ninguém:
          </p>
        </div>

        {/* Layout 2 colunas: Dores + Imagem */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Coluna das dores */}
          <div className="lg:col-span-3 space-y-4">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-primary text-lg">"</span>
                </div>
                <p className="text-lg text-foreground/90 italic leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Coluna da imagem */}
          <div className="lg:col-span-2 flex items-center">
            <div className="relative w-full rounded-2xl overflow-hidden glow-green">
              <picture>
                <source
                  srcSet={paiArquibancadaWebp}
                  type="image/webp"
                />
                <img
                  src={paiArquibancada}
                  alt="Pai pensativo na arquibancada observando o filho jogar"
                  className="w-full h-auto rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="1024"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent rounded-2xl" />
              
              {/* Quote overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm text-foreground/90 italic bg-card/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-border/50">
                  "Será que ele sabe o quanto eu quero ajudar?"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco de ruminação mental */}
        <div className="mb-12">
          <p className="text-center text-muted-foreground mb-6">
            E quando a cabeça não para, você ainda se pega pensando...
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {ruminatingThoughts.map((thought, index) => (
              <div
                key={index}
                className="px-5 py-3 rounded-full bg-destructive/10 border border-destructive/20 text-foreground/80 text-sm italic"
              >
                "{thought}"
              </div>
            ))}
          </div>
        </div>

        <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-card to-background border border-border">
          <p className="text-xl lg:text-2xl text-foreground leading-relaxed">
            Você não quer que seu filho se sinta menos capaz do que ele realmente é.
            <br /><br />
            <span className="text-muted-foreground">
              E, no fundo, também não quer carregar aquela culpa silenciosa de{" "}
              <strong className="text-primary">"eu podia ter feito mais por ele"</strong>.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
