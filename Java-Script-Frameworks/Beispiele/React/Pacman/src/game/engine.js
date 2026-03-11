import { TILE, WIDTH } from "./constants";

const canMoveLeft = (index) => index % WIDTH !== 0;
const canMoveRight = (index) => index % WIDTH < WIDTH - 1;
const canMoveUp = (index) => index - WIDTH >= 0;
const canMoveDown = (index) => index + WIDTH < WIDTH * WIDTH;

const moveByKey = (index, key) => {
    switch (key) {
        case "ArrowLeft":
            return canMoveLeft(index) ? index - 1 : index;
        case "ArrowUp":
            return canMoveUp(index) ? index - WIDTH : index;
        case "ArrowRight":
            return canMoveRight(index) ? index + 1 : index;
        case "ArrowDown":
            return canMoveDown(index) ? index + WIDTH : index;
        default:
            return index;
    }
};

export const isPacmanWalkable = (layout, index) => {
    const tile = layout[index];
    return tile !== TILE.WALL && tile !== TILE.GHOST_LAIR;
};

export const isGhostWalkable = (layout, index) => layout[index] !== TILE.WALL;

export const getNextPacmanIndex = (layout, currentIndex, key) => {
    const nextIndex = moveByKey(currentIndex, key);
    return isPacmanWalkable(layout, nextIndex) ? nextIndex : currentIndex;
};

export const consumeCollectible = (grid, index) => {
    const tile = grid[index];
    const isDot = tile === TILE.DOT;
    const isPowerPellet = tile === TILE.POWER_PELLET;

    if (!isDot && !isPowerPellet) {
        return { nextGrid: grid, scoreDelta: 0 };
    }

    const nextGrid = [...grid];
    nextGrid[index] = TILE.EMPTY;
    return { nextGrid, scoreDelta: isPowerPellet ? 10 : 1 };
};

export const hasRemainingCollectibles = (grid) =>
    grid.some((tile) => tile === TILE.DOT || tile === TILE.POWER_PELLET);

export const getTileClassName = (tile) => {
    switch (tile) {
        case TILE.DOT:
            return "pac-dot";
        case TILE.WALL:
            return "wall";
        case TILE.GHOST_LAIR:
            return "ghost-lair";
        case TILE.POWER_PELLET:
            return "power-pellet";
        default:
            return "";
    }
};

export const getAvailableGhostMoves = (layout, ghostIndex, occupiedIndices) => {
    const candidates = [];

    if (canMoveLeft(ghostIndex)) {
        candidates.push(ghostIndex - 1);
    }
    if (canMoveRight(ghostIndex)) {
        candidates.push(ghostIndex + 1);
    }
    if (canMoveUp(ghostIndex)) {
        candidates.push(ghostIndex - WIDTH);
    }
    if (canMoveDown(ghostIndex)) {
        candidates.push(ghostIndex + WIDTH);
    }

    return candidates.filter((index) => isGhostWalkable(layout, index) && !occupiedIndices.has(index));
};
