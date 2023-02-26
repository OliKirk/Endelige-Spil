"use strict";

window.addEventListener("load", start);
let points = 0;
let lives = 3;

function start() {
  console.log("start");
  document.querySelector("#bad1_container").classList.add("bad1_move");
  document.querySelector("#good1_container").classList.add("good1_move");
  document.querySelector("#bad1_container").addEventListener("click", dieBad);
  document
    .querySelector("#civilian1_container")
    .addEventListener("click", dieGood);
}
function dieBad() {
  console.log("dieBad");
  document
    .querySelector("#bad1_container")
    .removeEventListener("click", dieBad);
  document.querySelector("#robber1_container").classList.add("paused");
  document.querySelector("#robber1_sprite").classList.add("rotate");
  document
    .querySelector("#robber1_container")
    .addEventListener("animationend", deadBad);
  incrementPoints();
}
function incrementPoints() {
  points++;
  displayPoints();
  function displayPoints() {
    document.querySelector("#bad_count").textContent = points;
    if (points > 2) {
      levelComplete();
    }
  }
}
function deadBad() {
  console.log("deadBad");
  document
    .querySelector("#bad1_container")
    .removeEventListener("animationend", deadBad);
  document.querySelector("#bad1_sprite").classList.remove("rotate");
  document.querySelector("#bad1_container").classList.remove("paused");
  document.querySelector("#bad1_container").classList.remove("bad1_walk");
  document.querySelector("#bad1_container").offsetWidth;
  document.querySelector("#bad1_container").classList.add("bad1_walk");
  document.querySelector("#bad1_container").addEventListener("click", dieBad);
}

function dieGood() {
  console.log("dieGood");
  document
    .querySelector("#good1_container")
    .removeEventListener("click", dieGood);
  document.querySelector("#good1_sprite").classList.add("rotate");
  document.querySelector("#good1_container").classList.add("paused");
  document
    .querySelector("#good1_container")
    .addEventListener("animationend", deadGood);
  decrementLives();
}
function decrementLives() {
  lives--;
  displayDecrementLives();
  if (lives == 0) {
    gameOver();
  }
}
function displayDecrementLives() {
  console.log(`#heart${lives}`);
  document.querySelector(`#heart${lives + 1}`).classList.remove("active_heart");
  document.querySelector(`#heart${lives + 1}`).classList.add("broken_heart");
}

function deadGood() {
  console.log("deadGood");
  document
    .querySelector("#good1_container")
    .removeEventListener("animationend", deadGood);
  document.querySelector("#good1_sprite").classList.remove("rotate");
  document.querySelector("#good1_container").classList.remove("paused");
  document.querySelector("#good1_container").classList.remove("good1_walk");
  document.querySelector("#good1_container").offsetWidth;
  document.querySelector("#good1_container").classList.add("good1_walk");
  document.querySelector("#good1_container").addEventListener("click", dieGood);
}
function levelComplete() {
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector(
    "#levelCompleteMessage"
  ).textContent = `Congratulations. You killed ${points} bads`;

  end();
}

function gameOver() {
  console.log("game over");
  document.querySelector("#game_over").classList.remove("hidden");
  end();
}

function end() {
  document.querySelector("#bad1_container").classList.remove("bad1_walk");
  document.querySelector("#good1_container").classList.remove("good1_walk");
  document
    .querySelector("#bad1_container")
    .removeEventListener("click", dieBad);
  document
    .querySelector("#good1_container")
    .removeEventListener("click", dieGood);
}
