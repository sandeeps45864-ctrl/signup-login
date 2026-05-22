/* =============================================
   SANDEEP SINGH — PORTFOLIO JAVASCRIPT v2
   script.js
   ============================================= */

/* ================================================
   1. CUSTOM CURSOR
   ================================================ */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .skill-card, .project-card, .stat-box, .form-input').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width   = '60px';
    cursorRing.style.height  = '60px';
    cursorRing.style.opacity = '1';
    cursor.style.transform   = 'translate(-50%, -50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width   = '40px';
    cursorRing.style.height  = '40px';
    cursorRing.style.opacity = '0.5';
    cursor.style.transform   = 'translate(-50%, -50%) scale(1)';
  });
});

/* ================================================
   2. PARTICLE CANVAS BACKGROUND
   ================================================ */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PARTICLE_COUNT = 80;
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  x:     Math.random() * canvas.width,
  y:     Math.random() * canvas.height,
  r:     Math.random() * 1.5 + 0.3,
  vx:    (Math.random() - 0.5) * 0.3,
  vy:    (Math.random() - 0.5) * 0.3,
  alpha: Math.random() * 0.6 + 0.1,
  hue:   Math.random() > 0.7 ? 280 : 185
}));

(function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* Connection lines */
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `hsla(185,100%,60%,${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }

  /* Dots */
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.alpha})`;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0)             p.x = canvas.width;
    if (p.x > canvas.width)  p.x = 0;
    if (p.y < 0)             p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(drawParticles);
})();

/* ================================================
   3. SCROLL REVEAL
   ================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ================================================
   4. ACTIVE NAV HIGHLIGHT
   ================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + id
          ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => navObserver.observe(sec));

/* ================================================
   5. SMOOTH SCROLL
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ================================================
   6. CONTACT FORM
   ================================================ */

/* -- Helpers -- */
function setError(fieldId, errorId) {
  document.getElementById(fieldId).closest('.form-group').classList.add('has-error');
  return false;
}

function clearError(fieldId) {
  document.getElementById(fieldId).closest('.form-group').classList.remove('has-error');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* -- Character Counter -- */
const messageInput = document.getElementById('message');
const charCount    = document.getElementById('charCount');
const MAX_CHARS    = 500;

messageInput.addEventListener('input', () => {
  const len = messageInput.value.length;
  charCount.textContent = len;

  const counter = messageInput.closest('.form-group').querySelector('.char-counter');
  counter.classList.remove('warn', 'over');
  if (len > MAX_CHARS)        counter.classList.add('over');
  else if (len > MAX_CHARS * 0.8) counter.classList.add('warn');

  /* Live clear error if long enough */
  if (len >= 20) clearError('message');
});

/* -- Live validation on blur -- */
document.getElementById('fname').addEventListener('blur', function() {
  this.value.trim() ? clearError('fname') : setError('fname');
});

document.getElementById('email').addEventListener('blur', function() {
  isValidEmail(this.value.trim()) ? clearError('email') : setError('email');
});

document.getElementById('subject').addEventListener('change', function() {
  this.value ? clearError('subject') : setError('subject');
});

document.getElementById('message').addEventListener('blur', function() {
  this.value.trim().length >= 20 ? clearError('message') : setError('message');
});

/* -- Form Submit -- */
const contactForm  = document.getElementById('contactForm');
const submitBtn    = document.getElementById('submitBtn');
const btnText      = submitBtn.querySelector('.btn-text');
const btnLoader    = document.getElementById('btnLoader');
const btnArrow     = submitBtn.querySelector('.btn-arrow');
const formSuccess  = document.getElementById('formSuccess');
const sendAnotherBtn = document.getElementById('sendAnotherBtn');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  /* Collect values */
  const fname   = document.getElementById('fname').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();

  /* Validate all */
  let valid = true;

  if (!fname) {
    setError('fname');
    valid = false;
  } else {
    clearError('fname');
  }

  if (!isValidEmail(email)) {
    setError('email');
    valid = false;
  } else {
    clearError('email');
  }

  if (!subject) {
    setError('subject');
    valid = false;
  } else {
    clearError('subject');
  }

  if (message.length < 20) {
    setError('message');
    valid = false;
  } else {
    clearError('message');
  }

  if (message.length > MAX_CHARS) {
    setError('message');
    valid = false;
  }

  if (!valid) {
    /* Shake the button */
    submitBtn.style.animation = 'shake 0.4s ease';
    setTimeout(() => submitBtn.style.animation = '', 400);
    return;
  }

  /* Show loading state */
  submitBtn.disabled = true;
  btnText.classList.add('hidden');
  btnArrow.classList.add('hidden');
  btnLoader.classList.add('active');

  /*
   * -----------------------------------------------
   * TO CONNECT A REAL BACKEND:
   * Replace the setTimeout below with a fetch() call.
   *
   * Example with PHP (send_mail.php):
   *
   *   fetch('send_mail.php', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({ fname, email, subject, message })
   *   })
   *   .then(res => res.json())
   *   .then(data => {
   *     if (data.success) showSuccess();
   *     else showFormError(data.message);
   *   })
   *   .catch(() => showFormError('Network error. Please try again.'));
   *
   * Example with EmailJS (free email service):
   *   emailjs.send('SERVICE_ID', 'TEMPLATE_ID', { fname, email, subject, message })
   *     .then(() => showSuccess())
   *     .catch(() => showFormError('Failed. Please try again.'));
   * -----------------------------------------------
   */

  /* Simulated 2-second network delay */
  setTimeout(() => {
    showSuccess();
  }, 2000);
});

function showSuccess() {
  contactForm.style.display = 'none';
  formSuccess.classList.add('show');
}

/* Reset form */
sendAnotherBtn.addEventListener('click', () => {
  contactForm.reset();
  charCount.textContent = '0';
  document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

  submitBtn.disabled = false;
  btnText.classList.remove('hidden');
  btnArrow.classList.remove('hidden');
  btnLoader.classList.remove('active');

  formSuccess.classList.remove('show');
  contactForm.style.display = 'block';
});

/* Shake keyframe injected dynamically */
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);
