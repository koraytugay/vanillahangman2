import words from './words.js';

export function HangmanGame() {
  this.targetWord = words[Math.floor(Math.random() * words.length)];
  this.attempts = [];
  this.attempt = function(letter) {
    if (!this.attempts.includes(letter)) {
      this.attempts.push(letter);
    }
  }
  console.log(this.targetWord);
}

export function getBadGuessCount({targetWord, attempts}) {
  let badGuessCount = 0;
  for (const attempt of attempts) {
    if (!(targetWord.includes(attempt))) {
      badGuessCount++;
    }
  }
  return badGuessCount;
}

export function isGameOver({targetWord, attempts}) {
  return getBadGuessCount({targetWord, attempts}) === 10;
}

export function isGameWon({targetWord, attempts}) {
  let gameWon = true;
  for (const targetLetter of targetWord) {
    if (!attempts.includes(targetLetter)) {
      gameWon = false;
    }
  }
  return gameWon;
}

export function getTargetWordMasked({targetWord, attempts}) {
  let targetWordMasked = "";
  for (let i = 0; i < targetWord.length; i++) {
    if (attempts.includes(targetWord[i])) {
      targetWordMasked = targetWordMasked.concat(targetWord[i]);
    }
    else {
      targetWordMasked = targetWordMasked.concat('_');
    }
  }
  return targetWordMasked;
}
