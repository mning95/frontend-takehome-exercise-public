// Game states
let gameState = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let xWinCount = 0;
let oWinCount = 0;
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

const endGame = (result) => {  
  // 1) Update counts
  gameCount++;
  if (result === "win") {
    // Update win count
    if (currPlayer === "X") {
      xWinCount++;
    } else {
      oWinCount++;
    }

    // Update status
    document.querySelector('.status').innerHTML = `The winner is ${currPlayer}`;
  } else {
    // Update tie count
    tieCount++;

    // Update status
    document.querySelector('.status').innerHTML = 'Tie Game';
  }

  // 2) Update UI
  // Update scoreboard
  document.querySelector('.win-count-x').innerHTML = `${xWinCount} (${((xWinCount / gameCount) * 100).toFixed(2)}%)`;
  document.querySelector('.win-count-o').innerHTML = `${oWinCount} (${((oWinCount / gameCount) * 100).toFixed(2)}%)`;
  document.querySelector('.tie-count').innerHTML = `${tieCount} (${((tieCount / gameCount) * 100).toFixed(2)}%)`;
  // Switch cursor style to default
  document.querySelectorAll('.cell').forEach(c => c.style.cursor = "default");
  // Display 'play again' button
  document.querySelector('.replay').style.visibility = "visible";

  // 3) Remove event listeners
  document.querySelectorAll('.cell').forEach(c => {
    c.removeEventListener('mouseenter', enablePreview);
    c.removeEventListener('mouseleave', disablePreview);
    c.removeEventListener('click', placeMove);
  });
};

const checkGameStatus = () => {
  // Check for winning combos
  for (const combo of winningCombos) {
    const first = combo[0];
    const second = combo[1];
    const third = combo[2];

    // Win if winning combo cells are occupied by same symbol that's not ""
    if (gameState[first] !== "" && gameState[first] === gameState[second] && gameState[second] === gameState[third]) {
      endGame("win")
      return;
    }
  }

  // Tie if there are no winning combos and all cells are occupied
  if (!gameState.includes("")) {
    endGame("tie");
    return;
  }
}

const placeMove = ({target}) => {
  // Do nothing if user clicks occupied cell
  const cellIndex = parseInt(target.getAttribute('data-index'));
  if (gameState[cellIndex] !== "") return;

  // Update game state and UI
  gameState[cellIndex] = currPlayer;
  target.innerHTML = currPlayer;
  target.style.backgroundColor = '#fff';

  // Check if game has reached a conclusion
  checkGameStatus();

  // Switch players and update status UI
  currPlayer = currPlayer === "X" ? "O" : "X";
  document.querySelector('.status').innerHTML = `${currPlayer}'s Turn`

  // Remove mouse hover event listeners to prevent overriding updates to cell made by click event
  target.removeEventListener('mouseenter', enablePreview);
  target.removeEventListener('mouseleave', disablePreview);
};

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
    c.addEventListener('click', placeMove);
  });
};

// Add event listeners
document.querySelectorAll('.cell').forEach(c => {
  c.addEventListener('mouseenter', enablePreview);
  c.addEventListener('mouseleave', disablePreview);
  c.addEventListener('click', placeMove);
});
document.querySelector('.replay').addEventListener('click', replay);
