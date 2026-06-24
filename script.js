/**
 * AWAIS RAZA QADRI - FULL MOTION PRODUCTION ENGINE
 * Maximum aggression, fully detailed motion graphics.
 */

/* ==========================================
   0. PRELOADER & PROGRESS BAR
   ========================================== */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 900);

    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.addEventListener('transitionend', () => preloader.remove());
    }
});

// Scroll progress bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('scrollProgress').style.width = progress + '%';
});

/* ==========================================
   1. VANTA.JS 3D BACKGROUND
   ========================================== */
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
});

/* ==========================================
   2. HARDWARE CURSOR (DESKTOP)
   ========================================== */
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

    const hoverTargets = document.querySelectorAll('a, button, .glass-card, .tilt-card');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

/* ==========================================
   3. MOUSE TRAIL (DESKTOP)
   ========================================== */
const canvas = document.getElementById('mouseTrail');
if (canvas && window.matchMedia("(pointer: fine)").matches) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let trailPoints = [];
    const maxTrail = 30;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        trailPoints.push({ x: e.clientX, y: e.clientY, age: 0 });
        if (trailPoints.length > maxTrail) trailPoints.shift();
    });

    function drawTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        trailPoints.forEach((point, i) => {
            point.age += 1;
            const alpha = 1 - point.age / maxTrail;
            const radius = 3 + (i / maxTrail) * 2;
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.5})`;
            ctx.fill();
        });

        // Remove old points
        trailPoints = trailPoints.filter(p => p.age < maxTrail);
        requestAnimationFrame(drawTrail);
    }

    drawTrail();
}

/* ==========================================
   4. TYPING EFFECT
   ========================================== */
const typingText = document.getElementById('typed-text');
if (typingText) {
    const words = ["AI-Assisted Developer.", "Python & Django Engineer.", "React UI Implementer.", "System Optimizer."];
    let wordIndex = 0,
        charIndex = 0,
        isDeleting = false;

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
            typeSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 800);
}

/* ==========================================
   5. 3D TILT EFFECT (DESKTOP)
   ========================================== */
if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.4s ease';
        });
    });
}

/* ==========================================
   6. MAGNETIC BUTTONS
   ========================================== */
if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            btn.style.transition = 'transform 0.1s ease-out';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.3s ease';
        });
    });
}

/* ==========================================
   7. PARTICLE BURST ON CLICK
   ========================================== */
const particleContainer = document.getElementById('particleBurstContainer');
if (particleContainer) {
    document.addEventListener('click', (e) => {
        if (e.target.closest('a, button, .glass-card, input, textarea')) return;

        const count = window.innerWidth < 768 ? 8 : 18;
        const x = e.clientX;
        const y = e.clientY;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('span');
            const size = Math.random() * 10 + 3;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 80 + 30;
            particle.style.cssText = `
                position: absolute; top: ${y}px; left: ${x}px;
                width: ${size}px; height: ${size}px;
                background: ${Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)'};
                border-radius: 50%; pointer-events: none;
                transform: translate(-50%, -50%) scale(0);
                animation: particleOut 0.7s ease-out forwards;
                --tx: ${Math.cos(angle) * distance}px;
                --ty: ${Math.sin(angle) * distance}px;
            `;
            particleContainer.appendChild(particle);
            particle.addEventListener('animationend', () => particle.remove());
        }
    });
}

// Dynamic particle keyframes (already in CSS via style tag, but we'll inject if not present)
if (!document.querySelector('style[data-burst]')) {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-burst', '');
    styleEl.textContent = `
        @keyframes particleOut {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(styleEl);
}

/* ==========================================
   8. MOBILE NAVIGATION
   ========================================== */
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

// Navbar scrolled
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
});

/* ==========================================
   9. ACTIVE SCROLL SPY
   ========================================== */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ==========================================
   10. GSAP SCROLL-TRIGGERED ANIMATIONS (MAX AGGRESSION)
   ========================================== */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Fade up section titles with split letter effect (if possible, we'll just animate the whole title)
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none none' },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
    });
});

// Glass cards stagger with scale pop
gsap.utils.toArray('.glass-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        ease: 'back.out(1.2)',
    });
});

// Skill tags: pop sequentially per category
document.querySelectorAll('.skill-category').forEach(category => {
    const tags = category.querySelectorAll('.skill-tag');
    gsap.from(tags, {
        scrollTrigger: { trigger: category, start: 'top 85%', toggleActions: 'play none none none' },
        y: 30,
        opacity: 0,
        stagger: 0.04,
        duration: 0.5,
        ease: 'back.out(1.7)',
    });
});

// Timeline items slide from alternate sides
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' },
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
    });
});

// Timeline vertical line growth (experience & education)
document.querySelectorAll('.timeline-vertical-line').forEach(line => {
    gsap.fromTo(line,
        { scaleY: 0 },
        {
            scaleY: 1,
            transformOrigin: 'top',
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: line.parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// Contact items stagger
gsap.from('.contact-item', {
    scrollTrigger: { trigger: '.contact-box', start: 'top 90%', toggleActions: 'play none none none' },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.6,
    ease: 'power2.out',
});

// Hero image parallax on scroll
gsap.to('.hero-img-container', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
    },
    y: -60,
    opacity: 1,
});

// Scroll indicator hide after scroll
gsap.to('.scroll-indicator', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    },
    opacity: 0,
    y: 20,
});

// Split text animation on about section (manual class 'split-text')
gsap.utils.toArray('.split-text').forEach(text => {
    gsap.from(text, {
        scrollTrigger: { trigger: text, start: 'top 90%', toggleActions: 'play none none none' },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power1.out',
    });
});

/* ==========================================
   11. PARALLAX NOISE OVERLAY (SCROLL)
   ========================================== */
const noiseOverlay = document.querySelector('.noise-overlay');
if (noiseOverlay) {
    window.addEventListener('scroll', () => {
        noiseOverlay.style.transform = `translateY(${window.scrollY * 0.03}px)`;
    });
}