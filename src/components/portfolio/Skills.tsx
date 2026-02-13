import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const groups = [
  {
    label: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "MongoDB", "MySQL", "Laravel"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "VPS", "Linux", "Docker", "CI/CD"],
  },
  {
    label: "CMS & Tools",
    items: ["WordPress", "Firebase", "Git", "cPanel"],
  },
  {
    label: "Soft Skills",
    items: ["Debugging", "Problem Solving", "Collaboration", "System Configuration"],
  },
];

const Skills = () => (
  <section id="skills" className="py-20 md:py-28 bg-card">
    <div className="container max-w-3xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fade}
      >
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-10">
          Skills
        </h2>

        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs text-muted-foreground border border-border px-3 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Skills;
