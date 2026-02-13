import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const About = () => (
  <section id="about" className="py-20 md:py-28">
    <div className="container max-w-3xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fade}
      >
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-8">
          About
        </h2>
        <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            I am a frontend and backend software developer passionate about building 
            reliable, scalable systems that solve real-world problems. My work centers 
            on designing RESTful APIs, structuring efficient databases, and developing 
            server-side logic that supports modern web and mobile applications.
          </p>
          <p>
            I enjoy turning complex business requirements into practical technical 
            solutions, with strong attention to performance, security, and maintainability. 
            I am particularly interested in systems that operate at scale, financial and 
            data-driven platforms, and tools that improve operational efficiency for 
            organizations.
          </p>
          <p>
            Alongside professional work, I also take on freelance projects, helping 
            businesses and startups build web applications, APIs, and WordPress-based 
            platforms tailored to their needs.
          </p>
          <p>
            My technical foundation spans modern JavaScript and PHP frameworks on the 
            frontend and backend, relational and NoSQL databases, and a growing 
            competence in cloud and DevOps tooling — AWS, Docker, CI/CD pipelines, 
            and Linux server administration.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;
