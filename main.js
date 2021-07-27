// Game states
let gameState = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let winCountX = 0;
let winCountO = 0;
let tieCount = 0;
let gameCount = 0;

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

const enablePreview = ({target}) => {
  target.innerHTML = currPlayer;
  target.style.backgroundColor = '#26A69A';
};

const disablePreview = ({target}) => {
  target.innerHTML = '';
  target.style.backgroundColor= 'fff';
}

const replay = () => {
  // Switch cursor style to pointer
  document.querySelectorAll('.cell').forEach(c => c.style.cursor = "pointer");
  
  // Reset game state and player. Update UI
  gameState = ["", "", "", "", "", "", "", "", ""];
  currPlayer = "X";
  document.querySelectorAll('.cell').forEach(c => c.innerHTML = "");
  document.querySelector('.status').innerHTML = `${currPlayer}'s Turn`
  
  // Hide 'play again' button
  document.querySelector('.replay').style.visibility = "hidden";

  // Re-enable event listeners
  document.querySelectorAll('.cell').forEach(c => {
    c.addEventListener('mouseenter', enablePreview);
    c.addEventListener('mouseleave', disablePreview);
    c.addEventListener('click', clickCell);
  });
};

const clickCell = ({target}) => {
  const cellIndex = parseInt(target.getAttribute('data-index'));

  // Do nothing if user clicks occupied cell
  if (gameState[cellIndex] !== "") return;

  // Update UI and game state
  target.innerHTML = currPlayer;
  gameState[cellIndex] = currPlayer;
  target.style.backgroundColor = '#fff';

  for (const combo of winningCombos) {
    const first = combo[0];
    const second = combo[1];
    const third = combo[2];

    // Win if winning combo cells are occupied by same symbol that's not ""
    if (gameState[first] !== "" && gameState[first] === gameState[second] && gameState[second] === gameState[third]) {
      // Switch cursor style to default
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
      

      // Remove event listeners
      document.querySelectorAll('.cell').forEach(c => {
        c.removeEventListener('mouseenter', enablePreview);
        c.removeEventListener('mouseleave', disablePreview);
        c.removeEventListener('click', clickCell);
      });

      return;
    }
  }

  // Tie if no winning combos and all cells are occupied
  if (!gameState.includes("")) {
    // Switch cursor style to default
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

    // Remove event listeners
    document.querySelectorAll('.cell').forEach(c => {
      c.removeEventListener('mouseenter', enablePreview);
      c.removeEventListener('mouseleave', disablePreview);
      c.removeEventListener('click', clickCell);
    });

    return;
  }

  // Switch players
  currPlayer = currPlayer === "X" ? "O" : "X";
  document.querySelector('.status').innerHTML = `${currPlayer}'s Turn`

  // Remove mouse hover event listeners
  target.removeEventListener('mouseenter', enablePreview);
  target.removeEventListener('mouseleave', disablePreview);
};

document.querySelectorAll('.cell').forEach(c => {
  c.addEventListener('mouseenter', enablePreview);
  c.addEventListener('mouseleave', disablePreview);
  c.addEventListener('click', clickCell);
});
document.querySelector('.replay').addEventListener('click', replay);
