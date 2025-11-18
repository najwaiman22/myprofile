// ===== STARFIELD GENERATION =====
const starfield = document.getElementById('starfield');

// Generate 250 twinkling stars
for (let i = 0; i < 250; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 3 + 's';
  star.style.animationDuration = (Math.random() * 2 + 2) + 's';
  starfield.appendChild(star);
}

// Generate shooting stars periodically
function createShootingStar() {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'shooting-star';
  shootingStar.style.left = Math.random() * 50 + 50 + '%';
  shootingStar.style.top = Math.random() * 50 + '%';
  starfield.appendChild(shootingStar);
  setTimeout(() => shootingStar.remove(), 3000);
}

// Create shooting star every 3-5 seconds
setInterval(createShootingStar, Math.random() * 2000 + 3000);

// ===== AUDIO SETUP =====
const soundtrack = new Audio('main/soundtrack.mp3');
soundtrack.loop = true; // Loop terus muzik
soundtrack.volume = 0.5; // Volume 50% (boleh adjust 0.0 - 1.0)

// ===== GAME LOGIC =====
let gameState = 'menu';
let score = 0;
let lives = 3;
let timeLeft = 30;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let playerX = 50;
let fallingItems = [];
let itemIdCounter = 0;
let gameLoop;
let spawnInterval;
let timerInterval;

const items = [
  {emoji: '📚', type: 'good', points: 10},
  {emoji: '🍳', type: 'good', points: 10},
  {emoji: '❤️', type: 'good', points: 10},
  {emoji: '⛈️', type: 'bad', points: -5},
  {emoji: '💤', type: 'bad', points: -5}
];

if (highScore > 0) {
  document.getElementById('highScoreDisplay').textContent = `🏆 High Score: ${highScore}`;
}

function showScreen(screenName) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenName + 'Screen').classList.add('active');
}

function startGame() {
  gameState = 'playing';
  score = 0;
  lives = 3;
  timeLeft = 30;
  playerX = 50;
  fallingItems = [];
  itemIdCounter = 0;
  
  // ===== START AUDIO DARI MULA =====
  soundtrack.currentTime = 0; // Reset ke 0 saat
  soundtrack.play().catch(err => {
    console.log('Audio autoplay blocked:', err);
    // Kalau browser block autoplay, akan try lagi
  });
  
  updateScore();
  updateLives();
  updateTimer();
  showScreen('game');
  
  spawnInterval = setInterval(spawnItem, 1500);
  gameLoop = setInterval(updateGame, 30);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  const timerEl = document.getElementById('timerDisplay');
  timerEl.textContent = `⏱️ ${timeLeft}s`;
  timerEl.classList.remove('warning', 'danger');
  
  if (timeLeft <= 10 && timeLeft > 5) {
    timerEl.classList.add('warning');
  } else if (timeLeft <= 5) {
    timerEl.classList.add('danger');
  }
  
  if (timeLeft <= 0) {
    endGame();
  }
}

function spawnItem() {
  const randomItem = items[Math.floor(Math.random() * items.length)];
  const item = {
    ...randomItem,
    id: itemIdCounter++,
    x: Math.random() * 80 + 10,
    y: -5,
    speed: 0.8 + Math.random() * 0.5,
    element: null,
    caught: false
  };
  
  const element = document.createElement('div');
  element.className = 'falling-item';
  element.textContent = item.emoji;
  element.style.left = item.x + '%';
  element.style.top = item.y + '%';
  document.getElementById('gameArea').appendChild(element);
  
  item.element = element;
  fallingItems.push(item);
}

function updateGame() {
  if (gameState !== 'playing') return;
  
  fallingItems.forEach(item => {
    item.y += item.speed;
    item.element.style.top = item.y + '%';
    
    if (item.y > 75 && item.y < 85 && !item.caught) {
      const distance = Math.abs(item.x - playerX);
      if (distance < 8) {
        item.caught = true;
        item.element.style.filter = 'brightness(2)';
        
        if (item.type === 'good') {
          score += item.points;
          updateScore();
        } else {
          lives--;
          updateLives();
          if (lives <= 0) {
            endGame();
          }
        }
        
        setTimeout(() => {
          if (item.element && item.element.parentNode) {
            item.element.remove();
          }
        }, 200);
      }
    }
    
    if (item.y > 105 && item.element && item.element.parentNode) {
      item.element.remove();
    }
  });
  
  fallingItems = fallingItems.filter(item => item.y < 105);
}

function updateScore() {
  document.getElementById('scoreDisplay').textContent = score;
}

function updateLives() {
  document.getElementById('livesDisplay').textContent = '❤️ '.repeat(lives).trim();
}

function endGame() {
  gameState = 'gameover';
  clearInterval(gameLoop);
  clearInterval(spawnInterval);
  clearInterval(timerInterval);
  
  // ===== STOP AUDIO BILA GAME OVER =====
  soundtrack.pause();
  soundtrack.currentTime = 0; // Reset untuk next game
  
  fallingItems.forEach(item => {
    if (item.element && item.element.parentNode) {
      item.element.remove();
    }
  });
  fallingItems = [];
  
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    document.getElementById('newHighScore').style.display = 'block';
  } else {
    document.getElementById('newHighScore').style.display = 'none';
  }
  
  let icon = '💫';
  let text = '💪 Keep practicing your dreams!';
  
  if (score >= 100) {
    icon = '🏆';
    text = '🌟 Dream Achiever! Amazing!';
  } else if (score >= 50) {
    icon = '⭐';
    text = '✨ Dream Chaser! Keep going!';
  }
  
  document.getElementById('achievementIcon').textContent = icon;
  document.getElementById('achievementText').textContent = text;
  document.getElementById('finalScore').textContent = score;
  showScreen('gameover');
}

function backToMenu() {
  gameState = 'menu';
  clearInterval(gameLoop);
  clearInterval(spawnInterval);
  clearInterval(timerInterval);
  
  // ===== STOP AUDIO BILA BALIK MENU =====
  soundtrack.pause();
  soundtrack.currentTime = 0;
  
  if (highScore > 0) {
    document.getElementById('highScoreDisplay').textContent = `🏆 High Score: ${highScore}`;
  }
  
  showScreen('menu');
}

// ===== PLAYER CONTROLS =====
const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');

gameArea.addEventListener('mousemove', e => {
  if (gameState !== 'playing') return;
  const rect = gameArea.getBoundingClientRect();
  playerX = ((e.clientX - rect.left) / rect.width) * 100;
  playerX = Math.max(10, Math.min(90, playerX));
  player.style.left = playerX + '%';
});

document.addEventListener('keydown', e => {
  if (gameState !== 'playing') return;
  
  if (e.key === 'ArrowLeft') {
    playerX = Math.max(10, playerX - 3);
    player.style.left = playerX + '%';
  } else if (e.key === 'ArrowRight') {
    playerX = Math.min(90, playerX + 3);
    player.style.left = playerX + '%';
  }
});

player.style.left = playerX + '%';

// ===== SCROLL FUNCTIONS =====
function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function scrollToBottom() {
  window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
}
