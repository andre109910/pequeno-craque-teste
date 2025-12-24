import { Gift, Zap } from "lucide-react";

const mainFeatures = [
  "E-book completo com treinamentos organizados em módulos (do básico ao avançado, adaptado para crianças de 5 a 12 anos)",
  "Sequências de exercícios explicados passo a passo pra fazer no quintal, garagem ou área pequena",
  "Sugestões de aquecimento e alongamento específicos pra crianças",
  "Modelos de rotina semanal de treinos (pra quem tem pouco tempo e pra quem quer acelerar mais)",
  "Orientações de mentalidade pra você ajudar seu filho a lidar com erros, frustrações e pressão",
];

const bonuses = [
  {
    title: "Como Fazer Seu Filho Gostar da Escola",
    description: "Estratégias simples para transformar a escola em algo mais leve, positivo e motivador.",
  },
  {
    title: "Conexão Familiar e Vínculo Afetivo",
    description: "Fortaleça o vínculo entre pais e filhos com momentos de conexão que constroem confiança.",
  },
  {
    title: "Crianças Calmas: Reduzir Ansiedade e Irritação",
    description: "Ajude seu filho a se acalmar e organizar as emoções para dias mais tranquilos.",
  },
  {
    title: "Disciplina com Amor: Limites Sem Gritar",
    description: "Aplique limites firmes e respeitosos, criando um ambiente calmo e cooperativo.",
  },
  {
    title: "Sono e Rotina da Criança e do Adolescente",
    description: "Organize rotina e sono para melhorar humor, foco e desempenho.",
  },
];

const OfferSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background section-divider">
      <div className="container max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-4">
            O que você recebe dentro do{" "}
            <span className="text-gradient-green">Pequeno Craque em Casa</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Main features */}
          <div className="card-elevated p-6 lg:p-8">
            <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-xl">⚽</span>
              </div>
              Conteúdo Principal
            </h3>

            <ul className="space-y-4">
              {mainFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs">⚽</span>
                  </div>
                  <span className="text-muted-foreground leading-relaxed text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bonuses */}
          <div className="space-y-6">
            <div className="card-elevated p-6 lg:p-8 border-primary/30 relative overflow-hidden">
              {/* Bonus badge */}
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                BÔNUS
              </div>

              <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                Bônus Exclusivos
              </h3>

              <div className="space-y-3">
                {bonuses.map((bonus, index) => (
                  <div key={index} className="border-l-2 border-primary/50 pl-3">
                    <h4 className="font-semibold text-foreground text-sm">🎁 {bonus.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{bonus.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital access note */}
            <div className="bg-card/50 rounded-xl p-5 border border-border/50">
              <p className="text-center text-muted-foreground text-sm">
                <span className="text-primary font-semibold">100% Digital.</span>{" "}
                Você recebe acesso imediato e já pode começar o primeiro treino ainda hoje.
              </p>
            </div>
          </div>
        </div>

        {/* CTA after offer */}
        <div className="text-center">
          <a
            id="btn-offer-cta"
            href="#preco-oferta"
            className="btn-cta inline-flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Quero tudo isso agora
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            Por apenas <span className="text-primary font-bold">R$ 67,90</span> • Acesso imediato
          </p>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
