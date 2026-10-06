/* ==========================================================================
   PROJECTS PAGE JASCRIPT (Filtering & Modal Window)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFiltering();
  initProjectModal();
});

/**
 * Part 5: Project Filtering Functionality
 */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Manage active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      // Show/Hide project cards based on category
      projectCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/**
 * Part 6: Interactive Project Feature (Option A — Project Modal)
 */
function initProjectModal() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  if (!modalBackdrop) return;

  // Modal elements to populate dynamically
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalLearned = document.getElementById('modal-learned');
  const modalGithub = document.getElementById('modal-github');
  const modalLive = document.getElementById('modal-live');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;

      // Extract metadata stored in data attributes
      const title = card.dataset.title || 'Project Details';
      const image = card.dataset.image || '';
      const fullDesc = card.dataset.fullDesc || 'No details provided.';
      const learned = card.dataset.learned || 'Key principles of Web Development.';
      const github = card.dataset.github || '#';
      const live = card.dataset.live || '#';

      // Populate Modal HTML
      modalTitle.textContent = title;
      modalImage.src = image;
      modalImage.alt = title;
      modalDescription.textContent = fullDesc;
      modalLearned.textContent = learned;
      modalGithub.href = github;
      modalLive.href = live;

      // Display Modal
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close Events
  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}