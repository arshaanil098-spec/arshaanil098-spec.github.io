/**
 * ARSHA ANIL — DIGITAL ATELIER
 * Scroll Animations, Kinetic Typography & Counter
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Intersection Observer for Scroll Reveals
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.atelier-section, .project-card-editorial, .role-spotlight-card, .timeline-card-editorial, .skills-category-column, .stat-card-subtle'
  );

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // If it's the stat card, animate counter
        if (entry.target.classList.contains('stat-card-subtle')) {
          animateCgpa();
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

  // Handle when elements enter view
  document.addEventListener('transitionend', (e) => {
    if (e.target.classList && e.target.classList.contains('in-view')) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });

  // Also set inline helper so styles apply smoothly
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleTag);

  // --------------------------------------------------------------------------
  // 2. CGPA Subtle Number Counter
  // --------------------------------------------------------------------------
  let cgpaAnimated = false;
  function animateCgpa() {
    if (cgpaAnimated) return;
    cgpaAnimated = true;
    const cgpaEl = document.getElementById('cgpa-stat-value');
    if (!cgpaEl) return;

    let start = 0.0;
    const target = 9.41;
    const duration = 1200;
    const startTime = performance.now();

    function step(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = (start + (target - start) * ease).toFixed(2);
      cgpaEl.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        cgpaEl.textContent = '9.41';
      }
    }
    requestAnimationFrame(step);
  }

  // --------------------------------------------------------------------------
  // 3. Kinetic Word Cycler ("MORE THAN A TECH STACK")
  // --------------------------------------------------------------------------
  const words = [
    { title: 'COMMUNICATOR.', desc: 'Articulating complex technical concepts into clear, human narratives that bridge ideas and execution.' },
    { title: 'CREATOR.', desc: 'Translating design curiosity and code into meaningful digital experiences that engage and inspire.' },
    { title: 'TEAM PLAYER.', desc: 'Thriving in diverse groups, fostering trust, and contributing constructively toward common goals.' },
    { title: 'LEADER.', desc: 'Stepping forward with initiative, guiding projects with empathy, responsibility, and focus.' },
    { title: 'ANCHOR.', desc: 'Comfortable on stage and before audiences, commanding rooms with poise, energy, and poise.' },
    { title: 'LEARNER.', desc: 'Constantly expanding frontiers across AI, foundational algorithms, and modern interface craft.' },
    { title: 'TECH ENTHUSIAST.', desc: 'Passionate about how Artificial Intelligence and data science will reshape our daily human realities.' }
  ];

  const wordDisplay = document.getElementById('kinetic-word-display');
  const traitDesc = document.getElementById('trait-description');
  const traitChips = document.querySelectorAll('.trait-chip-interactive');

  let currentIndex = 0;
  let cycleInterval = null;
  let isPausedByUser = false;

  function updateWord(index, pauseCycle = false) {
    if (!wordDisplay) return;
    currentIndex = index;
    const item = words[index];

    wordDisplay.style.opacity = '0';
    wordDisplay.style.transform = 'translateY(12px)';

    setTimeout(() => {
      wordDisplay.textContent = item.title;
      if (traitDesc) {
        traitDesc.textContent = item.desc;
      }
      wordDisplay.style.opacity = '1';
      wordDisplay.style.transform = 'translateY(0)';
    }, 200);

    // Update chip active states
    traitChips.forEach((chip, i) => {
      if (i === index) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    if (pauseCycle) {
      isPausedByUser = true;
      clearInterval(cycleInterval);
      // Resume cycling after 8 seconds of user inactivity
      setTimeout(() => {
        isPausedByUser = false;
        startCycler();
      }, 8000);
    }
  }

  function startCycler() {
    if (cycleInterval) clearInterval(cycleInterval);
    cycleInterval = setInterval(() => {
      if (!isPausedByUser) {
        currentIndex = (currentIndex + 1) % words.length;
        updateWord(currentIndex, false);
      }
    }, 3200);
  }

  // Trait chips click listener
  traitChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const idx = parseInt(chip.getAttribute('data-index'), 10);
      updateWord(idx, true);
    });
  });

  startCycler();
});
