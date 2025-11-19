window.addEventListener('load', function() {
  
  // PARTICLES INIT
  if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
      "particles": {
        "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
        "color": {"value": "#6a90b4"},
        "shape": {"type": "circle"},
        "opacity": {"value": 0.5, "random": false},
        "size": {"value": 3, "random": true},
        "line_linked": {"enable": true, "distance": 150, "color": "#638ECB", "opacity": 0.4, "width": 1},
        "move": {"enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out"}
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {"enable": true, "mode": "grab"},
          "onclick": {"enable": true, "mode": "push"}
        },
        "modes": {
          "grab": {"distance": 200, "line_linked": {"opacity": 1}},
          "push": {"particles_nb": 4}
        }
      },
      "retina_detect": true
    });
  }
  
  // MODAL FUNCTIONS
  window.openVolunteerModal = function() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    setTimeout(function() {
      document.getElementById('volunteerModal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }, 100);
  };
  
  window.openStoriesModal = function() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    setTimeout(function() {
      document.getElementById('storiesModal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }, 100);
  };
  
  window.openClubsModal = function() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    setTimeout(function() {
      document.getElementById('clubsModal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }, 100);
  };
  
  window.closeModal = function(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = 'auto';
  };
  
  // CLICK OUTSIDE TO CLOSE
  document.querySelectorAll('.modal').forEach(function(m) {
    m.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
  
  // ESC TO CLOSE
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(function(m) {
        m.classList.remove('active');
      });
      document.body.style.overflow = 'auto';
    }
  });
  
  // SCROLL FUNCTIONS
  window.scrollToTop = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  
  window.scrollToBottom = function() {
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
  };
  
  // NAV EFFECTS
  document.querySelectorAll('.nav-item').forEach(function(i) {
    i.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    i.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
});
