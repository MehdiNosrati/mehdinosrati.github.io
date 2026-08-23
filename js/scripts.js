/**
 * PORTFOLIO SCRIPTS - MAHDI NOSRATI SAHLAN (mahdins.dev)
 * Interactive Canvas, 3D Physics, Cyber Terminal, Scrambler & Motion Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTextScramble();
  initDynamicRoles();
  initCard3DTilt();
  initTimelineLaser();
  initSkillsFilter();
  initMetricsCounter();
  initCyberTerminal();
  initCustomCursor();
  initScrollSpy();
  initCopyEmail();
  initScrollProgress();
  initScrollTop();
  initMobileMenu();
  initAudioSynthesizer();
});

/* ==========================================================================
   1. INTERACTIVE CANVAS PARTICLE CONSTELLATION
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.8;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = (Math.random() * 20) + 1;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.color = Math.random() > 0.6 ? '#00f0ff' : (Math.random() > 0.5 ? '#9d4edd' : '#38bdf8');
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = (dx / distance) * force * this.density;
          const directionY = (dy / distance) * force * this.density;
          this.x -= directionX * 0.6;
          this.y -= directionY * 0.6;
        }
      }
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 11000), 100);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDist = 130;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          let opacity = (1 - (dist / maxDist)) * 0.18;
          ctx.strokeStyle = '#00f0ff';
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
      particles[i].update();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }

  resize();
  animate();
}

/* ==========================================================================
   2. TEXT SCRAMBLE / DECRYPTION EFFECT
   ========================================================================== */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________010101';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span style="color:var(--accent-cyan)">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function initTextScramble() {
  const el = document.querySelector('.scramble-target');
  if (!el) return;
  const scrambler = new TextScramble(el);
  const targetText = el.getAttribute('data-original-text') || el.innerText;
  scrambler.setText(targetText);

  el.addEventListener('mouseenter', () => {
    scrambler.setText(targetText);
  });
}

/* ==========================================================================
   3. DYNAMIC ROTATING ROLES
   ========================================================================== */
function initDynamicRoles() {
  const roleEl = document.querySelector('.dynamic-role');
  if (!roleEl) return;

  const roles = [
    "Software Engineer @ Google",
    "Android & Mobile Systems Specialist",
    "High-Concurrency Architecture",
    "Server-Driven UI & Performance Tinkerer",
    "Fullstack & Distributed Systems Dev"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      roleEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      roleEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. 3D TILT PHYSICS FOR CARDS
   ========================================================================== */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card, .code-card-3d, .project-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });
}

/* ==========================================================================
   5. TIMELINE LASER PROGRESS INDICATOR
   ========================================================================== */
function initTimelineLaser() {
  const timeline = document.querySelector('.timeline-container');
  const laserGlow = document.querySelector('.timeline-line-glow');
  if (!timeline || !laserGlow) return;

  function updateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight && rect.bottom > 0) {
      const totalHeight = rect.height;
      const visibleScrolled = Math.max(0, windowHeight * 0.7 - rect.top);
      const percentage = Math.min(100, Math.max(0, (visibleScrolled / totalHeight) * 100));
      laserGlow.style.height = `${percentage}%`;
    }
  }

  window.addEventListener('scroll', updateTimeline, { passive: true });
  updateTimeline();
}

/* ==========================================================================
   6. SKILLS MATRIX FILTER
   ========================================================================== */
function initSkillsFilter() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-node-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   7. METRICS COUNTER ANIMATION
   ========================================================================== */
function initMetricsCounter() {
  const counters = document.querySelectorAll('.metric-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 1600;
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          count = Math.floor(easeProgress * target);
          counter.textContent = count + suffix;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            counter.textContent = target + suffix;
          }
        }

        requestAnimationFrame(step);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   8. CYBER TERMINAL CLI MODAL & EASTER EGGS
   ========================================================================== */
function initCyberTerminal() {
  const overlay = document.getElementById('terminal-modal');
  const openBtns = document.querySelectorAll('.btn-terminal-trigger');
  const closeBtn = document.querySelector('.terminal-close-btn');
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');

  if (!overlay || !input || !body) return;

  function openTerminal() {
    overlay.classList.add('open');
    input.focus();
    playBlipSound(600);
  }

  function closeTerminal() {
    overlay.classList.remove('open');
  }

  openBtns.forEach(btn => btn.addEventListener('click', openTerminal));
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeTerminal();
  });

  // Shortcut ⌘K / Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('open')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeTerminal();
    }
  });

  const commands = {
    help: () => `
Available Commands:
  <span style="color:var(--accent-cyan)">about</span>        - Summary bio & current status
  <span style="color:var(--accent-cyan)">experience</span>   - Career history & key impacts
  <span style="color:var(--accent-cyan)">projects</span>     - List featured software projects
  <span style="color:var(--accent-cyan)">skills</span>       - Core tech stack & engineering specialties
  <span style="color:var(--accent-cyan)">contact</span>      - Get email, LinkedIn, and social profiles
  <span style="color:var(--accent-cyan)">sudo hire</span>    - The ultimate hiring command 🚀
  <span style="color:var(--accent-cyan)">matrix</span>       - Toggle matrix rain mode 🟢
  <span style="color:var(--accent-cyan)">clear</span>        - Clear terminal output
  <span style="color:var(--accent-cyan)">exit</span>         - Close terminal session
`,
    about: () => `
<strong style="color:#fff">Mahdi Nosrati Sahlan</strong>
Software Engineer @ Google (Google Play).
Passionate about high-scale distributed systems, Android/mobile architecture, Server-Driven UI (SDUI), and building resilient user experiences.
`,
    experience: () => `
[2022 - Present]  <span style="color:var(--accent-green)">Google</span> - Software Engineer (Google Play)
[2021 - 2022]     <span style="color:var(--accent-cyan)">Yelp</span> - Software Engineer (Ads & SDUI Infrastructure)
[2020 - 2021]     <span style="color:var(--accent-purple)">Parsly Labs</span> - Software Engineer (Quarkus, PostgreSQL, Flutter)
[2019 - 2020]     <span style="color:var(--accent-amber)">Hamsaa</span> - Android Developer (XMPP Chat Engine, 60% APK Reduction)
[2018 - 2019]     <span>Arman Rayan Sharif</span> - Frontend Developer
`,
    projects: () => `
1. <strong style="color:var(--accent-cyan)">Hamsaa Messenger</strong> - Enterprise XMPP communication suite (Java, Kotlin, WebSockets)
2. <strong style="color:var(--accent-cyan)">Div-Square</strong> - FourSquare offline-first client (Kotlin, Koin, Coroutines)
3. <strong style="color:var(--accent-cyan)">SDUI & Component Preview</strong> - Yelp dynamic mobile rendering engine
4. <strong style="color:var(--accent-cyan)">Parsly Food Analytics</strong> - Scalable foodtech data pipelines & Flutter app
`,
    skills: () => `
• <strong>Languages:</strong> Kotlin, Java, Dart, TypeScript, JavaScript, Python, SQL
• <strong>Mobile:</strong> Android SDK, Jetpack Compose, Flutter, Reactive Streams, SDUI
• <strong>Backend & Data:</strong> Quarkus, Spring, Node.js, PostgreSQL, Room, gRPC, WebSockets
• <strong>Methodologies:</strong> Distributed Systems, Clean Architecture, CI/CD, Automated Testing
`,
    contact: () => `
• <strong>Email:</strong> mehdinosratisahlan@gmail.com
• <strong>GitHub:</strong> <a href="https://github.com/mehdinosrati" target="_blank" style="color:var(--accent-cyan)">github.com/mehdinosrati</a>
• <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mehdinosratisahlan/" target="_blank" style="color:var(--accent-cyan)">linkedin.com/in/mehdinosratisahlan</a>
• <strong>Twitter/X:</strong> <a href="https://twitter.com/mns_txt" target="_blank" style="color:var(--accent-cyan)">@mns_txt</a>
• <strong>StackOverflow:</strong> <a href="https://stackoverflow.com/users/9720499/mehdi-nosrati" target="_blank" style="color:var(--accent-cyan)">Mahdi Nosrati</a>
`,
    'sudo hire': () => {
      triggerCelebration();
      return `<span style="color:var(--accent-green)">[ACCESS GRANTED]</span> Initializing partnership protocol... Let's build something world-class together! Check your inbox or reach out at mehdinosratisahlan@gmail.com 🚀`;
    },
    matrix: () => {
      toggleMatrixRain();
      return `<span style="color:var(--accent-green)">Matrix mode toggled. Follow the white rabbit... 🐇</span>`;
    },
    clear: () => {
      body.innerHTML = '';
      return null;
    },
    exit: () => {
      closeTerminal();
      return 'Session ended.';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = input.value.trim();
      if (!rawInput) return;

      const cmd = rawInput.toLowerCase();
      
      // Output user command
      const cmdRow = document.createElement('div');
      cmdRow.className = 'terminal-output-line';
      cmdRow.innerHTML = `<span class="terminal-prompt-sign">visitor@mahdins:~$</span> <span style="color:#fff">${escapeHTML(rawInput)}</span>`;
      body.appendChild(cmdRow);

      // Execute command
      if (commands[cmd]) {
        const result = commands[cmd]();
        if (result !== null) {
          const resRow = document.createElement('div');
          resRow.className = 'terminal-output-line';
          resRow.innerHTML = result;
          body.appendChild(resRow);
        }
      } else {
        const errorRow = document.createElement('div');
        errorRow.className = 'terminal-output-line';
        errorRow.innerHTML = `<span style="color:#ff5f56">Command not found: '${escapeHTML(rawInput)}'. Type '<span style="color:var(--accent-cyan)">help</span>' for available commands.</span>`;
        body.appendChild(errorRow);
      }

      input.value = '';
      body.scrollTop = body.scrollHeight;
      playBlipSound(800);
    }
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}

/* ==========================================================================
   9. CUSTOM MAGNETIC CURSOR
   ========================================================================== */
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  const interactiveElements = document.querySelectorAll('a, button, input, .glass-card, .skill-node-card, .btn-terminal-trigger');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ==========================================================================
   10. SCROLL SPY & HEADER SHADOW
   ========================================================================== */
function initScrollSpy() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   11. COPY EMAIL & TOAST NOTIFICATION
   ========================================================================== */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn, .quick-copy-email');
  const toast = document.getElementById('toast-notification');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'mehdinosratisahlan@gmail.com';

      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
        playBlipSound(900);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

/* ==========================================================================
   12. SCROLL PROGRESS BAR & SCROLL TO TOP
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playBlipSound(1000);
  });
}

/* ==========================================================================
   13. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

/* ==========================================================================
   14. WEB AUDIO SYNTHESIZER (OPTIONAL SOUND FX)
   ========================================================================== */
let audioCtx = null;
function playBlipSound(freq = 600) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {
    // AudioContext blocked or not supported
  }
}

function initAudioSynthesizer() {
  document.addEventListener('click', () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }, { once: true });
}

/* ==========================================================================
   15. EASTER EGGS: CELEBRATION CONFETTI & MATRIX RAIN
   ========================================================================== */
function triggerCelebration() {
  const count = 50;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = `${Math.random() * 100}vw`;
    el.style.top = '-20px';
    el.style.width = '8px';
    el.style.height = '8px';
    el.style.backgroundColor = ['#00f0ff', '#9d4edd', '#00ff9d', '#ffb703', '#ff007f'][Math.floor(Math.random() * 5)];
    el.style.borderRadius = '50%';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    el.style.transition = `transform ${Math.random() * 2 + 1.5}s cubic-bezier(0.25, 1, 0.5, 1), opacity 2s ease`;
    document.body.appendChild(el);

    setTimeout(() => {
      el.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`;
      el.style.opacity = '0';
    }, 20);

    setTimeout(() => el.remove(), 3500);
  }
}

let matrixActive = false;
let matrixInterval = null;
function toggleMatrixRain() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (matrixActive) {
    matrixActive = false;
    clearInterval(matrixInterval);
    initParticleCanvas();
    return;
  }

  matrixActive = true;
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;
  const letters = '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/<>~';
  const fontSize = 16;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);

  matrixInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(8, 9, 13, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00ff9d';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, 33);
}
