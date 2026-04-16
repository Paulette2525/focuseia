const technologies = [
  "OpenAI", "Claude", "Mistral", "Make", "Zapier", "n8n",
  "Supabase", "Vercel", "Stripe", "Notion", "Slack", "HubSpot",
];

const LogoBanner = () => {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/30">
      <div className="container mx-auto px-6 mb-8">
        <p className="text-center text-muted-foreground text-sm font-medium tracking-widest uppercase">
          Technologies & partenaires de confiance
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-scroll">
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-3 px-6 py-3 rounded-full bg-secondary/30 backdrop-blur-sm border border-border/50 text-muted-foreground text-sm font-medium hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBanner;
