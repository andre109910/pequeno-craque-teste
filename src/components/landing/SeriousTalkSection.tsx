import { Zap } from "lucide-react";
import apoioPaiFilho from "@/assets/apoio-pai-filho.png";
import apoioPaiFilhoWebp from "@/assets/apoio-pai-filho.webp";

const futureRegrets = [
  "O que ele vai pensar de mim daqui 10 anos?",
  "Vou olhar pra trás e lembrar que podia ter feito diferente?",
];

const SeriousTalkSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container max-w-5xl">
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-10 leading-tight">
            Uma conversa sincera{" "}
            <span className="text-gradient-green">entre pais</span>
          </h2>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center mb-12">
            {/* Coluna da imagem */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden max-w-sm mx-auto glow-green">
                <picture>
                  <source
                    srcSet={apoioPaiFilhoWebp}
                    type="image/webp"
                  />
                  <img
                    src={apoioPaiFilho}
                    alt="Pai apoiando o filho com a mão no ombro"
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
                  <p className="text-sm text-foreground/90 italic bg-card/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-border/50 text-center">
                    "Eu estou aqui por você, filho."
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna do texto */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="text-left space-y-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <p>
                  Você pode fechar essa página agora, torcer pra que as coisas mudem "naturalmente" e continuar vendo seu filho entrar em campo do mesmo jeito.
                </p>

                <p className="text-foreground">
                  Ou você pode decidir fazer algo concreto por ele.
                </p>

                <p>
                  Não é sobre transformar seu filho em jogador profissional.
                  <br />
                  É sobre dar a ele a chance de sentir orgulho de si mesmo, de olhar pra trás e lembrar:
                </p>

                <p className="text-xl text-primary font-medium italic text-center lg:text-left py-4">
                  "Meu pai treinou comigo. Ele acreditou em mim."
                </p>
              </div>
            </div>
          </div>

          {/* Bloco de ruminação sobre arrependimento futuro */}
          <div className="mb-12 max-w-3xl mx-auto">
            <p className="text-center text-muted-foreground mb-6">
              E se você não fizer nada agora, esses pensamentos vão voltar:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {futureRegrets.map((thought, index) => (
                <div
                  key={index}
                  className="px-6 py-4 rounded-xl bg-card/50 border border-destructive/20 text-center"
                >
                  <p className="text-foreground/80 italic">"{thought}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              No fim das contas, vai ficar sempre entre duas escolhas:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 rounded-xl bg-card border border-border/50 text-left">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-4">
                  <span className="text-muted-foreground">✕</span>
                </div>
                <p className="text-muted-foreground">
                  Continuar do jeito que está, esperando que a confiança dele apareça sozinha
                </p>
              </div>

              <div className="p-6 rounded-xl bg-primary/10 border border-primary/30 text-left">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-4">
                  <span className="text-primary-foreground">✓</span>
                </div>
                <p className="text-foreground">
                  Investir menos do que o valor de uma chuteira e ter um caminho claro pra ajudar seu filho a evoluir de verdade
                </p>
              </div>
            </div>

            <p className="text-xl text-foreground font-medium mb-8">
              A escolha está na sua mão.
            </p>

            <a
              id="btn-serious-talk-cta"
              href="#preco-oferta"
              className="btn-cta inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Eu escolho ajudar meu filho agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeriousTalkSection;
