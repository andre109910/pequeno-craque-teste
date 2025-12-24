import { Shield, Zap, Check, Clock, Gift, CreditCard, Lock } from "lucide-react";
import { useCallback, useRef } from "react";

const CHECKOUT_URL = "https://pay.cakto.com.br/vavodjb_676370";

const highlights = [
  "Método completo com treinos organizados",
  "6 bônus exclusivos inclusos",
  "Acesso vitalício ao material",
  "Suporte para dúvidas",
];

const PricingSection = () => {
  const hasTracked = useRef(false);

  const trackBeginCheckout = useCallback(() => {
    // Evitar disparo duplicado
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Reset após 2 segundos para permitir novo clique
    setTimeout(() => {
      hasTracked.current = false;
    }, 2000);

    // Disparar evento begin_checkout no dataLayer (GTM)
    if (typeof window !== 'undefined') {
      if (!window.dataLayer) {
        (window as any).dataLayer = [];
      }
      window.dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'BRL',
          value: 67.90,
          items: [{
            item_id: 'pequeno-craque-em-casa',
            item_name: 'Pequeno Craque em Casa',
            price: 67.90,
            quantity: 1
          }]
        }
      });
      console.log('[GTM] begin_checkout disparado');
    }
  }, []);

  const handleCheckout = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      trackBeginCheckout();
      // pequena espera para garantir que o GTM receba o evento antes do redirect
      setTimeout(() => {
        window.location.href = CHECKOUT_URL;
      }, 120);
    },
    [trackBeginCheckout]
  );

  return (
    <section
      id="oferta"
      className="py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container max-w-4xl relative z-10">
        <div className="text-center">
          <span className="inline-block px-4 py-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
            Oferta Especial
          </span>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-4">
            Pronto pra ver seu filho jogar{" "}
            <span className="text-gradient-green">com mais confiança?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Se você leu até aqui, é porque se importa de verdade com o futuro dele.
            Agora é só apertar um botão e ter acesso ao passo a passo pra transformar o quintal em campo de treino.
          </p>
        </div>

        <div className="relative mt-8">
          {/* Top badge - positioned outside the card */}
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground text-sm font-bold px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2">
              <Gift className="w-4 h-4" />
              MELHOR INVESTIMENTO
            </div>
          </div>

          {/* Main pricing card */}
          <div className="card-elevated p-8 lg:p-12 text-center relative border-primary/30">
            {/* Glow effects */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-primary/20 blur-[100px] rounded-full pointer-events-none z-0" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-primary/10 blur-[80px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10" style={{ isolation: 'isolate' }}>
              {/* Old price */}
              <p className="text-lg text-muted-foreground mb-3">
                De <span className="line-through text-destructive/70">R$ 197,00</span>
              </p>

              {/* New price */}
              <div id="preco-oferta" className="mb-3 scroll-mt-24">
                <span className="text-2xl text-muted-foreground align-top">R$</span>
                <span className="font-display text-7xl lg:text-8xl text-primary leading-none">67</span>
                <span className="text-3xl text-primary align-top">,90</span>
              </div>

              {/* Savings badge */}
              <div className="inline-block bg-primary/20 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                Economize R$ 129,10
              </div>

              <p className="text-muted-foreground mb-8">
                ou em até <strong className="text-foreground">12x de R$ 5,66</strong> no cartão
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-lg mx-auto">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-left bg-card/50 rounded-lg px-3 py-2 border border-border/30">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="relative mb-6" style={{ zIndex: 1000, isolation: 'isolate' }}>
                <a
                  id="btn-checkout-principal"
                  href={CHECKOUT_URL}
                  onClick={handleCheckout}
                  onTouchStart={handleCheckout}
                  onMouseDown={handleCheckout}
                  className="btn-cta go-to-checkout inline-flex items-center gap-2 text-lg lg:text-xl animate-pulse-glow w-full sm:w-auto justify-center px-10 py-5 cursor-pointer touch-manipulation"
                  style={{ 
                    position: 'relative',
                    zIndex: 1001,
                    isolation: 'isolate'
                  }}
                >
                  <Zap className="w-6 h-6" />
                  Quero começar hoje mesmo
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Acesso imediato</span>
                </div>
                <span className="hidden sm:inline text-border">•</span>
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span>Pix, Cartão ou Boleto</span>
                </div>
                <span className="hidden sm:inline text-border">•</span>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>Compra 100% segura</span>
                </div>
              </div>

              {/* Guarantee - More prominent */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border-2 border-primary/30">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-display text-xl lg:text-2xl text-foreground mb-2">
                      Garantia Incondicional de 7 Dias
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Se você não gostar do material por qualquer motivo, basta enviar um e-mail e devolvemos <strong className="text-foreground">100% do seu dinheiro</strong>. Sem perguntas, sem burocracia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust text */}
        <p
          className="text-center text-xs text-muted-foreground/70 mt-6 max-w-md mx-auto"
        >
          Seus dados estão protegidos e a compra é processada em ambiente seguro com criptografia SSL.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
