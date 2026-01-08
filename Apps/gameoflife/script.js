const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const rows = 60;
const cols = 80;
const cellSize = 10;

let grid = createGrid();
let running = false;
let interval;

let birthRules = [3];
let survivalRules = [2, 3];

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('stopBtn').addEventListener('click', stopGame);
document.getElementById('clearBtn').addEventListener('click', () => {
    grid = createGrid();
    drawGrid();
});
document.getElementById('setRulesBtn').addEventListener('click', updateRules);

canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    grid[y][x] = grid[y][x] ? 0 : 1;
    drawGrid();
});

function createGrid() {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            ctx.fillStyle = grid[y][x] ? '#009688' : '#fff';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeStyle = '#ccc';
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

function nextGen() {
    const newGrid = createGrid();

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const neighbors = countNeighbors(y, x);
            if (grid[y][x] === 1) {
                if (survivalRules.includes(neighbors)) {
                    newGrid[y][x] = 1;
                }
            } else {
                if (birthRules.includes(neighbors)) {
                    newGrid[y][x] = 1;
                }
            }
        }
    }

    grid = newGrid;
    drawGrid();
}

function countNeighbors(y, x) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const ny = (y + i + rows) % rows;
            const nx = (x + j + cols) % cols;
            count += grid[ny][nx];
        }
    }
    return count;
}

function startGame() {
    if (!running) {
        running = true;
        interval = setInterval(nextGen, 120);
    }
}

function stopGame() {
    running = false;
    clearInterval(interval);
}

function updateRules() {
    const input = document.getElementById('rulesInput').value;
    const parts = input.toUpperCase().split('/');
    if (parts.length === 2 && parts[0].startsWith('B') && parts[1].startsWith('S')) {
        birthRules = parts[0].substring(1).split('').map(Number);
        survivalRules = parts[1].substring(1).split('').map(Number);
        alert(`Nová pravidla: Birth: ${birthRules}, Survival: ${survivalRules}`);
    } else {
        alert('Formát musí být např. B3/S23');
    }
}

drawGrid();
