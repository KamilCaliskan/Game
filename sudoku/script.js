// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    const boardElement = document.getElementById('sudoku-board');
    const newGameButton = document.getElementById('new-game-button');

    // Predefined Sudoku puzzle (0 represents an empty cell)
    const puzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    function createBoard(puzzle) {
        for (let row = 0; row < 9; row++) {
            const tr = document.createElement('tr');
            for (let col = 0; col < 9; col++) {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                if (puzzle[row][col] !== 0) {
                    input.value = puzzle[row][col];
                    input.disabled = true;
                }
                input.addEventListener('input', (event) => validateInput(event, row, col));
                td.appendChild(input);
                tr.appendChild(td);
            }
            boardElement.appendChild(tr);
        }
    }

    function clearBoard() {
        while (boardElement.firstChild) {
            boardElement.removeChild(boardElement.firstChild);
        }
    }

    function newGame() {
        clearBoard();
        createBoard(puzzle);
    }

    function validateInput(event, row, col) {
        const input = event.target;
        const value = parseInt(input.value);
        if (isNaN(value) || value < 1 || value > 9) {
            input.value = '';
            alert('Please enter a number between 1 and 9.');
            return;
        }

        if (!isValidMove(value, row, col)) {
            input.value = '';
            alert('Invalid move. The number violates Sudoku rules.');
        }
    }

    function isValidMove(value, row, col) {
        // Check row
        for (let c = 0; c < 9; c++) {
            if (c !== col && boardElement.rows[row].cells[c].firstChild.value == value) {
                return false;
            }
        }
        // Check column
        for (let r = 0; r < 9; r++) {
            if (r !== row && boardElement.rows[r].cells[col].firstChild.value == value) {
                return false;
            }
        }
        // Check 3x3 subgrid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                if ((r !== row || c !== col) && boardElement.rows[r].cells[c].firstChild.value == value) {
                    return false;
                }
            }
        }
        return true;
    }

    newGameButton.addEventListener('click', newGame);

    // Initialize the game on page load
    newGame();
});
