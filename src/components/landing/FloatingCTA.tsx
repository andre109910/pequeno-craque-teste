import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingCTA = () => {
  const [isOfferVisible, setIsOfferVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // Detectar quando a seção de oferta está visível
  useEffect(() => {
    const offerSection = document.getElementById("oferta");
    if (!offerSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Se a seção estiver visível (mesmo que parcialmente), esconder o botão
          setIsOfferVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Dispara quando 10% da seção estiver visível
        rootMargin: "-100px 0px" // Margem para considerar antes de chegar na seção
      }
    );

    observer.observe(offerSection);

    return () => observer.disconnect();
  }, []);

  // Controlar quando mostrar baseado no scroll
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const latest = window.scrollY;
        setShouldShow((prev) => {
          const next = latest > 500 && !isOfferVisible;
          return prev === next ? prev : next;
        });
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOfferVisible]);

  return (
    <>
      {shouldShow && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background/95 to-transparent lg:hidden">
          <a
            id="btn-floating-cta"
            href="#preco-oferta"
            className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-2xl"
            style={{ boxShadow: "0 -4px 30px hsl(142 72% 37% / 0.4)" }}
          >
            <Zap className="w-5 h-5" />
            Quero Começar Agora - R$ 67,90
          </a>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Acesso imediato • Garantia de 7 dias
          </p>
        </div>
      )}
    </>
  );
};

export default FloatingCTA;
