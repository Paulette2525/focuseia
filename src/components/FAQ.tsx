import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Combien coûte un projet d'automatisation IA ?",
    answer:
      "Nos projets démarrent à partir de 1 000 € pour des automatisations simples. Pour des SaaS sur mesure ou des systèmes complexes, les budgets varient entre 5 000 € et 50 000 € selon l'envergure. Chaque projet fait l'objet d'un devis personnalisé après notre appel stratégique.",
  },
  {
    question: "Combien de temps faut-il pour livrer un projet ?",
    answer:
      "Une automatisation simple peut être livrée en 1 à 2 semaines. Un SaaS sur mesure prend entre 4 et 12 semaines selon la complexité. Nous travaillons en sprints avec des livrables réguliers pour que vous voyiez les résultats rapidement.",
  },
  {
    question: "C'est quoi un SaaS sur mesure ?",
    answer:
      "Un SaaS sur mesure est une plateforme logicielle conçue spécifiquement pour votre entreprise. Au lieu de payer 10 abonnements différents (CRM, gestion de projet, facturation...), nous centralisons tout sur une seule plateforme adaptée à vos processus exacts.",
  },
  {
    question: "Est-ce que l'IA peut vraiment remplacer des salariés ?",
    answer:
      "L'IA ne remplace pas les personnes, elle remplace les tâches répétitives. Un système d'automatisation bien conçu peut effectuer le travail administratif de 5 à 10 personnes : saisie de données, tri d'emails, relances clients, génération de rapports... Vos équipes se concentrent sur les tâches à forte valeur ajoutée.",
  },
  {
    question: "Comment se passe l'appel stratégique gratuit ?",
    answer:
      "C'est un appel de 30 minutes où nous analysons vos processus actuels, identifions les opportunités d'automatisation et vous proposons un plan d'action concret. Aucun engagement, c'est 100% gratuit et sans obligation.",
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "Nous utilisons les meilleures technologies du marché : OpenAI, Claude, Make, n8n, Supabase, et bien d'autres. Nous choisissons les outils les plus adaptés à chaque projet pour garantir performance, fiabilité et évolutivité.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient">Questions fréquentes</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tout ce que vous devez savoir avant de nous contacter
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="card-glass rounded-xl px-6 border-border/50 hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
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

export default FAQ;
