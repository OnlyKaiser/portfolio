/* =============================================
   PORTOFOLIO - script.js
   Muh. Tsaqif Taufiqurrahman
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. NAVBAR — sticky + active link
     ------------------------------------------ */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // sticky style
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // highlight active nav link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------
     2. MOBILE NAV TOGGLE
     ------------------------------------------ */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    // animate hamburger → X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  /* ------------------------------------------
     3. TYPEWRITER — hero role text
     ------------------------------------------ */
  const roles = [
    'Web Developer',
    'JavaScript & TypeScript Dev',
    'Python Enthusiast',
    'Fresh Graduate Informatika',
    'Fast Learner & Problem Solver',
  ];

  const roleEl = document.getElementById('role-text');
  let   roleIndex = 0;
  let   charIndex = 0;
  let   isDeleting = false;

  function typeWriter() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      roleEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeWriter, 1800);
        return;
      }
    } else {
      roleEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        setTimeout(typeWriter, 400);
        return;
      }
    }

    setTimeout(typeWriter, isDeleting ? 60 : 100);
  }

  typeWriter();

  /* ------------------------------------------
     4. SCROLL REVEAL — fade-up elements
     ------------------------------------------ */
  const fadeEls = document.querySelectorAll(
    '.about-card, .about-text, .skill-category, .project-card, .contact-info, .contact-form, .section-header'
  );

  fadeEls.forEach(el => el.classList.add('fade-up'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger delay based on sibling index
          const siblings = entry.target.parentElement
            ? [...entry.target.parentElement.children]
            : [];
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 80}ms`;
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------
     5. SKILL BARS — animate on scroll
     ------------------------------------------ */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill  = entry.target;
          const width = fill.getAttribute('data-width');
          fill.style.width = width + '%';
          skillObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillFills.forEach(fill => skillObserver.observe(fill));

  /* ------------------------------------------
     6. CONTACT FORM — basic validation + UX
     ------------------------------------------ */
  const form     = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      // simple validation
      if (!name || !email || !subject || !message) {
        showNote('Mohon isi semua kolom terlebih dahulu.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNote('Format email tidak valid.', 'error');
        return;
      }

      // simulate send — replace with real API/mailto if needed
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

      setTimeout(() => {
        showNote('Pesan berhasil dikirim! Saya akan segera membalas.', 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
      }, 1500);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showNote(msg, type) {
    formNote.textContent = msg;
    formNote.className   = `form-note ${type}`;
    setTimeout(() => {
      formNote.textContent = '';
      formNote.className   = 'form-note';
    }, 4000);
  }

  /* ------------------------------------------
     7. SMOOTH SCROLL — for all anchor links
     ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
