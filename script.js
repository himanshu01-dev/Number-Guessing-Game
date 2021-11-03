'use strict';

//SOME DECLARATIONS
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// Important FUNCTIONS FOR EASE OF WORKING
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const number = function (message) {
  document.querySelector('.number').textContent = message;
};
const guess = function (message) {
  document.querySelector('.guess').value = message;
};
const body = function (message) {
  document.querySelector('body').style.backgroundColor = message;
};
const displayScore = function (message) {
  document.querySelector('.score').textContent = message;
};

//WHEN CHECK BTN IS CLICKED
document.querySelector('.check').addEventListener('click', mainLogic);

//WHEN AGAIN BTN IS CLICKED
document.querySelector('.again').addEventListener('click', restart);

// WHEN ENTER KEY IS CLICKED IN THE .GUESS AREA mainLogic() FUNCTION IS CALLED
document.querySelector('.guess').addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    mainLogic();
  }
});

// WHEN ESC KEY IS CLICKED GAME IS RESTARTED ( restart() METHOD IS INVOKED )
document.querySelector('body').addEventListener('keyup', e => {
  if (e.keyCode == 27) {
    restart();
  }
});

// restart(): RESTART THE GAME
function restart() {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  displayScore(score);
  number('?');
  guess('');
  body('#222');
  document.querySelector('.number').style.width = '15rem';
}

// mainLogic(): BRAIN BEHIND THE GAME
function mainLogic() {
  const guess = Number(document.querySelector('.guess').value);

  // WHEN THERE IS NO INPUT
  if (!guess) {
    displayMessage('⛔ No number!');

    // WHEN PLAYER WINS
  } else if (guess == secretNumber) {
    displayMessage('🎉 Correct Number');
    number(secretNumber);
    body('#60b347');

    document.querySelector('.number').style.width = '30rem';

    // FOR KEEPING THE highScore VALUES
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // WHEN GUESS IS WRONG
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too Low!');
      score--;
      displayScore(score);
    } else {
      displayMessage('😥 You lost the game!');
      displayScore(0);
    }
  }
}
