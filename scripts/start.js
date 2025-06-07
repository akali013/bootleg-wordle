// Gets the current date in the format of month day, year
function getCurrentDate() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentDate = new Date();
  
  return `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
}

// Returns the edition number of the current date
// June 19th 2021 was the first Wordle
function getEdition() {
  const firstDate = new Date("June 19, 2021");
  const currentDate = new Date();

  return convertMillisecondstoDays(currentDate - firstDate);
}

function convertMillisecondstoDays(ms) {
  return Math.floor(ms / 1000 / 60 / 60 / 24);
}

document.querySelector(".js-date").innerHTML = getCurrentDate();
document.querySelector(".js-edition").innerHTML = `No. ${getEdition()}`;