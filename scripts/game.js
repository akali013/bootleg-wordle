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

loadKeys();

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
}

// Add click listeners to each keyboard key
document.querySelectorAll(".js-key").forEach((keyElement) => {
  keyElement.addEventListener("click", (event) => {
    console.log(keyElement.innerText);
  });
});