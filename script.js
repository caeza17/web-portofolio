/* ─────────────────────────────────────────────
   NAVBAR — scroll effect & mobile toggle
───────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link, .mobile-menu .btn-nav').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ─────────────────────────────────────────────
   TYPING ANIMATION
───────────────────────────────────────────── */
const roles = ['UI/UX Designer'];
  const typewriterEl = document.getElementById('typewriter');

  if (typewriterEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const TYPE_SPEED = 70;
    const DELETE_SPEED = 40;
    const PAUSE_AFTER_TYPE = 1600;
    const PAUSE_AFTER_DELETE = 300;

    function tick() {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typewriterEl.textContent = currentRole.slice(0, charIndex);
        
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        typewriterEl.textContent = currentRole.slice(0, charIndex);

      }
    }

    tick();
  }


/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────────── */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const step     = Math.ceil(target / (duration / 16));
  let   current  = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ─────────────────────────────────────────────
   PORTFOLIO TABS
───────────────────────────────────────────── */
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panel = document.getElementById(`tab-${target}`);
    if (panel) {
      panel.classList.add('active');
      // Re-trigger reveal for newly visible cards
      panel.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        revealObserver.observe(el);
        setTimeout(() => el.classList.add('visible'), 50);
      });
    }
  });
});

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"] span');
    btn.textContent = 'Mengirim...';

    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.classList.add('show');
    }, 1200);
  });
}

/* ─────────────────────────────────────────────
   ACTIVE NAV LINK on scroll
───────────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ─────────────────────────────────────────────
   SMOOTH PARALLAX on hero blobs (subtle)
───────────────────────────────────────────── */
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  if (blob1) blob1.style.transform = `translate(${x}px, ${y}px) scale(1)`;
  if (blob2) blob2.style.transform = `translate(${-x * .6}px, ${-y * .6}px) scale(1)`;
}, { passive: true });
