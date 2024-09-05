const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const winningMessageTextElement = document.getElementById('winningMessageText');
const restartButton = document.getElementById('restartButton');
const winningMessageElement = document.getElementById('winningMessage');

let isCircleTurn;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o', 'win');
    cell.style.backgroundColor = ''; // Clear the background color
    cell.textContent = ''; // Clear the text inside the cell
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.style.display = 'none';
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'o' : 'x';
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    highlightWinningCells();
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${isCircleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.style.display = 'block';
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase(); // Add 'X' or 'O' to the cell
}

function swapTurns() {
  isCircleTurn = !isCircleTurn;
}

function setBoardHoverClass() {
  board.classList.remove('x', 'o');
  board.classList.add(isCircleTurn ? 'o' : 'x');
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function highlightWinningCells() {
  WINNING_COMBINATIONS.forEach(combination => {
    if (combination.every(index => cells[index].classList.contains(isCircleTurn ? 'o' : 'x'))) {
      combination.forEach(index => {
        cells[index].style.backgroundColor = '#FFD700'; // Yellow background for winning cells
      });
    }
  });
}
