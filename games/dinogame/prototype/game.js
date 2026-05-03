const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const bestDisplay = document.getElementById('best');
const startButton = document.getElementById('startButton');
const lane = document.getElementById('lane');
const specNote = document.getElementById('specNote');

let score = 0;
let timeLeft = 60;
let gameInterval;
let bestScore = localStorage.getItem('bestScore') || 0;

function updateDisplay() {
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    bestDisplay.textContent = bestScore;
}

startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    timeLeft = 60;
    lane.innerHTML = '';
    specNote.textContent = 'Avoid obstacles by tapping on them!';
    updateDisplay();

    gameInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            endGame();
        }
    }, 1000);

    createObstacle();
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.random() * (lane.clientWidth - 50) + 'px';
    lane.appendChild(obstacle);

    obstacle.addEventListener('click', () => {
        score++;
        updateDisplay();
    });

    obstacle.style.transition = 'top 1s linear';
    obstacle.style.top = '-50px';

    setTimeout(() => {
        if (obstacle.parentNode) {
            obstacle.remove();
        }
        createObstacle();
    }, timeLeft * 1000);
}

function endGame() {
    clearInterval(gameInterval);
    specNote.textContent = 'Game Over! Tap to restart.';
    lane.style.pointerEvents = 'none';
    localStorage.setItem('bestScore', Math.max(bestScore, score));
}