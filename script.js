"use strict";

window.addEventListener("load", ready);
let points = 0;
let lives = 3;

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", startGame);
  document.querySelector("#btn_restart").addEventListener("click", startGame);
  document.querySelector("#btn_go_to_start").addEventListener("click", showStartScreen);
}

function startGame() {
  let points = 0;
  let lives = 3;
  displayPoints();
  //nulstil point og liv
  resetLives();
  resetPoints();
  // showGameScreen();
  addPosition();
  addSpeed();
  // skjul start sklærm
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");

  //animation
  document.querySelector("#game").classList.add("zoom_in");
  //baggrundslyd når spillet starter
  document.querySelector("#sound_dreams").play();
  // start alle animationer
  startAllAnimations();
  // start timer
  startTimer();
  //Registrer click
  console.log("startGame");

  document.querySelector("#bad1_container").addEventListener("mousedown", dieBad);
  document.querySelector("#bad2_container").addEventListener("mousedown", dieBad);
  document.querySelector("#bad3_container").addEventListener("mousedown", dieBad);
  document.querySelector("#bad4_container").addEventListener("mousedown", dieBad);
  document.querySelector("#bad5_container").addEventListener("mousedown", dieBad);
  document.querySelector("#good1_container").addEventListener("mousedown", dieGood);
  document.querySelector("#good2_container").addEventListener("mousedown", dieGood);
  document.querySelector("#good3_container").addEventListener("mousedown", dieGood);
  document.querySelector("#good4_container").addEventListener("mousedown", dieGood);
  document.querySelector("#good5_container").addEventListener("mousedown", dieGood);
  // Registrer når siden rammes
  document.querySelector("#good1_container").addEventListener("animationiteration", clownRestart);
  document.querySelector("#good2_container").addEventListener("animationiteration", clownRestart);
  document.querySelector("#good3_container").addEventListener("animationiteration", clownRestart);
  document.querySelector("#good4_container").addEventListener("animationiteration", clownRestart);
  document.querySelector("#good5_container").addEventListener("animationiteration", clownRestart);

  document.querySelector("#bad1_container").addEventListener("animationiteration", clownRestart);
  document.querySelector("#bad2_container").addEventListener("animationiteration", clownRestart);
  document.querySelector("#bad3_container").addEventListener("animationiteration", clownRestart);
  document.querySelector("#bad4_container").addEventListener("animationiteration", clownRestart);
  document.querySelector("#bad5_container").addEventListener("animationiteration", clownRestart);
}

function showStartScreen() {
  resetLives();
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#start").classList.add("zoom_in");
}

function startAllAnimations() {
  // Start move animationer
  document.querySelector("#bad1_container").classList.add("bad1_move");
  document.querySelector("#bad2_container").classList.add("bad2_move");
  document.querySelector("#bad3_container").classList.add("bad3_move");
  document.querySelector("#bad4_container").classList.add("bad4_move");
  document.querySelector("#bad5_container").classList.add("bad5_move");
  document.querySelector("#good1_container").classList.add("good1_move");
  document.querySelector("#good2_container").classList.add("good2_move");
  document.querySelector("#good3_container").classList.add("good3_move");
  document.querySelector("#good4_container").classList.add("good4_move");
  document.querySelector("#good5_container").classList.add("good5_move");
  // Sæt position klasser
}

function addPosition() {
  //Bad positioner
  document.querySelector("#bad1_container").classList.add("position1");
  document.querySelector("#bad2_container").classList.add("position2");
  document.querySelector("#bad3_container").classList.add("position3");
  document.querySelector("#bad4_container").classList.add("position4");
  document.querySelector("#bad5_container").classList.add("position1");
  //Good positioner
  document.querySelector("#good1_container").classList.add("position1");
  document.querySelector("#good2_container").classList.add("position2");
  document.querySelector("#good3_container").classList.add("position3");
  document.querySelector("#good4_container").classList.add("position4");
  document.querySelector("#good5_container").classList.add("position1");
}

function addSpeed() {
  //Bad speed
  document.querySelector("#bad1_container").classList.add("speed1");
  document.querySelector("#bad2_container").classList.add("speed2");
  document.querySelector("#bad3_container").classList.add("speed3");
  document.querySelector("#bad4_container").classList.add("speed4");
  document.querySelector("#bad5_container").classList.add("speed5");
  //Good speed
  document.querySelector("#good1_container").classList.add("speed1");
  document.querySelector("#good2_container").classList.add("speed2");
  document.querySelector("#good3_container").classList.add("speed3");
  document.querySelector("#good4_container").classList.add("speed4");
  document.querySelector("#good5_container").classList.add("speed5");
}

function showGameScreen() {
  // Skjul startskærm, game over og level complete
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function resetLives() {
  // sæt lives til 3
  lives = 3;
  //nulstil visning af liv (hjerte vi ser)
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart3").classList.remove("broken_heart");
  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
  document.querySelector("#heart3").classList.add("active_heart");
}

function resetPoints() {
  // nulstil point
  points = 0;
  // nulstil vising af point
  displayPoints();
}

function dieBad() {
  console.log("dieBad");
  let bad = this;
  bad.removeEventListener("mousedown", dieBad);
  bad.querySelector("img").classList.add("rotater");
  bad.classList.add("paused");
  bad.addEventListener("animationend", deadBad);
  incrementPoints();
  //Lyd når man klikker på ond klovn
  document.querySelector("#sound_coin").currentTime = 0;
  document.querySelector("#sound_coin").play();
}

function deadBad() {
  console.log("deadBad");
  let bad = this;
  bad.removeEventListener("animationend", deadBad);
  bad.querySelector("img").classList.remove("rotater");
  bad.classList.remove("paused");
  clownRestart.call(this);
  bad.addEventListener("mousedown", dieBad);
}

function dieGood() {
  console.log("dieGood");
  let good = this;
  good.removeEventListener("mousedown", dieGood);
  good.querySelector("img").classList.add("rotatel");
  good.classList.add("paused");
  good.addEventListener("animationend", deadGood);

  decrementLives();
  decrementPoints();
  //Lyd når man klikker på god klovn
  document.querySelector("#sound_bomb").currentTime = 0;
  document.querySelector("#sound_bomb").play();
}

function deadGood() {
  console.log("deadGood");
  let good = this;
  good.removeEventListener("animationend", deadGood);
  good.querySelector("img").classList.remove("rotatel");
  good.classList.remove("paused");
  clownRestart.call(this);
  good.addEventListener("mousedown", dieGood);
}

function incrementPoints() {
  points++;
  displayPoints();
}
// hvor mange point man skal hvae for at vinde
function displayPoints() {
  document.querySelector("#bad_count").textContent = points;
  if (points > 2) {
    levelComplete();
  }
}
function decrementPoints() {
  points--;
  displayPoints();
}

function clownRestart() {
  console.log("clown restart");
  let clown = this;
  // genstart move animation
  clown.classList.remove("move");
  clown.offsetWidth;
  clown.classList.add("move");
  //fjern alle speed
  clown.classList.remove("speed1", "speed2", "speed3", "speed4", "speed5");
  let speed = Math.floor(Math.random() * 4) + 1;
  clown.classList.add("speed" + speed);
  // fjern alle positioner
  clown.classList.remove("position1", "position2", "position3", "position4");
  // sæt position til en ny klasse
  let p = Math.floor(Math.random() * 4) + 1;
  clown.classList.add(`position${p}`);
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

function startTimer() {
  // Sæt timer-animationen (shrink) i gang ved at tilføje klassen shrink til time_sprite
  document.querySelector("#time_sprite").classList.add("shrink");

  // Tilføj en eventlistener som lytter efter at animationen er færdig (animationend) og kalder funktionen timeIsUp
  document.querySelector("#time_sprite").addEventListener("animationend", timeIsUp);
}

function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 15) {
    levelComplete();
  } else {
    gameOver();
  }
}

function levelComplete() {
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#sound_tada").play();
  document.querySelector("#level_complete").classList.add("zoom_in");
  document.querySelector("#levelCompleteMessage").textContent = `You killed ${points} Bad Clowns`;
  end();
  //restart timer stopGame();
  //Gå tilbage til start
  // document.querySelector("#btn_go_to_start").addEventListener("click", showStartScreen);
  //Lyd når man vinder spil
  document.querySelector("#sound_tada").play();
}

function gameOver() {
  console.log("gameOver");
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("zoom_in");
  //Lyd når man taber spil
  document.querySelector("#sound_gameOver").play();
  end();
}

function end() {
  /*Bad*/
  document.querySelector("#bad1_container").classList.remove("bad1_move");
  document.querySelector("#bad2_container").classList.remove("bad2_move");
  document.querySelector("#bad3_container").classList.remove("bad3_move");
  document.querySelector("#bad4_container").classList.remove("bad4_move");
  document.querySelector("#bad5_container").classList.remove("bad5_move");
  /*Good*/
  document.querySelector("#good1_container").classList.remove("good1_move");
  document.querySelector("#good2_container").classList.remove("good2_move");
  document.querySelector("#good3_container").classList.remove("good3_move");
  document.querySelector("#good4_container").classList.remove("good4_move");
  document.querySelector("#good5_container").classList.remove("good5_move");
  /*Bad*/
  document.querySelector("#bad1_container").removeEventListener("mousedown", dieBad);
  document.querySelector("#bad2_container").removeEventListener("mousedown", dieBad);
  document.querySelector("#bad3_container").removeEventListener("mousedown", dieBad);
  document.querySelector("#bad4_container").removeEventListener("mousedown", dieBad);
  document.querySelector("#bad5_container").removeEventListener("mousedown", dieBad);
  /*Good*/
  document.querySelector("#good1_container").removeEventListener("mousedown", dieGood);
  document.querySelector("#good2_container").removeEventListener("mousedown", dieGood);
  document.querySelector("#good3_container").removeEventListener("mousedown", dieGood);
  document.querySelector("#good4_container").removeEventListener("mousedown", dieGood);
  document.querySelector("#good5_container").removeEventListener("mousedown", dieGood);

  //Pauser baggrundsmusik når enten GameOver eller Level Complete Kommer frem
  document.querySelector("#sound_dreams").pause();

  // nulstil timer - fjern animationen fra timeren (fjern klassen shrink fra time_sprite)
  document.querySelector("#time_sprite").classList.remove("shrink");
  //animation
  document.querySelector("#game").classList.remove("zoom_in");
}
