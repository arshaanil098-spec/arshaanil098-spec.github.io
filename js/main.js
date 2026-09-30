/**
 * ARSHA ANIL — DIGITAL ATELIER
 * Core Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Sticky Navigation Scroll Effect & Active Spy
  // --------------------------------------------------------------------------
  const navbar = document.querySelector('.atelier-nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle-button');
  const navDrawer = document.getElementById('mobile-nav-drawer');
  const navBackdrop = document.getElementById('mobile-nav-backdrop');
  const closeDrawerBtn = document.getElementById('close-drawer-button');

  function openDrawer() {
    navDrawer.classList.add('open');
    navBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navDrawer.classList.remove('open');
    navBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navToggle) navToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (navBackdrop) navBackdrop.addEventListener('click', closeDrawer);

  // Close drawer when clicking any link
  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // --------------------------------------------------------------------------
  // 3. Toast Notification Helper
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --------------------------------------------------------------------------
  // 4. Clipboard Copy Handlers (Email & Phone)
  // --------------------------------------------------------------------------
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-copy-label') || 'Copied to clipboard';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`${label}: ${textToCopy}`);
        }).catch(() => {
          fallbackCopyText(textToCopy, label);
        });
      } else {
        fallbackCopyText(textToCopy, label);
      }
    });
  });

  function fallbackCopyText(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`${label}: ${text}`);
    } catch (err) {
      showToast(`Copy manually: ${text}`);
    }
    document.body.removeChild(tempInput);
  }

  // --------------------------------------------------------------------------
  // 5. Certification Archive Filtering
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      certCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Certificate Modal Preview
  const certModalOverlay = document.getElementById('cert-modal-overlay');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certModalDesc = document.getElementById('cert-modal-desc');
  const certModalClose = document.getElementById('cert-modal-close');

  certCards.forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.cert-title')?.textContent || '';
      const issuer = card.querySelector('.cert-issuer-badge')?.textContent || '';
      const desc = card.querySelector('.cert-subtext')?.textContent || '';

      if (certModalOverlay) {
        if (certModalTitle) certModalTitle.textContent = title;
        if (certModalIssuer) certModalIssuer.textContent = issuer;
        if (certModalDesc) certModalDesc.textContent = desc;
        certModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (certModalClose && certModalOverlay) {
    certModalClose.addEventListener('click', () => {
      certModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    certModalOverlay.addEventListener('click', (e) => {
      if (e.target === certModalOverlay) {
        certModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Interactive Message Composer (Send via Email Client)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('atelier-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('form-sender-name')?.value || '';
      const senderEmail = document.getElementById('form-sender-email')?.value || '';
      const messageBody = document.getElementById('form-sender-message')?.value || '';

      const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName || 'Visitor'}`);
      const body = encodeURIComponent(
        `Hi Arsha,\n\n${messageBody}\n\nFrom: ${senderName} (${senderEmail})`
      );

      showToast('Opening your default mail client...');
      window.location.href = `mailto:arshaanil10@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // --------------------------------------------------------------------------
  // 7. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top-trigger');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
