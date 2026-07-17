import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-darkBg/90 py-10 relative z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="block text-sm font-bold tracking-tight text-slate-200">{personalInfo.name}</span>
          <span className="block text-xs text-slate-500 mt-1">AI-Assisted Full-Stack Developer</span>
        </div>
        <p className="text-xs text-slate-500 text-center sm:text-right">
          © {currentYear} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}