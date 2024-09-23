// Initialize scores from localStorage or set to 0
let playerScore = localStorage.getItem('playerScore') ? parseInt(localStorage.getItem('playerScore')) : 0;
let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;

// Display stored scores if they exist
document.getElementById('player-score').textContent = playerScore;
document.getElementById('computer-score').textContent = computerScore;

document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', function () {
        const playerChoice = this.dataset.choice;
        const computerChoice = getComputerChoice();

        document.getElementById('player-choice').textContent = playerChoice;
        document.getElementById('computer-choice').textContent = computerChoice;

        const winner = determineWinner(playerChoice, computerChoice);
        displayResult(winner);

        updateScores(winner);
        saveScores(); // Save scores to localStorage after updating
    });
});

// Show/Hide Rules
const rulesBtn = document.getElementById('rules-btn');
const closeRulesBtn = document.getElementById('close-rules');
const rulesBox = document.getElementById('rules-box');

rulesBtn.addEventListener('click', function () {
    rulesBox.classList.toggle('hidden');
});

closeRulesBtn.addEventListener('click', function () {
    rulesBox.classList.add('hidden');
});

// "Next" button logic
const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', function() {
    if (playerScore > computerScore) {
        window.location.href = 'winner.html'; // Redirect to winner page
    } else if (computerScore > playerScore) {
        window.location.href = 'loser.html'; // Redirect to loser page
    } else {
        alert("It's a draw! Keep playing!");
    }
});

// Functions for the game logic
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

function determineWinner(player, computer) {
    if (player === computer) {
        return 'draw';
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}

function displayResult(winner) {
    const resultElement = document.getElementById('game-result');
    if (winner === 'draw') {
        resultElement.textContent = 'It\'s a Draw!';
    } else if (winner === 'player') {
        resultElement.textContent = 'You Win!';
    } else {
        resultElement.textContent = 'Computer Wins!';
    }
}

function updateScores(winner) {
    if (winner === 'player') {
        playerScore++;
        document.getElementById('player-score').textContent = playerScore;
    } else if (winner === 'computer') {
        computerScore++;
        document.getElementById('computer-score').textContent = computerScore;
    }
}

// Save scores to localStorage
function saveScores() {
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}
