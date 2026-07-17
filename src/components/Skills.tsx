import { motion } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-darkBg/50">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-accentCyan to-accentIndigo bg-clip-text text-transparent inline-block">
            Technical Skills
          </h2>
          <p className="mt-4 text-slate-400">Deep technical specialization segmented across engineering and business operational sectors.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-panel rounded-2xl p-6 hover:border-accentIndigo/30 transition-colors duration-300"
            >
              <h3 className="text-lg font-bold text-slate-100 border-b border-white/5 pb-3 mb-4">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 border border-white/5 hover:border-accentCyan/30 hover:text-accentCyan transition-colors duration-300 cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}