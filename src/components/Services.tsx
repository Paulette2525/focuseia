import { Search, GraduationCap, Cpu, Globe, Database, UserMinus } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "SaaS sur mesure",
    description:
      "Création de plateformes personnalisées qui remplacent vos abonnements multiples. Une seule solution au lieu de 10 outils différents.",
    benefits: ["Réduction des coûts logiciels de 60%", "Interface unifiée pour vos équipes", "Évolutif selon vos besoins"],
  },
  {
    icon: UserMinus,
    title: "Automatisation avancée",
    description:
      "Systèmes intelligents qui font le travail de 10 personnes. Automatisez vos tâches répétitives sans recruter.",
    benefits: ["Gain de temps de 80% sur les tâches admin", "Zéro erreur humaine", "Fonctionnement 24h/24"],
  },
  {
    icon: Database,
    title: "Centralisation de données",
    description:
      "Une plateforme unique pour toutes vos données. Fini les copier-coller entre Excel, CRM, et tableurs éparpillés.",
    benefits: ["Données synchronisées en temps réel", "Tableaux de bord intelligents", "Prise de décision éclairée"],
  },
  {
    icon: Globe,
    title: "Création & optimisation web",
    description:
      "Sites performants et optimisés pour la conversion. Du design à l'hébergement, nous gérons tout.",
    benefits: ["Sites ultra-rapides et SEO-friendly", "Taux de conversion optimisé", "Maintenance incluse"],
  },
  {
    icon: Search,
    title: "Audit & Conseil IA",
    description:
      "Analyse approfondie de vos processus métier pour identifier les meilleures opportunités d'automatisation et d'IA.",
    benefits: ["Plan d'action personnalisé", "ROI estimé avant investissement", "Accompagnement stratégique"],
  },
  {
    icon: GraduationCap,
    title: "Remplacement de postes",
    description:
      "Outils IA qui prennent en charge les tâches humaines répétitives : relances, tri d'emails, saisie de données, reporting.",
    benefits: ["Économies de masse salariale", "Scalabilité immédiate", "Qualité constante"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="holo-grid" />
      <div className="scanline" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-[hsl(175_70%_50%/0.15)] to-[hsl(280_70%_60%/0.1)] blur-[100px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            NOS EXPERTISES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-gradient">6 services</span> pour transformer votre entreprise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            De l'audit stratégique à l'implémentation complète, nous couvrons tous vos besoins en automatisation et IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card-holographic rounded-2xl p-8 transition-all duration-500 group"
              style={{
                animationDelay: `${index * 150}ms`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-[hsl(175_70%_50%/0.1)] flex items-center justify-center mb-6 icon-holo">
                <service.icon className="w-8 h-8 text-primary relative z-10 transition-all duration-300 group-hover:text-[hsl(175_70%_50%)] group-hover:scale-110" />
              </div>

              <h3 className="text-foreground font-semibold text-xl mb-3 group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5 group-hover:text-foreground/80 transition-colors duration-300">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-primary via-[hsl(175_70%_50%)] to-[hsl(280_70%_60%/0.5)] transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
