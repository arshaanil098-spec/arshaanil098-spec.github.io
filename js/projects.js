/**
 * ARSHA ANIL — DIGITAL ATELIER
 * Project Modals & Interactive Visual Previews
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // Project Deep Dive Modal Data
  // --------------------------------------------------------------------------
  const projectDetails = {
    'ajce-map': {
      title: 'AJCE Navigation Map',
      category: 'Campus Navigation / Digital Experience',
      role: 'System Concept & Spatial Experience Thinking',
      institution: 'Amal Jyothi College of Engineering (Autonomous)',
      overview: 'A digital navigation and map-oriented project created for Amal Jyothi College of Engineering. As campuses expand with multiple departments, research labs, administrative wings, and shared amenities, navigating physical spaces efficiently can be challenging for new students, faculty, and visiting guests.',
      coreFeatures: [
        'Interactive spatial blueprint indexing key academic blocks and facilities.',
        'Clear orientation cues to assist visitors and incoming students.',
        'Logical pathfinding framework connecting campus complexes and departments.',
        'Designed with human-centered navigation patterns and clean typography.'
      ],
      techContext: 'Spatial Information Design, Digital Mapping Concepts, HTML/CSS, Interface Prototyping'
    },
    'ui-design': {
      title: 'UI Design & Digital Experience Studio',
      category: 'Visual Design & Interface Thinking',
      role: 'UI Designer & Digital Craftsman',
      institution: 'Creative Digital Experiments',
      overview: 'An ongoing pursuit of craft at the intersection of aesthetics and utility. Exploring interface design that prioritizes readability, emotional resonance, rhythmic typography, and purposeful micro-interactions over generic templates.',
      coreFeatures: [
        'Editorial design systems utilizing precise typographic hierarchies.',
        'Component architecture and reusable design token sets.',
        'Accessible color contrast and ergonomic touch targets.',
        'Modular layout structures easily adaptable to real-world applications.'
      ],
      techContext: 'UI Design, Prototyping, Component Systems, Responsive Layouts, UX Architecture'
    },
    'social-optimizer': {
      title: 'Social Media Engagement Optimizer',
      category: 'AI & Data Science',
      role: 'Data & Algorithmic Strategy Explorer',
      institution: 'AI & Data Science Exploration',
      overview: 'A data-oriented project focused on analyzing patterns of audience engagement, content performance metrics, and optimization models. The system explores how data science techniques and AI automation can help creators and organizations communicate with greater impact.',
      coreFeatures: [
        'Data-driven engagement pattern identification across publication times.',
        'Metrics evaluation framework analyzing sentiment and response resonance.',
        'Algorithmic recommendation thinking for distribution scheduling.',
        'Clean analytics visualizer representing metric distributions.'
      ],
      techContext: 'Python, Data Analysis, Data Science Fundamentals, AI Optimization Concepts'
    }
  };

  // --------------------------------------------------------------------------
  // Modal Open/Close Logic
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalRole = document.getElementById('modal-project-role');
  const modalOverview = document.getElementById('modal-project-overview');
  const modalFeaturesList = document.getElementById('modal-project-features');
  const modalTech = document.getElementById('modal-project-tech');
  const closeBtn = document.getElementById('modal-close-button');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modalOverlay) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalRole.textContent = data.role;
    modalOverview.textContent = data.overview;
    modalTech.textContent = data.techContext;

    modalFeaturesList.innerHTML = '';
    data.coreFeatures.forEach((feat) => {
      const li = document.createElement('li');
      li.style.marginBottom = '0.5rem';
      li.innerHTML = `<span style="color: var(--accent-rust); margin-right: 0.5rem;">—</span> ${feat}`;
      modalFeaturesList.appendChild(li);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind trigger buttons
  document.querySelectorAll('[data-open-project]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-open-project');
      openProjectModal(pId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // Interactive UI Mockup Switcher (Project 02)
  // --------------------------------------------------------------------------
  const mockupTabs = document.querySelectorAll('.mockup-tab-pill');
  const mockupViewWireframe = document.getElementById('mockup-view-wireframe');
  const mockupViewTokens = document.getElementById('mockup-view-tokens');
  const mockupViewHifi = document.getElementById('mockup-view-hifi');

  mockupTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      mockupTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.getAttribute('data-view');

      if (mockupViewWireframe) mockupViewWireframe.style.display = view === 'wireframe' ? 'block' : 'none';
      if (mockupViewTokens) mockupViewTokens.style.display = view === 'tokens' ? 'block' : 'none';
      if (mockupViewHifi) mockupViewHifi.style.display = view === 'hifi' ? 'block' : 'none';
    });
  });

  // --------------------------------------------------------------------------
  // Interactive Campus Blueprint Pins (Project 01)
  // --------------------------------------------------------------------------
  const mapPins = document.querySelectorAll('.blueprint-pin');
  const pinDisplay = document.getElementById('blueprint-status-text');

  mapPins.forEach((pin) => {
    pin.addEventListener('click', () => {
      const locationName = pin.getAttribute('data-location') || pin.textContent.trim();
      const coords = pin.getAttribute('data-coords') || 'AJCE Campus Core';
      if (pinDisplay) {
        pinDisplay.textContent = `SELECTED: [${locationName}] • ${coords}`;
      }
    });
  });
});
