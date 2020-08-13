// Game Value
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const UIgame = document.querySelector("#game"),
  UIminNum = document.querySelector(".min-num"),
  UImaxNum = document.querySelector(".max-num"),
  UIguessInput = document.querySelector("#guess-input"),
  UIguessBtn = document.querySelector("#guess-btn"),
  UImassage = document.querySelector(".massage");

// Assign UI min and max number
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again event listener
UIgame.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
  console.log(e.target);
});

// Listen for guess
UIguessBtn.addEventListener("click", function () {
  let guess = parseInt(UIguessInput.value);
  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    //Set massage
    setMassage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    // Check if won
    if (guess === winningNum) {
      // Game over -- WON
      gameOver(true, `${winningNum} is correct, YOU WON!`);
    } else {
      // Wrong number
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        // Game over -- LOST
        gameOver(false, `Game over! the correct number was ${winningNum}`);
      } else {
        // Game continues - answer wrong

        // Change border input color
        UIguessInput.style.borderColor = "red";
        // clear input
        UIguessInput.value = "";

        // Wrong number massage
        setMassage(`${guess} is wrong ${guessesLeft} guesses left`, "red");
      }
    }
  }
});
// Game over function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // Disable input
  UIguessInput.disabled = true;
  // Change border input color
  UIguessInput.style.borderColor = color;
  // Set text color
  UImassage.style.color = color;
  // Set massage
  setMassage(msg);
  // Play again
  UIguessBtn.value = "Play again";
  UIguessBtn.className += "play-again";
}
// Get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Set massage
function setMassage(msg, color) {
  UImassage.textContent = msg;
  UImassage.style.color = color;
}
