import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Courses from './components/Courses';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'skills', 'projects', 'education', 'courses', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-darkBg text-slate-100">
      <div className="glow-orb-cyan top-10 left-10" />
      <div className="glow-orb-indigo top-1/3 right-10" />
      <div className="glow-orb-cyan bottom-1/4 left-1/4" />

      <Navbar activeSection={activeSection} />
      
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Courses />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}