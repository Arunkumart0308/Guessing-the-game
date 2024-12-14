let computerNumber;
let timer;
let timerInterval;
let timeElapsed = 0;
let gameStarted = false;

document.getElementById("startGameBtn").addEventListener("click", startGame);
document.getElementById("submitGuessBtn").addEventListener("click", checkGuess);
document.getElementById("restartGameBtn").addEventListener("click", restartGame);

function startGame() {
    const userName = prompt("Please enter your name:");
    if (userName) {
        document.getElementById("greeting").textContent = `Hello, ${userName}! Let's start the game.`;
        document.getElementById("game-start").classList.add("hidden");
        document.getElementById("game-screen").classList.remove("hidden");

        // Generate random 4-digit number
        computerNumber = generateRandomNumber();
        timeElapsed = 0;
        document.getElementById("timer").textContent = timeElapsed;

        // Start timer
        timerInterval = setInterval(updateTimer, 1000);
        gameStarted = true;
    }
}

function generateRandomNumber() {
    let num = '';
    for (let i = 0; i < 4; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

function updateTimer() {
    timeElapsed++;
    document.getElementById("timer").textContent = timeElapsed;
}

function checkGuess() {
    if (!gameStarted) return;

    const userGuess = document.getElementById("guess").value.trim();
    if (userGuess.length !== 4 || isNaN(userGuess)) {
        alert("Please enter a valid 4-digit number.");
        return;
    }

    let feedback = '';
    let correctDigits = 0;
    let misplacedDigits = 0;

    // Check each digit
    for (let i = 0; i < 4; i++) {
        if (userGuess[i] === computerNumber[i]) {
            correctDigits++;
        } else if (computerNumber.includes(userGuess[i])) {
            misplacedDigits++;
        }
    }

    // Provide feedback
    if (correctDigits === 4) {
        clearInterval(timerInterval);
        document.getElementById("game-screen").classList.add("hidden");
        document.getElementById("game-over").classList.remove("hidden");
        document.getElementById("correctNumber").textContent = computerNumber;
    } else {
        feedback = `${correctDigits} +, ${misplacedDigits} -`;
        document.getElementById("feedback").textContent = feedback;
    }
}

function restartGame() {
    document.getElementById("game-over").classList.add("hidden");
    document.getElementById("game-start").classList.remove("hidden");
    gameStarted = false;
}
