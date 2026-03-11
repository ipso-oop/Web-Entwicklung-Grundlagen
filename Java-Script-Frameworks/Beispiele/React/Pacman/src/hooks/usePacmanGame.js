import { useCallback, useEffect, useState } from "react";
import { INITIAL_GHOSTS, INITIAL_PACMAN_INDEX, LAYOUT, MOVE_KEYS } from "../game/constants";
import {
    consumeCollectible,
    getAvailableGhostMoves,
    getNextPacmanIndex,
    hasRemainingCollectibles
} from "../game/engine";

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

export function usePacmanGame() {
    const [pacmanCurrentIndex, setPacmanCurrentIndex] = useState(INITIAL_PACMAN_INDEX);
    const [grid, setGrid] = useState([...LAYOUT]);
    const [score, setScore] = useState(0);
    const [ghosts, setGhosts] = useState(INITIAL_GHOSTS);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isWin, setIsWin] = useState(false);

    const consumeTileAtIndex = useCallback((index) => {
        setGrid((prevGrid) => {
            const { nextGrid, scoreDelta } = consumeCollectible(prevGrid, index);
            if (scoreDelta > 0) {
                setScore((prevScore) => prevScore + scoreDelta);
            }
            return nextGrid;
        });
    }, []);

    const movePacman = useCallback(
        (key) => {
            if (isGameOver || isWin) {
                return;
            }

            setPacmanCurrentIndex((currentIndex) => {
                const nextIndex = getNextPacmanIndex(LAYOUT, currentIndex, key);
                if (nextIndex !== currentIndex) {
                    consumeTileAtIndex(nextIndex);
                }
                return nextIndex;
            });
        },
        [consumeTileAtIndex, isGameOver, isWin]
    );

    useEffect(() => {
        consumeTileAtIndex(INITIAL_PACMAN_INDEX);
    }, [consumeTileAtIndex]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!MOVE_KEYS.includes(event.key)) {
                return;
            }

            event.preventDefault();
            movePacman(event.key);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [movePacman]);

    useEffect(() => {
        if (isGameOver || isWin) {
            return;
        }

        const timers = INITIAL_GHOSTS.map((ghost, ghostIndex) =>
            setInterval(() => {
                setGhosts((prevGhosts) => {
                    const currentGhost = prevGhosts[ghostIndex];
                    const occupiedByOthers = new Set(
                        prevGhosts.filter((_, index) => index !== ghostIndex).map((item) => item.currentIndex)
                    );
                    const availableMoves = getAvailableGhostMoves(
                        LAYOUT,
                        currentGhost.currentIndex,
                        occupiedByOthers
                    );

                    if (availableMoves.length === 0) {
                        return prevGhosts;
                    }

                    const nextIndex = randomItem(availableMoves);
                    const nextGhosts = [...prevGhosts];
                    nextGhosts[ghostIndex] = { ...currentGhost, currentIndex: nextIndex };
                    return nextGhosts;
                });
            }, ghost.speed)
        );

        return () => timers.forEach((timer) => clearInterval(timer));
    }, [isGameOver, isWin]);

    useEffect(() => {
        if (!isWin && ghosts.some((ghost) => ghost.currentIndex === pacmanCurrentIndex)) {
            setIsGameOver(true);
        }
    }, [ghosts, isWin, pacmanCurrentIndex]);

    useEffect(() => {
        if (!hasRemainingCollectibles(grid)) {
            setIsWin(true);
        }
    }, [grid]);

    return {
        grid,
        ghosts,
        isGameOver,
        isWin,
        pacmanCurrentIndex,
        score
    };
}
