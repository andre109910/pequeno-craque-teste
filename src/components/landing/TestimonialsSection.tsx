import { Quote, Star, Zap } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.png";
import testimonial2 from "@/assets/testimonial-2.png";
import testimonial3 from "@/assets/testimonial-3.png";
import testimonial1Webp from "@/assets/testimonial-1.webp";
import testimonial2Webp from "@/assets/testimonial-2.webp";
import testimonial3Webp from "@/assets/testimonial-3.webp";

const testimonials = [
  {
    name: "Marcelo",
    child: "pai do Lucas (8 anos)",
    text: "Eu via o Lucas sempre se escondendo na hora do jogo. Depois de algumas semanas treinando comigo aqui em casa, ele começou a pedir pra ser o primeiro a entrar na pelada. Hoje ele me chama pra treinar, não sou eu que insisto.",
    image: testimonial1,
    imageWebp: testimonial1Webp,
    highlight: "ele me chama pra treinar",
  },
  {
    name: "Rafael",
    child: "pai do Theo (6 anos)",
    text: "Eu não sabia nada de treino. Só seguia as fichas e os vídeos. Em pouco tempo, a coordenação dele melhorou tanto que o professor da escolinha perguntou o que a gente estava fazendo em casa.",
    image: testimonial2,
    imageWebp: testimonial2Webp,
    highlight: "o professor perguntou o que a gente estava fazendo",
  },
  {
    name: "Rodrigo",
    child: "pai do Miguel (10 anos)",
    text: "A maior mudança não foi só no futebol. Foi na confiança. Ele parou de abaixar a cabeça quando errava e começou a tentar de novo. Eu vi meu filho acreditando nele mesmo.",
    image: testimonial3,
    imageWebp: testimonial3Webp,
    highlight: "meu filho acreditando nele mesmo",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-card via-background to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container">
        <div className="text-center mb-14">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-4">
            O que outros pais começaram a sentir{" "}
            <span className="text-gradient-green">depois de algumas semanas</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Histórias reais de pais que decidiram fazer diferente
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group"
            >
              <div className="card-elevated overflow-hidden h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <picture>
                    <source
                      srcSet={testimonial.imageWebp}
                      type="image/webp"
                    />
                    <img
                      src={testimonial.image}
                      alt={`Depoimento de ${testimonial.name}, ${testimonial.child}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="600"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Quote icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                    <Quote className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Highlight */}
                  <div className="mb-4 -mt-8 relative z-10">
                    <span className="inline-block px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      "{testimonial.highlight}"
                    </span>
                  </div>

                  {/* Text */}
                  <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.child}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA after testimonials */}
        <div className="text-center mt-14">
          <p className="text-muted-foreground mb-6">
            Quer que seu filho tenha a mesma transformação?
          </p>
          <a
            id="btn-testimonials-cta"
            href="#preco-oferta"
            className="btn-cta-secondary inline-flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Quero essa transformação
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
