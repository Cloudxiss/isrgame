const stick = document.getElementById('stick'); // Get the stick element
let score = 0;
let timeLeft = 60;
let gameInterval;
const fliesContainer = document.getElementById('flies-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Hide the stick initially
stick.style.display = 'none';

// Function to generate a random fly
function createFly() {
    const fly = document.createElement('img'); // Create an img element for the fly
    fly.src = 'isr.png'; // Set the source to your fly image

    const size = Math.random() > 0.5 ? 75 : 37.5; // Random size, increased by 5 times (originals were 15 and 30)
    
    fly.style.width = `${size}px`; // Set the width of the fly image
    fly.style.height = `${size}px`; // Set the height of the fly image
    
    fly.style.position = 'absolute'; // Ensure the fly is positioned absolutely
    fly.style.top = `${Math.random() * 90}vh`; // Random vertical position
    fly.style.left = `${Math.random() * 90}vw`; // Random horizontal position
    fliesContainer.appendChild(fly);

    // Add click event to score and show the stick above the fly
    fly.addEventListener('click', (event) => {
        score += size === 37.5 ? 10 : 5; // More points for smaller flies
        scoreDisplay.textContent = `Score: ${score}`;
        
        // Show stick above the clicked fly
        showStickAboveFly(event);

        // Remove the fly after it's clicked
        fly.remove();
    });

    // Remove fly after 3 seconds if not clicked
    setTimeout(() => {
        fly.remove();
    }, 3000);
}

// Function to show the stick above the fly
function showStickAboveFly(event) {
    const xPosition = event.clientX; // X position where the fly is clicked
    const yPosition = event.clientY; // Y position where the fly is clicked

    // Position the stick above the fly
    stick.style.left = `${xPosition - stick.offsetWidth / 2}px`;
    stick.style.top = `${yPosition - stick.offsetHeight - 10}px`; // Slightly above the fly
    stick.style.display = 'block'; // Show the stick

    // Hide the stick after a short delay (e.g., 500ms)
    setTimeout(() => {
        stick.style.display = 'none';
    }, 500);
}

// Start the game
function startGame() {
    gameInterval = setInterval(() => {
        createFly();
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert(`Time's up! Your score is ${score}`);
        }
    }, 1000); // Creates a fly every second
}

startGame();
