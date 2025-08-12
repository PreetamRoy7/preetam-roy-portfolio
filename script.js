/* ========== GLOBAL UI & EFFECTS ========== */

/* Smooth scroll */
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* Dark mode toggle (persisted) */
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  toggleBtn.textContent = '☀️';
}
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const theme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
});

/* Fade-in on scroll for sections and cards */
const fadeTargets = document.querySelectorAll('.fade-target, .project-card, .skill-card');
fadeTargets.forEach(el => el.classList.add('fade-in'));
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeTargets.forEach(el => fadeObserver.observe(el));

/* Contact form simple handler */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    // Form will POST to Formspree (or formsubmit). This just gives a friendly UX.
    // If you want client-side validation or AJAX, we can add it later.
    setTimeout(() => {
      // allow Formspree to do the heavy lifting
    }, 200);
  });
}

/* Typewriter tagline */
const taglineEl = document.getElementById('tagline');
const taglineText = "Front End & Back End Developer | Game Developer";
let tIndex = 0;
function typeEffect() {
  if (tIndex < taglineText.length) {
    taglineEl.textContent += taglineText.charAt(tIndex);
    tIndex++;
    setTimeout(typeEffect, 50);
  }
}

/* Loader + Ambient sound control */
const loader = document.getElementById('loader');
const ambient = document.getElementById('ambient-audio');
const soundToggle = document.getElementById('sound-toggle');

let soundOn = false;
if (soundToggle) {
  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    if (soundOn) {
      ambient.play().catch(()=>{});
      soundToggle.textContent = '🔊';
    } else {
      ambient.pause();
      soundToggle.textContent = '🔈';
    }
  });
}

/* Start typewriter after load and hide loader */
window.addEventListener('load', () => {
  // fade out loader
  if (loader) {
    loader.style.transition = 'opacity 0.6s ease';
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 700);
  }
  // typewriter
  if (taglineEl) {
    taglineEl.textContent = '';
    typeEffect();
  }
  // do not autoplay audio (browsers restrict it). Ambient is available muted by default.
});

/* ========== PREMIUM PARTICLE SYSTEM ========== */
function startParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // state
  let hue = 0;
  const NUM = 80; // lower this number if you need less CPU (e.g., 50)
  const particles = [];
  const shootingStars = [];
  const mouse = { x: null, y: null, radius: 100 };
  const parallax = { offsetX: 0, offsetY: 0 };

  // mouse tracking
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    // energy burst: nudge nearby particles
    particles.forEach(p => {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 80) {
        p.speedX += dx * 0.002;
        p.speedY += dy * 0.002;
      }
    });
  });
  window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.baseSize = Math.random() * 3 + 1;
      this.size = this.baseSize;
      this.pulseSpeed = Math.random() * 0.05 + 0.02;
      this.angle = Math.random() * Math.PI * 2;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
    }
    update() {
      this.x += this.speedX + parallax.offsetX * 0.02;
      this.y += this.speedY + parallax.offsetY * 0.02;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          this.x -= dx / 10;
          this.y -= dy / 10;
        }
      }

      // pulse
      this.size = this.baseSize + Math.sin(this.angle) * 1.5;
      this.angle += this.pulseSpeed;
    }
    draw() {
      ctx.fillStyle = hsla(${hue},100%,70%,1);
      ctx.shadowColor = hsla(${hue},100%,70%,1);
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.abs(this.size), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class ShootingStar {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height * 0.5;
      this.length = Math.random() * 80 + 50;
      this.speed = Math.random() * 6 + 4;
      this.opacity = 1;
    }
    update() {
      this.x += this.speed;
      this.y += this.speed * 0.3;
      this.opacity -= 0.01;
    }
    draw() {
      ctx.strokeStyle = hsla(${hue},100%,80%,${this.opacity});
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.length, this.y - this.length * 0.3);
      ctx.stroke();
    }
  }

  function connectParticles() {
    hue = (hue + 0.2) % 360;
    const MAX_DIST = 120;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          const alpha = 1 - dist / MAX_DIST;
          ctx.strokeStyle = hsla(${hue},100%,70%,${alpha});
          ctx.shadowColor = hsla(${hue},100%,70%,1);
          ctx.shadowBlur = 8;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < NUM; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // subtle parallax towards mouse
    parallax.offsetX = mouse.x ? (mouse.x - width / 2) * 0.002 : parallax.offsetX * 0.95;
    parallax.offsetY = mouse.y ? (mouse.y - height / 2) * 0.002 : parallax.offsetY * 0.95;

    particles.forEach(p => { p.update(); p.draw(); });

    connectParticles();

    // shooting stars occasionally
    if (Math.random() < 0.01) shootingStars.push(new ShootingStar());
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      shootingStars[i].update();
      shootingStars[i].draw();
      if (shootingStars[i].opacity <= 0) shootingStars.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}

/* Start particles when window loads so canvas is sized */
window.addEventListener('load', () => {
  startParticles();
});
