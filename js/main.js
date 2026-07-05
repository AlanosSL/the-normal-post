(() => {
  'use strict';

  const fontLink = document.getElementById('google-fonts');
  if (fontLink) fontLink.media = 'all';

  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');

  function closeMenu() {
    toggle.classList.remove('active');
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');

    if (isOpen) {
      const firstLink = menu.querySelector('.nav__link');
      if (firstLink) firstLink.focus();
    }
  });

  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }

    if (e.key === 'Tab' && menu.classList.contains('open')) {
      const focusable = menu.querySelectorAll('.nav__link');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

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

  const zoneBtns = document.querySelectorAll('.pricing__zone-btn');
  const pricingGrid = document.getElementById('pricing-grid');
  const cartaSueltaCard = pricingGrid.querySelector('[data-plan="1-mes"]');
  const cartaSueltaPeriod = document.getElementById('carta-suelta-period');
  const cartaSueltaShipping = document.getElementById('carta-suelta-shipping');

  zoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const zone = btn.dataset.zone;
      const isInt = zone === 'int';

      zoneBtns.forEach(b => {
        b.classList.toggle('pricing__zone-btn--active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });

      pricingGrid.classList.toggle('pricing--international', isInt);

      cartaSueltaCard.href = cartaSueltaCard.dataset[isInt ? 'hrefInt' : 'hrefEs'];
      cartaSueltaPeriod.textContent = isInt
        ? 'pago único · 24 € con envío'
        : 'pago único · 14 €';
      cartaSueltaShipping.textContent = isInt
        ? 'Envío internacional incluido (+10 €)'
        : 'Envío incluido';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
