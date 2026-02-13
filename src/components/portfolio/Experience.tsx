import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const timeline = [
  {
    role: "Backend Developer",
    company: "CropCapital Investment",
    period: "Oct 2025 – Present",
  },
  {
    role: "IT Support Specialist & Web Developer",
    company: "Doyen Institute of Intelligence and Investigation",
    period: "Nov 2025 – Jan 2026",
  },
  {
    role: "Internship Trainee (AWS Cloud Practitioner)",
    company: "AMALITECH",
    period: "Aug 2025 – Oct 2025",
  },
  {
    role: "National Service Personnel (Web Developer)",
    company: "Doyen Institute of Intelligence and Investigation",
    period: "Oct 2024 – Aug 2025",
  },
  {
    role: "IT Intern",
    company: "Kaaseman Rural Bank",
    period: "Sep 2023 – Nov 2023",
  },
  {
    role: "Freelance Software Developer",
    company: "Self-employed",
    period: "2022 – Present",
  },
];

const Experience = () => (
  <section id="experience" className="py-20 md:py-28">
    <div className="container max-w-3xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fade}
      >
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-10">
          Experience
        </h2>

        <div className="space-y-0 border-l border-border ml-2">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={{
                hidden: { opacity: 0, x: -8 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" as const },
                },
              }}
              className="relative pl-8 py-6"
            >
              <span className="absolute left-0 top-8 w-2 h-2 -translate-x-[5px] bg-primary rounded-full" />
              <p className="text-xs text-muted-foreground tracking-wide mb-1">
                {item.period}
              </p>
              <h3 className="text-base font-semibold text-foreground">
                {item.role}
              </h3>
              <p className="text-sm text-muted-foreground">{item.company}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Experience;
