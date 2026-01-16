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
    <section id="projets" className="py-24 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="cosmic-bg" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/60"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `pulse-holo 3s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient">Nos Projets</span>
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
              className="group card-portal rounded-2xl bg-card/30 backdrop-blur-sm"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transitionDelay: `${index * 50}ms`
              }}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden rounded-t-2xl relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover portal-image"
                />
                
                {/* Portal Glow on Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(280_70%_60%/0.1)] via-transparent to-[hsl(175_70%_50%/0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 portal-overlay rounded-2xl" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="portal-badge inline-block px-4 py-1.5 rounded-full text-primary text-xs font-medium mb-3 overflow-hidden">
                  <span className="relative z-10">{project.year}</span>
                </span>
                <h3 className="text-foreground font-semibold text-xl mb-2 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                  {project.description}
                </p>
                
                {/* Bottom Accent Line */}
                <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[hsl(280_70%_60%)] via-primary to-[hsl(175_70%_50%)] transition-all duration-700 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
