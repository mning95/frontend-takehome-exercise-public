// Game states
let gameState = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";

const clickCell = ({target}) => {
  const cellIndex = parseInt(target.getAttribute('data-index'));

  // Do nothing if user clicks occupied cell
  if (gameState[cellIndex] !== "") return;

  // Update UI and game state
  target.innerHTML = currPlayer;
  gameState[cellIndex] = currPlayer;
};



document.querySelectorAll('.cell').forEach(c => c.addEventListener('click', clickCell));