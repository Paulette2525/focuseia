const projects = [
  {
    title: "Chatbot E-commerce",
    year: "2024",
    description: "Assistant IA pour une plateforme de vente en ligne",
  },
  {
    title: "Automatisation RH",
    year: "2024",
    description: "Système de tri et analyse automatique des CV",
  },
];

const Projects = () => {
  return (
    <section id="projets" className="py-24 relative overflow-hidden">
      {/* Cosmic Background with Quantum Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="cosmic-bg opacity-60" />
        
        {/* Quantum Grid */}
        <div className="absolute inset-0 quantum-grid" />
      </div>
      
      {/* Orbiting Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="quantum-particle"
            style={{
              left: `${50 + Math.cos((i * 30 * Math.PI) / 180) * (25 + (i % 3) * 10)}%`,
              top: `${50 + Math.sin((i * 30 * Math.PI) / 180) * (25 + (i % 3) * 10)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${8 + (i % 3) * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient">Nos Projets</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez quelques-unes de nos réalisations récentes
          </p>
        </div>

        {/* Quantum Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Quantum Portal */}
              <div className="quantum-portal aspect-square max-w-[380px] mx-auto">
                {/* Concentric Circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="quantum-ring"
                      style={{
                        width: `${60 + i * 18}%`,
                        height: `${60 + i * 18}%`,
                        animationDuration: `${10 + i * 5}s`,
                        animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                        opacity: 0.8 - i * 0.12,
                      }}
                    />
                  ))}
                </div>

                {/* Central Core */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="quantum-core">
                    {/* Energy Pulsations */}
                    <div className="absolute inset-0 quantum-pulse" />
                    <div className="absolute inset-0 quantum-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute inset-0 quantum-pulse" style={{ animationDelay: '1s' }} />
                    
                    {/* Inner Core */}
                    <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-primary/30 via-card to-card/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center overflow-hidden">
                      {/* Energy Lines */}
                      <div className="absolute inset-0">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent origin-left"
                            style={{
                              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                              animation: `quantum-line-pulse 3s ease-in-out ${i * 0.2}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Year Badge */}
                      <span className="relative z-10 text-primary text-lg font-bold tracking-wider">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Gravitational Distortion Field */}
                <div className="absolute inset-0 quantum-distortion group-hover:scale-110 transition-transform duration-700" />
              </div>

              {/* Project Info */}
              <div className="text-center mt-8 relative">
                <div className="quantum-info-line mb-4" />
                <h3 className="text-foreground font-semibold text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                  {project.description}
                </p>
                
                {/* Bottom Accent */}
                <div className="mt-6 h-[2px] w-0 group-hover:w-24 mx-auto bg-gradient-to-r from-primary via-[hsl(280_70%_60%)] to-[hsl(175_70%_50%)] transition-all duration-700 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
