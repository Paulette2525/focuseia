import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie Dupont",
    role: "Directrice Marketing",
    company: "TechVision",
    content: "FocuseIA a transformé notre approche client. Le chatbot IA a augmenté nos conversions de 45% en seulement 3 mois.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Thomas Bernard",
    role: "CEO",
    company: "StartupFlow",
    content: "L'automatisation de nos processus RH nous fait gagner plus de 20 heures par semaine. Un investissement qui a changé notre quotidien.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Sophie Martin",
    role: "Responsable Innovation",
    company: "DataCorp",
    content: "Une équipe réactive et des solutions IA sur-mesure. FocuseIA comprend vraiment les besoins de ses clients.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

const Testimonials = () => {
  return (
    <section id="temoignages" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              animation: `pulse-holo 4s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient">Témoignages Clients</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ce que nos clients disent de notre collaboration
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group card-glass rounded-2xl p-8 relative overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Holographic Border Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-[1px] rounded-2xl bg-card" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-[hsl(175_70%_50%/0.3)]" />
              </div>

              {/* Quote Icon */}
              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Quote className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <p className="relative z-10 text-muted-foreground mb-8 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300"
                  />
                  {/* Avatar Glow */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <div>
                  <h4 className="text-foreground font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
