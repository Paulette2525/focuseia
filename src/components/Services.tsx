import { Search, GraduationCap, Cpu } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Audit & Conseil",
    description:
      "Nous analysons vos processus métier pour identifier les opportunités d'automatisation et d'optimisation grâce à l'IA. Recevez un plan d'action concret et personnalisé.",
  },
  {
    icon: GraduationCap,
    title: "Formations",
    description:
      "Formez vos équipes aux outils et méthodologies de l'IA. Nos programmes sont adaptés à tous les niveaux, du débutant à l'expert, pour une montée en compétence efficace.",
  },
  {
    icon: Cpu,
    title: "Solutions IA",
    description:
      "Développement et intégration de solutions IA sur mesure : chatbots, automatisation, analyse de données, génération de contenu, et bien plus encore.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-effect opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos services
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
              className="card-glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-foreground font-semibold text-xl mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
