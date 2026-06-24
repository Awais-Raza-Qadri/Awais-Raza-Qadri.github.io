/**
 * AWAIS RAZA QADRI - PRODUCTION ENGINE
 * Upgraded with GSAP Motion Graphics
 */

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. VANTA.JS 3D BACKGROUND ENGINE
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: false, 
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x38bdf8,
            backgroundColor: 0x050914,
            points: window.innerWidth < 768 ? 9.00 : 14.00,
            maxDistance: 20.00,
            spacing: 16.00,
            showDots: true
        });
    }

    // Initialize GSAP Motion Graphics
    initMotionGraphics();
});

// ==========================================
// 2. HARDWARE CURSOR LOGIC (DESKTOP ONLY)
// ==========================================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (window.matchMedia("(pointer: fine)").matches && cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    });

    document.querySelectorAll('a, button, .glass-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '55px';
            cursorOutline.style.height = '55px';
            cursorOutline.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
            cursorOutline.style.borderColor = 'var(--primary)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'var(--secondary)';
        });
    });
}

// ==========================================
// 3. FULL-STACK INTERACTIVE TYPING LOGIC
// ==========================================
const typingText = document.getElementById('typed-text');
if (typingText) {
    const words = ["AI-Assisted Developer.", "Python & Django Engineer.", "React UI Implementer.", "System Optimizer."];
    let wordIndex = 0; let charIndex = 0; let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1800; isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 400;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 800);
}

// ==========================================
// 4. 3D INTUITION TILT EFFECT (DESKTOP ONLY)
// ==========================================
if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            // Enhanced dynamic tilt calculations
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12; 
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
            
            // GSAP for ultra-smooth 3D transforms
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.02,
                transformPerspective: 1000,
                ease: "power2.out",
                duration: 0.4
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                ease: "elastic.out(1, 0.3)",
                duration: 1.2
            });
        });
    });
}

// ==========================================
// 5. INTERACTIVE MOBILE SYSTEM NAVIGATION
// ==========================================
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    });
}

window.addEventListener('scroll', () => {
    if (navbar) {
        window.scrollY > 40 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
    }
});

// ==========================================
// 6. GSAP HIGH-END MOTION GRAPHICS
// ==========================================
function initMotionGraphics() {
    // Nav Bar entrance
    gsap.from(".nav-container", {
        y: -100, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.2
    });

    // Hero Section Orchestration
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    heroTl.from(".intro-tag", { y: 30, opacity: 0, duration: 0.8 }, "+=0.5")
          .from(".hero-text h1", { y: 40, opacity: 0, duration: 0.9 }, "-=0.6")
          .from(".hero-text h2", { x: -30, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
          .from(".btn-group .btn", { 
              y: 20, opacity: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.5)" 
          }, "-=0.4")
          .from(".hero-img-container", { 
              scale: 0.8, opacity: 0, rotation: 5, duration: 1.5, ease: "elastic.out(1, 0.5)" 
          }, "-=1.2");

    // Scroll-Triggered Section Animations
    const sections = gsap.utils.toArray('section:not(#hero)');
    
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        const cards = section.querySelectorAll('.anim-card');

        // Animate Section Titles
        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
            });
        }

        // Animate Glass Cards (Staggered Reveal)
        if (cards.length > 0) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 60, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power4.out"
            });
        }
    });

    // Micro-interactions: Animate skill tags sequentially when skills section is reached
    gsap.from(".skill-tag", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 75%",
        },
        scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.05, ease: "back.out(2)", delay: 0.4
    });
}