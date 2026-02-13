import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const certifications = [
  {
    title: "AWS Cloud Practitioner",
    image: "/assets/certificates/cloud_practitioner_cert.jpeg",
  },
  {
    title: "AWS Compute Services",
    image: "/assets/certificates/awscompute.png",
  },
  {
    title: "AWS Storage Services",
    image: "/assets/certificates/awsstorage.png",
  },
  {
    title: "AWS Database Services",
    image: "/assets/certificates/awsdatabase.png",
  },
  {
    title: "AI Agent Conference",
    image: "/assets/certificates/aiagentconf.png",
  },
];

const Certifications = () => (
  <section id="certifications" className="py-20 md:py-28">
    <div className="container max-w-3xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fade}
      >
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-12">
          Certifications
        </h2>
        
        <div className="flex flex-wrap gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-32 group relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-medium p-2 text-[10px] leading-tight">
                  {cert.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Certifications;
