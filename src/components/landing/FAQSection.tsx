import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Preciso saber de futebol pra aplicar o método?",
    answer: "Não. O material foi pensado pra pais comuns, não treinadores. Os treinos são explicados de forma simples, com exemplos claros.",
  },
  {
    question: "Quanto tempo por semana eu preciso pra ver resultado?",
    answer: "Com 2 a 3 dias na semana, 15 a 30 minutos por dia, você já começa a perceber mudanças na coordenação, na confiança e na forma como ele entra em campo.",
  },
  {
    question: "Serve pra qualquer idade?",
    answer: "O foco é em crianças de aproximadamente 5 a 12 anos. Algumas atividades podem ser adaptadas para um pouco mais novo ou mais velho.",
  },
  {
    question: "Preciso de muito espaço?",
    answer: "Não. Os treinos foram pensados pra quintal pequeno, garagem ou área. Muitos exercícios ocupam pouco espaço.",
  },
  {
    question: "É só digital? Vou receber algo físico?",
    answer: "O acesso é 100% digital. Você recebe tudo por e-mail e pode usar no celular, tablet ou computador.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background section-divider">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-4">
            Perguntas frequentes{" "}
            <span className="text-gradient-green">dos pais</span>
          </h2>
        </div>

        <div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-elevated px-6 border-border/50 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
