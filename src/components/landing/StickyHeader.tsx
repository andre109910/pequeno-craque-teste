import { Zap } from "lucide-react";

const StickyHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg h-14">
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-lg">⚽</span>
          </div>
          <span className="font-display text-lg text-foreground">Pequeno Craque</span>
        </div>

        <a
          id="btn-header-cta"
          href="#preco-oferta"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm shadow-lg"
        >
          <Zap className="w-4 h-4" />
          Quero Começar
        </a>
      </div>
    </header>
  );
};

export default StickyHeader;

