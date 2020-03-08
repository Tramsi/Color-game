var colors = document.querySelectorAll(".square");
var newColorsBtn = document.querySelector("#new");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");
var mainColor = document.querySelector("h1");
var header = document.querySelector("header");
var result = document.querySelector("#result");
var activeColors;
var rightColor;
var gameOver = false;

init();
function init() {
  hard();
  colorClick();
}

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return "rgb(" + rng(0, 255) + ", " + rng(0, 255) + ", " + rng(0, 255) + ")";
}

function newGame() {
  colors.forEach(function(item) {
    item.style.backgroundColor = randomColor();
    item.classList.remove("hidden");
  });
  rightColor = colors[rng(0, activeColors.length - 1)];
  mainColor.innerHTML = rightColor.style.backgroundColor;
  reset();
}

function reset() {
  header.style.backgroundColor = null;
  result.classList.remove("green", "red");
  newColorsBtn.innerHTML = "NEW COLORS";
  result.innerHTML = null;
  gameOver = false;
}

function easy() {
  for (var i = 3; i < colors.length; i++) {
    colors[i].classList.add("none");
  }
  activeColors = document.querySelectorAll(".square:not(.none)");
  activeState(easyBtn);
  newGame();
}

function hard() {
  colors.forEach(function(item) {
    item.classList.remove("none");
  });
  activeColors = document.querySelectorAll(".square");
  activeState(hardBtn);
  newGame();
}

function colorClick() {
  for (var i = 0; i < colors.length; i++) {
    colors[i].addEventListener("click", function() {
      if (gameOver === true) {
        return;
      }
      if (this == rightColor) {
        activeColors.forEach(function(item) {
          item.style.backgroundColor = rightColor.style.backgroundColor;
        });
        header.style.backgroundColor = rightColor.style.backgroundColor;
        result.innerHTML = "CORRECT!";
        result.classList.add("green");
        newColorsBtn.innerHTML = "PLAY AGAIN?!";
        gameOver = true;
      } else {
        this.classList.add("hidden");
        result.innerHTML = "TRY AGAIN!";
        result.classList.add("red");
      }
    });
  }
}

function activeState(ele) {
  document.querySelectorAll(".item").forEach(function(item) {
    item.classList.remove("active");
  });
  ele.classList.add("active");
}

newColorsBtn.addEventListener("click", newGame);
easyBtn.addEventListener("click", easy);
hardBtn.addEventListener("click", hard);
