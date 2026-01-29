import { useEffect, useState } from "react";

const projects = [
  {
    title: "Chatbot E-commerce",
    year: "2025",
    description: "Assistant IA pour une plateforme de vente en ligne",
    stats: {
      efficiency: 94,
      automation: 87,
      satisfaction: 96,
    },
    metrics: [
      { label: "Temps de réponse", value: "0.3s" },
      { label: "Requêtes/jour", value: "12K+" },
      { label: "Précision", value: "98%" },
    ],
  },
  {
    title: "Automatisation RH",
    year: "2025",
    description: "Système de tri et analyse automatique des CV",
    stats: {
      efficiency: 89,
      automation: 95,
      satisfaction: 91,
    },
    metrics: [
      { label: "CV analysés", value: "50K+" },
      { label: "Temps économisé", value: "85%" },
      { label: "Matching", value: "94%" },
    ],
  },
];

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return <span>{count}{suffix}</span>;
};

const DataStream = () => {
  const chars = "01アイウエオカキクケコ";
  const [streams, setStreams] = useState<string[]>([]);
  
  useEffect(() => {
    const generateStream = () => {
      return Array.from({ length: 20 }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join("");
    };
    
    setStreams(Array.from({ length: 8 }, generateStream));
    
    const interval = setInterval(() => {
      setStreams(prev => prev.map(generateStream));
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {streams.map((stream, i) => (
        <div
          key={i}
          className="absolute text-primary/60 text-xs font-mono whitespace-nowrap"
          style={{
            left: `${i * 12.5}%`,
            top: 0,
            animation: `data-fall ${3 + i * 0.5}s linear infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {stream.split("").map((char, j) => (
            <div key={j} className="leading-5">{char}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projets" className="py-24 relative overflow-hidden">
      {/* Holographic Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="holo-matrix-grid" />
        
        {/* Perspective Grid Lines */}
        <div className="absolute inset-0 holo-perspective" />
      </div>
      
      {/* Data Streams */}
      <DataStream />
      
      {/* Laser Scan Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="laser-scan" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title with Data Accent */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-sm font-mono tracking-widest">// PROJETS.EXECUTE()</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient">Nos Projets</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-mono text-sm">
            {">"} Analyse des performances en temps réel
          </p>
        </div>

        {/* Holographic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group holo-card relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Card Frame */}
              <div className="absolute inset-0 holo-frame rounded-xl" />
              
              {/* Main Content */}
              <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-primary text-xs font-mono">ACTIVE</span>
                    </div>
                    <h3 className="text-foreground font-bold text-xl md:text-2xl group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                  </div>
                  <div className="holo-badge">
                    <span className="text-primary font-mono text-sm font-bold">{project.year}</span>
                  </div>
                </div>

                {/* Stats Bars */}
                <div className="space-y-4 mb-6">
                  {Object.entries(project.stats).map(([key, value], i) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-muted-foreground uppercase tracking-wider">
                          {key === 'efficiency' ? 'Efficacité' : key === 'automation' ? 'Automatisation' : 'Satisfaction'}
                        </span>
                        <span className="text-primary">
                          <AnimatedCounter target={value} suffix="%" />
                        </span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full stat-bar"
                          style={{ 
                            width: `${value}%`,
                            animationDelay: `${i * 0.2 + index * 0.5}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map((metric, i) => (
                    <div 
                      key={metric.label}
                      className="metric-cell p-3 rounded-lg text-center"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="text-primary font-mono font-bold text-lg md:text-xl">
                        {metric.value}
                      </div>
                      <div className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Binary Footer */}
                <div className="mt-6 pt-4 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono text-muted-foreground/50 overflow-hidden">
                      <span className="binary-stream">10110100 01001010 11010010</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(280_70%_60%/0.6)] animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(175_70%_50%/0.6)] animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[hsl(280_70%_60%/0.05)] rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Data Line */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <span className="text-muted-foreground/50 text-xs font-mono">END_TRANSMISSION</span>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
