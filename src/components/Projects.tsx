import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-accentCyan to-accentIndigo bg-clip-text text-transparent inline-block">
            Featured Projects
          </h2>
          <p className="mt-4 text-slate-400">High-performance custom web solutions designed with modern technologies.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel flex flex-col lg:flex-row rounded-2xl overflow-hidden hover:border-accentCyan/20 transition-all duration-300"
            >
              {/* Card visual showcase block */}
              <div className="lg:w-1/3 bg-slate-900/60 p-8 flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="h-16 w-16 rounded-2xl bg-accentCyan/10 border border-accentCyan/20 flex items-center justify-center text-accentCyan mb-4 shadow-glow-cyan">
                  <span className="text-2xl font-bold">P</span>
                </div>
                <h4 className="text-lg font-bold text-slate-100 text-center">{proj.title}</h4>
                <div className="mt-4 flex gap-3">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/5 p-2.5 text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <FaGithub size={18} />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/5 p-2.5 text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
                      aria-label="Live Demo Link"
                    >
                      <FaExternalLinkAlt size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Detail block */}
              <div className="lg:w-2/3 p-6 sm:p-8">
                <p className="text-slate-300 text-base leading-relaxed">{proj.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {proj.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start text-sm text-slate-400">
                      <span className="mr-2 text-accentCyan font-bold">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {proj.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-accentCyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}