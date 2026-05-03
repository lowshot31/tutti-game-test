const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const bestScoreDisplay = document.getElementById('best');
const startButton = document.getElementById('startButton');
const lane = document.getElementById('lane');
const specNote = document.getElementById('specNote');

let score = 0;
let timeLeft = 60;
let bestScore = localStorage.getItem('best') || 0;

function updateDisplays() {
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    bestScoreDisplay.textContent = bestScore;
}

function gameLoop() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplays();
        setTimeout(gameLoop, 1000);
    } else {
        checkBestScore();
        specNote.textContent = 'Game Over!';
        startButton.disabled = false;
    }
}

function checkBestScore() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('best', bestScore);
    }
}

startButton.addEventListener('click', () => {
    score = 0;
    timeLeft = 60;
    specNote.textContent = '';
    updateDisplays();
    gameLoop();
    startButton.disabled = true;

    const obstacles = lane.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => obstacle.remove());

    let obstacleInterval = setInterval(() => {
        if (timeLeft > 0) {
            createObstacle();
        } else {
            clearInterval(obstacleInterval);
        }
    }, Math.random() * 2000 + 1000);

    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        obstacle.style.top = `${Math.floor(Math.random() * 300)}px`;
        lane.appendChild(obstacle);

        let obstacleTop = parseInt(obstacle.style.top, 10);
        const moveObstacle = setInterval(() => {
            if (obstacleTop > -50) {
                obstacleTop--;
                obstacle.style.top = `${obstacleTop}px`;
            } else {
                clearInterval(moveObstacle);
                lane.removeChild(obstacle);
            }
        }, 20);

        obstacle.addEventListener('click', () => {
            score++;
            updateDisplays();
            obstacle.remove();
        });
    }
});