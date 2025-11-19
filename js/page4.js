// Particles
particlesJS("particles-js", {
  "particles": {
    "number": {"value": 60, "density": {"enable": true, "value_area": 800}},
    "color": {"value": "#feca57"},
    "shape": {"type": "circle"},
    "opacity": {"value": 0.4, "random": true, "anim": {"enable": true, "speed": 1, "opacity_min": 0.1}},
    "size": {"value": 4, "random": true, "anim": {"enable": true, "speed": 2, "size_min": 1}},
    "line_linked": {"enable": false},
    "move": {"enable": true, "speed": 1.5, "direction": "top", "random": true, "straight": false, "out_mode": "out"}
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {"enable": true, "mode": "bubble"},
      "onclick": {"enable": true, "mode": "push"}
    },
    "modes": {
      "bubble": {"distance": 150, "size": 6, "duration": 2},
      "push": {"particles_nb": 3}
    }
  },
  "retina_detect": true
});
