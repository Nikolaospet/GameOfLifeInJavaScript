# Game of Life in JavaScript

## Introduction
This implementation of Conway's Game of Life is built using HTML5, CSS3, and JavaScript. The game utilizes the HTML canvas for rendering and is designed to automatically adjust to the browser window size, providing a responsive user experience.

## Features
- **Dynamic Resizing**: The game canvas automatically adjusts to the browser window size.
- **Interactive Cells**: Click on the canvas to create or destroy life.
- **Pause/Resume**: The game can be paused and resumed using the 'p' key.

## Setup
To run this game, simply clone this repository or download the files directly.

### Prerequisites
- A modern web browser that supports HTML5 and JavaScript.

### Running the Game
1. Open the `index.html` file in your web browser.
2. The game will start automatically and adjust to fit your browser window.
3. Click on cells to toggle their state between alive (black) and dead (white).
4. Press 'p' to pause or resume the game.

## Controls
- **Click**: Toggle the life state of cells.
- **P Key**: Pause or resume the game.

## Customization
The initial cell size and grid dimensions are set in the JavaScript file. You can modify these parameters to adjust the cell size and the number of cells in the grid:

```javascript
const cellSize = 10;  // Pixel size of each cell, adjust as needed
