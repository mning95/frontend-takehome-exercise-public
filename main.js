// Game states
let gameState = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
const winningCombos = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6], 
];

const clickCell = ({target}) => {
  const cellIndex = parseInt(target.getAttribute('data-index'));

  // Do nothing if user clicks occupied cell
  if (gameState[cellIndex] !== "") return;

  // Update UI and game state
  target.innerHTML = currPlayer;
  gameState[cellIndex] = currPlayer;

  // Check for a win
  for (const combo of winningCombos) {
    const first = combo[0];
    const second = combo[1];
    const third = combo[2];

    if (gameState[first] !== "" && gameState[first] === gameState[second] && gameState[second] === gameState[third]) {
      window.alert(`${currPlayer} has won the game!`)
      return;
    }
  }
};



document.querySelectorAll('.cell').forEach(c => c.addEventListener('click', clickCell));