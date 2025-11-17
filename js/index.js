// Wait for particles.js library to load first
window.addEventListener('load', () => {
  const counter = document.getElementById("counter");
  const loader = document.querySelector(".loader");
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  // Check if user has already seen loading screen in this session
  const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');

  if (hasSeenLoading) {
    // Skip loading, show content immediately
    loadingScreen.style.display = "none";
    document.body.style.overflow = "auto";
    mainContent.classList.add("visible");
  } else {
    // Show loading animation (first time only)
    let count = 0;

    const interval = setInterval(() => {
      if (count < 100) {
        count++;
        counter.innerText = count + "%";
        counter.setAttribute('aria-label', `Loading progress ${count} percent`);
      } else {
        clearInterval(interval);
        
        counter.style.display = "none";
        loader.style.display = "flex";

        setTimeout(() => {
          loadingScreen.style.opacity = "0";
          loadingScreen.setAttribute('aria-hidden', 'true');
          
          setTimeout(() => {
            loadingScreen.style.display = "none";
            mainContent.classList.add("visible");
            mainContent.focus();
            
            // Mark that user has seen loading
            sessionStorage.setItem('hasSeenLoading', 'true');
          }, 500);
        }, 1500);
      }
    }, 20);
  }

  // --- Initialize Particles ---
  if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
      "particles": {
        "number": { 
          "value": 100, 
          "density": { "enable": true, "value_area": 800 } 
        },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle" },
        "opacity": { 
          "value": 0.8, 
          "random": true,
          "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.3 }
        },
        "size": { 
          "value": 2, 
          "random": true,
          "anim": { "enable": true, "speed": 2, "size_min": 0.3 }
        },
        "line_linked": { "enable": false },
        "move": { 
          "enable": true, 
          "speed": 0.5, 
          "direction": "none", 
          "random": true, 
          "straight": false, 
          "out_mode": "out" 
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": { 
          "onhover": { "enable": true, "mode": "repulse" },
          "onclick": { "enable": true, "mode": "push" }
        },
        "modes": {
          "repulse": { "distance": 100, "duration": 0.4 },
          "push": { "particles_nb": 4 }
        }
      },
      "retina_detect": true
    });
  }
});
