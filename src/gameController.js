import {HangmanGame, attempt, isGameOver, isGameWon, getBadGuessCount, getTargetWordMasked} from './hangmanService.js'

let hangmanGame = new HangmanGame();
redrawUi();

document.querySelector('#new-game-button').addEventListener('click', function() {
  hangmanGame = new HangmanGame();
  redrawUi();
});

document.addEventListener('keydown', function({key}) {
  if ([...'abcdefghijklmnopqrstuvwxyz'].includes(key)) {
    attempt(hangmanGame, key);
    redrawUi();
  }
});

function redrawUi() {
  drawSecretWord();
  drawHangmanImage();
  drawLetters();
}

function drawSecretWord() {
  const secretWordContainer = document.querySelector('#secret-word-container');
  secretWordContainer.innerHTML = '';

  for (const letter of isGameOver(hangmanGame) ? hangmanGame.targetWord : getTargetWordMasked(hangmanGame)) {
    const targetLetterSpan = document.createElement('span');
    targetLetterSpan.innerText = letter;
    secretWordContainer.appendChild(targetLetterSpan);
  }
}

function drawHangmanImage() {
  let images = `resources/images/`;
  Object.assign(document.querySelector("#hangman-image"), {
    src: isGameWon(hangmanGame) ? `${images}youwin.png` : `${images}${getBadGuessCount(hangmanGame)}.png`
  });
}

function drawLetters() {
  const lettersContainer = document.querySelector('#letters-container');
  lettersContainer.innerHTML = '';

  for (let letter of [...'abcdefghijklmnopqrstuvwxyz']) {
    const letterButton = document.createElement('button');
    letterButton.classList.add('guess-letter');
    Object.assign(letterButton, {
      textContent: letter,
      disabled: isGameOver(hangmanGame) || isGameWon(hangmanGame) || hangmanGame.attempts.includes(letter)
    });
    letterButton.addEventListener('click', () => {
      attempt(hangmanGame, letter);
      redrawUi();
    });
    lettersContainer.appendChild(letterButton);
  }
}
