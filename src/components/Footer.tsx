const Footer = () => {
  const links = [
    { label: "Services", href: "#services" },
    { label: "Procédé", href: "#procede" },
    { label: "Projets", href: "#projets" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-2.5 h-2.5 rounded-full bg-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-semibold text-foreground">FocuseIA</span>
          </a>

          <div className="flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-muted-foreground text-sm">
            © 2026 FocuseIA. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
