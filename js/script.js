/* ═══════════════════════════════════════════
   TEAM DESIGNATED — Main JS
═══════════════════════════════════════════ */

/* ─── EmailJS Config ─────────────────────
   1. Go to https://www.emailjs.com and create a free account
   2. Create an Email Service (Gmail recommended) → copy the Service ID
   3. Create an Email Template → copy the Template ID
      Template variables used: from_name, phone, reply_to,
      event_type, event_date, guest_count, message
   4. Get your Public Key from Account → API Keys
   5. Replace the three values below
──────────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = 'JRexj18kosvE0LxIH';
const EMAILJS_SERVICE_ID  = 'service_656nzue';
const EMAILJS_TEMPLATE_ID = 'template_ii5zdh4';


/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);

  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: false,
    offset: 60,
  });

  initHeroIntro();
  initNavbar();
  initHamburger();
  initParticles();
  initCountdown();
  initVideoPlayer();
  initCounterAnimation();
  initGalleryFilter();
  initContactForm();
  initBackToTop();
  initActiveNavLink();
});


/* ════════════════════════════════════════
   HERO INTRO SPLASH
════════════════════════════════════════ */
function initHeroIntro() {
  const intro      = document.getElementById('heroIntro');
  const logo       = document.getElementById('heroIntroLogo');
  const cover      = document.getElementById('heroIntroCover');
  const lineLeft   = document.getElementById('introLineLeft');
  const lineRight  = document.getElementById('introLineRight');
  const content    = document.querySelector('.hero-content');
  if (!intro) return;

  // Step 1 — wipe cover off right, revealing logo
  cover.style.animation = 'coverOut 1.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards';

  // Step 2 — after wipe finishes, fire the D-side lines bottom → top
  setTimeout(() => {
    [lineLeft, lineRight].forEach(line => {
      line.style.animation = 'lineUp 1.1s cubic-bezier(0.22,1,0.36,1) forwards';
    });
  }, 1500);

  // Step 3 — fade logo slowly
  setTimeout(() => {
    logo.style.opacity = '0';
    [lineLeft, lineRight].forEach(line => {
      line.style.transition = 'opacity 1.2s ease';
      line.style.opacity = '0';
    });
  }, 2900);

  // Step 4 — fade overlay, reveal hero content
  setTimeout(() => {
    intro.classList.add('fade-out');
    if (content) content.classList.add('visible');
  }, 4200);

  // Step 5 — remove overlay from DOM
  setTimeout(() => {
    intro.style.display = 'none';
  }, 6100);
}


/* ════════════════════════════════════════
   NAVBAR — scroll style
════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


/* ════════════════════════════════════════
   HAMBURGER MENU
════════════════════════════════════════ */
function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
}


/* ════════════════════════════════════════
   PARTICLE CANVAS — gold floating dots
════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  const COLORS = ['rgba(201,168,76,', 'rgba(232,201,106,', 'rgba(160,120,48,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset = function() {
      this.x    = Math.random() * W;
      this.y    = Math.random() * H;
      this.size = Math.random() * 2.5 + 0.5;
      this.speed = Math.random() * 0.4 + 0.1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.dx   = (Math.random() - 0.5) * 0.4;
      this.dy   = -this.speed;
    };
    this.reset();
    this.y = Math.random() * H;
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
    window.addEventListener('resize', resize);
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -5 || p.x < -5 || p.x > W + 5) p.reset();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  init();
}


/* ════════════════════════════════════════
   COUNTDOWN TIMER — 22 May 2026, 20:30
════════════════════════════════════════ */
function initCountdown() {
  const target = new Date('2026-05-22T20:30:00+05:30').getTime();

  const elDays  = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins  = document.getElementById('cd-mins');
  const elSecs  = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      elDays.textContent = elHours.textContent = elMins.textContent = elSecs.textContent = '00';
      return;
    }

    elDays.textContent  = pad(Math.floor(diff / 86400000));
    elHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    elMins.textContent  = pad(Math.floor((diff % 3600000)  / 60000));
    elSecs.textContent  = pad(Math.floor((diff % 60000)    / 1000));
  }

  tick();
  setInterval(tick, 1000);
}


/* ════════════════════════════════════════
   VIDEO PLAYER
════════════════════════════════════════ */
function initVideoPlayer() {
  const video   = document.getElementById('promoVideo');
  const playBtn = document.getElementById('videoPlayBtn');
  if (!video || !playBtn) return;

  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (video.paused) {
      video.muted = false;
      video.play();
      playBtn.classList.add('playing');
      playBtn.style.opacity = '0';
      playBtn.style.pointerEvents = 'none';
    }
  });

  video.addEventListener('click', () => {
    if (!video.paused) {
      video.pause();
      playBtn.classList.remove('playing');
      playBtn.style.opacity = '1';
      playBtn.style.pointerEvents = 'all';
    }
  });

  video.addEventListener('ended', () => {
    playBtn.classList.remove('playing');
    playBtn.style.opacity = '1';
    playBtn.style.pointerEvents = 'all';
  });
}


/* ════════════════════════════════════════
   COUNTER ANIMATION — stats strip
════════════════════════════════════════ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 16);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}


/* ════════════════════════════════════════
   GALLERY FILTER
════════════════════════════════════════ */
function initGalleryFilter() {
  const tabs  = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      const isDice = document.getElementById('galleryGrid').classList.contains('gallery-dice');
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        if (isDice) {
          // dice layout: use visibility so grid positions are preserved
          item.style.visibility = match ? 'visible' : 'hidden';
          item.style.opacity    = match ? '1' : '0';
        } else {
          if (match) item.classList.remove('hidden');
          else item.classList.add('hidden');
        }
      });
    });
  });
}


/* ════════════════════════════════════════
   CONTACT FORM — EmailJS
════════════════════════════════════════ */
function initContactForm() {
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg   = document.getElementById('formError');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    successMsg.classList.remove('show');
    errorMsg.classList.remove('show');

    try {
      const name       = form.querySelector('[name="from_name"]').value;
      const phone      = form.querySelector('[name="phone"]').value;
      const email      = form.querySelector('[name="reply_to"]').value;
      const eventType  = form.querySelector('[name="event_type"]').value;
      const eventDate  = form.querySelector('[name="event_date"]').value;
      const guests     = form.querySelector('[name="guest_count"]').value;
      const userMsg    = form.querySelector('[name="message"]').value;

      const params = {
        name:        name,
        phone:       phone,
        reply_to:    email,
        event_type:  eventType,
        event_date:  eventDate  || 'Not specified',
        guest_count: guests     || 'Not specified',
        message:     userMsg,
      };
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
      successMsg.classList.add('show');
      form.reset();
      submitBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
      console.error('EmailJS error:', err);
      errorMsg.classList.add('show');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      if (valid) field.focus();
      valid = false;
    }
  });
  return valid;
}


/* ════════════════════════════════════════
   BACK TO TOP
════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ════════════════════════════════════════
   ACTIVE NAV LINK on scroll
════════════════════════════════════════ */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}


/* ════════════════════════════════════════
   LIGHTBOX
════════════════════════════════════════ */
function openLightbox(el) {
  const img = el.querySelector('img');
  if (!img || img.src.includes('placeholder')) return;

  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  lbImg.src   = img.src;
  lbImg.alt   = img.alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
