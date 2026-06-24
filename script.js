/* ============================================================
   AWAIS RAZA QADRI — PORTFOLIO ENGINE (redesigned)
   ============================================================ */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
const isFinePointer = window.matchMedia("(pointer: fine)").matches

/* ----------------------------------------------------------
   1. CONSTELLATION CANVAS BACKGROUND
---------------------------------------------------------- */
;(() => {
  const canvas = document.getElementById("constellation")
  if (!canvas || prefersReduced) return
  const ctx = canvas.getContext("2d")
  let w, h, points
  const mouse = { x: -9999, y: -9999 }

  const palette = ["94, 234, 212", "56, 189, 248"]

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
    const count = Math.min(90, Math.floor((w * h) / 16000))
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      c: palette[Math.floor(Math.random() * palette.length)],
    }))
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)
    for (let i = 0; i < points.length; i++) {
      const p = points[i]
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1

      // mouse repulsion
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.hypot(dx, dy)
      if (dist < 130) {
        p.x += (dx / dist) * 1.4
        p.y += (dy / dist) * 1.4
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.c}, 0.8)`
      ctx.fill()

      for (let j = i + 1; j < points.length; j++) {
        const q = points[j]
        const d = Math.hypot(p.x - q.x, p.y - q.y)
        if (d < 130) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(q.x, q.y)
          ctx.strokeStyle = `rgba(${p.c}, ${0.16 * (1 - d / 130)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }
    requestAnimationFrame(draw)
  }

  window.addEventListener("resize", resize)
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })
  resize()
  draw()
})()

/* ----------------------------------------------------------
   2. CUSTOM CURSOR + MAGNETIC BUTTONS (desktop)
---------------------------------------------------------- */
;(() => {
  if (!isFinePointer) return
  const dot = document.getElementById("cursorDot")
  const ring = document.getElementById("cursorRing")
  if (!dot || !ring) return

  let rx = 0, ry = 0, mx = 0, my = 0
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX
    my = e.clientY
    dot.style.left = mx + "px"
    dot.style.top = my + "px"
  })

  function followRing() {
    rx += (mx - rx) * 0.18
    ry += (my - ry) * 0.18
    ring.style.left = rx + "px"
    ring.style.top = ry + "px"
    requestAnimationFrame(followRing)
  }
  followRing()

  document.querySelectorAll("a, button, .card, .skill-card, .t-card").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"))
    el.addEventListener("mouseleave", () => ring.classList.remove("hover"))
  })

  // Magnetic effect
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left - r.width / 2
      const y = e.clientY - r.top - r.height / 2
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
    })
    el.addEventListener("mouseleave", () => {
      el.style.transform = ""
    })
  })
})()

/* ----------------------------------------------------------
   3. TYPING EFFECT
---------------------------------------------------------- */
;(() => {
  const el = document.getElementById("typed")
  if (!el) return
  const words = [
    "Full-Stack Developer.",
    "Python & Django Engineer.",
    "AI-Assisted Builder.",
    "Docker & MySQL Operator.",
  ]
  let wi = 0, ci = 0, deleting = false

  function tick() {
    const word = words[wi]
    el.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1)
    ci += deleting ? -1 : 1

    let speed = deleting ? 45 : 85
    if (!deleting && ci === word.length) {
      speed = 1700
      deleting = true
    } else if (deleting && ci === 0) {
      deleting = false
      wi = (wi + 1) % words.length
      speed = 350
    }
    setTimeout(tick, speed)
  }
  setTimeout(tick, 700)
})()

/* ----------------------------------------------------------
   4. SCROLL REVEAL + ANIMATED COUNTERS
---------------------------------------------------------- */
;(() => {
  const reveals = document.querySelectorAll(".reveal")
  const counters = document.querySelectorAll(".stat-num")

  function runCounter(node) {
    const target = Number(node.dataset.count)
    const dur = 1400
    const start = performance.now()
    function step(now) {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      node.textContent = Math.round(eased * target)
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  if (!("IntersectionObserver" in window) || prefersReduced) {
    reveals.forEach((r) => r.classList.add("in"))
    counters.forEach((c) => (c.textContent = c.dataset.count))
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in")
          if (entry.target.classList.contains("hero-text")) {
            counters.forEach(runCounter)
          }
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  reveals.forEach((r) => io.observe(r))
})()

/* ----------------------------------------------------------
   5. NAV: scroll state, mobile menu, scroll progress
---------------------------------------------------------- */
;(() => {
  const navbar = document.getElementById("navbar")
  const menuBtn = document.getElementById("menuBtn")
  const navLinks = document.getElementById("navLinks")
  const progress = document.getElementById("scrollProgress")

  function onScroll() {
    const y = window.scrollY
    if (navbar) navbar.classList.toggle("scrolled", y > 40)
    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + "%"
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  onScroll()

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      const open = navLinks.classList.toggle("open")
      menuBtn.classList.toggle("open", open)
      menuBtn.setAttribute("aria-expanded", String(open))
    })
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open")
        menuBtn.classList.remove("open")
        menuBtn.setAttribute("aria-expanded", "false")
      })
    )
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove("open")
        menuBtn.classList.remove("open")
        menuBtn.setAttribute("aria-expanded", "false")
      }
    })
  }
})()

/* ----------------------------------------------------------
   6. ACTIVE NAV LINK HIGHLIGHT
---------------------------------------------------------- */
;(() => {
  const sections = document.querySelectorAll("section[id]")
  const links = document.querySelectorAll(".nav-link")
  if (!sections.length || !("IntersectionObserver" in window)) return

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          links.forEach((l) =>
            l.style.setProperty(
              "color",
              l.getAttribute("href") === "#" + id ? "var(--text)" : ""
            )
          )
        }
      })
    },
    { threshold: 0.5 }
  )
  sections.forEach((s) => io.observe(s))
})()
