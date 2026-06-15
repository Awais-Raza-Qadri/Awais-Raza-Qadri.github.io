import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. ADVANCED NEURAL PARTICLE BACKGROUND
// ==========================================
const InteractiveParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Particles & Connections
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Connect particles to each other
        for (let j = i; j < particles.length; j++) {
          let p2 = particles[j];
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouse.x && mouse.y) {
          let mouseDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (mouseDist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${1 - mouseDist / 150})`; // Cyan glow near mouse
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-20 bg-zinc-950" />;
};

// ==========================================
// 2. MAGNETIC CUSTOM CURSOR
// ==========================================
const MagneticCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-emerald-400/60 pointer-events-none z-50 mix-blend-screen shadow-[0_0_15px_rgba(16,185,129,0.5)] hidden md:block"
        style={{ x: smoothX, y: smoothY }}
      />
      {/* Inner Core */}
      <motion.div 
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-300 pointer-events-none z-50 hidden md:block"
        style={{ 
          x: useSpring(cursorX, { damping: 15, stiffness: 800 }), 
          y: useSpring(cursorY, { damping: 15, stiffness: 800 }) 
        }}
      />
    </>
  );
};

// ==========================================
// 3. MAIN PORTFOLIO ARCHITECTURE
// ==========================================
export default function Portfolio() {
  const techStack = {
    "Core Frontend": ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    "Backend & DevOps": ["Python", "Django", "Docker", "MySQL"],
    "AI Toolchain": ["OpenAI", "GitHub Copilot", "Claude Code"]
  };

  // Framer Motion Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };
  
  const itemVars = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <div className="relative min-h-screen text-zinc-100 font-sans selection:bg-emerald-500/30 overflow-hidden">
      <MagneticCursor />
      <InteractiveParticleNetwork />
      
      {/* Global Vignette Overlay for Depth */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.8)_100%)] -z-10" />

      <main className="relative max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div 
          variants={containerVars} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          
          {/* ================= LEFT PANEL: HERO & IDENTITY ================= */}
          <section className="lg:col-span-5 flex flex-col space-y-8 lg:sticky lg:top-24 h-max">
            
            {/* Image Container with Hover Tilt & Glow */}
            <motion.div 
              variants={itemVars}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-emerald-500/20 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] group z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent z-10 mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity duration-500" />
              <img 
                src="/one.jpeg" 
                alt="Awais Raza Qadri" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-110"
              />
            </motion.div>
            
            {/* Typography & Badges */}
            <motion.div variants={itemVars} className="space-y-4">
              <div className="flex flex-wrap gap-3 mb-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 relative" />
                  SYSTEM_ONLINE
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-700/50 text-zinc-400 text-xs font-mono">
                  📍 Talagang, PK
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 drop-shadow-lg">
                Awais Raza<br />Qadri
              </h1>
              
              <h2 className="text-xl sm:text-2xl text-cyan-400 font-mono font-medium drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                AI-Assisted Full-Stack Dev
              </h2>
              
              <p className="text-zinc-400 leading-relaxed max-w-md text-base sm:text-lg">
                Architecting production-ready applications by blending robust full-stack engineering with elite AI systems. Focused on optimized workflows, clean containerization, and interactive interfaces.
              </p>
            </motion.div>
          </section>

          {/* ================= RIGHT PANEL: METRICS, EXPERIENCE, SKILLS ================= */}
          <div className="lg:col-span-7 space-y-10 mt-8 lg:mt-0">
            
            {/* Experience & Metrics Card */}
            <motion.div variants={itemVars} className="group relative">
              {/* Animated Glow Backdrop */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-2xl shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-100">BrainWave Labs</h3>
                    <p className="text-sm font-mono text-emerald-400 mt-1">Software Management & AI Dev Assistant</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Metric 1 */}
                  <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-8 -mt-8" />
                    <div className="text-4xl font-black text-emerald-400 mb-2">+35%</div>
                    <div className="text-sm text-zinc-400 font-mono leading-tight">Workflow Pipeline<br/>Acceleration</div>
                  </motion.div>
                  
                  {/* Metric 2 */}
                  <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl -mr-8 -mt-8" />
                    <div className="text-4xl font-black text-cyan-400 mb-2">-30%</div>
                    <div className="text-sm text-zinc-400 font-mono leading-tight">Container Friction<br/>Reduction</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Academic Foundation Card */}
            <motion.div variants={itemVars} className="p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl hover:border-zinc-700/80 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-zinc-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-zinc-100">Academic Foundation</h3>
              </div>
              <div className="pl-4 border-l-2 border-zinc-800">
                <h4 className="text-lg font-semibold text-zinc-200">Bachelor of Information Technology (BSIT)</h4>
                <p className="text-emerald-400 font-mono text-sm mt-1">Virtual University of Pakistan</p>
              </div>
            </motion.div>

            {/* Dynamic Skills Matrix */}
            <motion.div variants={itemVars} className="p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-zinc-100 mb-8 flex items-center gap-3">
                <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Technical Matrix
              </h3>
              
              <div className="space-y-8">
                {Object.entries(techStack).map(([category, skills], index) => (
                  <div key={category}>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">{category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill, i) => (
                        <motion.span 
                          key={skill}
                          whileHover={{ scale: 1.05, y: -2 }}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className={`px-4 py-2 rounded-lg text-sm font-mono border backdrop-blur-md cursor-default
                            ${category === 'AI Toolchain' 
                              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300 hover:border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
                              : 'bg-zinc-950/50 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white'
                            }`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </main>
    </div>
  );
}