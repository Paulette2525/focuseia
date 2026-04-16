import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { ArrowRight, ChevronDown } from "lucide-react";

// Generate random binary strings
const generateBinary = () => {
  return Array.from({ length: 8 }, () => Math.round(Math.random())).join('');
};

// Particle configuration
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  orbitRadius: 120 + Math.random() * 180,
  duration: 8 + Math.random() * 12,
  startAngle: Math.random() * 360,
  delay: Math.random() * 5,
}));

// Binary streams configuration
const binaryStreams = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  startX: Math.random() * 100,
  endX: (Math.random() - 0.5) * 40,
  duration: 6 + Math.random() * 8,
  delay: Math.random() * 10,
}));

const Hero = () => {
  const [binaryValues, setBinaryValues] = useState<string[]>([]);
  const { openBooking } = useBooking();

  useEffect(() => {
    setBinaryValues(Array.from({ length: 8 }, generateBinary));
    const interval = setInterval(() => {
      setBinaryValues(prev => prev.map(() => generateBinary()));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Neural Grid Background */}
      <div className="neural-grid opacity-40" />
      <div className="hero-scan" />

      {/* Binary Floating Streams */}
      {binaryStreams.map((stream, idx) => (
        <div
          key={stream.id}
          className="binary-stream"
          style={{
            left: `${stream.startX}%`,
            '--start-x': '0px',
            '--end-x': `${stream.endX}px`,
            '--float-duration': `${stream.duration}s`,
            animationDelay: `${stream.delay}s`,
          } as React.CSSProperties}
        >
          {binaryValues[idx] || '01010101'}
        </div>
      ))}

      {/* Neural Core Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="neural-ring neural-ring-1 absolute top-1/2 left-1/2" />
        <div className="neural-ring neural-ring-2 absolute top-1/2 left-1/2" />
        <div className="neural-ring neural-ring-3 absolute top-1/2 left-1/2" />

        <div className="neural-core w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent" />
          <div className="absolute inset-4 rounded-full border border-primary/40 animate-pulse" />
          <div className="absolute inset-8 rounded-full border border-glow-teal/30" />
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-glow-teal opacity-80 blur-sm" />
        </div>

        <svg className="synapse-container w-full h-full" viewBox="0 0 1000 800">
          <defs>
            <linearGradient id="synapseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(150 60% 70% / 0)" />
              <stop offset="50%" stopColor="hsl(150 60% 70% / 0.8)" />
              <stop offset="100%" stopColor="hsl(175 70% 50% / 0)" />
            </linearGradient>
          </defs>
          <path className="synapse-line" d="M500,400 Q350,300 200,350" />
          <path className="synapse-line" d="M500,400 Q650,280 800,320" />
          <path className="synapse-line" d="M500,400 Q400,500 250,550" />
          <path className="synapse-line" d="M500,400 Q600,520 750,580" />
          <path className="synapse-line" d="M500,400 Q450,200 350,100" />
          <path className="synapse-line" d="M500,400 Q550,180 680,80" />
          <circle className="synapse-node" cx="200" cy="350" r="4" />
          <circle className="synapse-node" cx="800" cy="320" r="4" />
          <circle className="synapse-node" cx="250" cy="550" r="4" />
          <circle className="synapse-node" cx="750" cy="580" r="4" />
          <circle className="synapse-node" cx="350" cy="100" r="4" />
          <circle className="synapse-node" cx="680" cy="80" r="4" />
        </svg>

        {particles.map((particle) => (
          <div
            key={particle.id}
            className="data-particle"
            style={{
              '--orbit-radius': `${particle.orbitRadius}px`,
              '--orbit-duration': `${particle.duration}s`,
              '--start-angle': `${particle.startAngle}deg`,
              animationDelay: `${particle.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-sm font-medium tracking-wide">#1 Agence IA en France</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          La meilleure agence
          <br />
          d'<span className="text-gradient text-glow">automatisation IA</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Nous créons des SaaS sur mesure, des systèmes d'automatisation et des plateformes
          centralisées qui remplacent vos 10 outils et font le travail de 10 personnes.
        </p>

        {/* Social Proof Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg">50+</span>
            <span>entreprises accompagnées</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg">200+</span>
            <span>automatisations déployées</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg">95%</span>
            <span>de satisfaction</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="cta-neural bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium group"
            onClick={openBooking}
          >
            Réserver un appel stratégique
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-base font-medium border-primary/20 hover:bg-primary/10"
            onClick={scrollToServices}
          >
            Découvrir nos services
            <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
