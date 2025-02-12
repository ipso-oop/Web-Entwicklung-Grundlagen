// Globale Variablen für das Spiel
let width;           // Breite des Spielfelds
let scoreDisplay;    // Element zur Anzeige des Punktestands
let score;           // Aktueller Punktestand
let layout;         // Layout/Aufbau des Spielfelds
let grid;           // Das Spielfeld-Container-Element
let squares = [];    // Array für alle Felder des Spiels
let pacmanCurrentIndex; // Aktuelle Position von Pacman
let ghosts;         // Array für alle Geister
let pacman;         // Pacman-Element

// Event Listener für das Laden des DOM
document.addEventListener("DOMContentLoaded", initializeGame);

/**
 * Initialisiert das komplette Spiel
 * Setzt Grundwerte und erstellt das Spielfeld
 */
function initializeGame() {
    scoreDisplay = document.getElementById("score");
    width = 28;    // Setzt die Breite auf 28 Felder
    score = 0;     // Initialisiert den Score mit 0
    grid = document.querySelector(".grid");
    console.log("initialize gridstyle: "+grid);
    
    // Layout-Array definiert das Spielfeld:
    // 0 - pac-dots (Punkte)
    // 1 - wall (Wände)
    // 2 - ghost-lair (Geister-Zuhause)
    // 3 - power-pellet (Power-Pillen)
    // 4 - empty (Leere Felder)
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

    createBoard();                  // Erstellt das Spielfeld
    createPacman(490);             // Erstellt Pacman an Startposition
    pacman = document.querySelector('.pac-man');
    document.addEventListener("keyup", movePacman)  // Event Listener für Tastatureingaben
   
    ghosts = initializeGhosts();   // Initialisiert die Geister
    ghosts.forEach((ghost) => moveGhost(ghost));  // Startet die Bewegung der Geister
}

/**
 * Erstellt das Spielfeld basierend auf dem Layout
 */
function createBoard() {
    layout.forEach((cell, index) => {
        const square = document.createElement("div");  // Erstellt ein neues Div-Element
        square.id = index;                            // Setzt die ID
        grid.appendChild(square);                     // Fügt es zum Grid hinzu
        squares.push(square);                         // Speichert es im squares Array
        addClassToSquare(cell, square);              // Fügt die entsprechende Klasse hinzu
    });
}

/**
 * Fügt dem übergebenen Feld die entsprechende CSS-Klasse hinzu
 * @param {number} cell - Zellentyp aus dem Layout
 * @param {HTMLElement} square - Das DOM-Element der Zelle
 */
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

/**
 * Erstellt Pacman an der übergebenen Startposition
 * @param {number} startIndex - Startposition von Pacman
 * @returns {number} - Die Startposition
 */
function createPacman(startIndex) {
    squares[startIndex].classList.add("pac-man");
    pacmanCurrentIndex = startIndex;
    return startIndex;
}

/**
 * Steuert die Bewegung von Pacman basierend auf Tastatureingaben
 * @param {Event} e - Tastatur-Event
 */
function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove("pac-man");  // Entfernt Pacman von aktueller Position
    
    // Bewegt Pacman je nach Tastatureingabe
    switch (e.key) {
        case "ArrowLeft":
            pacmanCurrentIndex = moveLeft(pacmanCurrentIndex);
            break;
        case "ArrowUp":
            pacmanCurrentIndex = moveUp(pacmanCurrentIndex);
            break;
        case "ArrowRight":
            pacmanCurrentIndex = moveRight(pacmanCurrentIndex);
            break;
        case "ArrowDown":
            pacmanCurrentIndex = moveDown(pacmanCurrentIndex);
            break;
    }

    squares[pacmanCurrentIndex].classList.add("pac-man");  // Setzt Pacman an neue Position
    handlePacDotEaten(pacmanCurrentIndex);                // Prüft auf gefressene Punkte
    handlePowerPelletEaten(pacmanCurrentIndex);           // Prüft auf gefressene Power-Pillen
    checkForGameOver(pacmanCurrentIndex);                 // Prüft auf Game Over
    checkForWin();                                        // Prüft auf Sieg
}

/**
 * Bewegt Pacman nach links, wenn möglich
 * @param {number} pacmanCurrentIndex - Aktuelle Position von Pacman
 * @returns {number} - Neue Position von Pacman
 */
function moveLeft(pacmanCurrentIndex) {
    // Prüft ob Bewegung nach links möglich ist (nicht am linken Rand und kein Hindernis)
    if (pacmanCurrentIndex % width !== 0 && !isBlocked(pacmanCurrentIndex - 1)) {
        return pacmanCurrentIndex - 1;
    }
    return pacmanCurrentIndex;
}

/**
 * Bewegt Pacman nach oben, wenn möglich
 * @param {number} pacmanCurrentIndex - Aktuelle Position von Pacman
 * @returns {number} - Neue Position von Pacman
 */
function moveUp(pacmanCurrentIndex) {
    // Prüft ob Bewegung nach oben möglich ist (nicht am oberen Rand und kein Hindernis)
    if (pacmanCurrentIndex - width >= 0 && !isBlocked(pacmanCurrentIndex - width)) {
        return pacmanCurrentIndex - width;
    }
    return pacmanCurrentIndex;
}

/**
 * Bewegt Pacman nach rechts, wenn möglich
 * @param {number} pacmanCurrentIndex - Aktuelle Position von Pacman
 * @returns {number} - Neue Position von Pacman
 */
function moveRight(pacmanCurrentIndex) {
    // Prüft ob Bewegung nach rechts möglich ist (nicht am rechten Rand und kein Hindernis)
    if (pacmanCurrentIndex % width < width - 1 && !isBlocked(pacmanCurrentIndex + 1)) {
        return pacmanCurrentIndex + 1;
    }
    return pacmanCurrentIndex;
}

/**
 * Bewegt Pacman nach unten, wenn möglich
 * @param {number} pacmanCurrentIndex - Aktuelle Position von Pacman
 * @returns {number} - Neue Position von Pacman
 */
function moveDown(pacmanCurrentIndex) {
    // Prüft ob Bewegung nach unten möglich ist (nicht am unteren Rand und kein Hindernis)
    if (pacmanCurrentIndex + width < width * width && !isBlocked(pacmanCurrentIndex + width)) {
        return pacmanCurrentIndex + width;
    }
    return pacmanCurrentIndex;
}

/**
 * Prüft ob ein Feld blockiert ist (Wand oder Geister-Zuhause)
 * @param {number} index - Zu prüfende Position
 * @returns {boolean} - true wenn blockiert, false wenn frei
 */
function isBlocked(index) {
    return (
        squares[index].classList.contains("wall") ||
        squares[index].classList.contains("ghost-lair")
    );
}

/**
 * Verarbeitet das Fressen eines Pac-Dots
 * @param {number} pacmanCurrentIndex - Aktuelle Position von Pacman
 */
function handlePacDotEaten(pacmanCurrentIndex) {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        score++;
        document.getElementById("score").innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove("pac-dot");
    }
}

/**
 * Verarbeitet das Fressen einer Power-Pille
 * @param {number} pacmanCurrentIndex - Aktuelle Position von Pacman
 */
function handlePowerPelletEaten(pacmanCurrentIndex) {
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
        score += 10;
        document.getElementById("score").innerHTML = score;
        scareGhosts();
        setTimeout(unScareGhosts, 10000);
        squares[pacmanCurrentIndex].classList.remove("power-pellet");
    }
}

/**
 * Macht alle Geister verwundbar
 */
function scareGhosts() {
    ghosts.forEach((ghost) => (ghost.isScared = true));
}

/**
 * Macht alle Geister wieder unverwundbar
 */
function unScareGhosts() {
    ghosts.forEach((ghost) => (ghost.isScared = false));
}

/**
 * Prüft ob das Spiel verloren ist (Kollision mit nicht-verwundbarem Geist)
 * @param {number} pacmanCurrentIndex - Aktuelle Position von Pacman
 */
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

/**
 * Prüft ob das Spiel gewonnen wurde (274 Punkte erreicht)
 */
function checkForWin() {
    if (score >= 274) {
        ghosts.forEach((ghost) => clearInterval(ghost.timerId));
        document.removeEventListener("keyup", movePacman);
        setTimeout(() => alert("You have WON!"), 500);
    }
}

/**
 * Initialisiert die vier Geister mit ihren Startpositionen und Geschwindigkeiten
 * @returns {Array} Array mit den vier Geister-Objekten
 */
function initializeGhosts() {
    return [
        new Ghost("blinky", 348, 250),
        new Ghost("pinky", 376, 400),
        new Ghost("inky", 351, 300),
        new Ghost("clyde", 379, 500),
    ];
}

/**
 * Geister-Konstruktor-Funktion
 * @param {string} className - CSS-Klassenname des Geistes
 * @param {number} startIndex - Startposition des Geistes
 * @param {number} speed - Bewegungsgeschwindigkeit des Geistes
 */
function Ghost(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;

    squares[this.currentIndex].classList.add(this.className, "ghost");
}

/**
 * Steuert die Bewegung eines Geistes
 * @param {Object} ghost - Das Geist-Objekt das bewegt werden soll
 */
function moveGhost(ghost) {
    const directions = [-1, 1, width, -width];  // Links, Rechts, Unten, Oben
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(() => {
        if (canMoveToSquare(ghost.currentIndex + direction)) {
            moveGhostToNewSquare(ghost, direction);
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)];
        }
        checkGhostCollision(ghost);
    }, ghost.speed);
}

/**
 * Prüft ob ein Geist sich auf ein bestimmtes Feld bewegen kann
 * @param {number} index - Zielposition
 * @returns {boolean} - true wenn Bewegung möglich, false wenn nicht
 */
function canMoveToSquare(index) {
    return (
        !squares[index].classList.contains("ghost") &&
        !squares[index].classList.contains("wall")
    );
}

/**
 * Bewegt einen Geist auf eine neue Position
 * @param {Object} ghost - Das zu bewegende Geist-Objekt
 * @param {number} direction - Bewegungsrichtung
 */
function moveGhostToNewSquare(ghost, direction) {
    squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
    ghost.currentIndex += direction;
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
}

/**
 * Prüft auf Kollision zwischen Pacman und einem verwundbaren Geist
 * @param {Object} ghost - Das zu prüfende Geist-Objekt
 */
function checkGhostCollision(ghost) {
    if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")) {
        resetGhostPosition(ghost);
        score += 100;
        document.getElementById("score").innerHTML = score;
    }
}

/**
 * Setzt einen Geist auf seine Startposition zurück
 * @param {Object} ghost - Das zurückzusetzende Geist-Objekt
 */
function resetGhostPosition(ghost) {
    squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
    ghost.currentIndex = ghost.startIndex;
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
}