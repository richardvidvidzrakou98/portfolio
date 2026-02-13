import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const projects = [
  {
    name: "Doyen Institute Student Portal",
    stack: "React · TypeScript · Node.js · Express · MySQL · VPS · Docker",
    description:
      "Comprehensive student portal for an educational institute, featuring course management, payment, and Course registration || Admin panel, teacher and student dashboards, and secure authentication.",
  },
  {
    name: "Academic Klinik Online School Management System",
    stack: "Laravel · MySQL · Blade · Payment Gateway · Zoom API integration",
    description:
      "Web-based school management system for an online education platform, providing tools for course management, student enrollment, and progress tracking.",
  },
  {
    name: "Case Management System",
    stack: "Laravel · MySQL · Blade",
    description:
      "Internal system for tracking and managing investigation cases with role-based access and document handling.",
  },
  {
    name: "BookAfrica Platform",
    stack: "Next.js · PostgreSQL · Tailwind",
    description:
      "E-commerce platform for African literature, featuring catalog management, search, and payment integration.",
  },
  {
    name: "Wayne Medical Supplies LLC",
    stack: "React · TypeScript",
    description:
      "Product catalog and order management interface for a medical supplies distributor in the US.",
  },
  {
    name: "Agriculture Investment Mobile App Backend API",
    stack: "Node.js · Express · PostgreSQL · AWS · Docker",
    description:
      "Backend API for a mobile app focused on agriculture investment, providing data management and integration with cloud services.",
  },
  {
    name: "Swimming Instructor's Website",
    stack: "React · TypeScript",
    description:
      "Personal website for a swimming instructor, showcasing services, schedule, booking, programs, gallery and contact information.",
  },
  {
    name: "Doyen Shop",
    stack: "WordPress · WooCommerce",
    description:
      "Online retail store for an educational institute, with inventory management and mobile-responsive design.",
  },
  {
    name: "Danfos Auto Engineering",
    stack: "WordPress · Custom Theme",
    description:
      "Corporate website for an automotive engineering firm, featuring service listings and client inquiry forms.",
  },
  
];

const Projects = () => (
  <section id="projects" className="py-20 md:py-28">
    <div className="container max-w-3xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fade}
      >
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-10">
          Projects
        </h2>
      </motion.div>

      <div className="grid gap-px bg-border sm:grid-cols-2">
        {projects.map((project, i) => (
          <motion.article
            key={project.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" as const },
              },
            }}
            className="bg-background p-6 md:p-8 flex flex-col"
          >
            <h3 className="text-base font-semibold text-foreground mb-1">
              {project.name}
            </h3>
            <p className="text-xs text-primary tracking-wide mb-3">
              {project.stack}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
              {project.description}
            </p>
            <span className="text-xs text-muted-foreground border-b border-muted-foreground/30 self-start hover:text-foreground hover:border-foreground transition-colors cursor-pointer">
              View project
            </span>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
