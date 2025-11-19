let currentIndex = 0;
const totalCards = 3;

function updateCarousel() {
  const cards = document.querySelectorAll('.recipe-card');
  const indicators = document.querySelectorAll('.indicator-dot');
  
  cards.forEach((card, index) => {
    card.classList.remove('left', 'center', 'right', 'hidden', 'flipped');
    
    if (index === currentIndex) {
      card.classList.add('center');
    } else if (index === (currentIndex - 1 + totalCards) % totalCards) {
      card.classList.add('left');
    } else if (index === (currentIndex + 1) % totalCards) {
      card.classList.add('right');
    } else {
      card.classList.add('hidden');
    }
  });
  
  indicators.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function nextCard() {
  currentIndex = (currentIndex + 1) % totalCards;
  updateCarousel();
}

function previousCard() {
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  updateCarousel();
}

function goToCard(index) {
  currentIndex = index;
  updateCarousel();
}

function flipCard(card) {
  if (card.classList.contains('center')) {
    card.classList.toggle('flipped');
  }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') previousCard();
  if (e.key === 'ArrowRight') nextCard();
});

function scrollToTop(){window.scrollTo({top:0,behavior:'smooth'})}
function scrollToBottom(){window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})}

// Particles
particlesJS("particles-js",{"particles":{"number":{"value":60,"density":{"enable":true,"value_area":800}},"color":{"value":"#feca57"},"shape":{"type":"circle"},"opacity":{"value":0.4,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0.1}},"size":{"value":4,"random":true,"anim":{"enable":true,"speed":2,"size_min":1}},"line_linked":{"enable":false},"move":{"enable":true,"speed":1.5,"direction":"top","random":true,"straight":false,"out_mode":"out"}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"push"}},"modes":{"bubble":{"distance":150,"size":6,"duration":2},"push":{"particles_nb":3}}},"retina_detect":true});
