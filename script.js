const boardElement = document.getElementById('board');
const scoreElement = document.getElementById('score');
const attemptsElement = document.getElementById('attempts');
const startButton = document.getElementById('startButton');

let board = [];
let ships = 2; // Número de navios
let score = 0;
let attempts = 0;
let gameStarted = false;

// Criar o tabuleiro
function createBoard() {
    board = [];
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => handleCellClick(i, j));
            row.push(cell);
            boardElement.appendChild(cell);
        }
        board.push(row);
    }
}

// Colocar navios no tabuleiro
function placeShips() {
    let placedShips = 0;
    while (placedShips < ships) {
        const row = Math.floor(Math.random() * 5);
        const col = Math.floor(Math.random() * 5);
        if (board[row][col].classList.length === 1) { // Se a célula ainda não tiver um navio
            board[row][col].classList.add('ship');
            placedShips++;
        }
    }
}

// Lógica para lidar com o clique na célula
function handleCellClick(row, col) {
    if (!gameStarted) return;

    attempts++;
    attemptsElement.textContent = attempts;

    if (board[row][col].classList.contains('ship')) {
        board[row][col].classList.add('hit');
        score++;
        scoreElement.textContent = score;
    } else {
        board[row][col].classList.add('miss');
    }

    // Verificar se o jogo terminou
    if (score === ships) {
        alert(Você ganhou! Pontuação: ${score} Tentativas: ${attempts});
        gameStarted = false;
        startButton.textContent = "Reiniciar Jogo";
    }
}

// Iniciar o jogo
function startGame() {
    if (gameStarted) {
        resetGame();
    } else {
        createBoard();
        placeShips();
        gameStarted = true;
        startButton.textContent = "Reiniciar Jogo";
        score = 0;
        attempts = 0;
        scoreElement.textContent = score;
        attemptsElement.textContent = attempts;
    }
}

startButton.addEventListener('click', startGame);