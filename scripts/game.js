import { words } from "../data/wordbank.js";

let answer;
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

loadGamePage();

function loadGamePage() {
  createAnswerGrid();
  loadKeys();

  answer = getCorrectAnswer();
  console.log(answer);

  // Make the instructions pop-up disappear when the close icon is clicked
  document.querySelector(".js-close").addEventListener("click", () => {
    document.querySelector(".instructions-pop-up").remove();
  });
}

// Load the 6x5 answer grid
function createAnswerGrid() {
  for (let i = 1; i < 7; i++) {
    let currentRow = document.querySelector(`.js-attempt-${i}`);
    let html = "";

    for (let j = 1; j < 6; j++) {
      html += `<div class="display-box js-box-${i}-${j}"></div>`;
    }

    currentRow.innerHTML = html;
  }
}

// Choose a random word from the word bank to be the answer
function getCorrectAnswer() {
  // Pick a random number within the number of words in the bank
  const randomNumber = Math.floor(Math.random() * words.length);
  return words[randomNumber];
}

function loadKeys() {
  const keyboardTopRow = document.querySelector(".js-top-row");
  const keyboardMiddleRow = document.querySelector(".js-middle-row");
  const keyboardBottomRow = document.querySelector(".js-bottom-row");

  // Load the top row keys
  let topRowHTML = "";
  topRowKeys.forEach((key) => {
    topRowHTML += `
      <div class="key js-key js-key-${key}">
        ${key}
      </div>
    `;
  });

  // Load the middle row keys
  let middleRowHTML = "";
  middleRowKeys.forEach((key) => {
    middleRowHTML += `
      <div class="key js-key js-key-${key}">
        ${key}
      </div>
    `;
  });

  // Load the bottom row keys
  let bottomRowHTML = "";
  bottomRowKeys.forEach((key) => {
    // The enter key gets the enter-key class
    if (key === "ENTER") {
      bottomRowHTML += `
        <div class="key enter-key js-key">
          ${key}
        </div>
      `;
    }
    // The delete key gets the del-key class
    else if (key === "Del") {
      bottomRowHTML += `
        <div class="key del-key js-key">
          ${key}
        </div>
      `;
    }
    else {
      bottomRowHTML += `
        <div class="key js-key js-key-${key}">
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

      // Remove the last guessed letter if delete was clicked
      if (letter === "Del") {
        inputLetters.pop();
        renderAnswerRow();
      }
      else if (letter === "ENTER") {
        submitAnswer();
      }
      else {
        // Ensure inputLetters never goes beyond 5 letters
        if (inputLetters.length < 5) {
          inputLetters.push(letter);
          renderAnswerRow();
        }
      }

      console.log(`inputLetters: ${inputLetters}`);
    });
  });
}

// Updates a specific row of the answer grid
// depending on the current number of guesses
function renderAnswerRow() {
  const row = document.querySelector(`.js-attempt-${totalGuesses + 1}`);
  let rowHTML = "";

  for (let i = 0; i < inputLetters.length; i++) {
    rowHTML += `
      <div class="display-box js-box-${totalGuesses + 1}-${i + 1}">
        ${inputLetters[i]}
      </div>
    `;
  };

  // Use empty boxes for the rest of the row
  let i = inputLetters.length;
  while (i < 5) {
    rowHTML += `
      <div class="display-box js-box-${totalGuesses + 1}-${i}"></div>
    `;
    i++;
  }

  row.innerHTML = rowHTML;
}

// The user wins the game if the guessed letters spell out the answer
function submitAnswer() {
  // Only submit the answer when 5 letters are guessed
  if (inputLetters.length === 5) {
    totalGuesses++;

    for (let i = 0; i < inputLetters.length; i++) {
      const currentBox = document.querySelector(`.js-box-${totalGuesses}-${i + 1}`);

      if (inputLetters[i] === answer.charAt(i).toUpperCase()) {
        currentBox.classList.add("correct-box");
      }
      else if (answer.includes(inputLetters[i].toLowerCase())) {
        currentBox.classList.add("hint-box");
      }
      else {
        invalidateLetter(inputLetters[i], i);
      }
    }

    inputLetters = [];
  }
}

// Assign a darker box to the wrong letters 
// in the answer grid and keyboard
function invalidateLetter(letter, index) {
  const gridBox = document.querySelector(`.js-box-${totalGuesses}-${index + 1}`);
  const keyElement = document.querySelector(`.js-key-${letter}`);

  gridBox.classList.add("incorrect-box");
  keyElement.classList.add("incorrect-box");
}