let gameState = ['', '', '', '', '', '', '', '', ''];
let currPlayer = 'X';
let xWinCount = 0;
let oWinCount = 0;
let tieCount = 0;
let gameCount = 0;

const PREVIEW_COLOR = '#ff9933';
const CLICK_COLOR = '#fff';
const WINNING_COMBOS = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6], 
];

/**
 * Helper function to convert a fraction to a percent
 * 
 * @param {number} num: numerator 
 * @param {number} denom: denominator
 * @param {number} digits: number of digits to appear after the decimal point
 * @returns a string representing a number using fixed-point notation
 */
const calculatePercent = (num, denom, digits) => ((num / denom) * 100).toFixed(digits);

/**
 * Helper function that updates counts, UI, and removes event listeners after game has ended
 * 
 * @param {string} result: 'win' or 'tie' result
 */
const endGame = (result) => {  
  // 1) Update counts
  gameCount++;
  
  if (result === 'win') {
    // Update win count
    if (currPlayer === 'X') {
      xWinCount++;
    } else if (currPlayer === 'O') {
      oWinCount++;
    } else {
      // We shouldn't reach here
      console.error('Invalid player');
    }
  } else if (result === 'tie') {
    // Update tie count
    tieCount++;
  } else {
    // We shouldn't reach here
    console.error('Invalid result');
  }

  // 2) Update UI
  // Update status
  document.querySelector('.status').innerHTML = result === 'win' ? `The Winner is ${currPlayer}` : 'Tie Game';
  // Update scoreboard
  document.querySelector('.win-count-x').innerHTML = `${xWinCount} (${calculatePercent(xWinCount, gameCount, 2)}%)`;
  document.querySelector('.win-count-o').innerHTML = `${oWinCount} (${calculatePercent(oWinCount, gameCount, 2)}%)`;
  document.querySelector('.tie-count').innerHTML = `${tieCount} (${calculatePercent(tieCount, gameCount, 2)}%)`;
  // Switch cursor style to default
  document.querySelectorAll('.cell').forEach(c => c.style.cursor = 'default');
  // Display 'play again' button
  document.querySelector('.play-again').style.visibility = 'visible';

  // 3) Remove event listeners
  document.querySelectorAll('.cell').forEach(c => {
    c.removeEventListener('mouseenter', enablePreview);
    c.removeEventListener('mouseleave', disablePreview);
    c.removeEventListener('click', placeMove);
  });
};

/**
 * Helper function that checks whether the game has ended
 * 
 * @returns true if game has ended in a win or tie and false otherwise
 */
const checkGameStatus = () => {
  // Check for winning combos
  for (const combo of WINNING_COMBOS) {
    const first = combo[0];
    const second = combo[1];
    const third = combo[2];

    // Win if winning combo cells are occupied by same symbol that's not ''
    if (gameState[first] !== '' && gameState[first] === gameState[second] && gameState[second] === gameState[third]) {
      endGame('win');
      return true;
    }
  }

  // Tie if there are no winning combos and all cells are occupied
  if (!gameState.includes('')) {
    endGame('tie');
    return true;
  }

  return false;
}

/**
 * Function that gets called after placing a move. Updates game state,
 * checks whether game has ended, switches players after a turn, and updates UI
 * 
 * @param {object} event: javascript event object. The destructured target property 
 * represents the clicked cell
 */
const placeMove = ({target}) => {
  // Do nothing if user clicks occupied cell
  const cellIndex = parseInt(target.getAttribute('data-index'));
  if (gameState[cellIndex] !== '') return;

  // Update game state and UI
  gameState[cellIndex] = currPlayer;
  target.innerHTML = currPlayer;
  target.style.backgroundColor = CLICK_COLOR;
  target.style.cursor = 'default';

  // Check if game has reached a conclusion
  const gameOver = checkGameStatus();
  if (gameOver) return;

  // Switch players and update status UI
  currPlayer = currPlayer === 'X' ? 'O' : 'X';
  document.querySelector('.status').innerHTML = `${currPlayer}'s Turn`;

  // Remove mouse hover event listeners to prevent overriding updates to cell made by click event
  target.removeEventListener('mouseenter', enablePreview);
  target.removeEventListener('mouseleave', disablePreview);
};

/**
 * Function that updates the cell UI on mouse enter
 * 
 * @param {object} event: javascript event object. The destructured target property
 * represents the hovered cell
 */
const enablePreview = ({target}) => {
  target.innerHTML = currPlayer;
  target.style.backgroundColor = PREVIEW_COLOR;
};

/**
 * Function that updates the cell UI on mouse leave
 * 
 * @param {object} event: javascript event object. The destructured target property
 * represents the hovered cell
 */
const disablePreview = ({target}) => {
  target.innerHTML = '';
  target.style.backgroundColor= 'fff';
}

// Function that gets called after a game restart. Resets game state, user, 
// updates UI, and removes listeners.
const playAgain = () => {
  // Reset game state and player. Update UI
  gameState = ['', '', '', '', '', '', '', '', ''];
  currPlayer = 'X';
  document.querySelectorAll('.cell').forEach(c => c.innerHTML = '');
  document.querySelector('.status').innerHTML = `${currPlayer}'s Turn`;
  // Switch cursor style to pointer
  document.querySelectorAll('.cell').forEach(c => c.style.cursor = 'pointer');
  // Hide 'play again' button
  document.querySelector('.play-again').style.visibility = 'hidden';

  // Re-enable event listeners
  document.querySelectorAll('.cell').forEach(c => {
    c.addEventListener('click', placeMove);
    c.addEventListener('mouseenter', enablePreview);
    c.addEventListener('mouseleave', disablePreview);
  });
};

// Add event listeners
document.querySelectorAll('.cell').forEach(c => {
  c.addEventListener('click', placeMove);
  c.addEventListener('mouseenter', enablePreview);
  c.addEventListener('mouseleave', disablePreview);
});
document.querySelector('.play-again').addEventListener('click', playAgain);
