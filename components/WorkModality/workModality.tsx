"use client";

import { motion, Variants } from "motion/react";

interface WorkItem {
  title: string;
  description: string;
}

interface WorkModalityProps {
  dict: {
    workModality: {
      title: string;
      items: WorkItem[];
    };
  };
}

const WorkModality = ({ dict }: WorkModalityProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="how-i-work"
      className="w-full max-w-6xl mx-auto py-12 md:py-20 px-8"
    >
      {/* Header with lines */}
      <div className="flex items-center justify-center gap-8 mb-16">
        <div className="flex-1 h-[1px] bg-black/10 hidden sm:block" />
        <h2 className="text-3xl md:text-4xl font-serif text-black/80 tracking-tight">
          {dict.workModality.title}
        </h2>
        <div className="flex-1 h-[1px] bg-black/10 hidden sm:block" />
      </div>

      {/* Modality Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {dict.workModality.items.map((item, index) => (
          <motion.article
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="relative group p-8 rounded-2xl bg-white/30 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col items-center text-center justify-center min-h-[200px]"
          >
            {/* Card background hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Text content */}
            <div className="space-y-4 relative z-10">
              <h3 className="text-xl font-serif text-black/90 group-hover:text-black transition-colors duration-300">
                {item.title}
              </h3>
              <div className="w-12 h-[1px] bg-black/10 mx-auto" />
              <p className="text-sm md:text-base text-black/60 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default WorkModality;
