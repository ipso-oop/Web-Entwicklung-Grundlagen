import React, { useState, useEffect } from "react";

function App() {
    const [pacmanCurrentIndex, setPacmanCurrentIndex] = useState(490);  // Initialindex von Pacman
    const [grid, setGrid] = useState([]);

    // Initialisiere das Spielfeld und Pacman nur einmal beim Laden der Komponente
    useEffect(() => {
        createBoard();  // Erstelle das Spielfeld
        document.addEventListener("keyup", handleKeyUp);  // Füge Event-Listener für die Tastatureingaben hinzu

        // Aufräumen: Entferne den Event-Listener, wenn die Komponente ungemountet wird
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);  // Der leere Abhängigkeitsarray stellt sicher, dass der Effekt nur einmal ausgeführt wird

    // Bewege Pacman in die entsprechende Richtung basierend auf der Tasten-Eingabe
    const handleKeyUp = (e) => {
        let newIndex = pacmanCurrentIndex;

        switch (e.key) {
            case "ArrowLeft":
                newIndex = moveLeft(pacmanCurrentIndex);
                break;
            case "ArrowUp":
                newIndex = moveUp(pacmanCurrentIndex);
                break;
            case "ArrowRight":
                newIndex = moveRight(pacmanCurrentIndex);
                break;
            case "ArrowDown":
                newIndex = moveDown(pacmanCurrentIndex);
                break;
            default:
                return; // Beende, wenn eine andere Taste gedrückt wird
        }

        // Zustand nur ändern, wenn sich der Index tatsächlich ändert
        if (newIndex !== pacmanCurrentIndex) {
            setPacmanCurrentIndex(newIndex);
        }
    };

    // Funktion zum Bewegen nach links
    const moveLeft = (index) => {
        if (index % 28 !== 0) {
            return index - 1;
        }
        return index;
    };

    // Funktion zum Bewegen nach oben
    const moveUp = (index) => {
        if (index - 28 >= 0) {
            return index - 28;
        }
        return index;
    };

    // Funktion zum Bewegen nach rechts
    const moveRight = (index) => {
        if (index % 28 < 27) {
            return index + 1;
        }
        return index;
    };

    // Funktion zum Bewegen nach unten
    const moveDown = (index) => {
        if (index + 28 < 28 * 28) {
            return index + 28;
        }
        return index;
    };

    // Erstellt das Spielfeld mit einem 28x28-Layout
    const createBoard = () => {
        const newGrid = Array(28 * 28).fill(0);  // Erstelle ein Spielfeld mit 784 Feldern
        setGrid(newGrid);
    };

    return (
        <div className="App">
            <h1>Pacman Game</h1>
            <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(28, 20px)" }}>
                {grid.map((_, index) => (
                    <div key={index} className={index === pacmanCurrentIndex ? "pac-man" : ""}></div>
                ))}
            </div>
        </div>
    );
}

export default App;
