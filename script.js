/**
 * ADVANCED MOTION ENGINE – Awais Raza Qadri Portfolio
 * Uses GSAP + ScrollTrigger for cinematic scroll animations,
 * Vanta.js for 3D background, custom cursor, typing, and more.
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================================
// 1.  VANTA.JS BACKGROUND (Birds for a dynamic feel)
// ============================================================
let vantaEffect = null;

function initVanta() {
  if (typeof VANTA !== 'undefined' && !vantaEffect) {
    vantaEffect = VANTA.BIRDS({
      el: '#vanta-bg',
      mouseControls: true,
      touchControls: false,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color1: 0x38bdf8,
      color2: 0xa855f7,
      backgroundColor: 0x0a0b12,
      birdSize: 0.8,
      wingSpan: 30,
      speedLimit: 6,
      separation: 20,
      alignment: 20,
      cohesion: 20,
      quantity: window.innerWidth < 768 ? 80 : 150,
    });
  }
}

// ============================================================
// 2.  CUSTOM CURSOR
// ============================================================
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (window.matchMedia('(pointer: fine)').matches && dot && ring) {
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX,
          y = e.clientY;
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    ring.animate({ left: x + 'px', top: y + 'px' }, { duration: 300, fill: 'forwards' });
  });

  // Enlarge ring on hover over interactive elements
  document.querySelectorAll('a, button, .glass-card, .skill-card, .channel').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.background = 'rgba(56, 189, 248, 0.04)';
      ring.style.borderColor = 'var(--accent-cyan)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '30px';
      ring.style.height = '30px';
      ring.style.background = 'transparent';
      ring.style.borderColor = 'var(--accent-purple)';
    });
  });
}

// ============================================================
// 3.  TYPING ANIMATION
// ============================================================
function initTyping() {
  const target = document.getElementById('typedText');
  if (!target) return;
  const lines = [
    'AI‑Assisted Systems Engineer.',
    'Python & Django Core Specialist.',
    'React UI Architect.',
    'Performance Optimizer.'
  ];
  let lineIndex = 0,
      charIndex = 0,
      isDeleting = false;

  function typeLoop() {
    const current = lines[lineIndex];
    if (isDeleting) {
      target.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      delay = 400;
    }

    setTimeout(typeLoop, delay);
  }

  setTimeout(typeLoop, 500);
}

// ============================================================
// 4.  SCROLL PROGRESS BAR
// ============================================================
function updateScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  bar.style.width = progress + '%';
}

// ============================================================
// 5.  3D TILT EFFECT ON CARDS (Desktop only)
// ============================================================
function initTilt() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll('.glass-card, .skill-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out' });
    });
  });
}

// ============================================================
// 6.  MOBILE MENU TOGGLE
// ============================================================
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      toggle.classList.remove('active');
      links.classList.remove('open');
    }
  });
}

// ============================================================
// 7.  GSAP CINEMATIC SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  // Hero entrance
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.from('.navbar', { y: -60, opacity: 0, duration: 1 })
    .from('.hero-badge', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.hero-title .title-line', { y: 40, opacity: 0, stagger: 0.2, duration: 0.9 }, '-=0.4')
    .from('.hero-typing', { y: 20, opacity: 0, duration: 0.8 }, '-=0.3')
    .from('.hero-desc', { y: 20, opacity: 0, duration: 0.8 }, '-=0.2')
    .from('.hero-actions .btn', { y: 20, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.2')
    .from('.hero-visual', { scale: 0.8, opacity: 0, duration: 1 }, '-=1');

  // Sections: header and cards
  document.querySelectorAll('.section:not(#hero)').forEach((section) => {
    const header = section.querySelector('.section-header');
    const cards = section.querySelectorAll('.glass-card, .skill-card, .timeline-item, .about-stats .stat-item');

    if (header) {
      gsap.from(header, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    if (cards.length) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out'
      });
    }
  });

  // Skill list items (dot + text) staggered
  gsap.from('.skill-list li', {
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    },
    x: -20,
    opacity: 0,
    stagger: 0.06,
    duration: 0.6,
    ease: 'power2.out'
  });

  // Animated counter for stats
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = parseInt(el.getAttribute('data-count')) || 0;
    gsap.from(el, {
      scrollTrigger: {
        trigger: el.closest('.stat-item'),
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function () {
        el.textContent = Math.floor(this.targets()[0].textContent);
      }
    });
  });
}

// ============================================================
// 8.  NAVBAR SCROLL EFFECT
// ============================================================
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ============================================================
// 9.  INITIALISE EVERYTHING ON DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Vanta may take a moment; we can init after a tiny delay to let DOM paint
  setTimeout(initVanta, 100);
  initTyping();
  initTilt();
  initMobileMenu();
  initScrollAnimations();
  initNavbarScroll();

  // Scroll progress on every scroll
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress(); // initial call
});

// Handle window resize to refresh ScrollTrigger (optional)
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});