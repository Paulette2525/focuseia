import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";

const Contact = () => {
  const { openBooking } = useBooking();

  return (
    <section id="contact" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-effect opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="card-glass rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Prêt à transformer
            <br />
            <span className="text-gradient">votre entreprise ?</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Contactez-nous pour discuter de votre projet et découvrir comment
            l'IA peut révolutionner votre business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium group"
              onClick={openBooking}
            >
              Prendre rendez-vous
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary rounded-full px-8 py-6 text-base font-medium"
            >
              contact@focuseia.com
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
