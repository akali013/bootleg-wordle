import { words } from "../data/wordbank.js";

const topRowKeys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P"
];
const middleRowKeys = [
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L"
];
const bottomRowKeys = [
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "Del"
];

// Stores the first to fifth letter guesses of each attempt
let inputLetters = [];
// Stores how many guesses were entered
let totalGuesses = 0;

function loadKeys() {
  const keyboardTopRow = document.querySelector(".js-top-row");
  const keyboardMiddleRow = document.querySelector(".js-middle-row");
  const keyboardBottomRow = document.querySelector(".js-bottom-row");

  // Load the top row keys
  let topRowHTML = "";
  topRowKeys.forEach((key) => {
    topRowHTML += `
      <div class="key js-key">
        ${key}
      </div>
    `;
  });

  // Load the middle row keys
  let middleRowHTML = "";
  middleRowKeys.forEach((key) => {
    middleRowHTML += `
      <div class="key js-key">
        ${key}
      </div>
    `;
  });

  // Load the bottom row keys
  let bottomRowHTML = "";
  bottomRowKeys.forEach((key) => {
    if (key === "ENTER") {
      bottomRowHTML += `
        <div class="key enter-key js-key">
          ${key}
        </div>
      `;
    }
    else if (key === "Del") {
      bottomRowHTML += `
        <div class="key del-key js-key">
          ${key}
        </div>
      `;
    }
    else {
      bottomRowHTML += `
        <div class="key js-key">
          ${key}
        </div>
      `;
    }
  });

  keyboardTopRow.innerHTML = topRowHTML;
  keyboardMiddleRow.innerHTML = middleRowHTML;
  keyboardBottomRow.innerHTML = bottomRowHTML;

  // Add click listeners to each keyboard key
  document.querySelectorAll(".js-key").forEach((keyElement) => {
    keyElement.addEventListener("click", () => {
      const letter = keyElement.innerText;

      if (letter === "Del") {
        inputLetters.pop();
      }
      else if (letter === "ENTER") {
        submitAnswer();
      }
      else {
        if (inputLetters.length < 5) {
          inputLetters.push(letter);
        }
      }

      renderAnswerGrid();
      console.log(`inputLetters: ${inputLetters}`);
    });
  });
}

// Choose a random word from the word bank to be the answer
function getCorrectAnswer() {
  // Pick a random number within the number of words in the bank
  const randomNumber = Math.floor(Math.random() * words.length);
  console.log(randomNumber);
  return words[randomNumber];
}

// The user wins the game if the guessed letters spell out the answer
function submitAnswer() {
  if (inputLetters.length === 5) {
    totalGuesses++;
    let guessedWord = "";
    inputLetters.forEach((letter) => {
      guessedWord += letter;
    });
    inputLetters = [];

    if (guessedWord.toLowerCase() === answer) {
      alert("You win!");
    }
  }
}

// Update the answer grid every time the user submits an answer
// in the correct row based on the number of guesses
function renderAnswerGrid() {
  switch(totalGuesses) {
    case 0:
      updateAnswerRow("first");
      break;
    case 1:
      updateAnswerRow("second");
      break;
    case 2:
      updateAnswerRow("third");
      break;
    case 3:
      updateAnswerRow("fourth");
      break;
    case 4:
      updateAnswerRow("fifth");
      break;
    case 5:
      updateAnswerRow("sixth");
      break;
  }
}

// Updates a specific row of the answer grid
// depending on the current number of guesses
function updateAnswerRow(rowNumber) {
  const row = document.querySelector(`.js-${rowNumber}-attempt`);
  let rowHTML = "";

  inputLetters.forEach((letter) => {
    rowHTML += `
      <div class="display-box">
        ${letter}
      </div>
    `;
  });

  // Use empty boxes for the rest of the row
  let i = inputLetters.length;
  while (i < 5) {
    rowHTML += `
      <div class="display-box"></div>
    `;
    i++;
  }

  row.innerHTML = rowHTML;
}
let answer = getCorrectAnswer();
console.log(answer);

loadKeys();