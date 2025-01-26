let scores = {
    X: localStorage.getItem('scoreX') ? parseInt(localStorage.getItem('scoreX')) : 0,
    O: localStorage.getItem('scoreO') ? parseInt(localStorage.getItem('scoreO')) : 0,
    draws: localStorage.getItem('scoreDraws') ? parseInt(localStorage.getItem('scoreDraws')) : 0,
};

const updateScoresDisplay = () => {
    const scoreDisplay = document.querySelector(".score-display");
    scoreDisplay.innerHTML = `Player X: ${scores.X} | Computer: ${scores.O} | Draws: ${scores.draws}`;
};

// GameBoard Module
const gameBoard = (function () {
    let board = Array(9).fill("");

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
        }
    };

    const resetBoard = () => (board = Array(9).fill(""));

    return { getBoard, setMark, resetBoard };
})();

// Player Factory
const player = (name, marker) => {
    return { playerName: name, playerMarker: marker };
};

const player1 = player("Player X", "X");
const aiPlayer = player("Computer", "O");

// GameController Module
const gameController = (() => {
    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? aiPlayer : player1;
        DisplayController.showMessage(`${currentPlayer.playerName}'s Turn`);

        if (currentPlayer === aiPlayer && !gameOver) {
            setTimeout(() => {
                aiMove();
            }, 500);
        }
    };

    const checkWin = () => {
        const board = gameBoard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some((pattern) =>
            pattern.every((index) => board[index] === currentPlayer.playerMarker)
        );
    };

    const aiMove = () => {
        if (gameOver) return;

        const board = gameBoard.getBoard();
        let bestMove = -1;
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = aiPlayer.playerMarker;
                let score = minimax(board, 0, false);
                board[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        if (bestMove !== -1) {
            gameBoard.setMark(bestMove, aiPlayer.playerMarker);
            DisplayController.renderBoard();

            if (checkWin()) {
                gameOver = true;
                scores.O++;
                localStorage.setItem('scoreO', scores.O);
                DisplayController.showMessage(`${aiPlayer.playerName} Wins!`);
                updateScoresDisplay();
                DisplayController.updateResetButtonText("Play Again");
                return;
            }

            if (gameBoard.getBoard().every((cell) => cell !== "")) {
                gameOver = true;
                scores.draws++;
                localStorage.setItem('scoreDraws', scores.draws);
                DisplayController.showMessage("It's a Draw!");
                updateScoresDisplay();
                DisplayController.updateResetButtonText("Play Again");
                return;
            }

            switchPlayer();
        }
    };

    const minimax = (board, depth, isMaximizing) => {
        const scores = {
            X: -1,
            O: 1,
            tie: 0,
        };

        if (checkWinner(board, player1.playerMarker)) {
            return scores.X;
        }
        if (checkWinner(board, aiPlayer.playerMarker)) {
            return scores.O;
        }
        if (board.every(cell => cell !== "")) {
            return scores.tie;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = aiPlayer.playerMarker;
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = player1.playerMarker;
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const checkWinner = (board, marker) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => board[index] === marker)
        );
    };

    const playTurn = (index) => {
        if (gameOver || gameBoard.getBoard()[index] !== "" || currentPlayer === aiPlayer) return;

        gameBoard.setMark(index, currentPlayer.playerMarker);
        DisplayController.renderBoard();

        if (checkWin()) {
            gameOver = true;
            scores.X++;
            localStorage.setItem('scoreX', scores.X);
            DisplayController.showMessage(`${currentPlayer.playerName} Wins!`);
            updateScoresDisplay();
            DisplayController.updateResetButtonText("Play Again");
            return;
        }

        if (gameBoard.getBoard().every((cell) => cell !== "")) {
            gameOver = true;
            scores.draws++;
            localStorage.setItem('scoreDraws', scores.draws);
            DisplayController.showMessage("It's a Draw!");
            updateScoresDisplay();
            DisplayController.updateResetButtonText("Play Again");
            return;
        }

        switchPlayer();
    };

    const resetGame = () => {
        gameOver = false;
        currentPlayer = player1;
        gameBoard.resetBoard();
        DisplayController.renderBoard();
        DisplayController.showMessage(`${currentPlayer.playerName}'s Turn`);
        DisplayController.updateResetButtonText("Reset Game");
    };

    return { playTurn, resetGame, aiMove, checkWin };
})();

// DisplayController Module
const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const feedback = document.querySelector(".feedback");
    const resetButton = document.querySelector(".reset-button");
    const clearScoresButton = document.querySelector(".clear-scores-button");

    const renderBoard = () => {
        const board = gameBoard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
            cell.style.pointerEvents = board[index] !== "" ? "none" : "auto";
        });
    };

    const showMessage = (message) => {
        feedback.textContent = message;
    };

    const updateResetButtonText = (text) => {
        resetButton.textContent = text;
        resetButton.classList.toggle("btn-secondary", text === "Reset Game");
        resetButton.classList.toggle("btn-dark", text === "Play Again");
    };

    const enableCells = () => {
        cells.forEach(cell => {
            cell.style.pointerEvents = "auto";
        });
    };

    const addEventListeners = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => gameController.playTurn(index));
        });

        resetButton.addEventListener("click", () => {
            gameController.resetGame(); // Always reset the game state
            updateScoresDisplay();
            showMessage(`${player1.playerName}'s Turn`);
            updateResetButtonText("Reset Game"); // Reset the button text
            enableCells(); // Ensure cells are clickable
        });

        clearScoresButton.addEventListener("click", () => {
            scores.X = 0;
            scores.O = 0;
            scores.draws = 0;

            localStorage.removeItem('scoreX');
            localStorage.removeItem('scoreO');
            localStorage.removeItem('scoreDraws');

            updateScoresDisplay();
            showMessage("Scores have been cleared!");
        });
    };

    return { renderBoard, showMessage, addEventListeners, updateResetButtonText, enableCells };
})();

// Initialize the Game
(function initializeGame() {
    DisplayController.addEventListeners();
    DisplayController.renderBoard();
    DisplayController.showMessage(`${player1.playerName}'s Turn`);
    updateScoresDisplay();
})();