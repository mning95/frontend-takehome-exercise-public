// Game states
let gameState = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let winCountX = 0;
let winCountO = 0;
let tieCount = 0;
let gameCount = 0;
let gameOver = false;

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

const replay = () => {
  // Allow clicking cells
  gameOver = false;
  document.querySelectorAll('.cell').forEach(c => c.style.cursor = "pointer");
  
  // Reset UI, game state, and player
  document.querySelector('.status').innerHTML = "";
  document.querySelectorAll('.cell').forEach(c => c.innerHTML = "");
  gameState = ["", "", "", "", "", "", "", "", ""];
  currPlayer = "X";

  // Hide 'play again' button
  document.querySelector('.replay').style.visibility = "hidden";
};

const clickCell = ({target}) => {
  // Do nothing if game is over
  if (gameOver) return;

  const cellIndex = parseInt(target.getAttribute('data-index'));

  // Do nothing if user clicks occupied cell
  if (gameState[cellIndex] !== "") return;

  // Update UI and game state
  target.innerHTML = currPlayer;
  gameState[cellIndex] = currPlayer;

  for (const combo of winningCombos) {
    const first = combo[0];
    const second = combo[1];
    const third = combo[2];

    // Win if winning combo cells are occupied by same symbol that's not ""
    if (gameState[first] !== "" && gameState[first] === gameState[second] && gameState[second] === gameState[third]) {
      // Prevent user from clicking cells after game over
      gameOver = true;
      document.querySelectorAll('.cell').forEach(c => c.style.cursor = "default");

      // Update status
      document.querySelector('.status').innerHTML = `The winner is ${currPlayer}`;

      // Update game scores
      gameCount++;
      if (currPlayer === "X") {
        winCountX++;
      } else {
        winCountO++;
      }

      document.querySelector('.win-count-x').innerHTML = `${winCountX} (${((winCountX / gameCount) * 100).toFixed(2)}%)`;
      document.querySelector('.win-count-o').innerHTML = `${winCountO} (${((winCountO / gameCount) * 100).toFixed(2)}%)`;
      document.querySelector('.tie-count').innerHTML = `${tieCount} (${((tieCount / gameCount) * 100).toFixed(2)}%)`;

      // Display 'play again' button
      document.querySelector('.replay').style.visibility = "visible";
      
      return;
    }
  }

  // Tie if no winning combos and all cells are occupied
  if (!gameState.includes("")) {
    // Prevent user from clicking cells after game over
    gameOver = true;
    document.querySelectorAll('.cell').forEach(c => c.style.cursor = "default");

    // Update status
    document.querySelector('.status').innerHTML = 'Tie Game';

    // Update scores
    gameCount++;
    tieCount++;
    document.querySelector('.win-count-x').innerHTML = `${winCountX} (${((winCountX / gameCount) * 100).toFixed(2)}%)`;
    document.querySelector('.win-count-o').innerHTML = `${winCountO} (${((winCountO / gameCount) * 100).toFixed(2)}%)`;
    document.querySelector('.tie-count').innerHTML = `${tieCount} (${((tieCount / gameCount) * 100).toFixed(2)}%)`;

    // Display 'play again' button
    document.querySelector('.replay').style.visibility = "visible";

    return;
  }

  // Switch players
  currPlayer = currPlayer === "X" ? "O" : "X";
};

document.querySelectorAll('.cell').forEach(c => c.addEventListener('click', clickCell));
document.querySelector('.replay').addEventListener('click', replay);