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

// Reset UI, game state, and player. Hide 'play again' button
const replay = () => {
  document.querySelector('.status').innerHTML = "";
  document.querySelectorAll('.cell').forEach(c => c.innerHTML = "");
  gameState = ["", "", "", "", "", "", "", "", ""];
  currPlayer = "X";
  document.querySelector('.replay').style.visibility = "hidden";
};

const clickCell = ({target}) => {
  const cellIndex = parseInt(target.getAttribute('data-index'));

  // Do nothing if user clicks occupied cell
  if (gameState[cellIndex] !== "") return;

  // Update UI and game state
  target.innerHTML = currPlayer;
  gameState[cellIndex] = currPlayer;

  // Win if a winning combo is occupied by same symbol that's not ""
  for (const combo of winningCombos) {
    const first = combo[0];
    const second = combo[1];
    const third = combo[2];

    if (gameState[first] !== "" && gameState[first] === gameState[second] && gameState[second] === gameState[third]) {
      document.querySelector('.status').innerHTML = `The winner is ${currPlayer}`;
      // Display 'play again' button
      document.querySelector('.replay').style.visibility="visible";
      
      return;
    }
  }

  // Draw if no winning combos and all cells are occupied
  if (!gameState.includes("")) {
    document.querySelector('.status').innerHTML = 'Tie Game';
    // Display 'play again' button
    document.querySelector('.replay').style.visibility="visible";
  }

  // Switch players
  currPlayer = currPlayer === "X" ? "O" : "X";
};

document.querySelectorAll('.cell').forEach(c => c.addEventListener('click', clickCell));
document.querySelector('.replay').addEventListener('click', replay);