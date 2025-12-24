import { Zap, Shield, Clock } from "lucide-react";
import treinoQuintal from "@/assets/treino-quintal.png";
import treinoQuintalWebp from "@/assets/treino-quintal.webp";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen grass-texture">
      {/* Subtle green glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container relative z-10 pt-24 pb-16 lg:pt-28 lg:pb-24">
        {/* Top badge */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
            Programa prático para pais de crianças de 5 a 12 anos
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
              Em 7 dias, seu filho será o{" "}
              <span className="text-gradient-green">melhor jogador</span> da turminha dele
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Treinos de 20 minutos no quintal. Sem equipamento caro. Sem escolinha cara. Qualquer pai consegue aplicar hoje mesmo e ver resultados já na primeira semana.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                id="btn-hero-cta"
                href="#preco-oferta"
                className="btn-cta inline-flex items-center gap-2 text-lg animate-pulse-glow"
              >
                <Zap className="w-5 h-5" />
                Quero começar agora
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 mt-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>Acesso imediato</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary" />
                <span>Garantia de 7 dias</span>
              </div>
            </div>

          </div>

          {/* Right image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glow-green">
              <picture>
                <source
                  srcSet={treinoQuintalWebp}
                  type="image/webp"
                />
                <img
                  src={treinoQuintal}
                  alt="Pai observando filho treinar futebol no quintal com cones e bola"
                  className="w-full h-auto rounded-2xl"
                  decoding="async"
                  fetchpriority="high"
                  loading="eager"
                  width="1024"
                  height="1024"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 600px"
                />
              </picture>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 sm:bottom-8 sm:left-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">+500 pais</p>
                  <p className="text-xs text-muted-foreground">já treinam em casa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
