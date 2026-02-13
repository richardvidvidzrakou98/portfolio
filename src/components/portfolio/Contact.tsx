import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const links = [
  {
    icon: Mail,
    label: "richardvidzrakou98@gmail.com",
    href: "mailto:richardvidzrakou98@gmail.com",
  },
  {
    icon: Phone,
    label: "+233 505631264",
    href: "tel:+233505631264",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/richard-vidzrakou-53aa0422b/",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    href: "https://x.com/RichardVid36291",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/richardvidvidzrakou98",
  },
];

const Contact = () => (
  <section id="contact" className="py-20 md:py-28 bg-card">
    <div className="container max-w-3xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fade}
      >
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-10">
          Contact
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md">
          Open to new opportunities, collaborations, and interesting projects.
          Feel free to reach out.
        </p>

        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <link.icon className="w-4 h-4 text-primary" />
              <span className="border-b border-transparent group-hover:border-foreground transition-colors">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Contact;
