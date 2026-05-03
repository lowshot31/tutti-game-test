let score = 0, time = 60, interval, bestScore = localStorage.getItem('best') || 0;

document.getElementById('score').textContent = score;
document.getElementById('time').textContent = time;
document.getElementById('best').textContent = bestScore;

const lane = document.getElementById('lane');
const startButton = document.getElementById('startButton');

function updateDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = time;
}

function endGame() {
    clearInterval(interval);
    const currentBest = parseInt(localStorage.getItem('best') || 0, 10);
    if (score > currentBest) localStorage.setItem('best', score);
    document.getElementById('specNote').textContent = `Game Over! Your Score: ${score}`;
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    interval = setInterval(() => {
        time--;
        updateDisplay();
        if (time <= 0) endGame();
    }, 1000);

    for (let i = 0; i < 5; i++) {
        const asteroid = document.createElement('div');
        asteroid.classList.add('asteroid');
        asteroid.style.top = `${Math.random() * 420}px`;
        lane.appendChild(asteroid);
        
        asteroid.addEventListener('click', () => {
            score++;
            updateDisplay();
        });
    }
});

document.body.addEventListener('touchstart', (e) => {
    const target = e.target.closest('.asteroid');
    if (target) {
        score++;
        updateDisplay();
        lane.removeChild(target);
    }
});