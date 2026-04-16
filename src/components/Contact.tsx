import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";

const Contact = () => {
  const { openBooking } = useBooking();

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-effect opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="card-glass rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Arrêtez de perdre
            <br />
            <span className="text-gradient">du temps et de l'argent</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            Chaque jour sans automatisation, c'est des heures gaspillées et de l'argent perdu.
            Réservez un appel stratégique gratuit et découvrez comment économiser des dizaines
            de milliers d'euros par an.
          </p>

          <p className="text-primary text-sm font-medium mb-10">
            Appel de 30 min · 100% gratuit · Sans engagement
          </p>

          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium group"
            onClick={openBooking}
          >
            Réserver votre appel stratégique gratuit
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
