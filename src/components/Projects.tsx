const projects = [
  {
    title: "Chatbot E-commerce",
    year: "2024",
    description: "Assistant IA pour une plateforme de vente en ligne",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
  },
  {
    title: "Automatisation RH",
    year: "2024",
    description: "Système de tri et analyse automatique des CV",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
  },
  {
    title: "Analyse Prédictive",
    year: "2025",
    description: "Outil de prévision des ventes basé sur le machine learning",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Génération de Contenu",
    year: "2025",
    description: "Plateforme de création de contenu marketing assistée par IA",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
];

const Projects = () => {
  return (
    <section id="projets" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos Projets
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez quelques-unes de nos réalisations récentes
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative rounded-2xl overflow-hidden card-glass hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-3">
                  {project.year}
                </span>
                <h3 className="text-foreground font-semibold text-xl mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
