'use strict';
let number = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highScore = 0;

function again() {
  document.querySelector('.message').textContent = ' Start guessing...';
  document.querySelector('.score').textContent = '20';
  score = 20;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
  number = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.number').textContent = '?';
  console.log(number)
}

function play() {
  document.querySelector('.again').addEventListener('click', again);
  document.querySelector('.check').addEventListener('click', guessGame);
}

function guessGame() {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = 'no number!';
  } else if (guess === number) {
    document.querySelector('.message').textContent = 'You Win';
    document.querySelector('.number').textContent = number;
    document.querySelector('body').style.backgroundColor = '#60b347';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== number) {
    if (score>1){
    document.querySelector('.message').textContent = guess>number ? `Too high`:`Too low`;
    score--;
   document.querySelector('.score').textContent = score;
 
  }else {
    document.querySelector('.message').textContent='You lost the game!' 
    document.querySelector('.score').textContent = 0;
  }
}
}
play()
