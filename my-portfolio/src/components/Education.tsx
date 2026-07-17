import { motion } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';
import { educations } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 bg-darkBg/50">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-accentCyan to-accentIndigo bg-clip-text text-transparent inline-block">
            Education Pathway
          </h2>
          <p className="mt-4 text-slate-400">Academic credentials and foundational milestones.</p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-3xl space-y-6">
            {educations.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-panel flex gap-4 p-6 sm:p-8 rounded-2xl hover:border-accentIndigo/20 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accentIndigo/10 text-accentIndigo border border-accentIndigo/20">
                  <HiAcademicCap size={24} />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-lg font-bold text-slate-100">{edu.institution}</h3>
                    <span className="text-xs font-semibold text-accentIndigo sm:ml-4">{edu.period}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-300">{edu.degree}</p>
                  <p className="text-xs text-slate-500 pt-1 leading-relaxed">{edu.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}