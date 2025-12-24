import { Zap } from "lucide-react";

const PriceAnchoringSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container max-w-4xl">
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-8 leading-tight">
            Quanto vale ver seu filho entrar em campo{" "}
            <span className="text-gradient-green">com confiança?</span>
          </h2>

          <div className="text-left max-w-2xl mx-auto mb-10">
            <p className="text-lg text-muted-foreground mb-6">Vamos falar de números.</p>

            <div className="space-y-4 mb-8">
              {[
                { label: "Mensalidade de escolinha de futebol:", value: "R$ 120 a R$ 200 por mês" },
                { label: "Personal ou clínica de futebol:", value: "R$ 80 a R$ 150 por sessão" },
                { label: "Gasolina, tempo de deslocamento, inscrição em campeonatos…", value: "" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50"
                >
                  <div className="w-2 h-2 rounded-full bg-destructive/60 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {item.label} {item.value && <strong className="text-foreground">{item.value}</strong>}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-lg text-muted-foreground mb-6">
              E mesmo assim, muitas vezes o treino é em grupo grande e seu filho mal pega na bola.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-primary/10 to-card border border-primary/30 mb-10">
            <p className="text-xl lg:text-2xl text-foreground leading-relaxed">
              O <strong>Pequeno Craque em Casa</strong> custa menos do que{" "}
              <span className="text-primary font-bold">uma única chuteira boa</span>,
              <br />
              e te acompanha por anos, com treinos que você pode repetir, adaptar e refazer quantas vezes quiser.
            </p>
          </div>

          {/* CTA */}
          <div>
            <a
              id="btn-price-anchoring-cta"
              href="#preco-oferta"
              className="btn-cta inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Investir no meu filho agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceAnchoringSection;
