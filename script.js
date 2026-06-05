/**
 * AWAIS RAZA QADRI - PORTFOLIO ENGINE
 * Handles Cursor, Typing Effects, 3D Tilt, Scroll Animations, and Canvas Particles.
 */

// ==========================================
// 1. CUSTOM HARDWARE CURSOR LOGIC
// ==========================================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

// Only initialize if the user is on a desktop/device with a fine pointer
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with a slight smooth delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Expand cursor when hovering over interactive elements
    document.querySelectorAll('a, button, .glass-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// ==========================================
// 2. DYNAMIC TYPING EFFECT
// ==========================================
const typingText = document.getElementById('typed-text');
const words = [
    "AI-Assisted Developer.", 
    "Python & Django Engineer.", 
    "UI/UX Implementer.", 
    "System Optimizer."
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Dynamic speeds for realistic typing
    let typeSpeed = isDeleting ? 50 : 100;

    // Pause logic at ends of words
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end before deleting
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Move to next word
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}
// Initiate typing effect 1 second after load
setTimeout(typeEffect, 1000);

// ==========================================
// 3. 3D CARD TILT EFFECT
// ==========================================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation limits (max 10 degrees)
        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        // Reset card when mouse leaves
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseenter', () => {
        // Remove transition delay for immediate mouse tracking
        card.style.transition = 'none'; 
    });
});

// ==========================================
// 4. MOBILE NAVIGATION & SCROLL NAVBAR
// ==========================================
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

// Toggle mobile menu dropdown
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').className = 'fa-solid fa-bars';
    });
});

// Add shadow/background to navbar when scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// 5. INTERSECTION OBSERVER (Scroll Reveal)
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Unobserve after revealing to prevent repeating animation
            // revealObserver.unobserve(entry.target); 
        }
    });
}, { 
    threshold: 0.15 // Triggers when 15% of the element is visible
});

revealElements.forEach(el => revealObserver.observe(el));

// ==========================================
// 6. HIGH-PERFORMANCE PARTICLE PHYSICS ENGINE
// ==========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let width, height, particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        // Theming color matching CSS var(--primary)
        this.color = `rgba(56, 189, 248, ${Math.random() * 0.5 + 0.1})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off canvas edges
        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;

        // Mouse Parallax Repulsion Interaction
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            // Push particles away slightly if cursor is close
            if (distance < 150) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    // Optimize count based on screen size to maintain 60fps on mobile
    const particleCount = window.innerWidth < 768 ? 40 : 80; 
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Draw connecting constellation lines
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            // Connect if close enough
            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 - distance/1200})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

// Canvas Event Listeners
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x; 
    mouse.y = e.y;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null; 
    mouse.y = null;
});

// Boot the Canvas Engine
resizeCanvas();
initParticles();
animateParticles();