// Wait for everything to load
window.addEventListener('load', () => {
  
  // Initialize Particles.js
  initParticles();
  
  // Setup modal functions
  setupModals();
  
  // Setup scroll functions
  setupScrollFunctions();
  
  // Setup nav effects
  setupNavEffects();
});

// Particles initialization
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#6a90b4"
        },
        "shape": {
          "type": "circle"
        },
        "opacity": {
          "value": 0.5,
          "random": false
        },
        "size": {
          "value": 3,
          "random": true
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#638ECB",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out"
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          }
        },
        "modes
"grab": {
            "distance": 200,
            "line_linked": {
              "opacity": 1
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
    console.log('✅ Particles.js initialized successfully!');
  } else {
    console.error('❌ Particles.js library not loaded!');
  }
}

// Modal setup
function setupModals() {
  // Define modal functions globally
  window.openVolunteerModal = function() {
    openModal('volunteerModal');
  }
  
  window.openStoriesModal = function() {
    openModal('storiesModal');
  }
  
  window.openClubsModal = function() {
    openModal('clubsModal');
  }
  
  window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
  
  // Generic open modal function
  function openModal(id) {
    closeAllModals();
    setTimeout(() => {
      const modal = document.getElementById(id);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log(`✅ Opened modal: ${id}`);
      } else {
        console.error(`❌ Modal not found: ${id}`);
      }
    }, 100);
  }
  
  // Close all modals
  function closeAllModals() {
    document.querySelectorAll('.modal').forEach(m => {
      m.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
  }
  
  // Click outside modal to close
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });
  
  // Press ESC to close modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(m => {
        closeModal(m.id);
      });
    }
  });
}

// Scroll functions
function setupScrollFunctions() {
  window.scrollToTop = function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  window.scrollToBottom = function() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
}

// Nav effects
function setupNavEffects() {
  document.querySelectorAll('.nav-item').forEach(i => {
    i.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    i.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}
