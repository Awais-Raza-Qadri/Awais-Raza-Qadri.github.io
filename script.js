/**
 * AWAIS RAZA QADRI - PRODUCTION ENGINE
 */

// ==========================================
// 1. VANTA.JS 3D BACKGROUND ENGINE
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: false, // Turned off on touch targets to ensure layout swiping works cleanly
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x38bdf8,
            backgroundColor: 0x050914,
            points: window.innerWidth < 768 ? 9.00 : 14.00, // Reduced workload footprint on smaller viewport sizes
            maxDistance: 20.00,
            spacing: 16.00,
            showDots: true
        });
    }
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
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8; 
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            card.style.transition = 'none'; 
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.4s ease';
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

    // Close menu when clicking individual navigation tabs
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-bars';
            }
        });
    });

    // Close menu when tapping anywhere outside layout links area
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-bars';
            }
        }
    });
}

// Adjust navigation bar visibility on desktop scroll
window.addEventListener('scroll', () => {
    if (navbar) {
        window.scrollY > 40 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
    }
});