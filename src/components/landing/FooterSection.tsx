const FooterSection = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container max-w-5xl">
        <div className="text-center">
          {/* Logo / Name */}
          <h3 className="font-display text-2xl text-foreground mb-2">
            Pequeno Craque em Casa
          </h3>
          <p className="text-muted-foreground mb-8">
            Desenvolvendo talentos e valores esportivos no conforto do lar.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Termos de uso
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Política de privacidade
            </a>
            <a href="mailto:contato@pequenocraqueemcasa.com.br" className="text-muted-foreground hover:text-primary transition-colors">
              Suporte
            </a>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Este produto não garante resultados específicos. A evolução depende da dedicação, do perfil da criança e da aplicação do método.
          </p>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/50 mt-6">
            © {new Date().getFullYear()} Pequeno Craque em Casa. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
