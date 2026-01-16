const processSteps = [
  {
    number: "01",
    title: "Contact",
    description: "Prenez contact avec notre équipe pour discuter de vos besoins et objectifs.",
  },
  {
    number: "02",
    title: "Audit",
    description: "Nous analysons vos processus actuels pour identifier les opportunités d'automatisation.",
  },
  {
    number: "03",
    title: "Stratégie",
    description: "Nous élaborons une stratégie IA personnalisée adaptée à votre entreprise.",
  },
  {
    number: "04",
    title: "Implémentation",
    description: "Notre équipe développe et intègre les solutions IA dans votre infrastructure.",
  },
  {
    number: "05",
    title: "Devenez Leader en IA",
    description: "Profitez d'un avantage compétitif durable grâce à l'intelligence artificielle.",
  },
];

const logos = [
  "OpenAI",
  "Claude",
  "Mistral",
  "Gemini",
  "LLaMA",
  "Hugging Face",
  "TensorFlow",
  "PyTorch",
];

const Process = () => {
  return (
    <section id="procede" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Notre procédé
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Un accompagnement structuré pour transformer votre entreprise avec l'IA
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="card-glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-primary text-sm font-mono mb-3 block">
                {step.number}
              </span>
              <h3 className="text-foreground font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Logos Carousel */}
        <div className="relative overflow-hidden py-8">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex animate-scroll">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 px-6 py-3 rounded-lg bg-secondary/50 text-muted-foreground text-sm font-medium"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
