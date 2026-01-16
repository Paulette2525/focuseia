import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Glow Effect Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="glow-effect w-[800px] h-[600px] animate-pulse-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Automatisez votre business
          <br />
          grâce à <span className="text-gradient">l'IA</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Nous accompagnons les entreprises dans leur transformation digitale
          en intégrant des solutions d'intelligence artificielle sur mesure.
        </p>

        <div className="flex items-center justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium"
          >
            <a href="#contact">Prendre RDV</a>
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
