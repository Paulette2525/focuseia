import { Search, GraduationCap, Cpu } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Audit & Conseil",
    description:
      "Nous analysons vos processus métier pour identifier les opportunités d'automatisation et d'optimisation grâce à l'IA. Recevez un plan d'action concret et personnalisé.",
    accentColor: "primary",
  },
  {
    icon: GraduationCap,
    title: "Formations",
    description:
      "Formez vos équipes aux outils et méthodologies de l'IA. Nos programmes sont adaptés à tous les niveaux, du débutant à l'expert, pour une montée en compétence efficace.",
    accentColor: "glow-teal",
  },
  {
    icon: Cpu,
    title: "Solutions IA",
    description:
      "Développement et intégration de solutions IA sur mesure : chatbots, automatisation, analyse de données, génération de contenu, et bien plus encore.",
    accentColor: "primary",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Holographic Grid Background */}
      <div className="holo-grid" />
      
      {/* Scanline Effect */}
      <div className="scanline" />

      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-[hsl(175_70%_50%/0.15)] to-[hsl(280_70%_60%/0.1)] blur-[100px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient">Nos services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des solutions complètes pour votre transformation IA
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card-holographic rounded-2xl p-8 transition-all duration-500 group"
              style={{ 
                animationDelay: `${index * 150}ms`,
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Icon Container */}
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-[hsl(175_70%_50%/0.1)] flex items-center justify-center mb-6 icon-holo">
                <service.icon className="w-8 h-8 text-primary relative z-10 transition-all duration-300 group-hover:text-[hsl(175_70%_50%)] group-hover:scale-110" />
              </div>

              {/* Content */}
              <h3 className="text-foreground font-semibold text-xl mb-4 group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                {service.description}
              </p>

              {/* Bottom Accent Line */}
              <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-primary via-[hsl(175_70%_50%)] to-[hsl(280_70%_60%/0.5)] transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
