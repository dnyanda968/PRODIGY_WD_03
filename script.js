document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset");
    const message = document.getElementById("message");
    let currentPlayer = "X";
    let boardState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(e) {
        const index = e.target.getAttribute("data-index");
        if (!boardState[index]) {
            boardState[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            if (checkWinner(currentPlayer)) {
                message.textContent = `Player ${currentPlayer} wins!`;
                board.removeEventListener("click", handleClick);
            } else if (boardState.every(cell => cell)) {
                message.textContent = "It's a tie!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkWinner(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === player;
            });
        });
    }

    function resetGame() {
        boardState.fill(null);
        cells.forEach(cell => (cell.textContent = ""));
        currentPlayer = "X";
        message.textContent = "";
        board.addEventListener("click", handleClick);
    }

    board.addEventListener("click", handleClick);
    resetButton.addEventListener("click", resetGame);
});
