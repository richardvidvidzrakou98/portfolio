import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const jumpLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Hero = () => (
  <section className="min-h-[85vh] flex items-center">
    <div className="container max-w-3xl py-24 md:py-32">
      <motion.div initial="hidden" animate="visible" variants={fade}>
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
          Accra, Ghana
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-2">
          Richard Vidzrakou
        </h1>
        <p className="text-lg md:text-xl text-primary font-medium mb-6">
          Software Engineer
        </p>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
          Software Engineer with 5 years of experience building scalable web
          applications using React, Next.js, Node.js, Laravel and WordPress. AWS
          Certified Cloud Practitioner.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <a
            href="#projects"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
          <a
            href="/portfolio/assets/Richard%20Vidzrakou_CV.pdf"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors ml-1"
            download
          >
            Download CV
          </a>
        </div>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground tracking-wide">
          {jumpLinks.map((link, i) => (
            <span key={link.href} className="flex items-center gap-4">
              {i > 0 && <span aria-hidden>·</span>}
              <a
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>
      </motion.div>
    </div>
  </section>
);

export default Hero;
