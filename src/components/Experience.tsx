import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import { experiences } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-accentCyan to-accentIndigo bg-clip-text text-transparent inline-block">
            Professional Experience
          </h2>
          <p className="mt-4 text-slate-400">My timeline of contributions in software engineering and development operations.</p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-3xl space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-panel relative rounded-2xl p-6 sm:p-8 hover:border-accentCyan/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                    <p className="text-accentCyan font-medium mt-1">{exp.company}</p>
                  </div>
                  <span className="inline-flex max-w-fit items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 border border-white/5">
                    <HiBriefcase size={12} />
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start text-sm text-slate-400 leading-relaxed">
                      <span className="mr-2 text-accentCyan">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}