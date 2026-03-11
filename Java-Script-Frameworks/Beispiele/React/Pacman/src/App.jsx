import "./App.css";
import { WIDTH } from "./game/constants";
import { getTileClassName } from "./game/engine";
import { usePacmanGame } from "./hooks/usePacmanGame";

function App() {
    const { grid, ghosts, isGameOver, isWin, pacmanCurrentIndex, score } = usePacmanGame();

    return (
        <div className="App">
            <h1>Pacman Game</h1>
            <h3>Score: {score}</h3>
            {isWin && <h2>You Win!</h2>}
            {isGameOver && <h2>Game Over</h2>}
            <div className="grid" style={{ display: "grid", gridTemplateColumns: `repeat(${WIDTH}, 20px)` }}>
                {grid.map((tile, index) => (
                    <div
                        key={index}
                        className={`${getTileClassName(tile)} ${ghosts
                            .filter((ghost) => ghost.currentIndex === index)
                            .map((ghost) => ghost.className)
                            .join(" ")} ${index === pacmanCurrentIndex ? "pac-man" : ""}`}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default App;
