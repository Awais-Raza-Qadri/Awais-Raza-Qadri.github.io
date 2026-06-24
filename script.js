/**
 * AWAIS RAZA QADRI - ADVANCED PRODUCTION ENGINE
 * Upgraded with GSAP Motion Graphics Framework & Hardware Visual Optimizations
 */

// Global Registration of GSAP Mechanics
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 1. 3D IMMERSIVE CANVAS INIT (VANTA ENGINE)
// ==========================================================================
let vantaInstance = null;

function launchVantaMatrix() {
    if (typeof VANTA !== 'undefined' && !vantaInstance) {
        vantaInstance = VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: false, // Performance freeze on layout interaction tracking
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x38bdf8,
            backgroundColor: 0x030712,
            points: window.innerWidth < 768 ? 8.00 : 15.00, // Light footprint logic for mobile devices
            maxDistance: 22.00,
            spacing: 16.00,
            showDots: true
        });
    }
}

// ==========================================================================
// 2. DYNAMIC LIVE SCROLL METRIC INDICATOR
// ==========================================================================
function updateScrollMetric() {
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressRatio = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progressRatio}%`;
    }
}

// ==========================================================================
// 3. CONTINUOUS TEXT STREAM TYPING LOGIC
// ==========================================================================
function triggerTerminalTyping() {
    const targetElement = document.getElementById('typed-text');
    if (!targetElement) return;

    const streamArray = [
        "AI-Assisted Systems Engineer.",
        "Python & Django Core Specialist.",
        "React UI Layout Implementer.",
        "Application Performance Optimizer."
    ];
    
    let currentLine = 0;
    let characterIndex = 0;
    let erasureState = false;

    function runTypingLoop() {
        const fullText = streamArray[currentLine];
        
        if (erasureState) {
            targetElement.textContent = fullText.substring(0, characterIndex - 1);
            characterIndex--;
        } else {
            targetElement.textContent = fullText.substring(0, characterIndex + 1);
            characterIndex++;
        }

        let loopTimeout = erasureState ? 35 : 75;

        if (!erasureState && characterIndex === fullText.length) {
            loopTimeout = 2000; // Standby duration on complete string
            erasureState = true;
        } else if (erasureState && characterIndex === 0) {
            erasureState = false;
            currentLine = (currentLine + 1) % streamArray.length;
            loopTimeout = 400; // Intermediary pause window before line shift
        }

        setTimeout(runTypingLoop, loopTimeout);
    }
    
    setTimeout(runTypingLoop, 600);
}

// ==========================================================================
// 4. PARALLAX 3D HARDWARE TILT MATHEMATICS (DESKTOP FINE-POINTERS ONLY)
// ==========================================================================
function applyHardwareTilt() {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.querySelectorAll('.tilt-element').forEach(card => {
        card.addEventListener('mousemove', (event) => {
            const viewportRect = card.getBoundingClientRect();
            const mouseX = event.clientX - viewportRect.left;
            const mouseY = event.clientY - viewportRect.top;

            // Normalize coordinate vectors (-1 to 1 space)
            const angleX = ((mouseY - viewportRect.height / 2) / (viewportRect.height / 2)) * -10;
            const angleY = ((mouseX - viewportRect.width / 2) / (viewportRect.width / 2)) * 10;

            gsap.to(card, {
                rotationX: angleX,
                rotationY: angleY,
                scale: 1.015,
                transformPerspective: 1200,
                ease: "power2.out",
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                ease: "power3.out",
                duration: 0.6
            });
        });
    });
}

// ==========================================================================
// 5. INTERACTIVE LIVE CURSOR PARALLAX TRACKER (DESKTOP ONLY)
// ==========================================================================
function runLiveCursorTracker() {
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    
    if (!window.matchMedia("(pointer: fine)").matches || !dot || !outline) return;

    window.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;

        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;

        outline.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 350, fill: "forwards" });
    });

    // Cursor element mutations on layout object overlap
    document.querySelectorAll('a, button, .cyber-card, .f-tag').forEach(interactiveElement => {
        interactiveElement.addEventListener('mouseenter', () => {
            outline.style.width = '50px';
            outline.style.height = '50px';
            outline.style.backgroundColor = 'rgba(56, 189, 248, 0.05)';
            outline.style.borderColor = 'var(--primary-neon)';
        });
        interactiveElement.addEventListener('mouseleave', () => {
            outline.style.width = '34px';
            outline.style.height = '34px';
            outline.style.backgroundColor = 'transparent';
            outline.style.borderColor = 'var(--secondary-neon)';
        });
    });
}

// ==========================================================================
// 6. OVERLAY RESPONSE NAVIGATION GATEWAY (MOBILE)
// ==========================================================================
function setupMobileMenuMatrix() {
    const toggleButton = document.getElementById('menuBtn');
    const targetLinks = document.getElementById('navLinks');
    const hostNavbar = document.getElementById('navbar');

    if (!toggleButton || !targetLinks) return;

    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation();
        targetLinks.classList.toggle('active');
        
        // Morph button layout state
        const lines = toggleButton.querySelectorAll('.menu-bar');
        if (targetLinks.classList.contains('active')) {
            lines[0].style.transform = 'translateY(8px) rotate(45deg)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });

    // Close on navigation link choice
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            targetLinks.classList.remove('active');
            toggleButton.querySelectorAll('.menu-bar').forEach(b => b.style.transform = 'none');
            toggleButton.querySelectorAll('.menu-bar')[1].style.opacity = '1';
        });
    });

    // Layout close override hook
    document.addEventListener('click', (event) => {
        if (!targetLinks.contains(event.target) && !toggleButton.contains(event.target)) {
            targetLinks.classList.remove('active');
            toggleButton.querySelectorAll('.menu-bar').forEach(b => b.style.transform = 'none');
            toggleButton.querySelectorAll('.menu-bar')[1].style.opacity = '1';
        }
    });

    // Sticky scroll layout morph adjustments
    window.addEventListener('scroll', () => {
        if (hostNavbar) {
            window.scrollY > 40 ? hostNavbar.classList.add('scrolled') : hostNavbar.classList.remove('scrolled');
        }
    });
}

// ==========================================================================
// 7. HIGH-END CINEMATIC MOTION GRAPHICS ENGINE (GSAP + SCROLLTRIGGER)
// ==========================================================================
function executeCinematicOrchestration() {
    // Initial stage core animation layout
    const stageTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    stageTimeline.from("#navbar", { y: -80, opacity: 0, duration: 1.2 })
                 .from(".animate-init", {
                     y: 50, opacity: 0, duration: 1, stagger: 0.15
                 }, "-=0.6");

    // Dynamic Section Scroll Scrape Loops
    document.querySelectorAll('section:not(#hero)').forEach(activeSection => {
        const blockHeader = activeSection.querySelector('.section-header');
        const internalCards = activeSection.querySelectorAll('.dynamic-trigger, .cyber-card');

        if (blockHeader) {
            gsap.from(blockHeader, {
                scrollTrigger: {
                    trigger: activeSection,
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                },
                y: 35, opacity: 0, duration: 0.8, ease: "power3.out"
            });
        }

        if (internalCards.length > 0) {
            gsap.from(internalCards, {
                scrollTrigger: {
                    trigger: activeSection,
                    start: "top 78%",
                    toggleActions: "play none none reverse"
                },
                y: 50, opacity: 0, duration: 0.9, stagger: 0.18, ease: "power4.out"
            });
        }
    });

    // Skill Tag Sequential Laser Reveal
    gsap.from(".f-tag", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 70%"
        },
        scale: 0.75, opacity: 0, duration: 0.5, stagger: 0.04, ease: "back.out(2)"
    });
}

// ==========================================================================
// CORE INITIALIZATION GATEWAY
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
    launchVantaMatrix();
    triggerTerminalTyping();
    applyHardwareTilt();
    runLiveCursorTracker();
    setupMobileMenuMatrix();
    executeCinematicOrchestration();
});

window.addEventListener('scroll', updateScrollMetric);