let time = 60, score = 0, bestScore = localStorage.getItem('best') || 0;
const lane = document.getElementById('lane');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const bestDisplay = document.getElementById('best');
const specNote = document.getElementById('specNote');

function updateDisplay() {
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;
    bestDisplay.textContent = bestScore;
}

startButton.addEventListener('click', () => {
    startGame();
});

function startGame() {
    time = 60;
    score = 0;
    updateDisplay();
    specNote.textContent = 'Swipe left to dodge asteroids!';
    let asteroidInterval = setInterval(() => {
        if (time <= 0) {
            clearInterval(asteroidInterval);
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem('best', bestScore);
            }
            specNote.textContent = `Game Over! Final Score: ${score}`;
            return;
        }
        time--;
        updateDisplay();
        createAsteroid();
    }, 1000);
}

function createAsteroid() {
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');
    lane.appendChild(asteroid);
    let asteroidX = Math.random() * (lane.offsetWidth - 50);
    let velocity = Math.random() * 2 + 1;
    let animationFrameId;

    function moveAsteroid() {
        if (asteroid.offsetLeft < 0) {
            lane.removeChild(asteroid);
            return;
        }
        asteroid.style.left = `${asteroidX - velocity}px`;
        collisionDetection();
        requestAnimationFrame(moveAsteroid);
    }

    asteroidX -= lane.offsetWidth;
    animationFrameId = requestAnimationFrame(moveAsteroid);

    asteroid.addEventListener('touchstart', (e) => {
        cancelAnimationFrame(animationFrameId);
        score++;
        updateDisplay();
        asteroid.style.left = `${asteroid.offsetLeft + 100}px`;
        requestAnimationFrame(moveAsteroid);
    });

    asteroid.addEventListener('click', () => {
        cancelAnimationFrame(animationFrameId);
        score++;
        updateDisplay();
        asteroid.style.left = `${asteroid.offsetLeft + 100}px`;
        requestAnimationFrame(moveAsteroid);
    });
}

function collisionDetection() {
    const asteroids = lane.getElementsByClassName('asteroid');
    for (let i = 0; i < asteroids.length; i++) {
        if (parseInt(asteroids[i].style.left) <= 50 && parseInt(asteroids[i].style.left) >= -50) {
            clearInterval(asteroidInterval);
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem('best', bestScore);
            }
            specNote.textContent = `Game Over! Final Score: ${score}`;
        }
    }
}