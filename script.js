const gameBoard = () => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setBoard = (newBoard) => {
        board = newBoard;
    };
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };
    return { getBoard, setBoard, resetBoard };
};

const player = (mark) => {
    return { mark };
};

const boardObject = gameBoard();
const player1 = player("X");
const player2 = player("O");
const grid = document.querySelector(".board");
const gameInfo = document.querySelector(".game-info");
const restartButton = document.querySelector(".restart-button");

let gameOver = false;
let currentPlayer = player1;

restartButton.addEventListener("click", () => {
    boardObject.resetBoard();
    gameOver = false;
    currentPlayer = player1;
    displayBoard();
});

const displayBoard = () => {
    const board = boardObject.getBoard();
    grid.innerHTML = "";
    gameInfo.textContent = `Player ${currentPlayer.mark} turn!`;

    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("data-index", i);
        cell.classList.add("cell");

        // Add a click event listener to each cell.
        cell.addEventListener("click", () => handleCellClick(i));

        // Display the player's mark if the cell is not empty.
        cell.textContent = board[i];

        grid.append(cell);
    }
};

const handleCellClick = (index) => {
    if (gameOver) {
        return;
    }

    const board = boardObject.getBoard();

    // Check if the clicked cell is empty.
    if (board[index] === "") {
        // Update the board with the current player's mark.
        board[index] = currentPlayer.mark;
        boardObject.setBoard(board);

        // Update the UI with the new board state.
        displayBoard();

        // Check if the current player has won or if it's a draw.
        if (checkWin(currentPlayer.mark)) {
            gameInfo.textContent = `Player ${currentPlayer.mark} won!`;
            gameOver = true;
        } else if (checkDraw()) {
            gameInfo.textContent = `Draw!`;
            gameOver = true;
        } else {
            // Switch to the next player's turn.
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            displayBoard();
        }
    }
};

const checkWin = (mark) => {
    const board = boardObject.getBoard();

    // Define winning combinations (indexes of the board).
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Columns
        [0, 4, 8],
        [2, 4, 6], // Diagonals
    ];

    // Check if the player has any winning combination.
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (board[a] === mark && board[b] === mark && board[c] === mark) {
            const winningCells = document.querySelectorAll(`[data-index="${a}"], [data-index="${b}"], [data-index="${c}"]`);
            console.log(winningCells);
            winningCells.forEach((cell) => {
                cell.classList.add("winning-cell");
            });

            return true; // Player has won.
        }
    }

    return false; // No winning combination found.
};

const checkDraw = () => {
    const board = boardObject.getBoard();

    if (!board.includes("")) {
        return true;
    }
    return false;
};

displayBoard();
