(() => {
  'use strict';

  // Activar Google Fonts (cargadas como media="print" para no bloquear render)
  const fontLink = document.getElementById('google-fonts');
  if (fontLink) fontLink.media = 'all';

  // Navegación mobile
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    });
  });

  // Nav scroll effect + sticky bar
  const nav = document.getElementById('nav');
  const stickyBar = document.getElementById('sticky-bar');
  const heroSection = document.getElementById('hero');
  const planesSection = document.getElementById('planes');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('nav--scrolled', scrollY > 60);

    if (stickyBar) {
      const pastHero = scrollY > heroSection.offsetHeight - 200;
      const inPlanes = planesSection.getBoundingClientRect();
      const planesVisible = inPlanes.top < window.innerHeight && inPlanes.bottom > 0;
      stickyBar.classList.toggle('visible', pastHero && !planesVisible);
    }
  }, { passive: true });

  // Animaciones al hacer scroll (Intersection Observer)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
