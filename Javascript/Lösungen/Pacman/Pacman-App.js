 
let width;
let scoreDisplay;
let score;
let layout;
let grid;
let squares = [];
let pacmanCurrentIndex;
let ghosts;
let pacman;
let isPaused;
let highscore;
//sounds
let eatSound;
let eatGhostSound;
let beginningSound;
let gameOverSound;

  
document.addEventListener("DOMContentLoaded", initializeGame);

document.addEventListener('keydown', function(e) {
  if (e.key == "p") {
    togglePause();
  }
});

function loadSounds(){
	eatSound = new Audio('sounds/pacman_chomp.wav');
    gameOverSound = new Audio('sounds/pacman_death.wav');
	eatGhostSound = new Audio('sounds/pacman_eatghost.wav');
}


function initializeGame() {
    scoreDisplay = document.getElementById("score");
    width = 28;
    score = 0;
	// Beim Laden des Spiels den Highscore aus dem Local Storage abrufen
    highscore = localStorage.getItem("highscore") || 0;
    document.getElementById("highscore").innerHTML = highscore;
    isPaused=false;
    grid = document.querySelector(".grid");
	console.log("initialize gridstyle: "+grid);
	
    layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

  
  createBoard();
  createPacman(490);
  loadSounds();
  pacman = document.querySelector('.pac-man');
  document.addEventListener("keyup", movePacman)
  setInterval(placeBonus, 5000); // Bonus alle 5 Sekunden platzieren
 
  ghosts = initializeGhosts();
  ghosts.forEach((ghost) => moveGhost(ghost));
  
  
}

function createBoard() {
  layout.forEach((cell, index) => {
    const square = document.createElement("div");
    square.id = index;
    grid.appendChild(square);
    squares.push(square);
    addClassToSquare(cell, square);
  });
}

function addClassToSquare(cell, square) {
  switch (cell) {
    case 0:
      square.classList.add("pac-dot");
      break;
    case 1:
      square.classList.add("wall");
      break;
    case 2:
      square.classList.add("ghost-lair");
      break;
    case 3:
      square.classList.add("power-pellet");
      break;
  }
}

function createPacman(startIndex) {
  squares[startIndex].classList.add("pac-man");
  pacmanCurrentIndex=startIndex;
  return startIndex;
}


function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    clearAllIntervals();
    document.removeEventListener("keyup", movePacman);
  } else {
    ghosts.forEach(ghost => moveGhost(ghost));
    document.addEventListener("keyup", movePacman);
  }
}

function checkHighscore() {
  if (score > highscore) {
    highscore = score;
    document.getElementById("highscore").innerHTML = highscore;
	// Neuer Highscore wird im Local Storage gespeichert
    localStorage.setItem("highscore", highscore);
  }
}

function movePacman(e) {
  squares[pacmanCurrentIndex].classList.remove("pac-man");
  
  switch (e.key) {
    case "ArrowLeft":
      pacmanCurrentIndex = moveLeft(pacmanCurrentIndex);
	  rotatePacman('180deg');
      break;
    case "ArrowUp":
      pacmanCurrentIndex = moveUp(pacmanCurrentIndex);
	  rotatePacman('-90deg');
      break;
    case "ArrowRight":
      pacmanCurrentIndex = moveRight(pacmanCurrentIndex);
	   rotatePacman('0deg');
      break;
    case "ArrowDown":
      pacmanCurrentIndex = moveDown(pacmanCurrentIndex);
	  rotatePacman('90deg');
      break;
  }

  squares[pacmanCurrentIndex].classList.add("pac-man");
  handlePacDotEaten(pacmanCurrentIndex);
  checkBonus(pacmanCurrentIndex);
  handlePowerPelletEaten(pacmanCurrentIndex);
  checkForGameOver(pacmanCurrentIndex);
  checkForWin();
  checkHighscore();
 
}

function rotatePacman(degrees) {
   
	console.log("rotate pacmen: "+pacman);
    if (pacman) {
            pacman.style.transform = `rotate(${degrees})`;
		console.log("Pacman style: "+pacman.style.transform);
    }
}


function moveLeft(pacmanCurrentIndex) {
  if (pacmanCurrentIndex % width !== 0 && !isBlocked(pacmanCurrentIndex - 1)) {
	
    return pacmanCurrentIndex - 1;
  }
  return pacmanCurrentIndex;
}

function moveUp(pacmanCurrentIndex) {
  if (pacmanCurrentIndex - width >= 0 && !isBlocked(pacmanCurrentIndex - width)) {
   
	return pacmanCurrentIndex - width;
  }
  return pacmanCurrentIndex;
}

function moveRight(pacmanCurrentIndex) {
  if (pacmanCurrentIndex % width < width - 1 && !isBlocked(pacmanCurrentIndex + 1)) {
	
    return pacmanCurrentIndex + 1;
  }
  return pacmanCurrentIndex;
}

function moveDown(pacmanCurrentIndex) {
  if (pacmanCurrentIndex + width < width * width && !isBlocked(pacmanCurrentIndex + width)) {
	
    return pacmanCurrentIndex + width;
  }
  return pacmanCurrentIndex;
}

function isBlocked(index) {
  return (
    squares[index].classList.contains("wall") ||
    squares[index].classList.contains("ghost-lair")
  );
}

function handlePacDotEaten(pacmanCurrentIndex) {
  if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
    score++;
    document.getElementById("score").innerHTML = score;
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
	eatSound.play();
  }
}

function handlePowerPelletEaten(pacmanCurrentIndex) {
  if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    scareGhosts();
    setTimeout(unScareGhosts, 10000);
    squares[pacmanCurrentIndex].classList.remove("power-pellet");
  }
}

function scareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = true));
}

function unScareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}

function checkForGameOver(pacmanCurrentIndex) {
  if (
    squares[pacmanCurrentIndex].classList.contains("ghost") &&
    !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", movePacman);
    setTimeout(() => alert("Game Over"), 500);
	gameOverSound.play();
  }
}

function checkForWin() {
  if (score >= 274) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", movePacman);
    setTimeout(() => alert("You have WON!"), 500);
  }
}

function initializeGhosts() {
  return [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500),
  ];
}

function Ghost(className, startIndex, speed) {
  this.className = className;
  this.startIndex = startIndex;
  this.speed = speed;
  this.currentIndex = startIndex;
  this.isScared = false;
  this.timerId = NaN;

  squares[this.currentIndex].classList.add(this.className, "ghost");
}

function moveGhost(ghost) {
  const directions = [-1, 1, width, -width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(() => {
    if (canMoveToSquare(ghost.currentIndex + direction)) {
      moveGhostToNewSquare(ghost, direction);
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }
    checkGhostCollision(ghost);
	checkForGameOver(pacmanCurrentIndex);
  }, ghost.speed);
}

function canMoveToSquare(index) {
  return (
    !squares[index].classList.contains("ghost") &&
    !squares[index].classList.contains("wall")
  );
}

function moveGhostToNewSquare(ghost, direction) {
  squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
  ghost.currentIndex += direction;
  squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
}

function checkGhostCollision(ghost) {
  if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")) {
    resetGhostPosition(ghost);
    score += 100;
    document.getElementById("score").innerHTML = score;
  }
}

function resetGhostPosition(ghost) {
  squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
  ghost.currentIndex = ghost.startIndex;
  squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
}

function placeBonus() {
  const randomIndex = Math.floor(Math.random() * layout.length);
  if (!squares[randomIndex].classList.contains('wall')) {
    squares[randomIndex].classList.add('bonus');
    setTimeout(() => squares[randomIndex].classList.remove('bonus'), 10000); // Bonus erscheint für 5 Sekunden
  }
}

function checkBonus(pacmanIndex) {
  if (squares[pacmanIndex].classList.contains('bonus')) {
    score += 50;
    document.getElementById("score").innerHTML = score;
    squares[pacmanIndex].classList.remove('bonus');
  }
}