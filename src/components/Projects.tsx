import { Bot, Users, Zap, Brain } from "lucide-react";

const projects = [
  {
    title: "Chatbot E-commerce",
    year: "2024",
    description: "Assistant IA pour une plateforme de vente en ligne",
    icon: Bot,
    color: "from-[hsl(280_70%_60%)] to-[hsl(320_70%_50%)]",
    particleColor: "hsl(280, 70%, 60%)",
  },
  {
    title: "Automatisation RH",
    year: "2024", 
    description: "Système de tri et analyse automatique des CV",
    icon: Users,
    color: "from-[hsl(175_70%_50%)] to-[hsl(200_70%_60%)]",
    particleColor: "hsl(175, 70%, 50%)",
  },
];

const Projects = () => {
  return (
    <section id="projets" className="py-24 relative overflow-hidden">
      {/* Quantum Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, hsl(280 70% 60% / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsl(175 70% 50% / 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Floating Quantum Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full quantum-float"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${5 + i * 4.5}%`,
              top: `${10 + (i % 5) * 18}%`,
              background: i % 2 === 0 
                ? 'hsl(280, 70%, 60%)' 
                : 'hsl(175, 70%, 50%)',
              boxShadow: i % 2 === 0 
                ? '0 0 10px hsl(280, 70%, 60%), 0 0 20px hsl(280, 70%, 60% / 0.5)' 
                : '0 0 10px hsl(175, 70%, 50%), 0 0 20px hsl(175, 70%, 50% / 0.5)',
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-gradient">Nos Projets</span>
            </h2>
            {/* Title underline effect */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto mt-6 text-lg">
            Découvrez nos réalisations à travers des portails dimensionnels
          </p>
        </div>

        {/* Quantum Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="relative group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Quantum Portal Container */}
              <div className="quantum-portal relative aspect-square max-w-[320px] mx-auto">
                
                {/* Outer Orbital Ring 1 */}
                <div 
                  className="absolute inset-0 rounded-full border border-dashed opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    borderColor: project.particleColor,
                    animation: 'orbit-ring 20s linear infinite',
                  }}
                />
                
                {/* Outer Orbital Ring 2 */}
                <div 
                  className="absolute inset-4 rounded-full border opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{
                    borderColor: project.particleColor,
                    animation: 'orbit-ring 15s linear infinite reverse',
                  }}
                />
                
                {/* Middle Orbital Ring */}
                <div 
                  className="absolute inset-8 rounded-full border-2 opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                  style={{
                    borderColor: project.particleColor,
                    animation: 'orbit-ring 12s linear infinite',
                    boxShadow: `0 0 20px ${project.particleColor}`,
                  }}
                />
                
                {/* Inner Glow Ring */}
                <div 
                  className="absolute inset-12 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${project.particleColor}, transparent, ${project.particleColor}, transparent)`,
                    animation: 'orbit-ring 8s linear infinite reverse',
                    filter: 'blur(2px)',
                  }}
                />

                {/* Orbital Particles */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full group-hover:scale-150 transition-transform duration-300"
                    style={{
                      background: project.particleColor,
                      boxShadow: `0 0 10px ${project.particleColor}, 0 0 20px ${project.particleColor}`,
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${i * 60}deg) translateX(${100 + (i % 2) * 30}px) translateY(-50%)`,
                      animation: `particle-orbit ${6 + i}s linear infinite`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}

                {/* Central Portal Core */}
                <div 
                  className="absolute inset-16 rounded-full bg-card/80 backdrop-blur-xl border border-white/10 
                             flex flex-col items-center justify-center p-6 group-hover:scale-105 
                             transition-all duration-500 quantum-distortion overflow-hidden"
                  style={{
                    boxShadow: `
                      inset 0 0 30px ${project.particleColor}20,
                      0 0 40px ${project.particleColor}30,
                      0 0 80px ${project.particleColor}10
                    `,
                  }}
                >
                  {/* Inner glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at center, ${project.particleColor}20 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Icon */}
                  <div 
                    className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} 
                               flex items-center justify-center mb-4 group-hover:scale-110 
                               transition-transform duration-300`}
                    style={{
                      boxShadow: `0 0 30px ${project.particleColor}50`,
                    }}
                  >
                    <project.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Year Badge */}
                  <span 
                    className="relative z-10 text-xs font-medium px-3 py-1 rounded-full mb-2"
                    style={{
                      background: `${project.particleColor}20`,
                      color: project.particleColor,
                      border: `1px solid ${project.particleColor}40`,
                    }}
                  >
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Project Info Below Portal */}
              <div className="text-center mt-8 relative">
                {/* Connection line from portal */}
                <div 
                  className="absolute left-1/2 -top-8 w-px h-8 opacity-50"
                  style={{
                    background: `linear-gradient(to bottom, ${project.particleColor}, transparent)`,
                  }}
                />
                
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm max-w-[280px] mx-auto group-hover:text-foreground/80 transition-colors duration-300">
                  {project.description}
                </p>
                
                {/* Bottom accent */}
                <div 
                  className="mt-4 h-0.5 w-0 group-hover:w-24 mx-auto transition-all duration-700 rounded-full"
                  style={{
                    background: `linear-gradient(to right, transparent, ${project.particleColor}, transparent)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Central Energy Line connecting portals */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-px opacity-30">
          <div 
            className="w-full h-full"
            style={{
              background: 'linear-gradient(to right, hsl(280, 70%, 60%), hsl(175, 70%, 50%))',
              animation: 'energy-pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
