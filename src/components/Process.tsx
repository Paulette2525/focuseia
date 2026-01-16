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
    <section id="procede" className="py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-glow-teal/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            PROCESSUS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Notre <span className="text-gradient">procédé</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Un accompagnement structuré pour transformer votre entreprise avec l'IA
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* Vertical Neon Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-glow-teal to-primary opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-glow-teal to-primary blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-glow-teal to-primary blur-md opacity-50" />
          </div>

          {/* Process Steps */}
          <div className="space-y-12 lg:space-y-0">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className={`relative lg:flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Connector dot with glow */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20">
                  <div className="relative">
                    {/* Outer glow */}
                    <div className="absolute inset-0 w-6 h-6 rounded-full bg-primary blur-md animate-pulse" />
                    {/* Inner dot */}
                    <div className="relative w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className={`lg:w-[calc(50%-40px)] ${index % 2 === 0 ? "lg:pr-0" : "lg:pl-0"}`}>
                  <div className="group relative">
                    {/* Card glow on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-glow-teal to-primary rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />
                    
                    <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_40px_-10px] group-hover:shadow-primary/30">
                      {/* Number with neon effect */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <span className="text-4xl font-bold text-primary/20 font-mono">
                            {step.number}
                          </span>
                          <span className="absolute inset-0 text-4xl font-bold text-primary font-mono blur-sm opacity-50">
                            {step.number}
                          </span>
                        </div>
                        <div className="flex-1 pt-2">
                          <h3 className="text-foreground font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress indicator */}
                      <div className="h-1 w-full bg-secondary rounded-full overflow-hidden mt-4">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-glow-teal rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px] group-hover:shadow-primary"
                          style={{ width: `${((index + 1) / processSteps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Logos Carousel */}
        <div className="relative overflow-hidden py-8">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex animate-scroll">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-6 py-3 rounded-full bg-secondary/30 backdrop-blur-sm border border-border/50 text-muted-foreground text-sm font-medium hover:border-primary/50 hover:text-primary transition-all duration-300"
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
