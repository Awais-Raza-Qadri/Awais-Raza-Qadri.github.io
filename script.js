/**
 * AWAIS RAZA QADRI - HIGH-PERFORMANCE PORTFOLIO ENGINE
 * Powered by GSAP, Three.js, and Vanta.js
 */

// ==========================================
// 1. VANTA.JS 3D NEURAL NETWORK BACKGROUND
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x38bdf8,         // Primary Cyan
        backgroundColor: 0x050914, // Deep Dark Base
        points: 14.00,
        maxDistance: 22.00,
        spacing: 16.00,
        showDots: true
    });
});

// ==========================================
// 2. GSAP ADVANCED ANIMATIONS
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// A. SplitType Header Animation (Cinematic Character Drop)
const textTitle = new SplitType('.split-title', { types: 'chars' });
gsap.from(textTitle.chars, {
    duration: 1.2,
    y: 50,
    opacity: 0,
    rotateX: -90,
    stagger: 0.04,
    ease: "back.out(1.5)",
    delay: 0.2
});

// B. Hero Elements Entry
gsap.from('.intro-tag', { opacity: 0, y: -20, duration: 1, delay: 0.8, ease: "power3.out" });
gsap.from('.hero-desc', { opacity: 0, x: -30, duration: 1, delay: 1, ease: "power3.out" });
gsap.from('.btn-group', { opacity: 0, y: 30, duration: 1, delay: 1.2, ease: "power3.out" });
gsap.from('.hero-img-container', { 
    opacity: 0, scale: 0.8, duration: 1.5, delay: 0.5, ease: "elastic.out(1, 0.7)" 
});

// C. ScrollTrigger Reveals for Sections
gsap.utils.toArray('.gsap-reveal').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// D. Staggered Skills Cards Reveal
gsap.from('.stagger-card', {
    scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.2)"
});

// ==========================================
// 3. DYNAMIC TYPING EFFECT
// ==========================================
const typingText = document.getElementById('typed-text');
const words = ["AI-Assisted Developer.", "Python & Django Engineer.", "React & Frontend Architect.", "System Optimizer."];
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

    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500;
    }
    setTimeout(typeEffect, typeSpeed);
}
setTimeout(typeEffect, 1500);

// ==========================================
// 4. HARDWARE CURSOR & MAGNETIC BUTTONS
// ==========================================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX; const posY = e.clientY;
        cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
    });

    // Expand on hover
    document.querySelectorAll('a, button, .glass-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px'; cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px'; cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Magnetic effect for contact buttons
    document.querySelectorAll('.hover-magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            gsap.to(btn, { x: x, y: y, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });
}

// ==========================================
// 5. 3D CARD TILT EFFECT & NAVBAR
// ==========================================
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; const y = e.clientY - rect.top;  
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10; 
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none'; 
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease';
    });
});

// Mobile Nav Logic
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-xmark');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').className = 'fa-solid fa-bars';
    });
});
window.addEventListener('scroll', () => {
    window.scrollY > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
});