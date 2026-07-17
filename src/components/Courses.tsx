import { motion } from 'framer-motion';
import { HiBadgeCheck } from 'react-icons/hi';
import { courses } from '../data/portfolioData';

export default function Courses() {
  return (
    <section id="courses" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-accentCyan to-accentIndigo bg-clip-text text-transparent inline-block">
            Certifications & Training
          </h2>
          <p className="mt-4 text-slate-400">Specialized credentials and professional industry training courses.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-accentCyan/20 transition-colors duration-300"
            >
              <div className="space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accentCyan/10 text-accentCyan border border-accentCyan/20">
                  <HiBadgeCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 leading-snug">{course.title}</h3>
                  <p className="text-xs font-semibold text-accentCyan mt-1">{course.provider}</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{course.description}</p>
              </div>
              <div className="mt-6 border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Duration: {course.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}