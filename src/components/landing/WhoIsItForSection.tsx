import { User, Users } from "lucide-react";

const forParents = [
  "Pais que veem o filho inseguro na hora do jogo e querem mudar isso.",
  "Pais que não têm tempo (nem dinheiro) pra colocar a criança em mil escolinhas.",
  "Pais que querem se aproximar do filho através do futebol.",
];

const forKids = [
  "Crianças de 5 a 12 anos que gostam de bola, mesmo que sejam tímidas.",
  "Crianças que já jogam em escolinha, mas ficam 'apagadas' durante o jogo.",
  "Crianças que ainda não estão na escolinha, mas vão entrar em breve e precisam chegar mais preparadas.",
];

const WhoIsItForSection = () => {
  return (
    <section className="py-20 lg:py-28 section-gradient section-divider">
      <div className="container max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-4">
            Pra quem esse treinamento{" "}
            <span className="text-gradient-green">foi feito</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Se você se identifica com pelo menos um desses pontos, ele é pra você:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* For Parents */}
          <div className="card-elevated p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground">Para Pais</h3>
            </div>

            <ul className="space-y-4">
              {forParents.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Kids */}
          <div className="card-elevated p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground">Para Crianças</h3>
            </div>

            <ul className="space-y-4">
              {forKids.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center p-6 rounded-2xl bg-card/50 border border-primary/20">
          <p className="text-lg lg:text-xl text-foreground leading-relaxed">
            Se o seu filho gosta de futebol e você não quer ver esse amor virar frustração,{" "}
            <strong className="text-primary">esse programa foi feito pensando em vocês dois.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoIsItForSection;
