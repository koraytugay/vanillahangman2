import words from './words.js';

export function HangmanGame() {
  this.targetWord = words[Math.floor(Math.random() * words.length)];
  this.attempts = [];
  console.log(this.targetWord);
}

export function attempt({attempts}, attempt) {
  !attempts.includes(attempt) && attempts.push(attempt);
}

export function getBadGuessCount({targetWord, attempts}) {
  return attempts.filter(attempt => !targetWord.includes(attempt)).length;
}

export function isGameOver({targetWord, attempts}) {
  return getBadGuessCount({targetWord, attempts}) === 10;
}

export function isGameWon({targetWord, attempts}) {
  return [...targetWord].filter(value => !attempts.includes(value)).length === 0;
}

export function getTargetWordMasked({targetWord, attempts}) {
  return [...targetWord].map(letter => attempts.includes(letter) ? letter : '_');
}
