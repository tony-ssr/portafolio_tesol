// ==========================================================================
// PORTAFOLIO TESOL — María Alejandra Acosta Rodríguez
// main.js — Interactividad principal
// ==========================================================================

// --------------------------------------------------------------------------
// 1. Navbar: scroll effect + mobile toggle
// --------------------------------------------------------------------------
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.navbar__mobile');
  const navLinks = document.querySelectorAll('.navbar__link');

  // Scroll effect
  function onScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const offset = section.offsetTop - 100;
      if (window.scrollY >= offset) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', toggle.classList.contains('open'));
    });

    // Close on link click
    mobileMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

// --------------------------------------------------------------------------
// 2. Scroll-reveal (IntersectionObserver)
// --------------------------------------------------------------------------
(function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// --------------------------------------------------------------------------
// 3. Scroll-to-top button
// --------------------------------------------------------------------------
(function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// --------------------------------------------------------------------------
// 4. Lightbox for Syllabus photos
// --------------------------------------------------------------------------
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');

  const cards = Array.from(document.querySelectorAll('.photo-card[data-src]'));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const card = cards[index];
    lightboxImg.src = card.dataset.src;
    lightboxImg.alt = card.dataset.alt || '';
    if (lightboxCaption) lightboxCaption.textContent = card.dataset.caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightbox.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % cards.length;
    openLightbox(currentIndex);
  }

  // Bind card clicks
  cards.forEach((card, i) => {
    card.addEventListener('click', () => openLightbox(i));
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Ver imagen en grande: ' + (card.dataset.caption || ''));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
    });
  });

  // Close buttons
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  // Click outside image to close
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
})();

// --------------------------------------------------------------------------
// 5. PDF Modal (full-screen viewer)
// --------------------------------------------------------------------------
(function initPdfModal() {
  const modal = document.getElementById('pdf-modal');
  if (!modal) return;

  const modalFrame = modal.querySelector('#pdf-modal-frame');
  const modalTitle = modal.querySelector('.pdf-modal__title');
  const closeBtn = modal.querySelector('.pdf-modal__close');
  const downloadBtn = modal.querySelector('#pdf-modal-download');

  let currentPdfSrc = '';

  window.openPdfModal = function(src, title) {
    currentPdfSrc = src;
    if (modalFrame) modalFrame.src = src;
    if (modalTitle) modalTitle.textContent = title || 'Documento';
    if (downloadBtn) downloadBtn.href = src;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closePdfModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (modalFrame) modalFrame.src = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closePdfModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closePdfModal();
  });

  document.addEventListener('keydown', e => {
    if (modal.classList.contains('open') && e.key === 'Escape') closePdfModal();
  });
})();

// --------------------------------------------------------------------------
// 6. Inline PDF toggle (expand/collapse dentro de la tarjeta)
// --------------------------------------------------------------------------
window.toggleInlinePdf = function(viewerId, pdfSrc, btn) {
  const wrap = document.getElementById(viewerId);
  if (!wrap) return;

  const isOpen = wrap.classList.contains('open');

  if (isOpen) {
    wrap.classList.remove('open');
    const iframe = wrap.querySelector('iframe');
    if (iframe) iframe.src = '';
    if (btn) btn.textContent = '👁️ Vista rápida';
  } else {
    wrap.classList.add('open');
    const iframe = wrap.querySelector('iframe');
    if (iframe) iframe.src = pdfSrc;
    if (btn) btn.textContent = '✕ Cerrar vista';
    // Scroll into view smoothly
    setTimeout(() => wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }
};
