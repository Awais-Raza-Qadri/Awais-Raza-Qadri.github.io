import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { HiDownload, HiArrowNarrowRight } from 'react-icons/hi';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center pt-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        {/* Profile Pic Container with JPEG Configuration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mb-8 h-36 w-36 overflow-hidden rounded-full p-[3px] bg-gradient-to-tr from-accentCyan via-accentIndigo to-pink-500 shadow-glow-cyan"
        >
          <div className="h-full w-full rounded-full bg-darkBg overflow-hidden">
            <img 
              src={personalInfo.profilePicture} // Correctly resolves /profile.jpg from public
              alt={personalInfo.name} 
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                // Render elegant textual fallback if profile.jpg is missing
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'flex h-full w-full items-center justify-center bg-slate-900 text-3xl font-extrabold text-accentCyan';
                  fallback.innerText = 'ARQ';
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
        </motion.div>

        {/* Hero Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="rounded-full bg-accentCyan/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-accentCyan border border-accentCyan/10 uppercase">
            Available for new opportunities
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-slate-100">Hi, I'm</span>
            <span className="block mt-2 bg-gradient-to-r from-accentCyan via-accentIndigo to-cyan-400 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed font-light">
            {personalInfo.title}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-500 leading-relaxed">
            {personalInfo.summary}
          </p>
        </motion.div>

        {/* Call To Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-accentCyan to-accentIndigo px-6 py-3 text-sm font-semibold text-darkBg shadow-lg hover:brightness-110 transition-all duration-300"
          >
            Explore Projects
            <HiArrowNarrowRight className="transition-transform group-hover:translate-x-1" size={16} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Download Resume
            <HiDownload size={16} />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full border border-accentCyan/20 bg-accentCyan/5 px-6 py-3 text-sm font-semibold text-accentCyan hover:bg-accentCyan/10 transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Professional Networks */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex justify-center space-x-6"
        >
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-accentCyan transition-colors duration-300" aria-label="GitHub Profile">
            <FaGithub size={24} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-accentCyan transition-colors duration-300" aria-label="LinkedIn Profile">
            <FaLinkedin size={24} />
          </a>
          <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-accentCyan transition-colors duration-300" aria-label="WhatsApp Chat">
            <FaWhatsapp size={24} />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="text-slate-500 hover:text-accentCyan transition-colors duration-300" aria-label="Email Contact">
            <FaEnvelope size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}