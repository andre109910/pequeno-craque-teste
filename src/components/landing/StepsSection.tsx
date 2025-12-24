import { Target, Zap, Heart, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Entender o nível atual dele",
    description: "Você começa entendendo como está hoje: coordenação, confiança, controle de bola. Nada técnico demais – só o suficiente pra saber por onde começar sem pular etapas.",
  },
  {
    icon: Zap,
    title: "Aplicar treinos simples, porém certeiros",
    description: "Você recebe exercícios organizados em módulos: controle de bola, coordenação, dribles, finalização, jogos de reação, tudo explicado de forma clara, com exemplos e fotos.",
  },
  {
    icon: Heart,
    title: "Transformar treino em momento de conexão",
    description: "Os treinos são pensados pra caber na rotina. São curtos e feitos pra que o pai participe, corrija e elogie. Não é só futebol – é tempo de qualidade, sem tela, olho no olho.",
  },
  {
    icon: TrendingUp,
    title: "Evoluir junto com ele",
    description: "Conforme ele melhora, você sobe o nível dos treinos. O método foi estruturado pra acompanhar o crescimento, sem deixar o treino chato ou repetitivo.",
  },
];

const StepsSection = () => {
  return (
    <section id="como-funciona" className="py-20 lg:py-28 section-gradient section-divider">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-4">
            Como você vai treinar seu filho em casa{" "}
            <span className="text-gradient-green">sem complicação</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative lg:flex lg:items-center lg:gap-12 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Step number indicator */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground items-center justify-center font-display text-xl font-bold z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div className={`lg:w-[calc(50%-3rem)] ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"}`}>
                  <div className="card-elevated p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      {/* Mobile step number */}
                      <div className="lg:hidden flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-lg font-bold">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="hidden lg:flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                            <step.icon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-display text-xl lg:text-2xl text-foreground">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
