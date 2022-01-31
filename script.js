'use strict';

// the players' score.
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let scores, playing, currentScore, activePlayer;

const startNewGame = function () {
  // An array to hold the playres's score
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //Starting the game, reset the players' score to ZERO.
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};
startNewGame();

const switchPlayer = function () {
  // Switch player
  // if the activePlayer is 0, make it 1, else make it 0.
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Starting the game, reset the players' score to ZERO.

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a new random number
    //1.1. the trunc is to remove the decimal number
    // and the 1 is to reach the 6.
    let diceRolled = Math.trunc(Math.random() * 6) + 1;
    //2. diplay the number
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRolled}.png`;

    //3. check if the number is 1.
    if (diceRolled !== 1) {
      // add to the current score
      currentScore += diceRolled;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if the total score >= 100
    if (scores[activePlayer] >= 100) {
      // 3 . finish the game
      // disable the buttons
      playing = false;
      // hide the dice and the buttons.
      dice.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
      // add a different colour to the winner player.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // remove the class player--active.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // if not switch player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', startNewGame);
