import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'courses', label: 'Courses' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-darkBg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#hero" className="group flex items-center space-x-2">
          <span className="bg-gradient-to-r from-accentCyan to-accentIndigo bg-clip-text text-xl font-bold tracking-tight text-transparent transition-opacity group-hover:opacity-80">
            {personalInfo.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative py-1 text-sm font-medium transition-colors duration-300 ${
                activeSection === item.id ? 'text-accentCyan' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-accentCyan"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="rounded-full border border-accentCyan/30 bg-accentCyan/10 px-4 py-1.5 text-xs font-semibold text-accentCyan hover:bg-accentCyan/20 transition-all duration-300"
          >
            Download CV
          </a>
        </nav>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-slate-100 md:hidden focus:outline-none focus:ring-2 focus:ring-accentCyan/50"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-white/5 bg-darkBg/95 md:hidden"
          >
            <nav className="flex flex-col space-y-4 px-6 py-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    activeSection === item.id ? 'text-accentCyan' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                onClick={() => setIsOpen(false)}
                className="w-full text-center rounded-lg border border-accentCyan/30 bg-accentCyan/10 py-2.5 text-sm font-semibold text-accentCyan hover:bg-accentCyan/20 transition-all"
              >
                Download CV
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}