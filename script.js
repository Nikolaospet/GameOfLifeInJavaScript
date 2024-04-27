const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 10;  // Size of each cell in pixels
let gridWidth;        // Number of cells in width
let gridHeight;       // Number of cells in height

let grid;
let animationFrameId = null;
let isPaused = true;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gridWidth = Math.floor(canvas.width / cellSize);
    gridHeight = Math.floor(canvas.height / cellSize);
    grid = createGrid(gridWidth, gridHeight);
    drawGrid();
}

function createGrid(width, height) {
    return Array.from({ length: height }, () => Array.from({ length: width }, () => Math.floor(Math.random() * 2)));
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            ctx.fillStyle = grid[y][x] ? 'black' : 'white';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

function updateGrid() {
    const newGrid = createGrid(gridWidth, gridHeight);
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const life = grid[y][x];
            const neighbors = countNeighbors(x, y);
            if (life && (neighbors === 2 || neighbors === 3)) {
                newGrid[y][x] = 1;
            } else if (!life && neighbors === 3) {
                newGrid[y][x] = 1;
            } else {
                newGrid[y][x] = 0;
            }
        }
    }
    grid = newGrid;
}

function countNeighbors(x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight) {
                count += grid[ny][nx];
            }
        }
    }
    return count;
}

canvas.addEventListener('click', function(event) {
    const x = Math.floor((event.clientX) / cellSize);
    const y = Math.floor((event.clientY) / cellSize);
    grid[y][x] = 1 - grid[y][x];
    drawGrid();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'p') {
        togglePause();
    }
});

function togglePause() {
    isPaused = !isPaused;
    if (!isPaused && !animationFrameId) {
        gameLoop();
    }
}

function gameLoop() {
    if (!isPaused) {
        drawGrid();
        updateGrid();
        animationFrameId = requestAnimationFrame(gameLoop);
    } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();  // Initialize the canvas size

function startGame() {
    if (isPaused) {
        togglePause();
    }
}

startGame();  // Starts the game automatically
